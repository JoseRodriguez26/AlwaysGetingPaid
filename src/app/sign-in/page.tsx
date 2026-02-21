"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

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
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center gold-glow mx-auto mb-4">
            <Flame className="w-7 h-7 text-background" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/30 text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="glass border border-gold/15 rounded-sm p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

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
