import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Caliente Hub. All rights reserved.
            </p>
            <span className="text-xs text-red-400/80 border border-red-500/40 px-2 py-0.5 rounded font-bold">
              18+
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/dmca" className="hover:text-gold transition-colors">DMCA</Link>
            <Link href="/2257" className="hover:text-gold transition-colors">2257</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
