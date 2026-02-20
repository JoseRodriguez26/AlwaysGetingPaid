import Link from "next/link";
import { Flame, Crown } from "lucide-react";

export const metadata = { title: "Join | Caliente Hub XXX" };

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%), #080808",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center gold-glow mx-auto mb-4">
            <Flame className="w-7 h-7 text-background" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Join <span className="text-gold-gradient">Caliente Hub</span>
          </h1>
          <p className="text-white/30 text-sm mt-2">Create your free account</p>
        </div>

        {/* Form */}
        <div className="glass border border-gold/15 rounded-sm p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="age" className="mt-0.5 accent-yellow-500" />
              <label htmlFor="age" className="text-white/40 text-xs leading-relaxed">
                I confirm I am 18 years of age or older and agree to the{" "}
                <Link href="/terms" className="text-gold hover:text-gold-light">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-gold hover:text-gold-light">Privacy Policy</Link>.
              </label>
            </div>
            <button className="btn-gold w-full py-3.5">
              <Crown className="w-4 h-4" />
              Create Account
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-white/30 text-sm">
              Already a member?{" "}
              <Link href="/sign-in" className="text-gold hover:text-gold-light transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
