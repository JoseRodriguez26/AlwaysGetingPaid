"use client";

import { Lock, Eye, Heart, Clock, ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";
import { useAccess } from "@/lib/useAccess";
import StreamPlayer from "@/components/StreamPlayer";
import { getCashAppLink, CASHAPP_CONFIG } from "@/lib/cashapp";
import { useEffect, useState } from "react";

type VideoData = {
  id: string;
  title: string;
  description: string;
  duration?: string;
  views: number;
  likes: number;
  storage_url: string;
  thumbnail_url: string;
  is_free_preview: boolean;
};

// Mock fallback
const mockVideo: VideoData = {
  id: "v1",
  title: "Exclusive — Behind the Scenes",
  description:
    "A raw, unfiltered look at the magic that happens behind closed doors. Exclusive access for members only.",
  duration: "24:10",
  views: 31000,
  likes: 4200,
  storage_url: "",
  thumbnail_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
  is_free_preview: false,
};

export default function VideoPage({ params }: { params: { id: string } }) {
  const { hasAccess, loading: accessLoading } = useAccess();
  const [video, setVideo] = useState<VideoData>(mockVideo);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((json) => {
        const found = json.content?.find(
          (c: VideoData & { type: string }) => c.id === params.id && c.type === "video"
        );
        if (found) setVideo(found);
      })
      .catch(() => {});
  }, [params.id]);

  const isLocked = !video.is_free_preview && !hasAccess;

  if (accessLoading) {
    return (
      <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/content"
          className="inline-flex items-center gap-2 text-white/40 hover:text-gold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Content
        </Link>

        {/* Video player or lock */}
        {isLocked ? (
          <div className="relative rounded-sm overflow-hidden bg-surface-2 mb-8" style={{ aspectRatio: "16/9" }}>
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${video.thumbnail_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(12px) brightness(0.3)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div className="glass w-20 h-20 rounded-full flex items-center justify-center gold-glow">
                  <Lock className="w-8 h-8 text-gold" />
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-white mb-2">
                    Members Only
                  </p>
                  <p className="text-white/40 text-sm mb-6">
                    Pay via Cash App to unlock all content
                  </p>
                  <a
                    href={getCashAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-[#00D632] hover:bg-[#00C02E] text-white font-bold text-sm tracking-widest uppercase transition-all"
                  >
                    <DollarSign className="w-4 h-4" />
                    Pay ${CASHAPP_CONFIG.amount}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : video.storage_url ? (
          <div className="mb-8">
            <StreamPlayer
              src={video.storage_url}
              poster={video.thumbnail_url}
              title={video.title}
            />
          </div>
        ) : (
          <div className="relative rounded-sm overflow-hidden bg-surface-2 mb-8 flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
            <p className="text-white/30 text-sm">Video not available</p>
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {video.duration && (
                <span className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {video.duration}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {video.title}
            </h1>
            <p className="text-white/40 leading-relaxed mb-6">{video.description}</p>
            <div className="flex items-center gap-6 text-white/30 text-sm">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> {video.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" /> {video.likes.toLocaleString()} likes
              </span>
            </div>
          </div>

          {/* Sidebar CTA */}
          {isLocked && (
            <div className="glass border border-gold/20 rounded-sm p-6 w-full md:w-64 shrink-0 flex flex-col gap-4">
              <p className="section-eyebrow text-[10px]">Unlock Access</p>
              <p className="font-display text-lg font-bold text-white">
                Get Full Access
              </p>
              <p className="text-white/40 text-sm">
                Pay ${CASHAPP_CONFIG.amount} via Cash App to watch this and all videos.
              </p>
              <Link href="/subscribe" className="btn-gold text-xs py-3 text-center">
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
