import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🤖</span>
              <span className="text-lg font-display font-bold text-white">
                Caliente<span className="text-gold">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              The AI crew for adult content creators.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-600">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-1">Platform</p>
              <Link href="/agents" className="hover:text-gray-300 transition-colors">Agents</Link>
              <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
              <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-1">Legal</p>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <Link href="/dmca" className="hover:text-gray-300 transition-colors">DMCA</Link>
              <Link href="/2257" className="hover:text-gray-300 transition-colors">2257</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">
              &copy; 2025 CalienteAI. All rights reserved.
            </p>
            <span className="text-[10px] text-red-400/80 border border-red-500/30 px-1.5 py-0.5 rounded font-bold">
              18+
            </span>
          </div>
          <p className="text-xs text-gray-700">AI-powered automation for content creators</p>
        </div>
      </div>
    </footer>
  );
}
