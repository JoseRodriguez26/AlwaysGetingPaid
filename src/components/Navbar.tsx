"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

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
      background: "#0a0a0a",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 20px",
        height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em" }}>
            Caliente<span style={{ color: "#cc0000" }}>Hub</span>
          </span>
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{
                padding: "7px 16px", color: "#888888", fontSize: "13px",
                textDecoration: "none", borderRadius: "4px", fontWeight: 500,
              }}>
                My Content
              </Link>
              <form action="/auth/signout" method="post">
                <button style={{
                  padding: "7px 16px", color: "#555555", fontSize: "13px",
                  background: "none", border: "none", cursor: "pointer", borderRadius: "4px",
                }}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" style={{
                padding: "7px 16px", color: "#888888", fontSize: "13px",
                textDecoration: "none", borderRadius: "4px",
              }}>
                Sign In
              </Link>
              <Link href="/sign-up" style={{
                padding: "8px 20px", borderRadius: "4px", fontSize: "13px", fontWeight: 700,
                background: "#cc0000", color: "#ffffff", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.06em",
                boxShadow: "0 0 16px rgba(204,0,0,0.3)",
              }}>
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
