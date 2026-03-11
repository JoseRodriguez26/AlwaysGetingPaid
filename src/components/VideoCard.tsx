import Link from "next/link";
import type { Video } from "@/lib/supabase";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/video/${video.id}`} className="group block">
      <div className="bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(228,184,77,0.06)]">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-surface-2 overflow-hidden">
          {video.thumbnail_url ? (
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
              <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}

          {/* Duration badge */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
              {video.duration}
            </span>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg shadow-gold/30">
              <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white group-hover:text-gold transition-colors truncate text-[15px]">
            {video.title}
          </h3>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-gold font-bold text-lg">${Number(video.price).toFixed(2)}</span>
            <span className="text-[11px] text-gray-500 bg-surface-2 px-2.5 py-1 rounded-full">Free preview</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
