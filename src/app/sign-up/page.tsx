"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
  };

  if (success) return (
    <div style={styles.page}>
      <div style={{ ...styles.box, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
        <h2 style={styles.title}>Check your email</h2>
        <p style={styles.sub}>
          We sent a confirmation link to <strong style={{ color: "#e5e5e5" }}>{email}</strong>.<br />
          Click it to activate your account.
        </p>
        <Link href="/sign-in" style={styles.btnOutline}>Go to Sign In</Link>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={styles.logo}>CH</div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.sub}>Get access to exclusive content</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={styles.btnRed}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/sign-in" style={styles.link}>Sign In</Link>
        </p>

        <p style={styles.legal}>
          18+ only. By creating an account you confirm you are of legal age to view adult content.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
  },
  box: {
    width: "100%",
    maxWidth: 420,
    background: "#111111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "40px 36px",
  },
  logo: {
    width: 52,
    height: 52,
    background: "#cc0000",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 900,
    color: "#fff",
    margin: "0 auto 20px",
    letterSpacing: "0.05em",
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#ffffff",
    margin: "0 0 6px",
    textAlign: "center" as const,
  },
  sub: {
    fontSize: 13,
    color: "#555",
    margin: "0 0 0",
    textAlign: "center" as const,
    lineHeight: 1.6,
  },
  field: { marginBottom: 18 },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#555",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 4,
    border: "1px solid #222",
    background: "#0a0a0a",
    color: "#e5e5e5",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  errorBox: {
    padding: "10px 14px",
    borderRadius: 4,
    background: "rgba(204,0,0,0.08)",
    border: "1px solid rgba(204,0,0,0.3)",
    color: "#ff6666",
    fontSize: 13,
    marginBottom: 16,
  },
  btnRed: {
    width: "100%",
    padding: "13px",
    borderRadius: 4,
    background: "#cc0000",
    color: "#fff",
    fontWeight: 800,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginTop: 4,
    boxShadow: "0 0 20px rgba(204,0,0,0.25)",
  },
  btnOutline: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: 4,
    border: "1px solid #2a2a2a",
    color: "#888",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center" as const,
    textDecoration: "none",
    marginTop: 20,
  },
  footerText: {
    textAlign: "center" as const,
    fontSize: 13,
    color: "#444",
    marginTop: 24,
  },
  link: { color: "#cc0000", textDecoration: "none", fontWeight: 600 },
  legal: {
    fontSize: 11,
    color: "#2a2a2a",
    textAlign: "center" as const,
    marginTop: 20,
    lineHeight: 1.6,
  },
};
