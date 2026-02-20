import HeroSection from "@/components/HeroSection";
import ContentGrid from "@/components/ContentGrid";
import SubscriptionCards from "@/components/SubscriptionCard";
import { Flame, Shield, Zap, Crown } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Features strip */}
      <section className="py-12 border-y border-gold/10 bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Flame className="w-5 h-5 text-gold" />,
              title: "Always Fresh",
              desc: "New content drops every week. Never the same thing twice.",
            },
            {
              icon: <Shield className="w-5 h-5 text-gold" />,
              title: "100% Private",
              desc: "Your membership is completely private and discreetly billed.",
            },
            {
              icon: <Zap className="w-5 h-5 text-gold" />,
              title: "Instant Access",
              desc: "Subscribe and unlock everything immediately. No waiting.",
            },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm border border-gold/20 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContentGrid />

      {/* Mid-page CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(107,33,168,0.2) 0%, transparent 70%), #080808",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="section-eyebrow mb-4">Limited Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Join the Inner Circle
          </h2>
          <div className="divider-gold my-6" />
          <p className="text-white/40 mb-10 text-lg">
            Get your first month at 50% off. Use code{" "}
            <span className="text-gold font-semibold">CALIENTE50</span> at checkout.
          </p>
          <a href="/subscribe" className="btn-gold text-sm py-4 px-12 gold-glow inline-flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Claim Your Discount
          </a>
        </div>
      </section>

      <SubscriptionCards />
    </>
  );
}
