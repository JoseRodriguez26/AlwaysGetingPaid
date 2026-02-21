"use client";

import { useAccess } from "@/lib/useAccess";
import ContentGrid from "@/components/ContentGrid";
import { Lock, DollarSign } from "lucide-react";
import Link from "next/link";
import { getCashAppLink, CASHAPP_CONFIG } from "@/lib/cashapp";

export default function ContentPage() {
  const { hasAccess, loading } = useAccess();

  return (
    <div className="pt-24">
      {/* Page header */}
      <div className="relative py-20 px-6 text-center overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(107,33,168,0.15) 0%, transparent 60%), #080808",
          }}
        />
        <div className="relative z-10">
          <p className="section-eyebrow mb-3">The Vault</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            All <span className="text-gold-gradient">Content</span>
          </h1>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-white/30 text-sm">Loading...</p>
        </div>
      ) : hasAccess ? (
        <ContentGrid />
      ) : (
        /* Locked state — teaser */
        <div className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="glass w-20 h-20 rounded-full flex items-center justify-center gold-glow mx-auto mb-6">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Members Only
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              Pay <span className="text-gold font-semibold">${CASHAPP_CONFIG.amount}</span> via Cash App to unlock full access to all content. Stream only — no downloads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getCashAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-sm bg-[#00D632] hover:bg-[#00C02E] text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
              >
                <DollarSign className="w-4 h-4" />
                Pay with Cash App
              </a>
              <Link href="/subscribe" className="btn-outline-gold text-xs py-3 px-8">
                Learn More
              </Link>
            </div>
          </div>

          {/* Blurred teaser grid */}
          <div className="mt-16 relative">
            <div className="blur-lg pointer-events-none opacity-40">
              <ContentGrid />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
