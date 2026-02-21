import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const serverSupabase = await createClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ hasAccess: false });
  }

  // Check by email match in user_access table
  const email = user.email?.toLowerCase().trim();
  if (!email) {
    return NextResponse.json({ hasAccess: false });
  }

  const { data } = await supabase
    .from("user_access")
    .select("id, is_active, expires_at")
    .eq("user_email", email)
    .eq("is_active", true)
    .limit(1)
    .single();

  if (!data) {
    return NextResponse.json({ hasAccess: false });
  }

  // Check expiration
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ hasAccess: false });
  }

  return NextResponse.json({ hasAccess: true });
}
