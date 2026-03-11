import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { getMonthlyUsage } from "@/lib/usage";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const usage = await getMonthlyUsage(user.id);
    return NextResponse.json(usage);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
