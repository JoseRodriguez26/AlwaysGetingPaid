import { DollarSign, Check, Shield, Camera } from "lucide-react";
import Link from "next/link";
import { getCashAppLink, CASHAPP_CONFIG } from "@/lib/cashapp";

export const metadata = {
  title: "Get Access | Caliente Hub XXX",
  description: "Pay via Cash App and get full access to all exclusive premium content.",
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
          <p className="section-eyebrow mb-3">Get Access</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            Unlock <span className="text-gold-gradient">Everything</span>
          </h1>
          <p className="text-white/40 mt-4 max-w-md mx-auto">
            One simple payment. Full access to all content. Stream only.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>
      </div>

      {/* Single access card */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-lg mx-auto relative z-10">
          <div className="glass gold-glow border border-gold/30 rounded-sm p-8">
            {/* Badge */}
            <div className="flex justify-center -mt-12 mb-6">
              <span className="bg-gold-gradient text-background px-6 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Full Access
              </span>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-white/40 text-lg">$</span>
                <span className="font-display text-6xl font-bold text-gold-gradient">39</span>
                <span className="text-white/40 text-lg">.99</span>
              </div>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-2">
                One-time payment via Cash App
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {[
                "Access to all videos — stream only",
                "Access to all photo sets",
                "New content as it drops",
                "Member-only exclusives",
                "Stream in HD quality",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* Cash App CTA */}
            <a
              href={getCashAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-sm bg-[#00D632] hover:bg-[#00C02E] text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,214,50,0.3)]"
            >
              <DollarSign className="w-5 h-5" />
              Pay with Cash App
            </a>

            <p className="text-white/20 text-xs text-center mt-4">
              {CASHAPP_CONFIG.cashtag}
            </p>
          </div>

          {/* Steps */}
          <div className="mt-12 space-y-4">
            <h3 className="font-display text-xl font-bold text-white text-center mb-6">
              How It Works
            </h3>
            {[
              {
                step: "1",
                icon: <DollarSign className="w-5 h-5 text-[#00D632]" />,
                title: "Send Payment",
                desc: `Pay $${CASHAPP_CONFIG.amount} via Cash App using the button above`,
              },
              {
                step: "2",
                icon: <Camera className="w-5 h-5 text-gold" />,
                title: "DM Your Email",
                desc: "Message me with the email you signed up with",
              },
              {
                step: "3",
                icon: <Shield className="w-5 h-5 text-gold" />,
                title: "Get Access",
                desc: "I'll grant you full access to all content",
              },
            ].map((s) => (
              <div key={s.step} className="glass border border-white/5 rounded-sm p-5 flex items-center gap-4">
                <div className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{s.title}</h4>
                  <p className="text-white/40 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Already have access? */}
          <div className="text-center mt-10">
            <p className="text-white/30 text-sm">
              Already paid?{" "}
              <Link href="/sign-in" className="text-gold hover:text-gold-light transition-colors">
                Sign in
              </Link>{" "}
              to view content.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-10 px-6 border-t border-gold/10">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-white/30 text-xs">
          {[
            "Pay via Cash App",
            "Manual Verification",
            "Stream Only — No Downloads",
            "18+ Verified Platform",
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-gold/60" />
              {badge}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
