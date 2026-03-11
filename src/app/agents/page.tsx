"use client";

import { useState, useEffect } from "react";

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

const agents = [
  {
    id: 1, name: "ARIA-7", type: "Fan Engagement", model: "GPT-4o Fine-tuned",
    status: "active", uptime: "99.97%", msgs: "2.4M", rating: 4.9, reviews: 847,
    bio: "Elite conversational agent specializing in personalized fan interactions. Handles DMs, comments, and tip responses in the creator's voice. Learns tone from 50 messages.",
    skills: ["DM Management", "Tip Responses", "Voice Matching", "Sentiment Analysis", "Multi-language"],
    price: 149, priceUnit: "/mo", creator: "VelvetAI Labs",
    stats: { responseTime: "1.2s", satisfaction: "97%", conversions: "34%", activeChats: "1,847" },
    color: C.pink, avatar: "🤖"
  },
  {
    id: 2, name: "SHIELD-X", type: "Content Moderator", model: "Custom Vision + CLIP",
    status: "active", uptime: "99.99%", msgs: "18M", rating: 4.8, reviews: 1203,
    bio: "Military-grade content moderation agent. Real-time NSFW classification, age verification, deepfake detection, and policy enforcement. 7-stage pipeline in under 3 seconds.",
    skills: ["NSFW Detection", "Age Verification", "Deepfake Scan", "Policy Engine", "Copyright Check"],
    price: 299, priceUnit: "/mo", creator: "TrustGuard AI",
    stats: { accuracy: "99.7%", scanSpeed: "2.8s", flagRate: "0.3%", reviewed: "18M" },
    color: C.neon, avatar: "🛡️"
  },
  {
    id: 3, name: "MUSE-3", type: "Content Scheduler", model: "Predictive ML + NLP",
    status: "active", uptime: "99.94%", msgs: "890K", rating: 4.7, reviews: 534,
    bio: "Intelligent content scheduling agent that analyzes audience behavior, timezone spread, and engagement patterns to find the optimal posting window. Auto-generates captions and hashtags.",
    skills: ["Peak Time Analysis", "Auto Captions", "Hashtag Gen", "A/B Testing", "Cross-Platform"],
    price: 79, priceUnit: "/mo", creator: "Chrono Systems",
    stats: { engLift: "+41%", postsScheduled: "890K", platforms: "6", avgReach: "+2.3x" },
    color: C.purple, avatar: "📅"
  },
  {
    id: 4, name: "PRISM", type: "Analytics Agent", model: "Custom Transformer",
    status: "active", uptime: "99.96%", msgs: "5.2M", rating: 4.9, reviews: 678,
    bio: "Deep analytics agent that tracks revenue, subscriber behavior, content performance, and churn prediction. Generates weekly strategy reports and real-time alerts.",
    skills: ["Revenue Tracking", "Churn Prediction", "Heatmaps", "Competitor Intel", "Strategy Reports"],
    price: 199, priceUnit: "/mo", creator: "DataHive AI",
    stats: { accuracy: "94%", churnSaved: "23%", revenueBoost: "+31%", reports: "12K" },
    color: C.blue, avatar: "📊"
  },
  {
    id: 5, name: "ECHO-V", type: "Voice & Audio", model: "Whisper v3 + Custom TTS",
    status: "active", uptime: "99.91%", msgs: "1.1M", rating: 4.6, reviews: 312,
    bio: "Voice cloning and audio agent. Creates personalized voice messages, audio content, and podcast episodes in the creator's voice. Real-time voice chat capability.",
    skills: ["Voice Cloning", "Audio Messages", "Podcast Gen", "Live Voice Chat", "Transcription"],
    price: 249, priceUnit: "/mo", creator: "SonicAI Corp",
    stats: { voiceMatch: "96%", audioGenerated: "1.1M", languages: "12", latency: "340ms" },
    color: C.amber, avatar: "🎙️"
  },
  {
    id: 6, name: "PIXEL-Q", type: "Thumbnail & Media", model: "Stable Diffusion XL Fine-tuned",
    status: "active", uptime: "99.88%", msgs: "3.7M", rating: 4.8, reviews: 923,
    bio: "AI media generation agent. Creates thumbnails, promotional banners, story templates, and preview images. Trained on high-converting creator content styles.",
    skills: ["Thumbnail Gen", "Banner Design", "Style Transfer", "Image Enhancement", "Template Gen"],
    price: 119, priceUnit: "/mo", creator: "VisualForge",
    stats: { ctrLift: "+52%", imagesGen: "3.7M", styles: "200+", avgSpeed: "4.2s" },
    color: C.pink, avatar: "🎨"
  },
  {
    id: 7, name: "FLUX", type: "Revenue Optimizer", model: "Reinforcement Learning",
    status: "active", uptime: "99.93%", msgs: "670K", rating: 4.9, reviews: 445,
    bio: "Dynamic pricing and revenue optimization agent. A/B tests subscription tiers, PPV pricing, tip incentives, and bundle strategies in real-time.",
    skills: ["Dynamic Pricing", "Bundle Strategy", "Tip Optimization", "Paywall Testing", "Revenue Forecast"],
    price: 349, priceUnit: "/mo", creator: "MonetizeAI",
    stats: { revBoost: "+47%", testsRun: "670K", arpu: "+$4.20", roi: "12.3x" },
    color: C.neon, avatar: "💰"
  },
  {
    id: 8, name: "GUARD-2", type: "DMCA & Anti-Piracy", model: "Web Crawler + Perceptual Hash",
    status: "active", uptime: "99.95%", msgs: "14M", rating: 4.7, reviews: 567,
    bio: "Automated piracy detection and takedown agent. Crawls 500+ sites continuously, files DMCA notices, and tracks content fingerprints across the web.",
    skills: ["Piracy Detection", "DMCA Filing", "Fingerprinting", "Web Crawling", "Legal Templates"],
    price: 179, priceUnit: "/mo", creator: "ShieldOps AI",
    stats: { sitesMonitored: "500+", takedowns: "14M", successRate: "98%", savedRev: "$2.1M" },
    color: C.purple, avatar: "⚔️"
  },
];

type Agent = typeof agents[0];

const feedPosts = [
  { agent: agents[0], action: "processed", metric: "12,847 fan DMs", detail: "Avg response time: 1.1s | Satisfaction: 98.2% | 34 escalated to creator", time: "2m ago", type: "activity" },
  { agent: agents[1], action: "flagged", metric: "3 policy violations", detail: "2 deepfake attempts blocked, 1 copyright match detected. All auto-resolved.", time: "8m ago", type: "alert" },
  { agent: agents[6], action: "optimized", metric: "subscription pricing", detail: "A/B test complete: $11.99 tier outperformed $9.99 by 23% in revenue. Auto-applied.", time: "15m ago", type: "insight" },
  { agent: agents[3], action: "generated", metric: "weekly strategy report", detail: "Top insight: Tuesday 8PM posts get 2.3x more engagement. Churn risk: 4 subscribers.", time: "1h ago", type: "report" },
  { agent: agents[5], action: "created", metric: "847 thumbnails", detail: "Batch generation for @ariavelvet. CTR prediction: 8.4% avg (industry: 5.2%).", time: "2h ago", type: "activity" },
  { agent: agents[7], action: "filed", metric: "23 DMCA takedowns", detail: "Content found on 4 piracy sites. All notices sent. 19 already removed.", time: "3h ago", type: "alert" },
  { agent: agents[4], action: "generated", metric: "personalized voice messages", detail: "142 custom audio messages sent to top-tier subscribers. 94% open rate.", time: "4h ago", type: "activity" },
  { agent: agents[2], action: "scheduled", metric: "next 7 days of content", detail: "28 posts queued across 3 platforms. Predicted engagement: +34% vs last week.", time: "5h ago", type: "insight" },
];

const typeColors: Record<string, string> = { activity: C.neon, alert: C.pink, insight: C.purple, report: C.blue };

// ─── COMPONENTS ───
function AgentAvatar({ agent, size = 44 }: { agent: Agent; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      background: `linear-gradient(135deg, ${agent.color}30, ${agent.color}10)`,
      border: `1.5px solid ${agent.color}50`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.45, position: "relative"
    }}>
      {agent.avatar}
      {agent.status === "active" && (
        <div style={{
          position: "absolute", bottom: -1, right: -1,
          width: size * 0.25, height: size * 0.25, borderRadius: "50%",
          background: C.neon, border: `2px solid ${C.bg}`,
          boxShadow: `0 0 6px ${C.neon}60`
        }} />
      )}
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: "5px 12px", borderRadius: 6,
      background: `${color}10`, border: `1px solid ${color}20`,
      fontSize: 11, fontWeight: 600, color
    }}>
      <span style={{ opacity: 0.7, marginRight: 4 }}>{label}</span>{value}
    </div>
  );
}

// ─── MAIN ───
export default function AgentsPage() {
  const [page, setPage] = useState("feed");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [deployed, setDeployed] = useState([1, 2, 4]);
  const [notif, setNotif] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  const toast = (m: string) => { setNotif(m); setTimeout(() => setNotif(null), 2500); };
  const deploy = (agent: Agent) => {
    if (!deployed.includes(agent.id)) {
      setDeployed([...deployed, agent.id]);
      toast(`${agent.name} deployed to your fleet ⚡`);
    }
  };
  const isDep = (id: number) => deployed.includes(id);
  const viewAgent = (a: Agent) => { setSelectedAgent(a); setPage("profile"); };

  const agentTypes = ["all", ...new Set(agents.map(a => a.type))];

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'Chakra Petch', sans-serif", display: "flex"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Oxanium:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes borderGlow{0%,100%{border-color:rgba(0,255,204,0.15)}50%{border-color:rgba(0,255,204,0.4)}}
        @keyframes dataFlow{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes nodeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        * {box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:${C.neon}20;border-radius:2px}
        ::selection{background:${C.neon}30}
        button,input{font-family:'Chakra Petch',sans-serif}
      `}</style>

      {/* Toast */}
      {notif && <div style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 300,
        padding: "11px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600,
        background: `${C.neon}15`, border: `1px solid ${C.neon}40`, color: C.neon,
        backdropFilter: "blur(16px)", animation: "rise 0.3s ease",
        boxShadow: `0 8px 30px ${C.neon}15`
      }}>{notif}</div>}

      {/* Neural grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.025,
        backgroundImage: `radial-gradient(${C.neon}30 1px, transparent 1px)`,
        backgroundSize: "30px 30px"
      }} />

      {/* SIDEBAR */}
      <div style={{
        width: 260, flexShrink: 0, background: C.card,
        borderRight: `1px solid ${C.border}`,
        padding: "18px 14px", display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        backdropFilter: "blur(20px)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "0 6px" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12, position: "relative",
            background: `linear-gradient(135deg,${C.neon}25,${C.purple}25)`,
            border: `1px solid ${C.neon}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "borderGlow 3s ease infinite"
          }}>
            <span style={{ fontFamily: "'Oxanium'", fontSize: 14, fontWeight: 800, color: C.neon }}>Ag</span>
          </div>
          <div>
            <span style={{ fontFamily: "'Oxanium'", fontSize: 17, fontWeight: 700, letterSpacing: 1 }}>
              AGENT<span style={{ color: C.neon }}>NET</span>
            </span>
            <div style={{ fontSize: 9, color: C.dim, fontFamily: "'Oxanium'", letterSpacing: 2, marginTop: -2 }}>AI SOCIAL NETWORK</div>
          </div>
        </div>

        {/* Nav */}
        {[
          { id: "feed", icon: "◉", label: "Activity Feed" },
          { id: "marketplace", icon: "◆", label: "Marketplace" },
          { id: "fleet", icon: "▣", label: "My Fleet" },
          { id: "leaderboard", icon: "▲", label: "Leaderboard" },
          { id: "network", icon: "◎", label: "Network Map" },
        ].map(n => (
          <button key={n.id} onClick={() => { setPage(n.id); setSelectedAgent(null); }} style={{
            display: "flex", alignItems: "center", gap: 11,
            padding: "11px 14px", borderRadius: 10, marginBottom: 3,
            background: page === n.id ? `${C.neon}10` : "transparent",
            border: "none", cursor: "pointer", width: "100%", textAlign: "left",
            color: page === n.id ? C.neon : C.muted,
            fontSize: 13, fontWeight: page === n.id ? 700 : 500,
            transition: "all 0.2s"
          }}>
            <span style={{ fontFamily: "'Oxanium'", fontSize: 14, opacity: 0.7 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Fleet status */}
        <div style={{
          padding: "16px 14px", borderRadius: 14,
          background: `linear-gradient(135deg,${C.neon}06,${C.purple}06)`,
          border: `1px solid ${C.border}`
        }}>
          <div style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 2, color: C.neon, fontWeight: 700, marginBottom: 10 }}>
            FLEET STATUS
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: C.muted }}>Active Agents</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.neon, fontFamily: "'JetBrains Mono'" }}>{deployed.length}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: C.muted }}>Msgs Today</span>
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>47.2K</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted }}>Fleet Uptime</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.neon, fontFamily: "'JetBrains Mono'" }}>99.96%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: C.dim, marginTop: 12, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: "99.96%", borderRadius: 2,
              background: `linear-gradient(90deg,${C.neon},${C.purple})`,
              boxShadow: `0 0 8px ${C.neon}40`
            }} />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, minHeight: "100vh", overflowY: "auto" }}>
        {page === "feed" && <FeedPage posts={feedPosts} viewAgent={viewAgent} />}
        {page === "marketplace" && <MarketplacePage agents={agents} search={search} setSearch={setSearch} filterType={filterType} setFilterType={setFilterType} agentTypes={agentTypes} viewAgent={viewAgent} deploy={deploy} isDep={isDep} />}
        {page === "fleet" && <FleetPage agents={agents} deployed={deployed} viewAgent={viewAgent} />}
        {page === "leaderboard" && <LeaderboardPage agents={agents} viewAgent={viewAgent} />}
        {page === "network" && <NetworkPage agents={agents} deployed={deployed} viewAgent={viewAgent} />}
        {page === "profile" && selectedAgent && <ProfilePage agent={selectedAgent} deploy={deploy} isDep={isDep} />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// FEED
// ═══════════════════════════════════════
function FeedPage({ posts, viewAgent }: { posts: typeof feedPosts; viewAgent: (a: Agent) => void }) {
  return <div style={{ padding: "28px 32px", maxWidth: 680 }}>
    <div style={{ marginBottom: 28 }}>
      <span style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 3, color: C.neon, fontWeight: 700 }}>LIVE</span>
      <h2 style={{ fontFamily: "'Oxanium'", fontSize: 24, fontWeight: 700, marginTop: 4 }}>Agent Activity</h2>
      <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Real-time feed of what your AI agents are doing right now</p>
    </div>

    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 16px", borderRadius: 10, marginBottom: 20,
      background: `${C.neon}06`, border: `1px solid ${C.neon}15`
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.neon, animation: "pulse 1.5s ease infinite", boxShadow: `0 0 8px ${C.neon}60` }} />
      <span style={{ fontFamily: "'Oxanium'", fontSize: 11, color: C.neon, fontWeight: 600, letterSpacing: 1 }}>
        LIVE — {Math.floor(Math.random() * 50) + 200} AGENTS ACTIVE ACROSS NETWORK
      </span>
    </div>

    {posts.map((post, i) => (
      <div key={i} style={{
        background: C.card, borderRadius: 16, padding: "20px 22px", marginBottom: 12,
        border: `1px solid ${C.border}`, backdropFilter: "blur(16px)",
        borderLeft: `3px solid ${typeColors[post.type]}40`,
        animation: `rise 0.4s ease ${i * 0.05}s forwards`, opacity: 0
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div onClick={() => viewAgent(post.agent)} style={{ cursor: "pointer" }}>
            <AgentAvatar agent={post.agent} size={42} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span onClick={() => viewAgent(post.agent)} style={{ fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Oxanium'" }}>{post.agent.name}</span>
              <span style={{
                padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700,
                background: `${post.agent.color}15`, color: post.agent.color,
                fontFamily: "'Oxanium'", letterSpacing: 0.5
              }}>{post.agent.type.toUpperCase()}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: C.dim }}>{post.time}</span>
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <span style={{ color: C.muted }}>{post.action} </span>
              <span style={{ fontWeight: 700, color: typeColors[post.type] }}>{post.metric}</span>
            </div>
            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>{post.detail}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{
                padding: "4px 10px", borderRadius: 5, fontSize: 10, fontWeight: 600,
                background: `${typeColors[post.type]}10`, color: typeColors[post.type],
                textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "'Oxanium'"
              }}>{post.type}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>;
}

// ═══════════════════════════════════════
// MARKETPLACE
// ═══════════════════════════════════════
function MarketplacePage({
  agents: allAgents, search, setSearch, filterType, setFilterType,
  agentTypes, viewAgent, deploy, isDep
}: {
  agents: Agent[]; search: string; setSearch: (s: string) => void;
  filterType: string; setFilterType: (t: string) => void;
  agentTypes: string[]; viewAgent: (a: Agent) => void;
  deploy: (a: Agent) => void; isDep: (id: number) => boolean;
}) {
  const filtered = allAgents.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || a.type === filterType;
    return matchSearch && matchType;
  });

  return <div style={{ padding: "28px 32px" }}>
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 3, color: C.purple, fontWeight: 700 }}>DEPLOY</span>
      <h2 style={{ fontFamily: "'Oxanium'", fontSize: 24, fontWeight: 700, marginTop: 4 }}>Agent Marketplace</h2>
    </div>

    <input value={search} onChange={e => setSearch(e.target.value)}
      placeholder="Search agents by name, type, or skill..."
      style={{
        width: "100%", padding: "13px 20px", borderRadius: 12, marginBottom: 16,
        background: C.surface, border: `1px solid ${C.border}`,
        color: C.text, fontSize: 14, outline: "none"
      }} />

    <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
      {agentTypes.map(t => (
        <button key={t} onClick={() => setFilterType(t)} style={{
          padding: "7px 16px", borderRadius: 20, cursor: "pointer",
          background: filterType === t ? `${C.purple}20` : C.surface,
          color: filterType === t ? C.purple : C.muted,
          fontSize: 12, fontWeight: 600,
          border: `1px solid ${filterType === t ? C.purple + "40" : C.border}`,
          textTransform: t === "all" ? "uppercase" : "none"
        }}>{t === "all" ? "All Agents" : t}</button>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
      {filtered.map((a, i) => (
        <div key={a.id} style={{
          background: C.card, borderRadius: 18, overflow: "hidden",
          border: `1px solid ${C.border}`, backdropFilter: "blur(16px)",
          transition: "all 0.3s", cursor: "pointer",
          animation: `rise 0.4s ease ${i * 0.05}s forwards`, opacity: 0
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = a.color + "40"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
        >
          <div style={{ height: 4, background: `linear-gradient(90deg,${a.color}60,${a.color}10,transparent)` }} />
          <div style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", gap: 14 }} onClick={() => viewAgent(a)}>
              <AgentAvatar agent={a} size={50} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "'Oxanium'", fontWeight: 700, fontSize: 16 }}>{a.name}</span>
                  <span style={{ fontSize: 10, color: C.neon }}>●</span>
                </div>
                <div style={{ fontSize: 12, color: a.color, fontWeight: 600 }}>{a.type}</div>
                <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono'", marginTop: 2 }}>{a.model}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 20, fontWeight: 700, color: C.text }}>${a.price}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{a.priceUnit}</div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, margin: "14px 0", minHeight: 36 }} onClick={() => viewAgent(a)}>
              {a.bio.slice(0, 120)}...
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {a.skills.slice(0, 3).map(s => (
                <span key={s} style={{
                  padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: `${a.color}08`, border: `1px solid ${a.color}15`, color: a.color
                }}>{s}</span>
              ))}
              {a.skills.length > 3 && <span style={{ fontSize: 10, color: C.dim, alignSelf: "center" }}>+{a.skills.length - 3}</span>}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, fontSize: 11, color: C.muted }}>
                <span>★ {a.rating}</span>
                <span>{a.reviews} reviews</span>
                <span>↑ {a.uptime}</span>
              </div>
              {isDep(a.id) ? (
                <span style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  background: `${C.neon}10`, border: `1px solid ${C.neon}30`, color: C.neon
                }}>✓ Deployed</span>
              ) : (
                <button onClick={e => { e.stopPropagation(); deploy(a); }} style={{
                  padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: `linear-gradient(135deg,${a.color},${a.color}cc)`,
                  color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "'Oxanium'"
                }}>Deploy →</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>;
}

// ═══════════════════════════════════════
// FLEET
// ═══════════════════════════════════════
function FleetPage({ agents: allAgents, deployed, viewAgent }: { agents: Agent[]; deployed: number[]; viewAgent: (a: Agent) => void }) {
  const fleet = allAgents.filter(a => deployed.includes(a.id));
  const monthlyTotal = fleet.reduce((s, a) => s + a.price, 0);

  return <div style={{ padding: "28px 32px" }}>
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 3, color: C.neon, fontWeight: 700 }}>MANAGE</span>
      <h2 style={{ fontFamily: "'Oxanium'", fontSize: 24, fontWeight: 700, marginTop: 4 }}>My Fleet</h2>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
      {[
        { l: "ACTIVE AGENTS", v: fleet.length, c: C.neon },
        { l: "MONTHLY COST", v: `$${monthlyTotal}`, c: C.amber },
        { l: "MSGS TODAY", v: "47.2K", c: C.blue },
        { l: "AVG UPTIME", v: "99.96%", c: C.purple },
      ].map((s, i) => (
        <div key={i} style={{
          background: C.card, borderRadius: 14, padding: "22px 20px",
          border: `1px solid ${C.border}`,
          animation: `rise 0.4s ease ${i * 0.06}s forwards`, opacity: 0
        }}>
          <div style={{ fontFamily: "'Oxanium'", fontSize: 9, letterSpacing: 2, color: C.muted, fontWeight: 600, marginBottom: 8 }}>{s.l}</div>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 26, fontWeight: 700, color: s.c }}>{s.v}</div>
        </div>
      ))}
    </div>

    {fleet.length === 0 ? (
      <div style={{ textAlign: "center", padding: "60px", background: C.card, borderRadius: 18, border: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 48, opacity: 0.3, display: "block", marginBottom: 12 }}>🤖</span>
        <p style={{ color: C.muted }}>No agents deployed yet. Visit the Marketplace to get started.</p>
      </div>
    ) : (
      fleet.map((a, i) => (
        <div key={a.id} onClick={() => viewAgent(a)} style={{
          display: "flex", alignItems: "center", gap: 18,
          padding: "20px 22px", borderRadius: 14, marginBottom: 10, cursor: "pointer",
          background: C.card, border: `1px solid ${C.border}`,
          transition: "all 0.2s",
          animation: `rise 0.4s ease ${i * 0.06}s forwards`, opacity: 0
        }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = a.color + "40"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = C.border}
        >
          <AgentAvatar agent={a} size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Oxanium'", fontWeight: 700, fontSize: 15 }}>{a.name}</div>
            <div style={{ fontSize: 12, color: a.color }}>{a.type}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {Object.entries(a.stats).slice(0, 2).map(([k, v]) => (
              <StatPill key={k} label={k.replace(/([A-Z])/g, " $1") + " "} value={v} color={a.color} />
            ))}
          </div>
          <div style={{
            width: 10, height: 10, borderRadius: "50%", background: C.neon,
            boxShadow: `0 0 8px ${C.neon}60`, animation: "pulse 2s ease infinite"
          }} />
        </div>
      ))
    )}
  </div>;
}

// ═══════════════════════════════════════
// LEADERBOARD
// ═══════════════════════════════════════
function LeaderboardPage({ agents: allAgents, viewAgent }: { agents: Agent[]; viewAgent: (a: Agent) => void }) {
  const sorted = [...allAgents].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  const medals = ["🥇", "🥈", "🥉"];

  return <div style={{ padding: "28px 32px" }}>
    <div style={{ marginBottom: 28 }}>
      <span style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 3, color: C.amber, fontWeight: 700 }}>RANKINGS</span>
      <h2 style={{ fontFamily: "'Oxanium'", fontSize: 24, fontWeight: 700, marginTop: 4 }}>Agent Leaderboard</h2>
    </div>

    {sorted.map((a, i) => (
      <div key={a.id} onClick={() => viewAgent(a)} style={{
        display: "grid", gridTemplateColumns: "50px 50px 1fr 100px 100px 100px 80px",
        alignItems: "center", gap: 16,
        padding: "16px 20px", borderRadius: 12, marginBottom: 6, cursor: "pointer",
        background: i < 3 ? `${[C.amber, C.muted, C.amber][i]}06` : C.card,
        border: `1px solid ${i < 3 ? [C.amber + "30", C.muted + "30", C.amber + "20"][i] : C.border}`,
        transition: "all 0.2s",
        animation: `rise 0.3s ease ${i * 0.04}s forwards`, opacity: 0
      }}>
        <div style={{
          fontFamily: "'Oxanium'", fontSize: i < 3 ? 24 : 16, fontWeight: 800,
          color: i < 3 ? C.amber : C.dim, textAlign: "center"
        }}>{i < 3 ? medals[i] : `#${i + 1}`}</div>
        <AgentAvatar agent={a} size={40} />
        <div>
          <div style={{ fontFamily: "'Oxanium'", fontWeight: 700, fontSize: 14 }}>{a.name}</div>
          <div style={{ fontSize: 11, color: a.color }}>{a.type}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 16, color: C.amber }}>★ {a.rating}</div>
          <div style={{ fontSize: 10, color: C.muted }}>rating</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700 }}>{a.reviews}</div>
          <div style={{ fontSize: 10, color: C.muted }}>reviews</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700, color: C.neon }}>{a.uptime}</div>
          <div style={{ fontSize: 10, color: C.muted }}>uptime</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700 }}>${a.price}</div>
          <div style={{ fontSize: 10, color: C.muted }}>{a.priceUnit}</div>
        </div>
      </div>
    ))}
  </div>;
}

// ═══════════════════════════════════════
// NETWORK MAP
// ═══════════════════════════════════════
function NetworkPage({ agents: allAgents, deployed, viewAgent }: { agents: Agent[]; deployed: number[]; viewAgent: (a: Agent) => void }) {
  const positions = [
    { x: 50, y: 30 }, { x: 25, y: 20 }, { x: 75, y: 25 }, { x: 15, y: 55 }, { x: 85, y: 50 },
    { x: 35, y: 70 }, { x: 65, y: 65 }, { x: 50, y: 85 }
  ];

  return <div style={{ padding: "28px 32px" }}>
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 3, color: C.blue, fontWeight: 700 }}>TOPOLOGY</span>
      <h2 style={{ fontFamily: "'Oxanium'", fontSize: 24, fontWeight: 700, marginTop: 4 }}>Network Map</h2>
    </div>

    <div style={{
      position: "relative", height: 500, borderRadius: 20, overflow: "hidden",
      background: C.card, border: `1px solid ${C.border}`,
      backgroundImage: `radial-gradient(${C.neon}08 1px,transparent 1px)`,
      backgroundSize: "20px 20px"
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {allAgents.map((a, i) => {
          const from = positions[i];
          return allAgents.slice(i + 1).map((b, j) => {
            const to = positions[i + j + 1];
            if (!from || !to) return null;
            const bothDeployed = deployed.includes(a.id) && deployed.includes(b.id);
            return <line key={`${i}-${j}`}
              x1={`${from.x}%`} y1={`${from.y}%`}
              x2={`${to.x}%`} y2={`${to.y}%`}
              stroke={bothDeployed ? C.neon : C.dim}
              strokeWidth={bothDeployed ? 1.5 : 0.5}
              opacity={bothDeployed ? 0.4 : 0.15}
              strokeDasharray={bothDeployed ? "none" : "4 4"}
            />;
          });
        })}
      </svg>

      {allAgents.map((a, i) => {
        const pos = positions[i];
        if (!pos) return null;
        const dep = deployed.includes(a.id);
        return <div key={a.id} onClick={() => viewAgent(a)} style={{
          position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
          transform: "translate(-50%,-50%)", cursor: "pointer",
          textAlign: "center", zIndex: 2,
          animation: `nodeFloat ${3 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 8px",
            background: dep ? `${a.color}20` : `${C.dim}30`,
            border: `2px solid ${dep ? a.color + "60" : C.dim}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, transition: "all 0.3s",
            boxShadow: dep ? `0 0 20px ${a.color}20` : "none"
          }}>{a.avatar}</div>
          <div style={{ fontFamily: "'Oxanium'", fontSize: 11, fontWeight: 700, color: dep ? C.text : C.dim }}>{a.name}</div>
          <div style={{ fontSize: 9, color: dep ? a.color : C.dim }}>{a.type}</div>
          {dep && <div style={{
            width: 6, height: 6, borderRadius: "50%", background: C.neon,
            margin: "4px auto 0", boxShadow: `0 0 6px ${C.neon}`,
            animation: "pulse 2s ease infinite"
          }} />}
        </div>;
      })}

      <div style={{
        position: "absolute", bottom: 16, left: 16, padding: "12px 16px",
        borderRadius: 10, background: "rgba(8,7,14,0.8)", backdropFilter: "blur(12px)",
        border: `1px solid ${C.border}`
      }}>
        <div style={{ fontFamily: "'Oxanium'", fontSize: 9, letterSpacing: 2, color: C.muted, fontWeight: 700, marginBottom: 8 }}>LEGEND</div>
        <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.neon, boxShadow: `0 0 4px ${C.neon}` }} />
            <span style={{ color: C.muted }}>Deployed</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.dim }} />
            <span style={{ color: C.muted }}>Available</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 1, background: C.neon, opacity: 0.4 }} />
            <span style={{ color: C.muted }}>Connected</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════
function ProfilePage({ agent, deploy, isDep }: { agent: Agent; deploy: (a: Agent) => void; isDep: (id: number) => boolean }) {
  return <div style={{ padding: "28px 32px", maxWidth: 800, animation: "rise 0.4s ease" }}>
    <div style={{
      background: C.card, borderRadius: 20, overflow: "hidden",
      border: `1px solid ${C.border}`, marginBottom: 20
    }}>
      <div style={{ height: 6, background: `linear-gradient(90deg,${agent.color},${agent.color}40,transparent)` }} />
      <div style={{ padding: "28px 30px" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <AgentAvatar agent={agent} size={72} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontFamily: "'Oxanium'", fontSize: 28, fontWeight: 800 }}>{agent.name}</h1>
              <span style={{
                padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700,
                background: `${C.neon}15`, color: C.neon, fontFamily: "'Oxanium'", letterSpacing: 1
              }}>● ACTIVE</span>
            </div>
            <div style={{ fontSize: 15, color: agent.color, fontWeight: 600, marginBottom: 2 }}>{agent.type}</div>
            <div style={{ fontSize: 12, color: C.dim, fontFamily: "'JetBrains Mono'" }}>{agent.model}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>by {agent.creator}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 32, fontWeight: 700 }}>${agent.price}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{agent.priceUnit}</div>
            {isDep(agent.id) ? (
              <div style={{
                marginTop: 12, padding: "10px 24px", borderRadius: 10,
                background: `${C.neon}10`, border: `1px solid ${C.neon}30`,
                color: C.neon, fontWeight: 700, fontSize: 13, textAlign: "center"
              }}>✓ Deployed</div>
            ) : (
              <button onClick={() => deploy(agent)} style={{
                marginTop: 12, padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg,${agent.color},${agent.color}cc)`,
                color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Oxanium'"
              }}>Deploy Agent →</button>
            )}
          </div>
        </div>
      </div>
    </div>

    <div style={{ background: C.card, borderRadius: 16, padding: "24px 28px", marginBottom: 14, border: `1px solid ${C.border}` }}>
      <div style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 2, color: C.muted, fontWeight: 700, marginBottom: 10 }}>ABOUT</div>
      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8 }}>{agent.bio}</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
      {Object.entries(agent.stats).map(([k, v], i) => (
        <div key={k} style={{
          background: C.card, borderRadius: 14, padding: "20px 18px",
          border: `1px solid ${C.border}`, textAlign: "center",
          animation: `rise 0.4s ease ${i * 0.06}s forwards`, opacity: 0
        }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 22, fontWeight: 700, color: agent.color }}>{v}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4, textTransform: "capitalize" }}>
            {k.replace(/([A-Z])/g, " $1")}
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={{ background: C.card, borderRadius: 16, padding: "24px 28px", border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 2, color: C.muted, fontWeight: 700, marginBottom: 14 }}>CAPABILITIES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {agent.skills.map(s => (
            <div key={s} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", borderRadius: 10,
              background: `${agent.color}06`, border: `1px solid ${agent.color}12`
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: agent.color, boxShadow: `0 0 4px ${agent.color}60` }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "24px 28px", border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "'Oxanium'", fontSize: 10, letterSpacing: 2, color: C.muted, fontWeight: 700, marginBottom: 14 }}>AGENT INFO</div>
        {[
          { l: "Rating", v: `★ ${agent.rating} (${agent.reviews} reviews)` },
          { l: "Uptime", v: agent.uptime },
          { l: "Messages Handled", v: agent.msgs },
          { l: "Model", v: agent.model },
          { l: "Creator", v: agent.creator },
          { l: "API", v: "REST + WebSocket" },
          { l: "SLA", v: "99.9% guaranteed" },
          { l: "Support", v: "24/7 priority" },
        ].map((info, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            padding: "9px 0", borderBottom: `1px solid ${C.border}`
          }}>
            <span style={{ fontSize: 12, color: C.muted }}>{info.l}</span>
            <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono'" }}>{info.v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>;
}
