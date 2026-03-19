import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { PLANS, PlanId } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { planId } = await req.json();
    const plan = PLANS[planId as PlanId];
    if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const { MercadoPagoConfig, Preference } = await import("mercadopago");

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN ?? "",
    });

    const origin = req.headers.get("origin") ?? "https://www.calientehubxxx.com";

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: planId,
          title: `CalienteAI ${plan.name} Plan`,
          description: `Monthly subscription - ${plan.name}`,
          quantity: 1,
          unit_price: plan.price,
          currency_id: "USD",
        }],
        back_urls: {
          success: `${origin}/dashboard?payment=success&plan=${planId}&provider=mp`,
          failure: `${origin}/pricing?payment=failed`,
          pending: `${origin}/dashboard?payment=pending`,
        },
        auto_return: "approved",
        external_reference: `${user.id}|${planId}`,
        payer: { email: user.email ?? "" },
      },
    });

    return NextResponse.json({ url: result.init_point });
  } catch (err: any) {
    console.error("Mercado Pago checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
