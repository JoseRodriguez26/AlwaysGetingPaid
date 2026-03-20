import { createClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID_REGEX.test(id)) notFound();

  const supabase = await createClient();

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!video) notFound();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  // Check subscription
  const { data: sub } = await supabase
    .from("user_subscriptions")
    .select("plan")
    .eq("user_id", user.id)
    .single();

  const isSubscribed = !!(sub && sub.plan && sub.plan !== "free");
  if (!isSubscribed) redirect("/dashboard");

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e5e5e5", padding: "80px 20px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Back */}
        <Link href="/dashboard" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#444", fontSize: 13, textDecoration: "none", marginBottom: 24,
          transition: "color 0.15s",
        }}>
          ← Back to all content
        </Link>

        {/* Video player */}
        <div style={{
          width: "100%", aspectRatio: "16/9",
          background: "#000", borderRadius: 8, overflow: "hidden",
          border: "1px solid #1a1a1a", marginBottom: 24,
          boxShadow: "0 0 40px rgba(204,0,0,0.1)",
        }}>
          <video
            controls
            playsInline
            poster={video.thumbnail_url || undefined}
            style={{ width: "100%", height: "100%", display: "block" }}
            controlsList="nodownload"
            onContextMenu={() => false}
          >
            <source src={video.full_video_url} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>

        {/* Info */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, color: "#cc0000",
                border: "1px solid rgba(204,0,0,0.4)", padding: "3px 8px",
                borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.1em",
              }}>Exclusive</span>
              {video.duration && (
                <span style={{ fontSize: 12, color: "#444" }}>{video.duration}</span>
              )}
            </div>
            <h1 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.2 }}>
              {video.title}
            </h1>
            {video.description && (
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{video.description}</p>
            )}
          </div>

          <div style={{
            padding: "10px 16px", borderRadius: 6,
            background: "rgba(0,180,80,0.08)", border: "1px solid rgba(0,180,80,0.25)",
            color: "#4ade80", fontSize: 13, fontWeight: 600, flexShrink: 0,
          }}>
            ✓ Full Access
          </div>
        </div>

      </div>
    </div>
  );
}
