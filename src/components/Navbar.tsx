"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n/LanguageContext";
import LangToggle from "@/components/LangToggle";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

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
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="text-xl font-display font-bold text-white">
            Caliente<span className="text-gold">AI</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/agents" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            {t.nav.agents}
          </Link>
          <Link href="/pricing" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            {t.nav.pricing}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {t.nav.dashboard}
              </Link>
              <Link href="/studio" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {t.nav.studio}
              </Link>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <LangToggle />
              <form action="/auth/signout" method="post">
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-white rounded-lg transition-all">
                  {t.nav.signOut}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <LangToggle />
              <Link href="/sign-in" className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg transition-all">
                {t.nav.signIn}
              </Link>
              <Link href="/sign-up" className="btn-gold !py-2 !px-5 text-sm ml-1">
                {t.nav.startFree}
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-white/[0.06] glass px-4 py-3 space-y-1">
          <Link href="/agents" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            {t.nav.agents}
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            {t.nav.pricing}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {t.nav.dashboard}
              </Link>
              <Link href="/studio" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {t.nav.studio}
              </Link>
              <form action="/auth/signout" method="post">
                <button className="block w-full text-left px-3 py-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  {t.nav.signOut}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                {t.nav.signIn}
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-gold font-semibold hover:bg-gold/5 rounded-lg transition-all">
                {t.nav.startFree}
              </Link>
            </>
          )}
          <div className="px-3 pt-1">
            <LangToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
