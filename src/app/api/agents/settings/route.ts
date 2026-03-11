import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// GET: load all agent configs for current user
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: configs } = await supabase
      .from("agent_configs")
      .select("*")
      .eq("user_id", user.id);

    return NextResponse.json({ configs: configs ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: save/update agent config
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { agentId, enabled, config } = await req.json();
    if (!agentId) return NextResponse.json({ error: "agentId required" }, { status: 400 });

    const { data, error } = await supabase
      .from("agent_configs")
      .upsert(
        { user_id: user.id, agent_id: agentId, enabled, config, updated_at: new Date().toISOString() },
        { onConflict: "user_id,agent_id" }
      )
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ config: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
