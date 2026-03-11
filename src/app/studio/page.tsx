"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
};

const SCENE_LABELS: Record<string, string> = {
  bg: "Boy/Girl",
  bgg: "Boy/Girl/Girl",
  gg: "Girl/Girl",
  bg_anal: "B/G Anal",
  bgg_anal: "B/G/G Anal",
  solo: "Solo",
};

const SCENE_COLORS: Record<string, string> = {
  bg: C.pink,
  bgg: "#aa55ff",
  gg: "#ff88cc",
  bg_anal: "#ff6622",
  bgg_anal: "#ff9944",
  solo: C.neon,
};

const PIPELINE_STAGES = [
  "scouting", "negotiating", "contracted", "scheduled",
  "shooting", "editing", "ready", "distributed",
];

const STAGE_NEXT: Record<string, string> = {
  scouting: "negotiating", negotiating: "contracted", contracted: "scheduled",
  scheduled: "shooting", shooting: "editing", editing: "ready",
  ready: "distributed", distributed: "distributed",
};

type Model = { id: string; stage_name: string };
type Distribution = { id: string; platform: string; status: string };
type ProductionModel = { model_id: string; models: Model };
type Production = {
  id: string;
  title: string;
  scene_type: string;
  status: string;
  agreed_rate?: number;
  production_models?: ProductionModel[];
  distributions?: Distribution[];
};
type ModelRow = { id: string; model_compliance?: { id1_verified: boolean; id2_verified: boolean; photo_with_id: boolean; contract_signed: boolean; std_test_result: string }[] };

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function ProductionCard({ prod, onAdvance }: { prod: Production; onAdvance: (id: string, next: string) => void }) {
  const sceneColor = SCENE_COLORS[prod.scene_type] ?? C.muted;
  const modelCount = prod.production_models?.length ?? 0;
  const next = STAGE_NEXT[prod.status];
  const isLast = prod.status === "distributed";

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 10, minWidth: 200 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8, lineHeight: 1.3 }}>{prod.title}</div>
      <div style={{ display: "inline-block", background: sceneColor + "22", border: `1px solid ${sceneColor}44`, borderRadius: 6, padding: "2px 8px", fontSize: 11, color: sceneColor, marginBottom: 8 }}>
        {SCENE_LABELS[prod.scene_type] ?? prod.scene_type}
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>
        {modelCount} performer{modelCount !== 1 ? "s" : ""}
      </div>
      {prod.agreed_rate && (
        <div style={{ fontSize: 12, color: C.gold, marginBottom: 8 }}>${prod.agreed_rate.toLocaleString()}</div>
      )}
      {!isLast && (
        <button
          onClick={() => onAdvance(prod.id, next)}
          style={{ width: "100%", background: C.neon + "15", border: `1px solid ${C.neon}44`, borderRadius: 6, padding: "5px 0", fontSize: 12, color: C.neon, cursor: "pointer" }}
        >
          → {next.charAt(0).toUpperCase() + next.slice(1)}
        </button>
      )}
    </div>
  );
}

function NewProductionModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ title: "", scene_type: "bg", location: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!form.title) return;
    setSaving(true);
    await fetch("/api/studio/productions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    onCreated();
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, width: 420, maxWidth: "90vw" }}>
        <h3 style={{ color: C.text, marginBottom: 20, fontSize: 18 }}>New Production</h3>
        <input placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
        <select value={form.scene_type} onChange={e => setForm(f => ({ ...f, scene_type: e.target.value }))}
          style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}>
          {Object.entries(SCENE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input placeholder="Location (optional)" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
        <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, marginBottom: 20, boxSizing: "border-box", resize: "none", height: 80 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 0", color: C.muted, cursor: "pointer", fontSize: 14 }}>Cancel</button>
          <button onClick={submit} disabled={saving} style={{ flex: 1, background: C.gold, border: "none", borderRadius: 8, padding: "10px 0", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const [models, setModels] = useState<ModelRow[]>([]);
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProd, setShowNewProd] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [mRes, pRes] = await Promise.all([
      fetch("/api/studio/models").then(r => r.json()),
      fetch("/api/studio/productions").then(r => r.json()),
    ]);
    setModels(mRes.models ?? []);
    setProductions(pRes.productions ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const advanceStage = async (id: string, next: string) => {
    await fetch("/api/studio/productions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: next }) });
    fetchData();
  };

  const complianceIssues = models.filter(m => {
    const c = m.model_compliance?.[0];
    if (!c) return true;
    return !(c.id1_verified && c.id2_verified && c.photo_with_id && c.contract_signed && c.std_test_result === "clear");
  }).length;

  const totalDist = productions.reduce((acc, p) => acc + (p.distributions?.length ?? 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>🎬 Production Studio</h1>
          <p style={{ color: C.muted, marginTop: 6, fontSize: 15 }}>Your complete production pipeline</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <StatCard label="Total Models" value={models.length} color={C.neon} />
          <StatCard label="Active Productions" value={productions.filter(p => p.status !== "distributed").length} color={C.gold} />
          <StatCard label="Compliance Issues" value={complianceIssues} color={complianceIssues > 0 ? C.pink : C.neon} />
          <StatCard label="Total Distributions" value={totalDist} color="#aa55ff" />
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          <Link href="/studio/models">
            <button style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 20px", color: C.neon, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
              + New Model
            </button>
          </Link>
          <button onClick={() => setShowNewProd(true)} style={{ background: C.gold, border: "none", borderRadius: 10, padding: "10px 20px", color: "#000", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
            + New Production
          </button>
          <Link href="/studio/distro">
            <button style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 20px", color: "#aa55ff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
              🚀 DISTRO Agent
            </button>
          </Link>
        </div>

        {/* Pipeline Board */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Production Pipeline</h2>
          {loading ? (
            <div style={{ color: C.muted, fontSize: 14 }}>Loading pipeline...</div>
          ) : (
            <div style={{ overflowX: "auto", paddingBottom: 12 }}>
              <div style={{ display: "flex", gap: 14, minWidth: "max-content" }}>
                {PIPELINE_STAGES.map(stage => {
                  const stagePros = productions.filter(p => p.status === stage);
                  return (
                    <div key={stage} style={{ width: 220, flexShrink: 0 }}>
                      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{stage}</span>
                        <span style={{ fontSize: 11, background: C.border, borderRadius: 999, padding: "2px 8px", color: C.text }}>{stagePros.length}</span>
                      </div>
                      {stagePros.length === 0 ? (
                        <div style={{ fontSize: 12, color: C.muted, textAlign: "center", padding: "20px 0", border: `1px dashed ${C.border}`, borderRadius: 8 }}>Empty</div>
                      ) : (
                        stagePros.map(p => <ProductionCard key={p.id} prod={p} onAdvance={advanceStage} />)
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showNewProd && <NewProductionModal onClose={() => setShowNewProd(false)} onCreated={fetchData} />}
    </div>
  );
}
