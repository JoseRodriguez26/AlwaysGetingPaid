import { createClient } from "@/lib/supabase-server";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gold">
          Caliente Hub
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Exclusive premium content. Watch free previews and unlock full videos instantly.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Link href="/subscribe" className="btn-gold">
            How to Buy
          </Link>
          <Link href="/sign-up" className="btn-outline">
            Create Account
          </Link>
        </div>
      </div>

      {/* Video Grid */}
      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Content coming soon. Stay tuned!</p>
        </div>
      )}
    </div>
  );
}
