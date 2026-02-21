"use client";

import { useState, useEffect } from "react";
import { Flame, ShieldAlert } from "lucide-react";

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem("age_verified");
    if (!verified) setShow(true);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("age_verified", "true");
    setShow(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
      style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)" }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(107,33,168,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-sm bg-gold-gradient flex items-center justify-center mx-auto mb-6 gold-glow">
          <Flame className="w-8 h-8 text-background" />
        </div>

        {/* Brand */}
        <p className="font-display text-3xl font-bold text-white mb-1">
          <span className="text-gold-gradient">Caliente</span> Hub
          <span className="text-gold text-xl font-normal ml-2">XXX</span>
        </p>

        <div className="divider-gold my-5 max-w-[120px] mx-auto" />

        {/* Warning */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-gold/70" />
          <p className="section-eyebrow text-[11px]">Adults Only — 18+</p>
        </div>

        <p className="text-white/50 text-sm leading-relaxed mb-8">
          This website contains explicit adult content intended for adults
          18 years of age or older. By entering you confirm that you are
          at least <span className="text-white/80 font-medium">18 years old</span> and
          agree to our{" "}
          <a href="/terms" className="text-gold/70 hover:text-gold underline">
            Terms of Service
          </a>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleEnter}
            className="btn-gold flex-1 py-4 text-sm"
          >
            I am 18 or older — Enter
          </button>
          <button
            onClick={handleExit}
            className="btn-outline-gold flex-1 py-4 text-sm"
          >
            I am under 18 — Exit
          </button>
        </div>

        <p className="text-white/20 text-xs mt-6">
          By entering you accept our privacy policy and cookie use.
        </p>
      </div>
    </div>
  );
}
