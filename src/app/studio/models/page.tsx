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
};

const STATUS_COLORS: Record<string, string> = {
  prospect: C.muted,
  negotiating: C.gold,
  contracted: "#aa55ff",
  active: C.neon,
};

type Compliance = {
  id: string;
  model_id: string;
  id1_verified: boolean;
  id2_verified: boolean;
  photo_with_id: boolean;
  contract_signed: boolean;
  std_test_result: string;
  std_test_expiry?: string;
};

type Model = {
  id: string;
  stage_name: string;
  platform_handle?: string;
  contact_platform?: string;
  contact_info?: string;
  status: string;
  rate_bg?: number;
  rate_bgg?: number;
  rate_gg?: number;
  rate_anal?: number;
  rate_custom?: number;
  notes?: string;
  model_compliance?: Compliance[];
};

function inp(extra?: React.CSSProperties): React.CSSProperties {
  return { width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.text, fontSize: 13, boxSizing: "border-box", ...extra };
}

function ComplianceCheck({ label, checked }: { label: string; checked: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, marginRight: 12, color: checked ? C.neon : C.pink }}>
      {checked ? "✓" : "✗"} {label}
    </span>
  );
}

function ModelCard({ model, onComplianceToggle }: { model: Model; onComplianceToggle: (modelId: string, field: string, val: boolean, comp: Compliance) => void }) {
  const comp = model.model_compliance?.[0];
  const checks = comp ? [
    { field: "id1_verified", label: "ID 1", val: comp.id1_verified },
    { field: "id2_verified", label: "ID 2", val: comp.id2_verified },
    { field: "photo_with_id", label: "Photo w/ID", val: comp.photo_with_id },
    { field: "contract_signed", label: "Contract", val: comp.contract_signed },
    { field: "std_test_result", label: "STD Clear", val: comp.std_test_result === "clear" },
  ] : [];

  const completeCount = checks.filter(c => c.val).length;
  const allDone = completeCount === 5;
  const statusColor = STATUS_COLORS[model.status] ?? C.muted;

  // STD expiry warning
  let expiryWarning = false;
  if (comp?.std_test_expiry) {
    const expiry = new Date(comp.std_test_expiry);
    const daysLeft = Math.ceil((expiry.getTime() - Date.now()) / 86400000);
    expiryWarning = daysLeft <= 30 && daysLeft >= 0;
  }

  const handleCheckToggle = (field: string, currentVal: boolean) => {
    if (!comp) return;
    let updates: Partial<Compliance>;
    if (field === "std_test_result") {
      updates = { ...comp, std_test_result: currentVal ? "pending" : "clear" };
    } else {
      updates = { ...comp, [field]: !currentVal };
    }
    onComplianceToggle(model.id, field, !currentVal, { ...comp, ...updates });
  };

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{model.stage_name}</span>
          {model.platform_handle && (
            <span style={{ fontSize: 13, color: C.muted, marginLeft: 10 }}>@{model.platform_handle}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, background: statusColor + "22", border: `1px solid ${statusColor}44`, borderRadius: 6, padding: "3px 10px", color: statusColor }}>
            {model.status}
          </span>
          {allDone ? (
            <span style={{ fontSize: 12, color: C.neon }}>✅ Compliant</span>
          ) : expiryWarning ? (
            <span style={{ fontSize: 12, color: C.gold }}>⚠️ STD Expiring</span>
          ) : (
            <span style={{ fontSize: 12, color: C.pink }}>⚠️ Incomplete</span>
          )}
        </div>
      </div>

      {/* Compliance checklist */}
      {comp ? (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
            {checks.map(c => (
              <button key={c.field} onClick={() => handleCheckToggle(c.field, c.val)}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, padding: "3px 10px", borderRadius: 6, border: `1px solid ${c.val ? C.neon + "44" : C.pink + "44"}`, background: c.val ? C.neon + "11" : C.pink + "11", color: c.val ? C.neon : C.pink, cursor: "pointer" }}>
                {c.val ? "✓" : "✗"} {c.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            Compliance: <span style={{ color: completeCount === 5 ? C.neon : C.gold, fontWeight: 600 }}>{completeCount}/5</span> complete
          </div>
          {expiryWarning && (
            <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>⚠️ STD test expires soon — {comp.std_test_expiry}</div>
          )}
        </div>
      ) : (
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>No compliance record</div>
      )}

      {/* Rates */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {model.rate_bg && <span style={{ fontSize: 11, color: C.muted }}>B/G: <span style={{ color: C.gold }}>${model.rate_bg}</span></span>}
        {model.rate_bgg && <span style={{ fontSize: 11, color: C.muted }}>B/G/G: <span style={{ color: C.gold }}>${model.rate_bgg}</span></span>}
        {model.rate_gg && <span style={{ fontSize: 11, color: C.muted }}>G/G: <span style={{ color: C.gold }}>${model.rate_gg}</span></span>}
        {model.rate_anal && <span style={{ fontSize: 11, color: C.muted }}>Anal: <span style={{ color: C.gold }}>${model.rate_anal}</span></span>}
        {model.rate_custom && <span style={{ fontSize: 11, color: C.muted }}>Custom: <span style={{ color: C.gold }}>${model.rate_custom}</span></span>}
      </div>
    </div>
  );
}

const BLANK_FORM = { stage_name: "", contact_platform: "twitter", contact_info: "", platform_handle: "", status: "prospect", rate_bg: "", rate_bgg: "", rate_gg: "", rate_anal: "", rate_custom: "", notes: "" };

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...BLANK_FORM });
  const [saving, setSaving] = useState(false);

  const fetchModels = async () => {
    setLoading(true);
    const res = await fetch("/api/studio/models").then(r => r.json());
    setModels(res.models ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchModels(); }, []);

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const saveModel = async () => {
    if (!form.stage_name) return;
    setSaving(true);
    const payload: Record<string, unknown> = { ...form };
    for (const k of ["rate_bg", "rate_bgg", "rate_gg", "rate_anal", "rate_custom"]) {
      payload[k] = payload[k] ? Number(payload[k]) : null;
    }
    await fetch("/api/studio/models", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    setForm({ ...BLANK_FORM });
    setShowForm(false);
    fetchModels();
  };

  const handleComplianceToggle = async (modelId: string, _field: string, _val: boolean, updatedComp: Compliance) => {
    const { id: _id, model_id, ...rest } = updatedComp;
    await fetch("/api/studio/compliance", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model_id, ...rest }) });
    fetchModels();
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>👤 Model CRM &amp; Compliance</h1>
            <p style={{ color: C.muted, marginTop: 4, fontSize: 14 }}>{models.length} model{models.length !== 1 ? "s" : ""} in database</p>
          </div>
          <button onClick={() => setShowForm(s => !s)}
            style={{ background: C.gold, border: "none", borderRadius: 10, padding: "10px 20px", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            {showForm ? "Cancel" : "+ Add Model"}
          </button>
        </div>

        {/* Add Model Form */}
        {showForm && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: C.text, marginBottom: 18, fontSize: 16 }}>New Model</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input placeholder="Stage Name *" value={form.stage_name} onChange={f("stage_name")} style={inp()} />
              <input placeholder="Platform Handle" value={form.platform_handle} onChange={f("platform_handle")} style={inp()} />
              <select value={form.contact_platform} onChange={f("contact_platform")} style={inp()}>
                <option value="twitter">Twitter/X</option>
                <option value="instagram">Instagram</option>
                <option value="telegram">Telegram</option>
                <option value="email">Email</option>
              </select>
              <input placeholder="Contact Info" value={form.contact_info} onChange={f("contact_info")} style={inp()} />
              <select value={form.status} onChange={f("status")} style={inp()}>
                <option value="prospect">Prospect</option>
                <option value="negotiating">Negotiating</option>
                <option value="contracted">Contracted</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 12 }}>
              {[["rate_bg","B/G"],["rate_bgg","B/G/G"],["rate_gg","G/G"],["rate_anal","Anal"],["rate_custom","Custom"]].map(([k,label]) => (
                <input key={k} placeholder={`$${label}`} value={(form as Record<string,string>)[k]} onChange={f(k)} type="number" style={inp()} />
              ))}
            </div>
            <textarea placeholder="Notes" value={form.notes} onChange={f("notes")} style={{ ...inp(), height: 70, resize: "none" } as React.CSSProperties} />
            <button onClick={saveModel} disabled={saving}
              style={{ marginTop: 14, background: C.neon, border: "none", borderRadius: 8, padding: "10px 28px", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {saving ? "Saving..." : "Save Model"}
            </button>
          </div>
        )}

        {/* Model List */}
        {loading ? (
          <div style={{ color: C.muted }}>Loading models...</div>
        ) : models.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👤</div>
            <div>No models yet. Add your first performer above.</div>
          </div>
        ) : (
          models.map(m => <ModelCard key={m.id} model={m} onComplianceToggle={handleComplianceToggle} />)
        )}
      </div>
    </div>
  );
}
