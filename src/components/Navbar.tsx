"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 50,
      background: "rgba(5,5,5,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Caliente<span style={{ color: "#e4b84d" }}>Hub</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{ padding: "8px 16px", color: "#aaaaaa", fontSize: "14px", textDecoration: "none", borderRadius: "8px" }}>
                My Content
              </Link>
              <form action="/auth/signout" method="post">
                <button style={{ padding: "8px 16px", color: "#666655", fontSize: "14px", background: "none", border: "none", cursor: "pointer", borderRadius: "8px" }}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" style={{ padding: "8px 16px", color: "#aaaaaa", fontSize: "14px", textDecoration: "none", borderRadius: "8px" }}>
                Sign In
              </Link>
              <Link href="/sign-up" style={{
                padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #f0d078, #e4b84d)",
                color: "#050505", textDecoration: "none",
              }}>
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", color: "#aaaaaa", cursor: "pointer", padding: "8px" }}
          className="mobile-menu-btn"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
