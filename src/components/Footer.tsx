import Link from "next/link";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-gold-gradient flex items-center justify-center">
                <Flame className="w-4 h-4 text-background" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="text-gold-gradient">Caliente</span>
                <span className="text-white/90"> Hub</span>
                <span className="text-gold text-sm font-normal ml-1">XXX</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium exclusive content. Authentic. Bold. Unapologetic.
              <br />LLC Media Company.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="section-eyebrow mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Content", href: "/content" },
                { label: "Subscribe", href: "/subscribe" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-gold text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="section-eyebrow mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "2257 Compliance", href: "/2257" },
                { label: "DMCA", href: "/dmca" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-gold text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Caliente Hub XXX LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 border border-red-500/40 rounded text-red-400/80 text-xs font-bold tracking-widest">
              18+ ONLY
            </div>
            <p className="text-white/30 text-xs">
              All models are 18+ at time of content creation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
