import { NextRequest, NextResponse } from "next/server";
import getDB from "@/lib/db";

function isAuthorized(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  const expected = process.env.INTEGRATIONS_API_KEY;
  return Boolean(expected) && apiKey === expected;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ windowId: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { windowId } = await context.params;
  const { InvitationWindow, InvitationRequest } = await getDB();

  // "page:<slug>" — the synthetic id GET /api/integrations/webinars hands out
  // for a page with invitation.enabled but no InvitationWindow at all (see
  // that route for why). There's no window to slice registrants by date
  // range against, so every registrant this page has ever had is its
  // audience — InvitationRequest is page-scoped by nature; a window just
  // narrows that down to one occurrence's slice of it.
  let landingPageSlug: string;
  let dateQuery: Record<string, Date> | undefined;
  if (windowId.startsWith("page:")) {
    landingPageSlug = windowId.slice("page:".length);
  } else {
    const window = await InvitationWindow.findById(windowId).lean();
    if (!window) {
      return NextResponse.json({ error: "Window not found" }, { status: 404 });
    }
    landingPageSlug = (window as any).landing_page_slug;
    dateQuery = { $gte: (window as any).registration_start, $lte: (window as any).registration_end };
  }

  const invitations = await InvitationRequest.find({
    landing_page_slug: landingPageSlug,
    ...(dateQuery ? { created_at: dateQuery } : {}),
    // Enrolled only. This feed drives the reminder emails and the join link, so
    // a paid webinar must never leak them to someone whose payment is still
    // pending or failed. Rows predating the payment fields have no
    // payment_status at all, hence the $exists:false arm.
    $or: [
      { payment_status: { $in: ["not_required", "paid"] } },
      { payment_status: { $exists: false } },
    ],
  })
    .select("first_name email whatsapp_number location payment_status amount created_at")
    .sort({ created_at: 1 })
    .lean();

  const registrants = invitations.map((inv: any) => ({
    first_name: inv.first_name,
    email: inv.email,
    whatsapp_number: inv.whatsapp_number,
    location: inv.location,
    created_at: inv.created_at,
  }));

  return NextResponse.json({ registrants });
}
