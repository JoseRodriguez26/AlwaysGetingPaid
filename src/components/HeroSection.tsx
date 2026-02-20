"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, Crown } from "lucide-react";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background orbs */}
      <div className="orb w-[600px] h-[600px] bg-purple-brand top-[-100px] left-[-200px]" />
      <div className="orb w-[500px] h-[500px] bg-gold top-[-50px] right-[-150px] opacity-10" />
      <div className="orb w-[400px] h-[400px] bg-purple-brand bottom-[-100px] right-[100px] opacity-10" />
      <div className="orb w-[300px] h-[300px] bg-gold-dark bottom-[50px] left-[100px] opacity-8" />

      {/* Hero gradient mesh */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(107,33,168,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%), #080808",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-gold"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            opacity: 0.3,
          } as React.CSSProperties}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-8"
        >
          <Crown className="w-3.5 h-3.5 text-gold" />
          <span className="section-eyebrow text-[10px]">Premium Exclusive Content</span>
          <Crown className="w-3.5 h-3.5 text-gold" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"
        >
          <span className="text-white">Caliente</span>
          <br />
          <span className="text-gold-gradient">Hub</span>
          <span className="text-white/20 text-5xl md:text-6xl lg:text-7xl ml-4">XXX</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="divider-gold my-8 max-w-xs mx-auto"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/50 text-lg md:text-xl font-light tracking-wide mb-12 max-w-xl mx-auto"
        >
          Exclusive. Bold. Unapologetic.
          <br />
          <span className="text-white/30 text-base">Premium content, curated for you.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/subscribe" className="btn-gold text-sm py-4 px-10 gold-glow">
            <Crown className="w-4 h-4" />
            Start Your Membership
          </Link>
          <Link href="/content" className="btn-outline-gold text-sm py-4 px-10">
            <Play className="w-4 h-4" />
            Browse Content
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center justify-center gap-10 mt-16"
        >
          {[
            { value: "500+", label: "Exclusive Videos" },
            { value: "2K+", label: "Photo Sets" },
            { value: "3", label: "Membership Tiers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                {stat.value}
              </p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-gold transition-colors group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
