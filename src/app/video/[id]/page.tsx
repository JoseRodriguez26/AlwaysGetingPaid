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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Video Player */}
      <VideoPlayer
        src={hasPurchased ? video.full_video_url : video.preview_url}
        poster={video.thumbnail_url}
      />

      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            {video.title}
          </h1>
          {video.duration && (
            <p className="text-sm text-gray-500 mt-1">Duration: {video.duration}</p>
          )}
        </div>

        {video.description && <p className="text-gray-400">{video.description}</p>}

        {hasPurchased ? (
          <div className="card border-green-800 bg-green-900/20">
            <p className="text-green-400 font-semibold">
              You own this video. Enjoy the full version above!
            </p>
          </div>
        ) : (
          <PurchaseSection video={video} isLoggedIn={!!user} />
        )}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-gold hover:text-gold-light transition-colors">
          &larr; Back to all videos
        </Link>
      </div>
    </div>
  );
}
