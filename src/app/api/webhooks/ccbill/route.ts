import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyCCBillWebhook, type CCBillWebhookPayload } from "@/lib/ccbill";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const payload = Object.fromEntries(params.entries());

    const digest = payload["digest"];
    const isValid = await verifyCCBillWebhook(payload, digest);

    if (!isValid) {
      console.error("CCBill webhook: invalid digest");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const eventType = payload["eventType"];
    const subscriptionId = payload["subscriptionId"];
    const email = payload["email"];

    if (eventType === "NewSaleSuccess") {
      // Determine tier from sub-account or custom field
      const tier = (payload["formName"] as "fan" | "vip" | "elite") ?? "fan";
      const renewalDate = payload["renewalDate"];

      // Upsert subscription in Supabase
      const { error } = await supabase.from("subscriptions").upsert({
        ccbill_subscription_id: subscriptionId,
        tier,
        status: "active",
        current_period_end: renewalDate ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      if (error) {
        console.error("Supabase upsert error:", error);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
      }
    }

    if (eventType === "Cancellation") {
      await supabase
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("ccbill_subscription_id", subscriptionId);
    }

    if (eventType === "Expiration") {
      await supabase
        .from("subscriptions")
        .update({ status: "expired" })
        .eq("ccbill_subscription_id", subscriptionId);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("CCBill webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
