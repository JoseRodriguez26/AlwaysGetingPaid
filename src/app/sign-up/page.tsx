"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Crown, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("You must confirm you are 18+ to continue.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

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
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center gold-glow mx-auto mb-4">
            <Flame className="w-7 h-7 text-background" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Join <span className="text-gold-gradient">Caliente Hub</span>
          </h1>
          <p className="text-white/30 text-sm mt-2">Create your free account</p>
        </div>

        <div className="glass border border-gold/15 rounded-sm p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-white mb-2">Check your email!</h2>
              <p className="text-white/40 text-sm leading-relaxed">
                We sent a confirmation link to{" "}
                <span className="text-white/70">{email}</span>.
                Click it to activate your account.
              </p>
            </div>
          ) : (
            <>
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
                    placeholder="Min. 8 characters"
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="age"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-yellow-500"
                  />
                  <label htmlFor="age" className="text-white/40 text-xs leading-relaxed cursor-pointer">
                    I confirm I am 18 years of age or older and agree to the{" "}
                    <Link href="/terms" className="text-gold hover:text-gold-light">Terms of Service</Link> and{" "}
                    <Link href="/privacy" className="text-gold hover:text-gold-light">Privacy Policy</Link>.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Crown className="w-4 h-4" />
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-white/30 text-sm">
                  Already a member?{" "}
                  <Link href="/sign-in" className="text-gold hover:text-gold-light transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
