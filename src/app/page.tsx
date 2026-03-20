"use client";

import { useState } from "react";

const TEASER_THUMBNAILS = [
  { id: 1, title: "Coming Soon", duration: "--:--", isNew: true },
  { id: 2, title: "Coming Soon", duration: "--:--", isNew: true },
  { id: 3, title: "Coming Soon", duration: "--:--", isNew: false },
  { id: 4, title: "Coming Soon", duration: "--:--", isNew: true },
  { id: 5, title: "Coming Soon", duration: "--:--", isNew: false },
  { id: 6, title: "Coming Soon", duration: "--:--", isNew: true },
  { id: 7, title: "Coming Soon", duration: "--:--", isNew: false },
  { id: 8, title: "Coming Soon", duration: "--:--", isNew: true },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e5e5e5", fontFamily: "var(--font-inter), sans-serif" }}>

      {/* ── HERO BANNER ── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(180deg, #1a0000 0%, #0a0a0a 100%)",
        borderBottom: "2px solid #cc0000",
        padding: "80px 20px 60px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(204,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(204,0,0,0.18) 0%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(204,0,0,0.15)", border: "1px solid rgba(204,0,0,0.5)",
            borderRadius: "999px", padding: "5px 14px", marginBottom: "24px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#cc0000", display: "inline-block", animation: "blink 1.4s ease-in-out infinite", boxShadow: "0 0 8px #cc0000" }} />
            <span style={{ color: "#cc0000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Launching Soon</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            color: "#ffffff",
            textShadow: "0 0 60px rgba(204,0,0,0.3)",
          }}>
            Caliente<span style={{ color: "#cc0000" }}>Hub</span>
          </h1>
          <p style={{ color: "#888888", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, marginBottom: "36px" }}>
            Premium exclusive content. Members only.<br />
            Subscribe for full unlimited access.
          </p>

          {/* Email capture */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
              <input
                type="email"
                required
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 260px", maxWidth: "340px",
                  padding: "14px 18px", borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#e5e5e5", fontSize: "15px", outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 28px", borderRadius: "6px",
                  background: loading ? "#880000" : "#cc0000",
                  color: "#ffffff", fontWeight: 700, fontSize: "15px",
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 0 20px rgba(204,0,0,0.4)",
                  transition: "all 0.2s", whiteSpace: "nowrap",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                {loading ? "..." : "Get Early Access"}
              </button>
            </form>
          ) : (
            <div style={{
              padding: "16px 28px", borderRadius: "6px",
              background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.4)",
              color: "#ff6666", fontSize: "15px", fontWeight: 600, marginBottom: "20px",
              display: "inline-block",
            }}>
              ✓ You&apos;re on the list! We&apos;ll notify you at launch.
            </div>
          )}

          {/* Stats row */}
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
            {[
              { value: "1080p", label: "Full HD" },
              { value: "100%", label: "Exclusive" },
              { value: "New", label: "Weekly drops" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#cc0000" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TAGS ── */}
      <section style={{ borderBottom: "1px solid #1a1a1a", padding: "0 20px", overflowX: "auto" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", gap: "2px", alignItems: "center",
          whiteSpace: "nowrap", padding: "4px 0",
        }}>
          {["All", "Featured", "New", "Most Viewed", "Exclusive", "Members Only"].map((cat, i) => (
            <button key={cat} style={{
              padding: "10px 18px", fontSize: "13px", fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? "#ffffff" : "#666666",
              background: i === 0 ? "#cc0000" : "transparent",
              border: "none", cursor: "pointer", borderRadius: "4px",
              transition: "all 0.15s",
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── CONTENT GRID ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
            <span style={{ color: "#cc0000" }}>●</span> Latest Content
          </h2>
          <span style={{ fontSize: "12px", color: "#444444" }}>Members only — subscribe to unlock</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {TEASER_THUMBNAILS.map((item, idx) => (
            <div key={item.id} style={{
              position: "relative",
              borderRadius: "6px",
              overflow: "hidden",
              background: "#111111",
              border: "1px solid #1a1a1a",
              cursor: "pointer",
              transition: "transform 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#cc0000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a1a";
              }}
            >
              {/* Thumbnail placeholder */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, #111111 0%, #1c0000 ${40 + idx * 7}%, #0f0f0f 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                {/* Blurred lock overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  backdropFilter: "blur(2px)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(204,0,0,0.85)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 20px rgba(204,0,0,0.5)",
                  }}>
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v3H9V7a3 3 0 013-3zm0 9a2 2 0 110 4 2 2 0 010-4z"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Members Only</span>
                </div>

                {/* NEW badge */}
                {item.isNew && (
                  <div style={{
                    position: "absolute", top: "8px", left: "8px",
                    background: "#cc0000", color: "#ffffff",
                    fontSize: "10px", fontWeight: 800, padding: "3px 7px",
                    borderRadius: "3px", letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>NEW</div>
                )}

                {/* HD badge */}
                <div style={{
                  position: "absolute", top: "8px", right: "8px",
                  background: "rgba(0,0,0,0.7)", color: "#aaaaaa",
                  fontSize: "10px", fontWeight: 700, padding: "3px 7px",
                  borderRadius: "3px", letterSpacing: "0.05em",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>HD</div>

                {/* Duration */}
                <div style={{
                  position: "absolute", bottom: "8px", right: "8px",
                  background: "rgba(0,0,0,0.8)", color: "#cccccc",
                  fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "3px",
                }}>{item.duration}</div>
              </div>

              {/* Card info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#cccccc", marginBottom: "4px" }}>
                  🔒 Exclusive Content #{item.id}
                </div>
                <div style={{ fontSize: "11px", color: "#444444" }}>Subscribe to watch</div>
              </div>
            </div>
          ))}
        </div>

        {/* Unlock CTA */}
        <div style={{
          marginTop: "40px", textAlign: "center",
          padding: "48px 24px",
          background: "linear-gradient(135deg, #110000 0%, #1a0000 100%)",
          border: "1px solid rgba(204,0,0,0.25)",
          borderRadius: "8px",
        }}>
          <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#ffffff", marginBottom: "12px" }}>
            Unlock Full Access
          </h3>
          <p style={{ color: "#666666", fontSize: "15px", marginBottom: "32px", lineHeight: 1.7 }}>
            Subscribe now and get unlimited access to all exclusive content.
          </p>

          {/* Plans */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
            {[
              { label: "Monthly", price: "$14.99", period: "/ month", note: "Cancel anytime" },
              { label: "Annual", price: "$99", period: "/ year", note: "Save 45% · Best value", highlight: true },
            ].map(plan => (
              <div key={plan.label} style={{
                padding: "24px 32px", borderRadius: "8px", minWidth: "200px",
                border: plan.highlight ? "2px solid #cc0000" : "1px solid #2a2a2a",
                background: plan.highlight ? "rgba(204,0,0,0.08)" : "rgba(255,255,255,0.02)",
                position: "relative",
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
                    background: "#cc0000", color: "#ffffff", fontSize: "10px", fontWeight: 800,
                    padding: "3px 12px", borderRadius: "999px", letterSpacing: "0.1em",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>Best Value</div>
                )}
                <div style={{ color: "#888888", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>{plan.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", justifyContent: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff" }}>{plan.price}</span>
                  <span style={{ fontSize: "13px", color: "#555555", paddingBottom: "6px" }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#555555" }}>{plan.note}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/sign-up" style={{
              padding: "15px 40px", borderRadius: "6px",
              background: "#cc0000", color: "#ffffff",
              fontWeight: 800, fontSize: "15px", textDecoration: "none",
              boxShadow: "0 0 30px rgba(204,0,0,0.4)",
              textTransform: "uppercase", letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}>
              Subscribe Now
            </a>
            <a href="/sign-in" style={{
              padding: "15px 28px", borderRadius: "6px",
              border: "1px solid #2a2a2a", color: "#666666",
              fontWeight: 600, fontSize: "15px", textDecoration: "none",
              background: "transparent",
            }}>
              Already a member?
            </a>
          </div>

          {/* Payment methods */}
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: "#333333", textTransform: "uppercase", letterSpacing: "0.1em" }}>Secure payment via</span>
            <span style={{
              padding: "5px 12px", borderRadius: "4px",
              border: "1px solid rgba(0,180,90,0.25)",
              background: "rgba(0,180,90,0.05)",
              color: "#3a8a5a", fontSize: "12px", fontWeight: 600,
            }}>🏦 Mercado Pago</span>
            <span style={{
              padding: "5px 12px", borderRadius: "4px",
              border: "1px solid #1a1a1a",
              background: "rgba(255,255,255,0.02)",
              color: "#333333", fontSize: "12px", fontWeight: 600,
            }}>💳 CCBill <span style={{ fontSize: "10px" }}>(soon)</span></span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        input::placeholder { color: #444444; }
        input:focus { border-color: rgba(204,0,0,0.5) !important; outline: none; }
      `}</style>
    </div>
  );
}
