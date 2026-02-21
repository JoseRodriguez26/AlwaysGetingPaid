"use client";

import { useState, useEffect } from "react";
import { Upload, Film, Image, Eye, Plus, Trash2, CheckCircle, AlertCircle, Users, ShieldCheck, ShieldX, UserPlus } from "lucide-react";

type ContentRow = {
  id: string;
  title: string;
  type: "video" | "photo";
  is_free_preview: boolean;
  tier_required?: string | null;
  price?: number | null;
  views: number;
  likes: number;
  created_at: string;
  thumbnail_url: string;
};

type AccessRow = {
  id: string;
  user_email: string;
  is_active: boolean;
  payment_reference?: string | null;
  notes?: string | null;
  granted_at: string;
  expires_at?: string | null;
};

type TabType = "overview" | "upload" | "content" | "access";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [content, setContent] = useState<ContentRow[]>([]);
  const [accessList, setAccessList] = useState<AccessRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessLoading, setAccessLoading] = useState(false);

  // Upload form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "photo" as "photo" | "video",
    thumbnail_url: "",
    storage_url: "",
    tier_required: "free",
    price: "",
    is_free_preview: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Access form state
  const [accessForm, setAccessForm] = useState({ email: "", payment_reference: "", notes: "" });
  const [accessSubmitting, setAccessSubmitting] = useState(false);
  const [accessStatus, setAccessStatus] = useState<"idle" | "success" | "error">("idle");
  const [accessError, setAccessError] = useState("");

  async function loadContent() {
    setLoading(true);
    const res = await fetch("/api/content");
    const json = await res.json();
    if (json.content) setContent(json.content);
    setLoading(false);
  }

  async function loadAccess() {
    setAccessLoading(true);
    const res = await fetch("/api/access");
    const json = await res.json();
    if (json.access) setAccessList(json.access);
    setAccessLoading(false);
  }

  useEffect(() => {
    loadContent();
    loadAccess();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setUploadStatus("idle");

    const payload = {
      title: form.title,
      description: form.description,
      type: form.type,
      thumbnail_url: form.thumbnail_url,
      storage_url: form.storage_url,
      tier_required: form.tier_required === "free" ? null : form.tier_required,
      price: form.tier_required === "ppv" && form.price ? form.price : null,
      is_free_preview: form.tier_required === "free",
    };

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok) {
      setUploadStatus("success");
      setForm({
        title: "",
        description: "",
        type: "photo",
        thumbnail_url: "",
        storage_url: "",
        tier_required: "free",
        price: "",
        is_free_preview: false,
      });
      await loadContent();
      setTimeout(() => setUploadStatus("idle"), 4000);
    } else {
      setUploadStatus("error");
      setErrorMessage(json.error || "Something went wrong.");
    }

    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this content? This cannot be undone.")) return;
    await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    setContent((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleGrantAccess(e: React.FormEvent) {
    e.preventDefault();
    setAccessSubmitting(true);
    setAccessStatus("idle");

    const res = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accessForm),
    });

    const json = await res.json();

    if (res.ok) {
      setAccessStatus("success");
      setAccessForm({ email: "", payment_reference: "", notes: "" });
      await loadAccess();
      setTimeout(() => setAccessStatus("idle"), 4000);
    } else {
      setAccessStatus("error");
      setAccessError(json.error || "Something went wrong.");
    }

    setAccessSubmitting(false);
  }

  async function handleToggleAccess(id: string, currentStatus: boolean) {
    await fetch("/api/access", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active: !currentStatus }),
    });
    setAccessList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: !currentStatus } : a))
    );
  }

  async function handleRevokeAccess(id: string) {
    if (!confirm("Revoke this user's access? They won't be able to view content.")) return;
    await fetch(`/api/access?id=${id}`, { method: "DELETE" });
    setAccessList((prev) => prev.filter((a) => a.id !== id));
  }

  const totalViews = content.reduce((sum, c) => sum + c.views, 0);
  const activeAccessCount = accessList.filter((a) => a.is_active).length;

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-eyebrow mb-1">Creator Studio</p>
            <h1 className="font-display text-4xl font-bold text-white">Dashboard</h1>
          </div>
          <button onClick={() => setActiveTab("upload")} className="btn-gold text-xs py-3 px-6 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Content
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass p-1 rounded-sm mb-10 w-fit">
          {(["overview", "content", "upload", "access"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-sm text-xs tracking-widest uppercase transition-all ${
                activeTab === tab
                  ? "bg-gold text-background font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab === "access" ? "Gate" : tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total Content", value: content.length.toString(), icon: <Film className="w-5 h-5" /> },
                { label: "Total Views", value: totalViews.toLocaleString(), icon: <Eye className="w-5 h-5" /> },
                { label: "Active Access", value: activeAccessCount.toString(), icon: <Users className="w-5 h-5" /> },
                { label: "Videos", value: content.filter((c) => c.type === "video").length.toString(), icon: <Film className="w-5 h-5" /> },
              ].map((s) => (
                <div key={s.label} className="glass border border-gold/10 rounded-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center text-gold">
                      {s.icon}
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-white/30 text-xs tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent content table */}
            <div className="glass border border-gold/10 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-gold/10">
                <h3 className="font-display text-lg font-bold text-white">Recent Content</h3>
              </div>
              {loading ? (
                <p className="text-white/30 text-sm px-6 py-8">Loading...</p>
              ) : content.length === 0 ? (
                <p className="text-white/30 text-sm px-6 py-8">No content yet. Upload your first piece!</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Title", "Type", "Access", "Views", "Actions"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-xs tracking-widest uppercase text-white/30">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.slice(0, 10).map((item) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-medium">{item.title}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-white/50 text-xs">
                            {item.type === "video" ? <Film className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold/80 uppercase tracking-wider">
                            {item.is_free_preview ? "free" : item.tier_required || "members"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/50 text-sm">{item.views.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDelete(item.id)} className="text-white/30 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Upload */}
        {activeTab === "upload" && (
          <div className="max-w-2xl">
            {uploadStatus === "success" && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-sm p-4 mb-6">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <p className="text-green-400 text-sm">Content published successfully!</p>
              </div>
            )}
            {uploadStatus === "error" && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="glass border border-gold/20 rounded-sm p-8">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Upload New Content</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type selector */}
                <div className="grid grid-cols-2 gap-3">
                  {(["photo", "video"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex items-center justify-center gap-2 py-3 rounded-sm border text-sm transition-all ${
                        form.type === t
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-white/10 text-white/40 hover:border-white/20"
                      }`}
                    >
                      {t === "video" ? <Film className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Title *</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter content title..."
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe this content..."
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={form.thumbnail_url}
                    onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    {form.type === "video" ? "Video URL (stream link)" : "Content URL"}
                  </label>
                  <input
                    type="text"
                    value={form.storage_url}
                    onChange={(e) => setForm({ ...form, storage_url: e.target.value })}
                    placeholder={form.type === "video" ? "Video stream URL" : "https://..."}
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Access</label>
                  <select
                    value={form.tier_required}
                    onChange={(e) => setForm({ ...form, tier_required: e.target.value })}
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40"
                  >
                    <option value="free">Free Preview</option>
                    <option value="members">Members Only</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full py-3.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {submitting ? "Publishing..." : "Publish Content"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Content manager */}
        {activeTab === "content" && (
          <div>
            {loading ? (
              <p className="text-white/30 text-sm">Loading...</p>
            ) : content.length === 0 ? (
              <div className="glass border border-gold/10 rounded-sm p-12 text-center">
                <p className="text-white/30 text-sm mb-4">No content published yet.</p>
                <button onClick={() => setActiveTab("upload")} className="btn-gold text-xs py-3 px-8">
                  Upload Your First Content
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.map((item) => (
                  <div key={item.id} className="glass border border-gold/10 rounded-sm p-5 flex flex-col gap-4">
                    {item.thumbnail_url && (
                      <div
                        className="w-full h-32 rounded-sm bg-surface-2"
                        style={{
                          backgroundImage: `url(${item.thumbnail_url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-white/50 text-xs">
                        {item.type === "video" ? <Film className="w-3.5 h-3.5 text-gold" /> : <Image className="w-3.5 h-3.5 text-gold" />}
                        {item.type}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                        published
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/30 flex items-center gap-1 text-xs">
                        <Eye className="w-3.5 h-3.5" /> {item.views.toLocaleString()}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase text-gold/70 border border-gold/20 px-2 py-0.5 rounded-full">
                        {item.is_free_preview ? "free" : "members"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs py-2 px-3 border border-red-500/20 text-red-400/60 rounded-sm hover:border-red-500/40 transition-colors w-full flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Access / Gate management */}
        {activeTab === "access" && (
          <div>
            {/* Grant access form */}
            <div className="max-w-2xl mb-10">
              {accessStatus === "success" && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-sm p-4 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <p className="text-green-400 text-sm">Access granted successfully!</p>
                </div>
              )}
              {accessStatus === "error" && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-red-400 text-sm">{accessError}</p>
                </div>
              )}

              <div className="glass border border-gold/20 rounded-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <UserPlus className="w-5 h-5 text-gold" />
                  <h2 className="font-display text-2xl font-bold text-white">Grant Access</h2>
                </div>
                <p className="text-white/40 text-sm mb-6">
                  Enter the user&apos;s email to open the gate and give them access to your content.
                </p>

                <form onSubmit={handleGrantAccess} className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">User Email *</label>
                    <input
                      required
                      type="email"
                      value={accessForm.email}
                      onChange={(e) => setAccessForm({ ...accessForm, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Cash App Payment Ref</label>
                    <input
                      type="text"
                      value={accessForm.payment_reference}
                      onChange={(e) => setAccessForm({ ...accessForm, payment_reference: e.target.value })}
                      placeholder="$cashtag or transaction ID"
                      className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Notes</label>
                    <input
                      type="text"
                      value={accessForm.notes}
                      onChange={(e) => setAccessForm({ ...accessForm, notes: e.target.value })}
                      placeholder="Optional notes..."
                      className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={accessSubmitting}
                    className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {accessSubmitting ? "Granting..." : "Grant Access"}
                  </button>
                </form>
              </div>
            </div>

            {/* Access list */}
            <div className="glass border border-gold/10 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-gold/10 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">Access List</h3>
                <span className="text-xs text-gold/80 bg-gold/10 px-3 py-1 rounded-full">
                  {activeAccessCount} active
                </span>
              </div>
              {accessLoading ? (
                <p className="text-white/30 text-sm px-6 py-8">Loading...</p>
              ) : accessList.length === 0 ? (
                <p className="text-white/30 text-sm px-6 py-8">No users have been granted access yet.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Email", "Status", "Payment Ref", "Granted", "Actions"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-xs tracking-widest uppercase text-white/30">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {accessList.map((item) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-medium">{item.user_email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.is_active
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {item.is_active ? "Active" : "Revoked"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/40 text-sm">{item.payment_reference || "—"}</td>
                        <td className="px-6 py-4 text-white/40 text-sm">
                          {new Date(item.granted_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleAccess(item.id, item.is_active)}
                              className={`text-xs px-3 py-1 rounded-sm border transition-colors flex items-center gap-1.5 ${
                                item.is_active
                                  ? "border-red-500/20 text-red-400/70 hover:border-red-500/40"
                                  : "border-green-500/20 text-green-400/70 hover:border-green-500/40"
                              }`}
                            >
                              {item.is_active ? (
                                <>
                                  <ShieldX className="w-3 h-3" /> Disable
                                </>
                              ) : (
                                <>
                                  <ShieldCheck className="w-3 h-3" /> Enable
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleRevokeAccess(item.id)}
                              className="text-white/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
