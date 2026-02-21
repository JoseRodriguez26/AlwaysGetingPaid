import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const serverSupabase = await createClient();
  const { data: { user } } = await serverSupabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, type, thumbnail_url, storage_url, tier_required, price, is_free_preview } = body;

  if (!title || !type) {
    return NextResponse.json({ error: "Title and type are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("content")
    .insert([
      {
        title,
        description: description || "",
        type,
        thumbnail_url: thumbnail_url || "",
        storage_url: storage_url || "",
        tier_required: tier_required || null,
        price: price ? parseFloat(price) : null,
        is_free_preview: is_free_preview ?? false,
        views: 0,
        likes: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ content: data }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ content: data });
}

export async function DELETE(req: NextRequest) {
  const serverSupabase = await createClient();
  const { data: { user } } = await serverSupabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Content ID required" }, { status: 400 });
  }

  const { error } = await supabase.from("content").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
