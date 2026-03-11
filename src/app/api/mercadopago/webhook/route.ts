import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") return NextResponse.json({ received: true });

    const { MercadoPagoConfig, Payment } = await import("mercadopago");

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN ?? "",
    });

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: body.data.id });

    if (paymentData.status === "approved") {
      const ref = paymentData.external_reference ?? "";
      const [userId, planId] = ref.split("|");
      if (userId && planId) {
        const supabase = await createClient();
        await supabase.from("user_subscriptions").upsert(
          { user_id: userId, plan: planId, updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
