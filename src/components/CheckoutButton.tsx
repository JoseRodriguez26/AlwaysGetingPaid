"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

interface Props {
  planId: string;
  planName: string;
  price: number;
  className?: string;
}

export default function CheckoutButton({ planId, planName, price, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { lang } = useLang();

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
      <button
        onClick={() => setShowModal(true)}
        className={className}
      >
        {lang === "es" ? "Comenzar" : "Get Started"}
      </button>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 20
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: "#0e0d16", border: "1px solid rgba(55,50,80,0.6)",
            borderRadius: 16, padding: 32, maxWidth: 400, width: "100%"
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: "#e8e6f0", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
              {lang === "es" ? "Confirmar suscripción" : "Confirm Subscription"}
            </h3>
            <p style={{ color: "#7875a0", fontSize: 14, margin: "0 0 24px" }}>
              {planName} — ${price}/mo
            </p>

            {/* Mercado Pago */}
            <button
              onClick={handleMP}
              disabled={loading}
              style={{
                width: "100%", padding: "14px 20px", borderRadius: 10, border: "1px solid rgba(0,180,90,0.4)",
                background: loading ? "rgba(0,180,90,0.3)" : "rgba(0,180,90,0.15)",
                color: "#4ade80", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
                transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: 22 }}>🏦</span>
              <div style={{ textAlign: "left" }}>
                <div>{loading ? (lang === "es" ? "Procesando..." : "Processing...") : "Mercado Pago"}</div>
                <div style={{ fontSize: 12, color: "#7875a0" }}>
                  {lang === "es"
                    ? "México 🇲🇽 Brasil 🇧🇷 Argentina 🇦🇷 Colombia 🇨🇴 + más"
                    : "Mexico 🇲🇽 Brazil 🇧🇷 Argentina 🇦🇷 Colombia 🇨🇴 + more"}
                </div>
              </div>
            </button>

            {/* CCBill — coming soon */}
            <div style={{
              width: "100%", padding: "14px 20px", borderRadius: 10,
              border: "1px solid rgba(99,102,241,0.25)",
              background: "rgba(99,102,241,0.06)",
              display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
              opacity: 0.5,
            }}>
              <span style={{ fontSize: 22 }}>💳</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#a5b4fc", fontSize: 15, fontWeight: 600 }}>
                  {lang === "es" ? "Tarjeta de crédito (CCBill)" : "Credit Card (CCBill)"}
                </div>
                <div style={{ fontSize: 12, color: "#7875a0" }}>
                  {lang === "es" ? "Próximamente — USA 🇺🇸 y más" : "Coming soon — USA 🇺🇸 and more"}
                </div>
              </div>
            </div>

            <button onClick={() => setShowModal(false)} style={{
              width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent", color: "#7875a0", fontSize: 14, cursor: "pointer"
            }}>
              {lang === "es" ? "Cancelar" : "Cancel"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
