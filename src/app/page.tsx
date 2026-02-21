"use client";

import { motion } from "framer-motion";
import { Flame, DollarSign, Camera, MessageCircle, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getCashAppLink, CASHAPP_CONFIG } from "@/lib/cashapp";

const links = [
  {
    title: `Pay ${CASHAPP_CONFIG.amount} via Cash App`,
    href: getCashAppLink(),
    icon: <DollarSign className="w-5 h-5" />,
    variant: "cashapp" as const,
    external: true,
  },
  {
    title: "Browse Content",
    href: "/content",
    icon: <Camera className="w-5 h-5" />,
    variant: "default" as const,
    external: false,
  },
  {
    title: "Get Access — Subscribe",
    href: "/subscribe",
    icon: <Shield className="w-5 h-5" />,
    variant: "gold" as const,
    external: false,
  },
  {
    title: "About Me",
    href: "/about",
    icon: <MessageCircle className="w-5 h-5" />,
    variant: "default" as const,
    external: false,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-start px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(107,33,168,0.1) 0%, transparent 50%), #080808",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-24 h-24 rounded-full bg-gold-gradient flex items-center justify-center gold-glow mb-5">
            <Flame className="w-10 h-10 text-background" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            <span className="text-gold-gradient">Caliente</span> Hub
            <span className="text-gold text-lg font-normal ml-2">XXX</span>
          </h1>
          <p className="text-white/40 text-sm text-center mt-2 max-w-xs">
            Exclusive premium content. Authentic. Bold. Unapologetic.
          </p>
        </motion.div>

        {/* How to get access */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass border border-gold/20 rounded-sm p-5 mb-8 w-full"
        >
          <p className="section-eyebrow text-[10px] mb-3 text-center">How to Get Access</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#00D632]/20 text-[#00D632] flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <p className="text-white/60">Pay <span className="text-gold font-semibold">${CASHAPP_CONFIG.amount}</span> via Cash App below</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#00D632]/20 text-[#00D632] flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <p className="text-white/60">DM me your <span className="text-gold font-semibold">email</span> after payment</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#00D632]/20 text-[#00D632] flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <p className="text-white/60">I&apos;ll grant you <span className="text-gold font-semibold">full access</span> to all content</p>
            </div>
          </div>
        </motion.div>

        {/* Links */}
        <div className="w-full space-y-3">
          {links.map((link, i) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 w-full p-4 rounded-sm transition-all duration-300 group ${
                    link.variant === "cashapp"
                      ? "bg-[#00D632]/10 border border-[#00D632]/30 hover:bg-[#00D632]/20 hover:border-[#00D632]/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,214,50,0.2)]"
                      : link.variant === "gold"
                      ? "glass border border-gold/30 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.2)]"
                      : "glass border border-white/10 hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                      link.variant === "cashapp"
                        ? "bg-[#00D632]/20 text-[#00D632]"
                        : link.variant === "gold"
                        ? "border border-gold/30 text-gold"
                        : "border border-white/20 text-white/60"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span
                    className={`font-semibold text-sm tracking-wide flex-1 ${
                      link.variant === "cashapp"
                        ? "text-[#00D632]"
                        : link.variant === "gold"
                        ? "text-gold"
                        : "text-white/80"
                    }`}
                  >
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 w-full p-4 rounded-sm transition-all duration-300 group ${
                    link.variant === "gold"
                      ? "glass border border-gold/30 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.2)]"
                      : "glass border border-white/10 hover:border-white/20 hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                      link.variant === "gold"
                        ? "border border-gold/30 text-gold"
                        : "border border-white/20 text-white/60"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span
                    className={`font-semibold text-sm tracking-wide flex-1 ${
                      link.variant === "gold" ? "text-gold" : "text-white/80"
                    }`}
                  >
                    {link.title}
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/20 text-xs text-center mt-10 tracking-wider"
        >
          18+ ONLY &bull; All models 18+ at time of creation
        </motion.p>
      </div>
    </div>
  );
}
