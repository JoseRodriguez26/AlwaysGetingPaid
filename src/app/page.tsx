"use client";

import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Short delay to simulate submission — replace with real API call later
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      color: "#e5e5e5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "var(--font-inter), sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(228,184,77,0.12) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(228,184,77,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(228,184,77,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "620px", width: "100%" }}>

        {/* Site name */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #f0d078 0%, #e4b84d 50%, #b8922e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px",
          }}>
            CalienteHub
          </h1>
          <p style={{ color: "#666655", fontSize: "13px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            www.calientehubxxx.com
          </p>
        </div>

        {/* Under construction badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          background: "rgba(228,184,77,0.08)", border: "1px solid rgba(228,184,77,0.3)",
          borderRadius: "999px", padding: "8px 20px", marginBottom: "40px",
        }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#e4b84d", display: "inline-block",
            boxShadow: "0 0 10px #e4b84d",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{ color: "#e4b84d", fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Site Under Construction
          </span>
        </div>

        {/* Main message */}
        <h2 style={{
          fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.25,
          marginBottom: "16px",
        }}>
          Exclusive Content Coming Soon
        </h2>
        <p style={{
          color: "#888877",
          fontSize: "clamp(15px, 2vw, 17px)",
          lineHeight: 1.8,
          marginBottom: "48px",
          maxWidth: "480px",
          margin: "0 auto 48px",
        }}>
          Register your email to be the first to know when we launch.
          Subscribers get early access and exclusive content.
        </p>

        {/* Email signup */}
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
            <div style={{
              display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center",
            }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 260px", maxWidth: "320px",
                  padding: "14px 18px", borderRadius: "10px",
                  border: "1px solid rgba(228,184,77,0.3)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e5e5e5", fontSize: "15px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 28px", borderRadius: "10px",
                  background: loading
                    ? "rgba(228,184,77,0.5)"
                    : "linear-gradient(135deg, #f0d078, #e4b84d)",
                  color: "#050505", fontWeight: 700, fontSize: "15px",
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 0 24px rgba(228,184,77,0.25)",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {loading ? "Saving..." : "Notify Me 🔥"}
              </button>
            </div>
          </form>
        ) : (
          <div style={{
            marginBottom: "40px",
            padding: "20px 32px",
            borderRadius: "12px",
            background: "rgba(228,184,77,0.08)",
            border: "1px solid rgba(228,184,77,0.3)",
            color: "#e4b84d",
            fontSize: "16px",
            fontWeight: 600,
          }}>
            ✓ You&apos;re on the list! We&apos;ll notify you at launch.
          </div>
        )}

        {/* Coming soon: subscription plans teaser */}
        <div style={{
          display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
          marginBottom: "60px",
        }}>
          {[
            { label: "Monthly", price: "$14.99/mo", note: "Full access" },
            { label: "Annual", price: "$99/yr", note: "Save 45%" },
          ].map((plan) => (
            <div key={plan.label} style={{
              padding: "20px 28px", borderRadius: "14px",
              border: "1px solid rgba(228,184,77,0.2)",
              background: "rgba(255,255,255,0.02)",
              minWidth: "160px",
              opacity: 0.65,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)",
                background: "#1a1a0a", border: "1px solid rgba(228,184,77,0.3)",
                borderRadius: "999px", padding: "2px 10px",
                fontSize: "10px", color: "#e4b84d", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", whiteSpace: "nowrap",
              }}>
                Coming Soon
              </div>
              <div style={{ color: "#e5e5e5", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{plan.label}</div>
              <div style={{ color: "#e4b84d", fontWeight: 800, fontSize: "22px", marginBottom: "4px" }}>{plan.price}</div>
              <div style={{ color: "#666655", fontSize: "12px" }}>{plan.note}</div>
            </div>
          ))}
        </div>

        {/* Payment logos */}
        <div style={{
          display: "flex", gap: "12px", justifyContent: "center", alignItems: "center",
          flexWrap: "wrap", marginBottom: "48px",
        }}>
          <span style={{ color: "#444433", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Payments via</span>
          <span style={{
            padding: "6px 14px", borderRadius: "8px",
            border: "1px solid rgba(0,180,90,0.3)",
            background: "rgba(0,180,90,0.06)",
            color: "#4ade80", fontSize: "13px", fontWeight: 600,
          }}>🏦 Mercado Pago</span>
          <span style={{
            padding: "6px 14px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "#888877", fontSize: "13px", fontWeight: 600,
          }}>💳 CCBill <span style={{ fontSize: "10px", opacity: 0.6 }}>(soon)</span></span>
        </div>

        {/* Footer note */}
        <p style={{ color: "#333322", fontSize: "12px", lineHeight: 1.7 }}>
          18+ Only. By registering you confirm you are of legal age to view adult content in your country.
        </p>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        input::placeholder { color: #555544; }
        input:focus { border-color: rgba(228,184,77,0.6) !important; }
      `}</style>
    </div>
  );
}
