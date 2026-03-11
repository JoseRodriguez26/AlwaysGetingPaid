import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data } = await supabase
    .from("productions")
    .select("*, production_models(*, models(*)), distributions(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return NextResponse.json({ productions: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { model_ids, ...body } = await req.json();
  const { data, error } = await supabase
    .from("productions")
    .insert({ ...body, user_id: user.id })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (model_ids?.length) {
    await supabase.from("production_models").insert(
      model_ids.map((mid: string) => ({ production_id: data.id, model_id: mid }))
    );
  }
  return NextResponse.json({ production: data });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...updates } = await req.json();
  const { data, error } = await supabase
    .from("productions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ production: data });
}
