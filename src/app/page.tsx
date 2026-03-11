import { createClient } from "@/lib/supabase-server";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const list = videos ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.05]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(228,184,77,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Premium Content</span>
          </div>
          <h1
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "linear-gradient(180deg, #f0d078 0%, #e4b84d 40%, #c89a30 70%, #e4b84d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              filter: "drop-shadow(0 2px 16px rgba(228,184,77,0.2))",
            }}
          >
            Caliente Hub
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Exclusive adult content. Watch a free preview, then unlock the full video instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/subscribe" className="btn-gold px-8 py-3.5 text-sm">
              How to Get Access
            </Link>
            <Link href="/sign-up" className="btn-outline px-8 py-3.5 text-sm">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {list.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-surface border border-border flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-display font-bold text-white mb-2">Videos Coming Soon</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Content is being uploaded. Check back shortly or create an account to get notified.
            </p>
            <Link href="/sign-up" className="btn-gold mt-6 inline-block text-sm px-8 py-3">
              Create Account
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-display font-bold text-white">All Videos</h2>
                <p className="text-sm text-gray-500 mt-0.5">{list.length} video{list.length !== 1 ? "s" : ""} available</p>
              </div>
              <Link href="/subscribe" className="text-xs text-gold hover:text-gold-light transition-colors font-medium flex items-center gap-1">
                How to unlock
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/[0.05] mt-8">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-3">Ready to Watch?</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Pay via Cash App or crypto, submit your reference, and the full video unlocks instantly.
          </p>
          <Link href="/subscribe" className="btn-gold inline-block text-sm px-10 py-3.5">
            See Payment Instructions
          </Link>
        </div>
      </div>
    </div>
  );
}
