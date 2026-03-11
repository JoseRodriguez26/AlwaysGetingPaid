import { createClient } from "@/lib/supabase-server";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import { notFound } from "next/navigation";
import PurchaseSection from "./PurchaseSection";

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

  // Check if current user has purchased this video
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let hasPurchased = false;

  if (user) {
    const { data: purchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("video_id", video.id)
      .eq("status", "approved")
      .single();
    hasPurchased = !!purchase;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Video Player */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <VideoPlayer
          src={hasPurchased ? video.full_video_url : video.preview_url}
          poster={video.thumbnail_url}
        />
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {!hasPurchased && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gold/10 text-gold border border-gold/20">
                Preview
              </span>
            )}
            {video.duration && (
              <span className="text-xs text-gray-500">{video.duration}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            {video.title}
          </h1>
        </div>

        {video.description && (
          <p className="text-gray-400 leading-relaxed">{video.description}</p>
        )}

        {hasPurchased ? (
          <div className="card border-green-500/20 bg-green-500/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-400 font-semibold">You own this video</p>
                <p className="text-sm text-gray-500">Enjoy the full version above</p>
              </div>
            </div>
          </div>
        ) : (
          <PurchaseSection video={video} isLoggedIn={!!user} />
        )}
      </div>

      <div className="mt-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all videos
        </Link>
      </div>
    </div>
  );
}
