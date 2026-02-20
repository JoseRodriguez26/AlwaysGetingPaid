import { Flame, Crown, Heart } from "lucide-react";

export const metadata = {
  title: "About | Caliente Hub XXX",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-center justify-center px-6 overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(107,33,168,0.2) 0%, transparent 70%), #080808",
          }}
        />
        <div className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Flame className="w-4 h-4 text-gold" />
            <span className="section-eyebrow text-xs">Caliente Hub XXX LLC</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            The Story Behind{" "}
            <span className="text-gold-gradient">The Brand</span>
          </h1>
          <div className="divider-gold my-6" />
          <p className="text-white/50 text-lg leading-relaxed">
            Built on authenticity. Driven by passion. Delivered with excellence.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-sm border border-gold/30 flex items-center justify-center shrink-0 mt-1">
              <Crown className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Who We Are
              </h2>
              <p className="text-white/50 leading-loose">
                Caliente Hub XXX is an independent LLC media company dedicated to producing
                and distributing premium exclusive content. We operate with full creative
                control — no middlemen, no compromises. Everything you see here is authentic,
                curated, and produced with intention.
              </p>
            </div>
          </div>

          <div className="divider-gold" />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-sm border border-gold/30 flex items-center justify-center shrink-0 mt-1">
              <Flame className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-white/50 leading-loose">
                To create a premium, direct-to-fan experience that puts creators first
                and delivers real value to every subscriber. We believe adult content
                creators deserve a professional platform — and fans deserve real,
                unfiltered content from someone who actually cares.
              </p>
            </div>
          </div>

          <div className="divider-gold" />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-12 h-12 rounded-sm border border-gold/30 flex items-center justify-center shrink-0 mt-1">
              <Heart className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                For the Fans
              </h2>
              <p className="text-white/50 leading-loose">
                You are the reason this exists. Every piece of content is made with
                you in mind — your feedback shapes what we create. As a member, you
                are not just a subscriber. You are part of the inner circle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-surface border-t border-gold/10 text-center">
        <p className="section-eyebrow mb-4">Ready?</p>
        <h2 className="font-display text-3xl font-bold text-white mb-6">
          Join the <span className="text-gold-gradient">Inner Circle</span>
        </h2>
        <a href="/subscribe" className="btn-gold py-4 px-12">
          <Crown className="w-4 h-4" />
          View Membership Plans
        </a>
      </section>
    </div>
  );
}
