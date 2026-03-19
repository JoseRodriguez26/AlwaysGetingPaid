"use client";
import { useState } from "react";

interface Props {
  planId: string;
  planName: string;
  price: number;
  className?: string;
}

export default function CheckoutButton({ planId, planName, price, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMP = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Error creating checkout");
    } catch { alert("Network error"); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className={className}>
        Get Started
      </button>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 20,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: "#0e0d10", border: "1px solid rgba(228,184,77,0.2)",
            borderRadius: 16, padding: 32, maxWidth: 400, width: "100%",
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: "#e5e5e5", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
              Confirm Subscription
            </h3>
            <p style={{ color: "#666655", fontSize: 14, margin: "0 0 24px" }}>
              {planName} — ${price}/mo
            </p>

            {/* Mercado Pago */}
            <button
              onClick={handleMP}
              disabled={loading}
              style={{
                width: "100%", padding: "14px 20px", borderRadius: 10,
                border: "1px solid rgba(0,180,90,0.4)",
                background: loading ? "rgba(0,180,90,0.3)" : "rgba(0,180,90,0.12)",
                color: "#4ade80", fontSize: 15, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 22 }}>🏦</span>
              <div style={{ textAlign: "left" }}>
                <div>{loading ? "Processing..." : "Mercado Pago"}</div>
                <div style={{ fontSize: 12, color: "#555544" }}>
                  Mexico 🇲🇽 Brazil 🇧🇷 Argentina 🇦🇷 Colombia 🇨🇴 + more
                </div>
              </div>
            </button>

            {/* CCBill coming soon */}
            <div style={{
              width: "100%", padding: "14px 20px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
              opacity: 0.45,
            }}>
              <span style={{ fontSize: 22 }}>💳</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#aaaaaa", fontSize: 15, fontWeight: 600 }}>Credit Card (CCBill)</div>
                <div style={{ fontSize: 12, color: "#555544" }}>Coming soon — USA 🇺🇸 and more</div>
              </div>
            </div>

            <button onClick={() => setShowModal(false)} style={{
              width: "100%", padding: "10px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "#555544", fontSize: 14, cursor: "pointer",
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
