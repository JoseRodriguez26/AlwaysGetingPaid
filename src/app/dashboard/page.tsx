"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n/LanguageContext";

function PaymentBannerInner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: "88px", left: "50%", transform: "translateX(-50%)",
      zIndex: 9998, width: "100%", maxWidth: "600px", padding: "0 16px",
    }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(0,200,100,0.15), rgba(0,180,80,0.1))",
        border: "1px solid rgba(0,200,100,0.5)",
        borderRadius: "14px", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
        boxShadow: "0 8px 32px rgba(0,200,100,0.2)",
        backdropFilter: "blur(8px)",
      }}>
        <span style={{ fontSize: "15px", color: "#4ade80", fontWeight: 600 }}>
          🎉 Payment successful! Your plan has been activated.
        </span>
        <button
          onClick={() => setShow(false)}
          style={{
            background: "transparent", border: "none", color: "#4ade80",
            fontSize: "18px", cursor: "pointer", lineHeight: 1, flexShrink: 0,
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function PaymentBanner() {
  return (
    <Suspense fallback={null}>
      <PaymentBannerInner />
    </Suspense>
  );
}

type UsageData = {
  plan: string;
  month: string;
  dm:        { used: number; limit: number | string };
  schedule:  { used: number; limit: number | string };
  analytics: { used: number; limit: number | string };
};

const TIER_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  empire: "Empire",
};

function UsageBar({ label, used, limit }: { label: string; used: number; limit: number | string }) {
  const isUnlimited = limit === "Unlimited";
  const pct = isUnlimited ? 0 : Math.min(100, (used / (limit as number)) * 100);
  const isNearLimit = !isUnlimited && pct >= 90;
  const barColor = isNearLimit ? "#ff4444" : "#d4a017";

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#aaaacc", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: "12px", color: isNearLimit ? "#ff4444" : "#666688", fontFamily: "monospace" }}>
          {used} / {isUnlimited ? "Unlimited" : limit} used
        </span>
      </div>
      <div style={{
        height: "6px", borderRadius: "4px",
        background: "rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}>
        {!isUnlimited && (
          <div style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: "4px",
            background: barColor,
            transition: "width 0.6s ease",
            boxShadow: isNearLimit ? `0 0 8px ${barColor}88` : "none",
          }} />
        )}
        {isUnlimited && (
          <div style={{
            height: "100%", width: "100%", borderRadius: "4px",
            background: "linear-gradient(90deg, #d4a017, #f0c040)",
          }} />
        )}
      </div>
    </div>
  );
}

const AGENTS = [
  { id: "aria7",   name: "ARIA-7",   type: "Fan DM Agent",    emoji: "💬", color: "#ff3388", desc: "Replies to fans 24/7 in your voice" },
  { id: "shieldx", name: "SHIELD-X", type: "Content Guard",   emoji: "🛡️", color: "#00ffcc", desc: "Blocks leaks, deepfakes & violations" },
  { id: "muse3",   name: "MUSE-3",   type: "Post Scheduler",  emoji: "📅", color: "#aa55ff", desc: "Posts at peak times on every platform" },
  { id: "prism",   name: "PRISM",    type: "Revenue Brain",   emoji: "📊", color: "#3388ff", desc: "Tracks your money and finds growth gaps" },
  { id: "echov",   name: "ECHO-V",   type: "Voice Clone",     emoji: "🎙️", color: "#ffaa00", desc: "Sends personalized voice messages to fans" },
  { id: "pixelq",  name: "PIXEL-Q",  type: "Media Gen",       emoji: "🎨", color: "#ff3388", desc: "Creates thumbnails and promo content" },
  { id: "flux",    name: "FLUX",     type: "Price Optimizer", emoji: "💹", color: "#00ffcc", desc: "A/B tests pricing to maximize revenue" },
  { id: "guard2",  name: "GUARD-2",  type: "DMCA Hunter",     emoji: "🔍", color: "#aa55ff", desc: "Finds pirated content and files takedowns" },
];

const QUICK_ACTIONS = [
  { label: "Test a DM", href: "/agents#aria7", emoji: "💬", color: "#ff3388" },
  { label: "Generate Schedule", href: "/agents#muse3", emoji: "📅", color: "#aa55ff" },
  { label: "Run Analysis", href: "/agents#prism", emoji: "📊", color: "#3388ff" },
];

function getLS(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(key);
  return v === null ? fallback : v === "true";
}

function setLS(key: string, value: boolean) {
  if (typeof window !== "undefined") localStorage.setItem(key, String(value));
}

export default function DashboardPage() {
  const { t } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [agentStates, setAgentStates] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({ dmCount: 0, scheduleCount: 0, activeAgents: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loadingUsage, setLoadingUsage] = useState(true);

  // Load user
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load agent ON/OFF states from localStorage
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    AGENTS.forEach((a) => {
      initial[a.id] = getLS(`agent_${a.id}`, a.id === "aria7" || a.id === "muse3");
    });
    setAgentStates(initial);
  }, []);

  // Load usage data from API
  useEffect(() => {
    async function loadUsage() {
      setLoadingUsage(true);
      try {
        const res = await fetch("/api/usage");
        if (res.ok) {
          const data = await res.json();
          setUsageData(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoadingUsage(false);
      }
    }
    loadUsage();
  }, []);

  // Load stats from API
  useEffect(() => {
    async function loadStats() {
      setLoadingStats(true);
      try {
        const [dmRes, schedRes, settingsRes] = await Promise.all([
          fetch("/api/agents/dm").catch(() => null),
          fetch("/api/agents/scheduler").catch(() => null),
          fetch("/api/agents/settings").catch(() => null),
        ]);

        let dmCount = 0;
        let scheduleCount = 0;
        let activeAgents = 0;

        if (dmRes?.ok) {
          const dmJson = await dmRes.json().catch(() => ({}));
          dmCount = dmJson?.logs?.length ?? dmJson?.count ?? 0;
        }
        if (schedRes?.ok) {
          const schedJson = await schedRes.json().catch(() => ({}));
          scheduleCount = schedJson?.schedule?.length ?? schedJson?.count ?? 0;
        }
        if (settingsRes?.ok) {
          const settingsJson = await settingsRes.json().catch(() => ({}));
          activeAgents = settingsJson?.activeAgents ?? settingsJson?.count ?? 0;
        }

        setStats({ dmCount, scheduleCount, activeAgents });
      } catch {
        // silently fail — stats will show 0
      } finally {
        setLoadingStats(false);
      }
    }
    loadStats();
  }, []);

  function toggleAgent(id: string) {
    setAgentStates((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      setLS(`agent_${id}`, next[id]);
      return next;
    });
  }

  const activeCount = Object.values(agentStates).filter(Boolean).length;

  const statCards = [
    { label: "Active Agents", value: activeCount, suffix: `/ ${AGENTS.length}`, color: "#00ffcc", icon: "🤖" },
    { label: "DMs This Month", value: loadingStats ? "—" : stats.dmCount.toLocaleString(), color: "#ff3388", icon: "💬" },
    { label: "Posts Scheduled", value: loadingStats ? "—" : stats.scheduleCount.toLocaleString(), color: "#aa55ff", icon: "📅" },
    { label: "Revenue Analyzed", value: loadingStats ? "—" : stats.activeAgents > 0 ? "Live" : "Offline", color: "#3388ff", icon: "📊" },
  ];

  return (
    <div style={{ background: "#08070e", minHeight: "100vh", color: "#e5e5e5", paddingTop: "80px" }}>

      {/* Payment success banner */}
      <PaymentBanner />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{ fontSize: "28px" }}>🤖</span>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, color: "#ffffff", margin: 0 }}>
              {t.dashboard.title}
            </h1>
          </div>
          {user && (
            <p style={{ color: "#444466", fontSize: "13px", marginLeft: "40px" }}>
              {user.email}
            </p>
          )}
        </div>

        {/* Usage Card */}
        <div style={{
          background: "rgba(212,160,23,0.04)",
          border: "1px solid rgba(212,160,23,0.35)",
          borderRadius: "20px",
          padding: "28px 32px",
          marginBottom: "36px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, #d4a017, transparent)",
          }} />

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {t.dashboard.usageTitle}
              </h2>
              {usageData && (
                <span style={{
                  fontSize: "11px", fontWeight: 700,
                  padding: "3px 10px", borderRadius: "20px",
                  background: usageData.plan === "free" ? "rgba(100,100,130,0.3)" : "rgba(212,160,23,0.2)",
                  color: usageData.plan === "free" ? "#888899" : "#d4a017",
                  border: `1px solid ${usageData.plan === "free" ? "rgba(100,100,130,0.3)" : "rgba(212,160,23,0.3)"}`,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {TIER_NAMES[usageData.plan] ?? usageData.plan}
                </span>
              )}
              {loadingUsage && !usageData && (
                <span style={{ fontSize: "11px", color: "#444466" }}>Loading...</span>
              )}
            </div>
            {usageData && usageData.plan !== "empire" && (
              <a
                href="/pricing"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "12px", fontWeight: 700,
                  color: "#d4a017",
                  background: "rgba(212,160,23,0.1)",
                  border: "1px solid rgba(212,160,23,0.35)",
                  borderRadius: "10px", padding: "8px 16px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {t.dashboard.upgradePlan}
              </a>
            )}
          </div>

          {/* Progress bars */}
          {usageData ? (
            <>
              <UsageBar label="Fan DMs"           used={usageData.dm.used}        limit={usageData.dm.limit} />
              <UsageBar label="Post Schedules"    used={usageData.schedule.used}  limit={usageData.schedule.limit} />
              <UsageBar label="Analytics Reports" used={usageData.analytics.used} limit={usageData.analytics.limit} />
            </>
          ) : (
            <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "13px", color: "#444466" }}>
                {loadingUsage ? "Loading usage data..." : "Could not load usage data"}
              </span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}>
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${s.color}33`,
                borderRadius: "16px",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
              }} />
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span style={{ fontSize: "12px", color: "#444466" }}>{s.suffix}</span>
                )}
              </div>
              <p style={{ fontSize: "11px", color: "#555577", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Agent Grid */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "20px" }}>
            Your Agents
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {AGENTS.map((agent) => {
              const isOn = agentStates[agent.id] ?? false;
              return (
                <div
                  key={agent.id}
                  style={{
                    background: isOn
                      ? `linear-gradient(145deg, ${agent.color}0d 0%, rgba(255,255,255,0.025) 100%)`
                      : "rgba(255,255,255,0.02)",
                    border: isOn ? `1px solid ${agent.color}44` : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    padding: "20px",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                >
                  {/* Active glow top */}
                  {isOn && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                      background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)`,
                    }} />
                  )}

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Avatar + status dot */}
                      <div style={{ position: "relative" }}>
                        <div style={{
                          width: "44px", height: "44px", borderRadius: "12px",
                          background: `${agent.color}15`, border: `1px solid ${agent.color}33`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "20px",
                        }}>
                          {agent.emoji}
                        </div>
                        {/* Pulsing status dot */}
                        <div style={{
                          position: "absolute", bottom: "-2px", right: "-2px",
                          width: "10px", height: "10px", borderRadius: "50%",
                          background: isOn ? "#00ff88" : "#333355",
                          border: "2px solid #08070e",
                          animation: isOn ? "pulse 2s ease-in-out infinite" : "none",
                          boxShadow: isOn ? "0 0 6px #00ff88" : "none",
                        }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: isOn ? agent.color : "#888899", margin: 0, letterSpacing: "0.04em" }}>
                          {agent.name}
                        </h3>
                        <p style={{ fontSize: "10px", color: "#444466", textTransform: "uppercase", letterSpacing: "0.08em", margin: "2px 0 0" }}>
                          {agent.type}
                        </p>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() => toggleAgent(agent.id)}
                      style={{
                        width: "44px", height: "24px", borderRadius: "12px",
                        background: isOn ? agent.color : "rgba(255,255,255,0.08)",
                        border: "none", cursor: "pointer", position: "relative",
                        transition: "background 0.3s",
                        flexShrink: 0,
                      }}
                      aria-label={`Toggle ${agent.name}`}
                    >
                      <div style={{
                        position: "absolute", top: "3px",
                        left: isOn ? "23px" : "3px",
                        width: "18px", height: "18px", borderRadius: "50%",
                        background: "#ffffff",
                        transition: "left 0.2s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                      }} />
                    </button>
                  </div>

                  <p style={{ fontSize: "12px", color: "#555577", marginBottom: "14px", lineHeight: 1.5 }}>
                    {agent.desc}
                  </p>

                  <a
                    href="/agents"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontSize: "11px", fontWeight: 600, color: agent.color,
                      textDecoration: "none",
                      background: `${agent.color}0d`,
                      border: `1px solid ${agent.color}33`,
                      borderRadius: "8px", padding: "6px 12px",
                    }}
                  >
                    Configure →
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "20px" }}>
            Quick Actions
          </h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${action.color}44`,
                  borderRadius: "12px", padding: "14px 22px",
                  color: action.color, fontWeight: 600, fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "18px" }}>{action.emoji}</span>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
