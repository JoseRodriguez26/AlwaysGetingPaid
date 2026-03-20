"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail_url: string;
  published: boolean;
  created_at: string;
};

function SuccessBanner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShow(true);
      const t = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(t);
    }
  }, [searchParams]);
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: 72, left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, width: "100%", maxWidth: 560, padding: "0 16px",
    }}>
      <div style={{
        background: "rgba(0,180,80,0.12)", border: "1px solid rgba(0,180,80,0.4)",
        borderRadius: 8, padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        color: "#4ade80", fontWeight: 600, fontSize: 15,
      }}>
        <span>🎉 Subscription activated! Enjoy full access.</span>
        <button onClick={() => setShow(false)} style={{ background: "none", border: "none", color: "#4ade80", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (!data.user) { setLoading(false); return; }

      // Check subscription
      const { data: sub } = await supabase
        .from("user_subscriptions")
        .select("plan")
        .eq("user_id", data.user.id)
        .single();

      const isAdmin = data.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const isActive = isAdmin || !!(sub && sub.plan && sub.plan !== "free");
      setSubscribed(isActive);

      // Load videos if subscribed or admin
      if (isActive) {
        const res = await fetch("/api/videos");
        const json = await res.json();
        setVideos(json.videos ?? []);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 36, height: 36, border: "3px solid #1a1a1a", borderTopColor: "#cc0000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20, textAlign: "center" }}>
      <div style={{ fontSize: 40 }}>🔒</div>
      <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: 0 }}>Sign in to access content</h2>
      <p style={{ color: "#555", margin: 0 }}>Create a free account or sign in to your existing one.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Link href="/sign-in" style={{ padding: "10px 24px", borderRadius: 6, border: "1px solid #2a2a2a", color: "#888", textDecoration: "none", fontSize: 14 }}>Sign In</Link>
        <Link href="/sign-up" style={{ padding: "10px 24px", borderRadius: 6, background: "#cc0000", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Create Account</Link>
      </div>
    </div>
  );

  if (subscribed === false) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e5e5e5" }}>
      <Suspense fallback={null}><SuccessBanner /></Suspense>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "100px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 24 }}>🎬</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
          Subscribe to watch
        </h1>
        <p style={{ color: "#555", fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
          You&apos;re signed in as <strong style={{ color: "#888" }}>{user.email}</strong>.<br />
          Subscribe to get unlimited access to all exclusive content.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          {[
            { label: "Monthly", price: "$14.99", period: "/mo", planId: "starter", note: "Cancel anytime" },
            { label: "Annual", price: "$99", period: "/yr", planId: "empire", note: "Save 45%", highlight: true },
          ].map(plan => (
            <div key={plan.planId} style={{
              padding: "24px 28px", borderRadius: 8, minWidth: 180,
              border: plan.highlight ? "2px solid #cc0000" : "1px solid #2a2a2a",
              background: plan.highlight ? "rgba(204,0,0,0.06)" : "rgba(255,255,255,0.02)",
              position: "relative",
            }}>
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  background: "#cc0000", color: "#fff", fontSize: 10, fontWeight: 800,
                  padding: "2px 10px", borderRadius: 999, whiteSpace: "nowrap",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>Best Value</div>
              )}
              <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{plan.label}</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, justifyContent: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: "#555", paddingBottom: 5 }}>{plan.period}</span>
              </div>
              <div style={{ fontSize: 12, color: "#444", marginBottom: 16 }}>{plan.note}</div>
              <button
                onClick={async () => {
                  const res = await fetch("/api/mercadopago/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ planId: plan.planId }),
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }}
                style={{
                  width: "100%", padding: "10px", borderRadius: 5,
                  background: plan.highlight ? "#cc0000" : "transparent",
                  border: plan.highlight ? "none" : "1px solid #333",
                  color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}
              >
                Subscribe via Mercado Pago
              </button>
            </div>
          ))}
        </div>

        <p style={{ color: "#333", fontSize: 12 }}>
          CCBill (credit card) coming soon — USA & worldwide
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e5e5e5" }}>
      <Suspense fallback={null}><SuccessBanner /></Suspense>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 20px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0 }}>
              Members <span style={{ color: "#cc0000" }}>Content</span>
            </h1>
            <p style={{ color: "#444", fontSize: 13, marginTop: 4 }}>{user.email}</p>
          </div>
          <span style={{
            padding: "6px 14px", borderRadius: 999,
            background: "rgba(0,180,80,0.1)", border: "1px solid rgba(0,180,80,0.3)",
            color: "#4ade80", fontSize: 12, fontWeight: 700,
          }}>✓ Active Subscriber</span>
        </div>

        {videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
            <p style={{ color: "#444", fontSize: 16 }}>New content coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {videos.map(video => (
              <Link key={video.id} href={`/video/${video.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#111", border: "1px solid #1a1a1a",
                  borderRadius: 6, overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#cc0000"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#1a1a1a"}
                >
                  {/* Thumbnail */}
                  <div style={{ position: "relative", aspectRatio: "16/9", background: "#0f0f0f", overflow: "hidden" }}>
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="48" height="48" fill="none" stroke="#333" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    {/* Play button */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(0,0,0,0.3)",
                      opacity: 0, transition: "opacity 0.2s",
                    }}
                      className="play-overlay"
                    >
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#cc0000", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(204,0,0,0.5)" }}>
                        <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    {video.duration && (
                      <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", color: "#ccc", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 3 }}>{video.duration}</span>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e5e5", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{video.title}</div>
                    <div style={{ fontSize: 11, color: "#444" }}>{new Date(video.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        a:hover .play-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
