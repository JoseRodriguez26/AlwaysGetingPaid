import { Lock, Play, Eye, Heart, Clock, Crown, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Video | Caliente Hub XXX",
};

// Mock data — replace with Supabase fetch
const mockVideo = {
  id: "v1",
  title: "Exclusive — Behind the Scenes",
  description:
    "A raw, unfiltered look at the magic that happens behind closed doors. Exclusive access for VIP and Elite members only.",
  duration: "24:10",
  views: 31000,
  likes: 4200,
  tier: "vip",
  locked: true,
  bunnyEmbedUrl: "", // Replace with real Bunny.net embed URL
  thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
};

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = mockVideo;
  const isLocked = video.locked;

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
        <div className="relative rounded-sm overflow-hidden bg-surface-2 mb-8" style={{ aspectRatio: "16/9" }}>
          {isLocked ? (
            /* Locked state */
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${video.thumbnail})`,
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
                    {video.tier ? `${video.tier.toUpperCase()} Members Only` : "Unlock This Video"}
                  </p>
                  <p className="text-white/40 text-sm mb-6">
                    Subscribe to access this and all exclusive content
                  </p>
                  <Link href="/subscribe" className="btn-gold py-3 px-10">
                    <Crown className="w-4 h-4" />
                    Unlock Now
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Bunny.net player */
            video.bunnyEmbedUrl ? (
              <iframe
                src={video.bunnyEmbedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center gold-glow">
                  <Play className="w-7 h-7 text-background ml-1" fill="currentColor" />
                </div>
              </div>
            )
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {video.tier && (
                <span className="text-[10px] tracking-widest uppercase text-gold border border-gold/30 px-3 py-1 rounded-full">
                  {video.tier}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/40 text-sm">
                <Clock className="w-3.5 h-3.5" />
                {video.duration}
              </span>
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
                Subscribe to {video.tier?.toUpperCase()} or higher to watch this video.
              </p>
              <Link href="/subscribe" className="btn-gold text-xs py-3 text-center">
                View Plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
