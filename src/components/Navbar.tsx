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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold text-gold">
          Caliente Hub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">
            Videos
          </Link>
          <Link href="/subscribe" className="text-sm text-gray-300 hover:text-gold transition-colors">
            Get Access
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-300 hover:text-gold transition-colors">
                Dashboard
              </Link>
              <form action="/auth/signout" method="post">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-gray-300 hover:text-gold transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-gold !py-2 !px-4 text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-gold">
            Videos
          </Link>
          <Link href="/subscribe" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-gold">
            Get Access
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-gold">
                Dashboard
              </Link>
              <form action="/auth/signout" method="post">
                <button className="text-gray-400 hover:text-white">Sign Out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-gold">
                Sign In
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)} className="block text-gold font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
