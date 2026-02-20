"use client";

import { motion } from "framer-motion";
import { Check, Crown, Star, Zap } from "lucide-react";

export type Tier = {
  id: string;
  name: string;
  price: number;
  period: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ccbillLink: string;
};

const tiers: Tier[] = [
  {
    id: "fan",
    name: "Fan",
    price: 9.99,
    period: "month",
    icon: <Star className="w-5 h-5" />,
    description: "Get started with exclusive photo access",
    features: [
      "Access to all photo sets",
      "Monthly new releases",
      "Member-only feed",
      "Direct messaging (limited)",
      "Cancel anytime",
    ],
    ccbillLink: "#ccbill-fan",
  },
  {
    id: "vip",
    name: "VIP",
    price: 19.99,
    period: "month",
    icon: <Zap className="w-5 h-5" />,
    description: "Photos + full video library access",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Everything in Fan",
      "Full video library access",
      "HD streaming quality",
      "Early access to new drops",
      "Priority DMs",
      "Exclusive VIP stories",
    ],
    ccbillLink: "#ccbill-vip",
  },
  {
    id: "elite",
    name: "Elite",
    price: 39.99,
    period: "month",
    icon: <Crown className="w-5 h-5" />,
    description: "All-access + custom content & requests",
    badge: "Best Value",
    features: [
      "Everything in VIP",
      "Custom content requests",
      "Monthly 1-on-1 video call",
      "Name in creator credits",
      "Elite Discord channel",
      "Merchandise discounts",
      "Lifetime archive access",
    ],
    ccbillLink: "#ccbill-elite",
  },
];

export default function SubscriptionCards() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-purple-brand -top-20 -left-40 opacity-10" />
      <div className="orb w-[400px] h-[400px] bg-gold-dark -bottom-20 -right-20 opacity-8" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Membership</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-gold-gradient">Access</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Unlock the full Caliente Hub XXX experience. Cancel or upgrade anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-sm flex flex-col ${
                tier.highlighted
                  ? "glass gold-glow border border-gold/30"
                  : "glass border border-white/5"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                    tier.highlighted
                      ? "bg-gold-gradient text-background"
                      : "border border-gold/30 text-gold glass"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                      tier.highlighted
                        ? "bg-gold-gradient text-background"
                        : "border border-gold/30 text-gold"
                    }`}
                  >
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <p className="text-white/40 text-xs">{tier.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/40 text-lg">$</span>
                    <span className="font-display text-5xl font-bold text-gold-gradient">
                      {tier.price.toFixed(2).split(".")[0]}
                    </span>
                    <span className="text-white/40 text-lg">.{tier.price.toFixed(2).split(".")[1]}</span>
                  </div>
                  <p className="text-white/30 text-xs tracking-widest uppercase mt-1">
                    per {tier.period}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.ccbillLink}
                  className={
                    tier.highlighted
                      ? "btn-gold w-full text-center text-sm py-3.5"
                      : "btn-outline-gold w-full text-center text-sm py-3.5"
                  }
                >
                  <Crown className="w-4 h-4" />
                  Join {tier.name}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14 text-white/30 text-xs">
          {[
            "Secure Payment via CCBill",
            "Cancel Anytime",
            "256-bit SSL Encrypted",
            "18+ Verified Platform",
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-gold/60" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
