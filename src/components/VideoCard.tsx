import Link from "next/link";
import type { Video } from "@/lib/supabase";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/video/${video.id}`} className="group block">
      <div className="card !p-0 overflow-hidden hover:border-gold/50 transition-colors">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-surface-2">
          {video.thumbnail_url ? (
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}

          {/* Duration badge */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <svg className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white group-hover:text-gold transition-colors truncate">
            {video.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gold font-bold">${Number(video.price).toFixed(2)}</span>
            <span className="text-xs text-gray-500">Preview available</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
