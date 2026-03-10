import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET - List all published videos
export async function GET() {
  const supabase = await createClient();
  const { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ videos });
}

// POST - Create a new video (admin only)
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, price, preview_url, full_video_url, thumbnail_url, duration, published } = body;

  if (!title || !preview_url || !full_video_url) {
    return NextResponse.json({ error: "Title, preview URL, and full video URL are required" }, { status: 400 });
  }

  const serviceClient = getServiceClient();
  const { data, error } = await serviceClient.from("videos").insert({
    title,
    description: description || "",
    price: price || 9.99,
    preview_url,
    full_video_url,
    thumbnail_url: thumbnail_url || "",
    duration: duration || "",
    published: published ?? true,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ video: data }, { status: 201 });
}

// DELETE - Delete a video (admin only)
export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Video ID required" }, { status: 400 });

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_REGEX.test(id)) return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });

  const serviceClient = getServiceClient();
  const { error } = await serviceClient.from("videos").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
