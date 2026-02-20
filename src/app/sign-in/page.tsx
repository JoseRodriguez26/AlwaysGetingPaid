import Link from "next/link";
import { Flame } from "lucide-react";

export const metadata = { title: "Sign In | Caliente Hub XXX" };

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(107,33,168,0.15) 0%, transparent 70%), #080808",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center gold-glow mx-auto mb-4">
            <Flame className="w-7 h-7 text-background" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-white/30 text-sm mt-2">Sign in to your account</p>
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
                placeholder="••••••••"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <button className="btn-gold w-full py-3.5 mt-2">
              Sign In
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-white/30 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-gold hover:text-gold-light transition-colors">
                Join Now
              </Link>
            </p>
          </div>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline hover:text-white/40">Terms</Link>{" "}
          and confirm you are 18+.
        </p>
      </div>
    </div>
  );
}
