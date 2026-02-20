"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Play, Eye, Heart, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export type ContentItem = {
  id: string;
  title: string;
  type: "video" | "photo";
  thumbnail: string;
  price?: number;
  tier?: "fan" | "vip" | "elite";
  locked: boolean;
  duration?: string;
  preview?: string;
  likes?: number;
  views?: number;
};

interface ContentCardProps {
  item: ContentItem;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const [hovered, setHovered] = useState(false);

  const href = item.type === "video" ? `/video/${item.id}` : `/photos/${item.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={href}>
        <div
          className="group relative rounded-sm overflow-hidden cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ aspectRatio: item.type === "video" ? "16/9" : "3/4" }}
        >
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-surface-2 transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${item.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: item.locked ? "blur(8px) brightness(0.4)" : "brightness(0.85)",
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Type badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 glass px-2.5 py-1 rounded-full">
            {item.type === "video" ? (
              <Play className="w-3 h-3 text-gold" />
            ) : (
              <ImageIcon className="w-3 h-3 text-gold" />
            )}
            <span className="text-[10px] text-white/70 tracking-wide uppercase">
              {item.type === "video" ? item.duration : "Photo Set"}
            </span>
          </div>

          {/* Lock overlay */}
          {item.locked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="glass w-12 h-12 rounded-full flex items-center justify-center gold-glow mb-3">
                <Lock className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xs text-white/60 tracking-widest uppercase">
                {item.tier ? `${item.tier} members` : item.price ? `$${item.price}` : "Locked"}
              </span>
            </div>
          )}

          {/* Play button for unlocked video */}
          {!item.locked && item.type === "video" && hovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center gold-glow"
              >
                <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
              </motion.div>
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-display text-sm font-semibold text-white leading-tight mb-2 line-clamp-2">
              {item.title}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white/40 text-xs">
                {item.views !== undefined && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views.toLocaleString()}
                  </span>
                )}
                {item.likes !== undefined && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {item.likes.toLocaleString()}
                  </span>
                )}
              </div>
              {item.price && !item.tier && (
                <span className="text-gold font-semibold text-sm">
                  ${item.price}
                </span>
              )}
              {item.tier && (
                <span className="text-[10px] tracking-widest uppercase text-gold/70 border border-gold/20 px-2 py-0.5 rounded-full">
                  {item.tier}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
