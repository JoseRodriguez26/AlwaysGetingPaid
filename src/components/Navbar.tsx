"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Flame } from "lucide-react";

const navLinks = [
  { label: "Content", href: "/content" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-dark border-b border-gold/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm bg-gold-gradient flex items-center justify-center gold-glow-sm group-hover:gold-glow transition-all duration-300">
            <Flame className="w-4 h-4 text-background" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-gold-gradient">Caliente</span>
            <span className="text-white/90"> Hub</span>
            <span className="text-gold text-sm font-normal ml-1">XXX</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-white/60 hover:text-gold transition-colors duration-300 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in" className="btn-outline-gold text-xs py-2 px-5">
            Sign In
          </Link>
          <Link href="/subscribe" className="btn-gold text-xs py-2 px-5">
            Join Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gold p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-white/70 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-3 border-t border-gold/10">
            <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="btn-outline-gold text-xs py-2">
              Sign In
            </Link>
            <Link href="/subscribe" onClick={() => setMenuOpen(false)} className="btn-gold text-xs py-2">
              Join Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
