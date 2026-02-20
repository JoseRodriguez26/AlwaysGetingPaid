import SubscriptionCards from "@/components/SubscriptionCard";
import { Shield, CreditCard, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Subscribe | Caliente Hub XXX",
  description: "Choose your membership tier and unlock exclusive premium content.",
};

export default function SubscribePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative py-20 px-6 text-center overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201,168,76,0.08) 0%, transparent 60%), #080808",
          }}
        />
        <div className="relative z-10">
          <p className="section-eyebrow mb-3">Membership</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Unlock <span className="text-gold-gradient">Everything</span>
          </h1>
          <p className="text-white/40 mt-4 max-w-md mx-auto">
            Three tiers. One mission — giving you the most exclusive content experience.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>
      </div>

      <SubscriptionCards />

      {/* Payment info */}
      <section className="py-16 px-6 bg-surface border-t border-gold/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-white text-center mb-10">
            Secure &amp; Private Payment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <CreditCard className="w-6 h-6 text-gold" />,
                title: "CCBill Secure",
                desc: "Industry-leading adult payment processing. Discreet billing on your statement.",
              },
              {
                icon: <Shield className="w-6 h-6 text-gold" />,
                title: "256-bit SSL",
                desc: "Your payment data is fully encrypted end-to-end. We never store card numbers.",
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-gold" />,
                title: "Cancel Anytime",
                desc: "No contracts. Cancel your subscription with one click, whenever you want.",
              },
            ].map((item) => (
              <div key={item.title} className="glass p-6 rounded-sm flex flex-col gap-3">
                <div className="w-12 h-12 border border-gold/20 rounded-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
