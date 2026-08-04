import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import getDB from "@/lib/db";
import { resolveInvitationPricing } from "@/lib/invitation-pricing";

function sanitizeText(value?: string | null) {
  return (value ?? "").trim();
}

/**
 * Step 1 of the paid-webinar flow.
 *
 * Saves the registrant as `pending` and opens a Razorpay order for the amount
 * configured on the landing page. Nobody is enrolled here — that only happens
 * in verify-payment, once the signature checks out.
 *
 * The request body carries no amount on purpose: the price comes from the
 * saved page via resolveInvitationPricing, so a tampered client cannot choose
 * what it pays.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName = sanitizeText(body.firstName);
    const email = sanitizeText(body.email).toLowerCase();
    const whatsappNumber = sanitizeText(body.whatsappNumber);
    const location = sanitizeText(body.location);
    const rawLandingPageId = sanitizeText(body.landingPageId);
    const rawLandingPageSlug = sanitizeText(body.landingPageSlug);

    if (!firstName || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const pricing = await resolveInvitationPricing(rawLandingPageId, rawLandingPageSlug);
    if (!pricing) {
      return NextResponse.json({ error: "Webinar not found" }, { status: 404 });
    }
    if (!pricing.isPaid) {
      // Free webinar — the caller should be using /api/invitations instead.
      return NextResponse.json(
        { error: "This webinar is free. No payment is required." },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error("Razorpay credentials are not configured");
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const { InvitationRequest } = await getDB();

    const registrant = await InvitationRequest.create({
      landing_page_id: /^[a-f\d]{24}$/i.test(rawLandingPageId) ? rawLandingPageId : undefined,
      landing_page_slug: rawLandingPageSlug || undefined,
      first_name: firstName,
      email,
      whatsapp_number: whatsappNumber || undefined,
      location: location || undefined,
      payment_status: "pending",
      amount: pricing.amount,
      currency: pricing.currency,
    });

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    let order;
    try {
      order = await razorpay.orders.create({
        amount: Math.round(pricing.amount * 100), // paise
        currency: pricing.currency,
        // Razorpay caps receipt at 40 chars.
        receipt: `web_${registrant._id.toString()}`.slice(0, 40),
        notes: {
          invitation_id: registrant._id.toString(),
          landing_page: pricing.pageSlug || "",
          registrant_email: email,
        },
      });
    } catch (orderErr: any) {
      // Don't strand a pending row that can never be paid.
      await InvitationRequest.findByIdAndUpdate(registrant._id, { payment_status: "failed" }).catch(() => {});
      throw orderErr;
    }

    await InvitationRequest.findByIdAndUpdate(registrant._id, { razorpay_order_id: order.id });

    return NextResponse.json({
      invitationId: registrant._id.toString(),
      razorpay_order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      webinarTitle: pricing.pageTitle || "Webinar",
    });
  } catch (err: any) {
    console.error("Invitation payment creation error", err);
    return NextResponse.json(
      { error: err?.message || "Unable to start payment right now." },
      { status: 500 }
    );
  }
}
