"use client";

import { useState, useEffect } from "react";

const C = {
  bg: "#08070e",
  card: "rgba(14,13,22,0.9)",
  surface: "rgba(22,20,35,0.8)",
  border: "rgba(55,50,80,0.4)",
  neon: "#00ffcc",
  pink: "#ff3388",
  gold: "#ffd700",
  text: "#e8e6f0",
  muted: "#7875a0",
  purple: "#aa55ff",
};

const PLATFORMS = [
  { id: "xhamster", label: "xHamster" },
  { id: "manyvideos", label: "ManyVideos" },
  { id: "faphouse", label: "FapHouse" },
  { id: "pornhub", label: "Pornhub" },
  { id: "xvideos", label: "xVideos" },
  { id: "eporner", label: "ePorner" },
];

const SCENE_LABELS: Record<string, string> = {
  bg: "Boy/Girl", bgg: "Boy/Girl/Girl", gg: "Girl/Girl",
  bg_anal: "B/G Anal", bgg_anal: "B/G/G Anal", solo: "Solo",
};

type Production = {
  id: string;
  title: string;
  scene_type: string;
  notes?: string;
  production_models?: { models: { stage_name: string } }[];
};

type PlatformMeta = {
  title: string;
  description: string;
  tags: string[];
};

type DistroResult = {
  platforms: Record<string, PlatformMeta>;
  strategy_note?: string;
};

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy}
      style={{ background: copied ? C.neon + "22" : C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 10px", color: copied ? C.neon : C.muted, fontSize: 11, cursor: "pointer" }}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PlatformCard({ name, meta }: { name: string; meta: PlatformMeta }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{PLATFORMS.find(p => p.id === name)?.label ?? name}</span>
      </div>

      {/* Title */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Title</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ fontSize: 14, color: C.text, flex: 1 }}>{meta.title}</div>
          <CopyBtn value={meta.title} />
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Description</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ fontSize: 13, color: C.text, flex: 1, lineHeight: 1.5 }}>{meta.description}</div>
          <CopyBtn value={meta.description} />
        </div>
      </div>

      {/* Tags */}
      <div>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Tags</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
            {meta.tags?.map((tag, i) => (
              <span key={i} style={{ fontSize: 12, background: C.purple + "22", border: `1px solid ${C.purple}44`, borderRadius: 5, padding: "2px 8px", color: C.purple }}>
                #{tag}
              </span>
            ))}
          </div>
          <CopyBtn value={(meta.tags ?? []).map(t => `#${t}`).join(" ")} />
        </div>
      </div>
    </div>
  );
}

export default function DistroPage() {
  const [productions, setProductions] = useState<Production[]>([]);
  const [selectedProd, setSelectedProd] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["xhamster", "manyvideos", "faphouse", "pornhub"]);
  const [result, setResult] = useState<DistroResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/studio/productions").then(r => r.json()).then(d => {
      setProductions(d.productions ?? []);
      if (d.productions?.length) setSelectedProd(d.productions[0].id);
    });
  }, []);

  const togglePlatform = (pid: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(pid) ? prev.filter(p => p !== pid) : [...prev, pid]
    );
  };

  const generate = async () => {
    if (!selectedProd || !selectedPlatforms.length) return;
    const prod = productions.find(p => p.id === selectedProd);
    if (!prod) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const model_names = prod.production_models?.map(pm => pm.models.stage_name) ?? [];
      const res = await fetch("/api/studio/distro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          production_id: prod.id,
          scene_type: SCENE_LABELS[prod.scene_type] ?? prod.scene_type,
          model_names,
          notes: prod.notes,
          platforms: selectedPlatforms,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed");
        if (data.upgrade) setError(data.error + " — Upgrade required.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>🚀 DISTRO — Distribution Agent</h1>
          <p style={{ color: C.muted, marginTop: 6, fontSize: 14 }}>AI-powered platform-optimized metadata for every tube site</p>
        </div>

        {/* Config Card */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, marginBottom: 28 }}>
          {/* Production Selector */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Select Production</label>
            {productions.length === 0 ? (
              <div style={{ fontSize: 14, color: C.muted }}>No productions found. Create one in the Studio first.</div>
            ) : (
              <select value={selectedProd} onChange={e => setSelectedProd(e.target.value)}
                style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, boxSizing: "border-box" }}>
                {productions.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} — {SCENE_LABELS[p.scene_type] ?? p.scene_type}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Platform Checkboxes */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 10 }}>Target Platforms</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {PLATFORMS.map(p => {
                const on = selectedPlatforms.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePlatform(p.id)}
                    style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${on ? C.neon + "66" : C.border}`, background: on ? C.neon + "15" : C.surface, color: on ? C.neon : C.muted, fontSize: 13, cursor: "pointer", fontWeight: on ? 600 : 400 }}>
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={generate} disabled={loading || !selectedProd || !selectedPlatforms.length}
            style={{ background: loading ? C.surface : C.gold, border: `1px solid ${loading ? C.border : C.gold}`, borderRadius: 10, padding: "12px 32px", color: loading ? C.muted : "#000", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontSize: 15 }}>
            {loading ? "⏳ Generating..." : "🚀 Generate Distribution Package"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: C.pink + "15", border: `1px solid ${C.pink}44`, borderRadius: 10, padding: "12px 18px", marginBottom: 20, color: C.pink, fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤖</div>
            <div style={{ fontSize: 15, color: C.text, marginBottom: 6 }}>DISTRO is analyzing platforms...</div>
            <div style={{ fontSize: 13 }}>Generating optimized metadata for {selectedPlatforms.length} platforms</div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Distribution Package</h2>
            {Object.entries(result.platforms ?? {}).map(([name, meta]) => (
              <PlatformCard key={name} name={name} meta={meta} />
            ))}

            {result.strategy_note && (
              <div style={{ background: C.purple + "11", border: `1px solid ${C.purple}33`, borderRadius: 12, padding: 20, marginTop: 8 }}>
                <div style={{ fontSize: 12, color: C.purple, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>Strategy Note</div>
                <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{result.strategy_note}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
