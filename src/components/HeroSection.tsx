"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, Crown } from "lucide-react";

export default function HeroSection() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(107,33,168,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.06) 0%, transparent 50%), #080808",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-eyebrow mb-6"
        >
          Premium Exclusive Content
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"
        >
          <span className="text-white">Caliente</span>
          <br />
          <span className="text-gold-gradient">Hub</span>
          <span className="text-white/20 text-5xl md:text-6xl lg:text-7xl ml-3">XXX</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="divider-gold my-8 max-w-[200px] mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/40 text-lg md:text-xl font-light tracking-wide mb-10"
        >
          Exclusive. Bold. Unapologetic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/subscribe" className="btn-gold text-sm py-4 px-10">
            <Crown className="w-4 h-4" />
            Join Now
          </Link>
          <Link href="/content" className="btn-outline-gold text-sm py-4 px-10">
            <Play className="w-4 h-4" />
            Browse Content
          </Link>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-gold transition-colors"
      >
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
