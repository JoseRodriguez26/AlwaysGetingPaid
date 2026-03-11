"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

const C = {
  bg: "#08070e",
  card: "rgba(14,13,22,0.9)",
  surface: "rgba(22,20,35,0.8)",
  border: "rgba(55,50,80,0.4)",
  neon: "#00ffcc",
  pink: "#ff3388",
  purple: "#aa55ff",
  blue: "#3388ff",
  amber: "#ffaa00",
  text: "#e8e6f0",
  muted: "#7875a0",
  dim: "#44416a",
};

type AgentId = "aria7" | "muse3" | "prism";

const AGENTS = [
  {
    id: "aria7" as AgentId,
    name: "ARIA-7",
    type: "Fan DM Agent",
    avatar: "🤖",
    color: C.pink,
    desc: "Replies to fan DMs 24/7 in your voice using Claude Opus. Converts fans into buyers.",
    price: "$149/mo value",
    stats: ["DM Management", "Voice Matching", "Upsell Prompts", "Tip Responses"],
  },
  {
    id: "muse3" as AgentId,
    name: "MUSE-3",
    type: "Content Scheduler",
    avatar: "📅",
    color: C.purple,
    desc: "Generates optimized captions and finds peak posting times across Twitter, Reddit, and more.",
    price: "$79/mo value",
    stats: ["Peak Time Analysis", "Auto Captions", "Hashtag Gen", "Multi-Platform"],
  },
  {
    id: "prism" as AgentId,
    name: "PRISM",
    type: "Revenue Analytics",
    avatar: "📊",
    color: C.blue,
    desc: "Analyzes your real revenue, conversion rates, and fan behavior. Gives you a weekly strategy.",
    price: "$199/mo value",
    stats: ["Revenue Tracking", "Churn Prediction", "Strategy Reports", "Growth Gaps"],
  },
];

export default function AgentsPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<AgentId | "overview">("overview");
  const [notif, setNotif] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [configs, setConfigs] = useState<Record<string, any>>({});

  const toast = (msg: string, type: "success" | "error" = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };

  useEffect(() => {
    fetch("/api/agents/settings")
      .then(r => r.json())
      .then(data => {
        const map: Record<string, any> = {};
        for (const c of data.configs ?? []) map[c.agent_id] = c;
        setConfigs(map);
      })
      .catch(() => {});
  }, []);

  const saveConfig = async (agentId: AgentId, enabled: boolean, config: any) => {
    const res = await fetch("/api/agents/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId, enabled, config }),
    });
    if (res.ok) {
      const data = await res.json();
      setConfigs(prev => ({ ...prev, [agentId]: data.config }));
      toast("Settings saved!");
    } else {
      toast("Failed to save", "error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        * {box-sizing:border-box}
        textarea,input,select{font-family:'Inter',sans-serif}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
      `}</style>

      {notif && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 300,
          padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: notif.type === "success" ? `${C.neon}15` : `${C.pink}15`,
          border: `1px solid ${notif.type === "success" ? C.neon : C.pink}40`,
          color: notif.type === "success" ? C.neon : C.pink,
          backdropFilter: "blur(16px)",
        }}>{notif.msg}</div>
      )}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32, animation: "rise 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.neon}20, ${C.purple}20)`,
              border: `1px solid ${C.neon}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>🤖</div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{t.agents.pageTitle}</h1>
              <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{t.agents.pageSubtitle}</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.neon, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: C.neon, fontWeight: 600 }}>AI ACTIVE</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560 }}>
            Your AI crew runs your adult content business 24/7 — replying to fans, scheduling posts, and tracking revenue. All powered by Claude.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: C.card, borderRadius: 12, padding: 4, width: "fit-content", border: `1px solid ${C.border}` }}>
          {[{ id: "overview", label: "Overview" }, ...AGENTS.map(a => ({ id: a.id, label: a.name }))].map(tab_ => (
            <button key={tab_.id} onClick={() => setTab(tab_.id as any)} style={{
              padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
              background: tab === tab_.id ? `${C.neon}15` : "transparent",
              color: tab === tab_.id ? C.neon : C.muted,
              fontSize: 13, fontWeight: 600, transition: "all 0.2s",
            }}>{tab_.label}</button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div style={{ animation: "rise 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
              {AGENTS.map((agent, i) => {
                const cfg = configs[agent.id];
                const isEnabled = cfg?.enabled ?? false;
                return (
                  <div key={agent.id} style={{
                    background: C.card, borderRadius: 18, overflow: "hidden",
                    border: `1px solid ${isEnabled ? agent.color + "40" : C.border}`,
                    animation: `rise 0.4s ease ${i * 0.08}s forwards`, opacity: 0,
                  }}>
                    <div style={{ height: 3, background: `linear-gradient(90deg, ${agent.color}80, transparent)` }} />
                    <div style={{ padding: "20px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 14, fontSize: 22,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `${agent.color}15`, border: `1px solid ${agent.color}30`,
                        }}>{agent.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{agent.name}</div>
                          <div style={{ fontSize: 12, color: agent.color }}>{agent.type}</div>
                        </div>
                        <div style={{
                          padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                          background: isEnabled ? `${C.neon}15` : `${C.dim}30`,
                          color: isEnabled ? C.neon : C.muted,
                        }}>{isEnabled ? "● ON" : "○ OFF"}</div>
                      </div>
                      <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>{agent.desc}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                        {agent.stats.map(s => (
                          <span key={s} style={{
                            padding: "3px 9px", borderRadius: 4, fontSize: 10, fontWeight: 600,
                            background: `${agent.color}08`, border: `1px solid ${agent.color}20`, color: agent.color,
                          }}>{s}</span>
                        ))}
                      </div>
                      <button onClick={() => setTab(agent.id)} style={{
                        width: "100%", padding: "9px", borderRadius: 9, border: "none", cursor: "pointer",
                        background: `linear-gradient(135deg, ${agent.color}cc, ${agent.color}99)`,
                        color: "#fff", fontSize: 13, fontWeight: 700,
                      }}>Configure {agent.name} →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "aria7" && <Aria7Panel config={configs["aria7"]} onSave={(e, c) => saveConfig("aria7", e, c)} toast={toast} />}
        {tab === "muse3" && <Muse3Panel config={configs["muse3"]} onSave={(e, c) => saveConfig("muse3", e, c)} toast={toast} />}
        {tab === "prism" && <PrismPanel config={configs["prism"]} onSave={(e, c) => saveConfig("prism", e, c)} toast={toast} />}
      </div>
    </div>
  );
}

function Aria7Panel({ config, onSave, toast }: { config: any; onSave: (e: boolean, c: any) => void; toast: (m: string, t?: any) => void }) {
  const { t } = useLang();
  const cfg = config?.config ?? {};
  const [enabled, setEnabled] = useState(config?.enabled ?? false);
  const [creatorName, setCreatorName] = useState(cfg.creator_name ?? "");
  const [personality, setPersonality] = useState(cfg.personality ?? "flirty, confident, and playful");
  const [boundaries, setBoundaries] = useState(cfg.boundaries ?? "Keep it suggestive but tasteful unless fan pushes further");
  const [upsell, setUpsell] = useState(cfg.upsell_message ?? "Mention premium content is available if they seem interested");
  const [voiceSamples, setVoiceSamples] = useState<string[]>(cfg.voice_samples?.length ? cfg.voice_samples : [""]);
  const [testFanMsg, setTestFanMsg] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testing, setTesting] = useState(false);
  const [dmLogs, setDmLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/agents/dm").then(r => r.json()).then(d => setDmLogs(d.logs ?? [])).catch(() => {});
  }, []);

  const handleSave = () => onSave(enabled, {
    creator_name: creatorName, personality, boundaries,
    upsell_message: upsell, voice_samples: voiceSamples.filter(Boolean),
  });

  const testDM = async () => {
    if (!testFanMsg) return;
    setTesting(true);
    setTestResponse("");
    try {
      const res = await fetch("/api/agents/dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fanMessage: testFanMsg, fanName: "Test Fan" }),
      });
      const data = await res.json();
      if (data.response) {
        setTestResponse(data.response);
        setDmLogs(prev => [{ fan_message: testFanMsg, ai_response: data.response, created_at: new Date().toISOString() }, ...prev]);
      } else {
        toast(data.error ?? "Failed to generate", "error");
      }
    } catch { toast("Network error", "error"); }
    setTesting(false);
  };

  return (
    <div style={{ animation: "rise 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><div style={{ fontWeight: 700, fontSize: 16 }}>🤖 {t.agents.aria.name} Settings</div>
            <div style={{ fontSize: 12, color: C.muted }}>{t.agents.aria.role}</div></div>
          <button onClick={() => setEnabled(!enabled)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: enabled ? `${C.neon}20` : `${C.dim}40`,
            color: enabled ? C.neon : C.muted, fontWeight: 700, fontSize: 12,
          }}>{enabled ? "● Enabled" : "○ Disabled"}</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Your creator name" value={creatorName} onChange={setCreatorName} placeholder="e.g. Valentina" />
          <Field label="Personality & tone" value={personality} onChange={setPersonality} placeholder="flirty, confident, playful" multiline />
          <Field label="Content boundaries" value={boundaries} onChange={setBoundaries} placeholder="Keep it suggestive but..." multiline />
          <Field label="Upsell instructions" value={upsell} onChange={setUpsell} placeholder="Mention your PPV content when..." multiline />
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 8 }}>
              Voice samples — paste 2-5 real DMs you've sent so Claude learns your style
            </label>
            {voiceSamples.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <textarea value={s} onChange={e => {
                  const next = [...voiceSamples]; next[i] = e.target.value; setVoiceSamples(next);
                }} placeholder={`Sample DM ${i + 1}...`} rows={2} style={{
                  flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
                  color: C.text, padding: "8px 12px", fontSize: 12, resize: "none",
                }} />
                {voiceSamples.length > 1 && (
                  <button onClick={() => setVoiceSamples(voiceSamples.filter((_, j) => j !== i))}
                    style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>×</button>
                )}
              </div>
            ))}
            <button onClick={() => setVoiceSamples([...voiceSamples, ""])} style={{
              background: "none", border: `1px dashed ${C.border}`, borderRadius: 8,
              color: C.muted, padding: "6px 12px", cursor: "pointer", fontSize: 12, width: "100%",
            }}>+ Add voice sample</button>
          </div>
          <button onClick={handleSave} style={{
            padding: "11px", borderRadius: 10, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.pink}, ${C.pink}99)`,
            color: "#fff", fontWeight: 700, fontSize: 14,
          }}>Save ARIA-7 Settings</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>🧪 {t.agents.aria.inputLabel}</div>
          <textarea value={testFanMsg} onChange={e => setTestFanMsg(e.target.value)}
            placeholder={t.agents.aria.inputPlaceholder}
            rows={3} style={{
              width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
              color: C.text, padding: "10px 14px", fontSize: 13, resize: "none", marginBottom: 10,
            }} />
          <button onClick={testDM} disabled={testing || !testFanMsg} style={{
            width: "100%", padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
            background: testing ? C.dim : `linear-gradient(135deg, ${C.pink}, ${C.pink}99)`,
            color: "#fff", fontWeight: 700, fontSize: 13,
          }}>{testing ? t.agents.aria.generatingBtn : `${t.agents.aria.generateBtn} ⚡`}</button>
          {testResponse && (
            <div style={{
              marginTop: 14, background: `${C.pink}08`, border: `1px solid ${C.pink}25`,
              borderRadius: 10, padding: "14px",
            }}>
              <div style={{ fontSize: 10, color: C.pink, fontWeight: 700, marginBottom: 6 }}>{t.agents.aria.responseLabel}</div>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>{testResponse}</p>
            </div>
          )}
        </div>
        <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}`, flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
            📨 DM Log <span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>({dmLogs.length})</span>
          </div>
          {dmLogs.length === 0
            ? <p style={{ color: C.muted, fontSize: 13 }}>No DMs yet. Test one above.</p>
            : <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {dmLogs.slice(0, 10).map((log, i) => (
                <div key={i} style={{ background: C.surface, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>Fan: {log.fan_message?.slice(0, 80)}</div>
                  <div style={{ fontSize: 12, color: C.text }}>ARIA-7: {log.ai_response?.slice(0, 100)}</div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

function Muse3Panel({ config, onSave, toast }: { config: any; onSave: (e: boolean, c: any) => void; toast: (m: string, t?: any) => void }) {
  const { t } = useLang();
  const cfg = config?.config ?? {};
  const [enabled, setEnabled] = useState(config?.enabled ?? false);
  const [niche, setNiche] = useState(cfg.niche ?? "adult content creator");
  const [style, setStyle] = useState(cfg.style ?? "flirty and teasing");
  const [brandKeywords, setBrandKeywords] = useState(cfg.brand_keywords?.join(", ") ?? "");
  const [contentDesc, setContentDesc] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["twitter", "reddit"]);
  const [generating, setGenerating] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [savedSchedule, setSavedSchedule] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/agents/scheduler").then(r => r.json()).then(d => setSavedSchedule(d.schedule ?? [])).catch(() => {});
  }, []);

  const handleSave = () => onSave(enabled, {
    niche, style, brand_keywords: brandKeywords.split(",").map((s: string) => s.trim()).filter(Boolean),
  });

  const generate = async () => {
    if (!contentDesc) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/agents/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentDescription: contentDesc, platforms }),
      });
      const data = await res.json();
      if (data.schedule) {
        setSchedule(data.schedule);
        setSavedSchedule(prev => [...data.schedule, ...prev]);
        toast(`${data.schedule.length} posts scheduled!`);
      } else {
        toast(data.error ?? "Failed", "error");
      }
    } catch { toast("Network error", "error"); }
    setGenerating(false);
  };

  const togglePlatform = (p: string) =>
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  return (
    <div style={{ animation: "rise 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><div style={{ fontWeight: 700, fontSize: 16 }}>📅 {t.agents.muse.name} Settings</div>
            <div style={{ fontSize: 12, color: C.muted }}>{t.agents.muse.role}</div></div>
          <button onClick={() => setEnabled(!enabled)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: enabled ? `${C.neon}20` : `${C.dim}40`,
            color: enabled ? C.neon : C.muted, fontWeight: 700, fontSize: 12,
          }}>{enabled ? "● Enabled" : "○ Disabled"}</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Your niche" value={niche} onChange={setNiche} placeholder="Latina adult content, BBW, cosplay..." />
          <Field label="Content vibe" value={style} onChange={setStyle} placeholder="flirty, dominant, girl-next-door..." />
          <Field label="Brand keywords (comma separated)" value={brandKeywords} onChange={setBrandKeywords} placeholder="hot, exclusive, uncensored..." />
          <div>
            <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 8 }}>{t.agents.muse.platformsLabel}</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["twitter", "reddit", "instagram", "tiktok", "telegram"].map(p => (
                <button key={p} onClick={() => togglePlatform(p)} style={{
                  padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                  background: platforms.includes(p) ? `${C.purple}25` : C.surface,
                  color: platforms.includes(p) ? C.purple : C.muted,
                  outline: `1px solid ${platforms.includes(p) ? C.purple + "50" : C.border}`,
                }}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={handleSave} style={{
            padding: "11px", borderRadius: 10, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.purple}, ${C.purple}99)`,
            color: "#fff", fontWeight: 700, fontSize: 14,
          }}>Save MUSE-3 Settings</button>
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🚀 Generate Schedule</div>
          <textarea value={contentDesc} onChange={e => setContentDesc(e.target.value)}
            placeholder="Describe your upcoming content... e.g. 'New beach photoshoot, teasing bikini pics'"
            rows={3} style={{
              width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
              color: C.text, padding: "10px 14px", fontSize: 13, resize: "none", marginBottom: 10,
            }} />
          <button onClick={generate} disabled={generating || !contentDesc} style={{
            width: "100%", padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
            background: generating ? C.dim : `linear-gradient(135deg, ${C.purple}, ${C.purple}99)`,
            color: "#fff", fontWeight: 700, fontSize: 13,
          }}>{generating ? t.agents.muse.generatingBtn : `${t.agents.muse.generateBtn} ⚡`}</button>
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
          📋 Schedule <span style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>({savedSchedule.length} posts)</span>
        </div>
        {schedule.length > 0 && (
          <div style={{ background: `${C.purple}08`, border: `1px solid ${C.purple}25`, borderRadius: 10, padding: "12px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginBottom: 8 }}>JUST GENERATED BY CLAUDE</div>
            {schedule.map((item: any, i: number) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < schedule.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.purple, background: `${C.purple}15`, padding: "2px 6px", borderRadius: 3 }}>
                    {item.platform?.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 10, color: C.muted }}>{new Date(item.scheduled_for).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  <span style={{ fontSize: 10, color: item.engagement_prediction === "high" ? C.neon : C.amber, marginLeft: "auto" }}>
                    {item.engagement_prediction === "high" ? "🔥 High" : "📈 Med"}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: C.text, margin: 0 }}>{item.caption?.slice(0, 120)}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ maxHeight: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {savedSchedule.length === 0
            ? <p style={{ color: C.muted, fontSize: 13 }}>No posts scheduled. Generate one.</p>
            : savedSchedule.slice(0, 20).map((item: any, i: number) => (
              <div key={i} style={{ background: C.surface, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.purple, background: `${C.purple}15`, padding: "1px 5px", borderRadius: 3 }}>{item.platform?.toUpperCase()}</span>
                  <span style={{ fontSize: 10, color: item.status === "posted" ? C.neon : C.muted }}>{item.status}</span>
                </div>
                <p style={{ fontSize: 11, color: C.text, margin: 0 }}>{item.caption?.slice(0, 100)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function PrismPanel({ config, onSave, toast }: { config: any; onSave: (e: boolean, c: any) => void; toast: (m: string, t?: any) => void }) {
  const { t } = useLang();
  const [enabled, setEnabled] = useState(config?.enabled ?? false);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [rawData, setRawData] = useState<any>(null);

  const analyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/agents/analytics", { method: "POST" });
      const data = await res.json();
      if (data.report) { setReport(data.report); setRawData(data.raw_data); toast("Analysis complete!"); }
      else toast(data.error ?? "Failed", "error");
    } catch { toast("Network error", "error"); }
    setAnalyzing(false);
  };

  const scoreColor = (s: number) => s >= 70 ? C.neon : s >= 40 ? C.amber : C.pink;

  return (
    <div style={{ animation: "rise 0.3s ease", display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
      <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}`, height: "fit-content" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div><div style={{ fontWeight: 700, fontSize: 16 }}>📊 {t.agents.prism.name}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{t.agents.prism.role}</div></div>
          <button onClick={() => setEnabled(!enabled)} style={{
            padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
            background: enabled ? `${C.neon}20` : `${C.dim}40`,
            color: enabled ? C.neon : C.muted, fontWeight: 700, fontSize: 11,
          }}>{enabled ? "● On" : "○ Off"}</button>
        </div>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 18, lineHeight: 1.6 }}>
          Claude Opus reads your real Supabase data — revenue, orders, DM performance — and gives you an actionable strategy report.
        </p>
        <button onClick={analyze} disabled={analyzing} style={{
          width: "100%", padding: "12px", borderRadius: 10, border: "none", cursor: "pointer",
          background: analyzing ? C.dim : `linear-gradient(135deg, ${C.blue}, ${C.blue}99)`,
          color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 10,
        }}>{analyzing ? t.agents.prism.generatingBtn : `${t.agents.prism.generateBtn} ⚡`}</button>
        <button onClick={() => onSave(enabled, {})} style={{
          width: "100%", padding: "10px", borderRadius: 10, border: `1px solid ${C.blue}30`,
          background: `${C.blue}10`, color: C.blue, fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}>Save Settings</button>
      </div>

      <div>
        {!report ? (
          <div style={{ background: C.card, borderRadius: 16, padding: "48px", border: `1px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>No Report Yet</div>
            <p style={{ color: C.muted, fontSize: 14 }}>Click "Run Analysis" — Claude will read your real revenue data and give you specific, actionable insights.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
              <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 8 }}>{t.agents.prism.scoreLabel.toUpperCase()}</div>
                <div style={{ fontSize: 52, fontWeight: 800, color: scoreColor(report.revenue_score ?? 0) }}>{report.revenue_score ?? 0}</div>
                <div style={{ fontSize: 11, color: C.muted }}>out of 100</div>
              </div>
              <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.neon}25` }}>
                <div style={{ fontSize: 11, color: C.neon, fontWeight: 700, marginBottom: 8 }}>{t.agents.prism.insightLabel.toUpperCase()}</div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>{report.top_insight}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { l: "Total Revenue", v: `$${rawData?.totalRevenue?.toFixed(2) ?? "0.00"}`, c: C.neon },
                { l: "Total Orders", v: rawData?.purchases ?? 0, c: C.blue },
                { l: "Videos Live", v: rawData?.videos ?? 0, c: C.purple },
              ].map((s, i) => (
                <div key={i} style={{ background: C.card, borderRadius: 12, padding: "18px 20px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 6 }}>{s.l}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            {report.recommendations?.length > 0 && (
              <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>🎯 {t.agents.prism.recsLabel}</div>
                {report.recommendations.map((rec: any, i: number) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "12px 0",
                    borderBottom: i < report.recommendations.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, height: "fit-content",
                      background: rec.priority === "high" ? `${C.pink}15` : rec.priority === "medium" ? `${C.amber}15` : `${C.neon}10`,
                      color: rec.priority === "high" ? C.pink : rec.priority === "medium" ? C.amber : C.neon,
                    }}>{rec.priority?.toUpperCase()}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{rec.action}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{rec.expected_impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {report.weekly_goals?.length > 0 && (
              <div style={{ background: C.card, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>📌 {t.agents.prism.goalsLabel}</div>
                {report.weekly_goals.map((goal: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.neon, marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.text }}>{goal}</span>
                  </div>
                ))}
              </div>
            )}
            {report.growth_opportunity && (
              <div style={{ background: `${C.purple}08`, border: `1px solid ${C.purple}25`, borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: C.purple, fontWeight: 700, marginBottom: 6 }}>🚀 BIGGEST GROWTH OPPORTUNITY</div>
                <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.7 }}>{report.growth_opportunity}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const shared: React.CSSProperties = {
    width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
    color: C.text, padding: "9px 12px", fontSize: 13, outline: "none",
  };
  return (
    <div>
      <label style={{ fontSize: 12, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={2} style={{ ...shared, resize: "none" }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={shared} />}
    </div>
  );
}
