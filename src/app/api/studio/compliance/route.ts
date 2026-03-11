import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { model_id, ...updates } = await req.json();

  // compute compliance_status
  const allDone =
    updates.id1_verified &&
    updates.id2_verified &&
    updates.photo_with_id &&
    updates.contract_signed &&
    updates.std_test_result === "clear";

  const { data, error } = await supabase
    .from("model_compliance")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("model_id", model_id)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ compliance: data, complete: allDone });
}
