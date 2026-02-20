"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContentCard, { type ContentItem } from "./ContentCard";
import { Filter } from "lucide-react";

const SAMPLE_CONTENT: ContentItem[] = [
  { id: "v1", title: "Exclusive — Behind the Scenes", type: "video", thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", duration: "12:34", locked: false, likes: 2840, views: 18200, tier: "vip" },
  { id: "p1", title: "Golden Hour Sessions Vol. 1", type: "photo", thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", locked: false, likes: 1920, views: 9400, tier: "fan" },
  { id: "v2", title: "Private Collection — Red Room", type: "video", thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", duration: "24:10", locked: true, likes: 4200, views: 31000, tier: "elite" },
  { id: "p2", title: "Midnight Glamour Series", type: "photo", thumbnail: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=800&q=80", locked: false, likes: 3100, views: 15600, tier: "vip" },
  { id: "v3", title: "Solo Session — Unfiltered", type: "video", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", duration: "18:45", locked: true, price: 14.99, likes: 5600, views: 44000 },
  { id: "p3", title: "Smoke & Silk — Art Series", type: "photo", thumbnail: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80", locked: false, likes: 2300, views: 11200, tier: "fan" },
  { id: "v4", title: "VIP Night — Extended Cut", type: "video", thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", duration: "32:20", locked: true, tier: "elite", likes: 7100, views: 52000 },
  { id: "p4", title: "Lingerie Lookbook — Vol. 3", type: "photo", thumbnail: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&q=80", locked: false, likes: 4800, views: 28000, tier: "vip" },
  { id: "v5", title: "Raw & Uncut — Fan Request", type: "video", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", duration: "9:55", locked: false, likes: 1600, views: 8900, price: 7.99 },
  { id: "p5", title: "Boudoir Diaries — Chapter 2", type: "photo", thumbnail: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80", locked: true, tier: "elite", likes: 3900, views: 24000 },
  { id: "v6", title: "Weekend in Paradise", type: "video", thumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80", duration: "21:00", locked: false, tier: "fan", likes: 2200, views: 13500 },
  { id: "p6", title: "Studio Session — Gold Edition", type: "photo", thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80", locked: true, price: 9.99, likes: 2800, views: 17000 },
];

type FilterType = "all" | "video" | "photo" | "free";

export default function ContentGrid() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = SAMPLE_CONTENT.filter((item) => {
    if (filter === "video") return item.type === "video";
    if (filter === "photo") return item.type === "photo";
    if (filter === "free") return !item.locked;
    return true;
  });

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All Content" },
    { value: "video", label: "Videos" },
    { value: "photo", label: "Photos" },
    { value: "free", label: "Free Preview" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow mb-3">The Vault</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Exclusive <span className="text-gold-gradient">Content</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 glass p-1 rounded-sm">
            <Filter className="w-3.5 h-3.5 text-gold ml-3" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`text-xs px-4 py-2 rounded-sm tracking-wider uppercase transition-all duration-200 ${
                  filter === f.value
                    ? "bg-gold text-background font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — mixed aspect ratios */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="break-inside-avoid">
              <ContentCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="btn-outline-gold text-xs py-3 px-10">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
