import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import getDB from "@/lib/db";
import { sendInvitationConfirmation } from "@/lib/invitation-notify";

/**
 * Step 2 of the paid-webinar flow: the only place a paying registrant becomes
 * enrolled.
 *
 * The signature is recomputed here with the Razorpay secret. The browser's
 * claim that a payment succeeded is never trusted — a handler callback can be
 * forged, an HMAC over the server's own secret cannot.
 */
export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      invitationId,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !invitationId) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET is not configured");
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const { InvitationRequest } = await getDB();
    const registrant = await InvitationRequest.findById(invitationId);
    if (!registrant) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // The order id must be the one this registration created, so a valid
    // signature from some other (e.g. cheaper) order can't be replayed here.
    if (registrant.razorpay_order_id !== razorpay_order_id) {
      await InvitationRequest.findByIdAndUpdate(invitationId, { payment_status: "failed" });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const provided = Buffer.from(String(razorpay_signature));
    const expected = Buffer.from(expectedSignature);
    const isValid =
      provided.length === expected.length && crypto.timingSafeEqual(provided, expected);

    if (!isValid) {
      await InvitationRequest.findByIdAndUpdate(invitationId, { payment_status: "failed" });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Already verified (e.g. a double-submitted handler) — succeed without
    // sending the confirmation a second time.
    if (registrant.payment_status === "paid") {
      return NextResponse.json({ success: true, alreadyConfirmed: true });
    }

    await InvitationRequest.findByIdAndUpdate(invitationId, {
      payment_status: "paid",
      razorpay_payment_id,
      paid_at: new Date(),
    });

    await sendInvitationConfirmation({
      firstName: registrant.first_name,
      email: registrant.email,
      whatsappNumber: registrant.whatsapp_number,
      location: registrant.location,
      landingPageId: registrant.landing_page_id?.toString(),
      landingPageSlug: registrant.landing_page_slug,
      // Turns the confirmation into a receipt. The amount comes off the saved
      // registration (which was priced server-side), never off the request.
      payment: {
        amount: registrant.amount ?? 0,
        currency: registrant.currency || "INR",
        paymentId: razorpay_payment_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Invitation payment verification error", err);
    return NextResponse.json(
      { error: err?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
