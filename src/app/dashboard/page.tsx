"use client";

import { useState, useEffect } from "react";
import type { Video, Purchase } from "@/lib/supabase";

type Tab = "overview" | "videos" | "upload" | "purchases";

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [videos, setVideos] = useState<Video[]>([]);
  const [purchases, setPurchases] = useState<(Purchase & { videos?: Video })[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload form
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "9.99",
    preview_url: "",
    full_video_url: "",
    thumbnail_url: "",
    duration: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    const [videosRes, purchasesRes] = await Promise.all([
      fetch("/api/videos"),
      fetch("/api/purchases"),
    ]);
    const videosJson = await videosRes.json();
    const purchasesJson = await purchasesRes.json();
    if (videosJson.videos) setVideos(videosJson.videos);
    if (purchasesJson.purchases) setPurchases(purchasesJson.purchases);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        published: true,
      }),
    });

    if (res.ok) {
      setMessage("Video published!");
      setForm({ title: "", description: "", price: "9.99", preview_url: "", full_video_url: "", thumbnail_url: "", duration: "" });
      await loadData();
    } else {
      const json = await res.json();
      setMessage(json.error || "Error uploading");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  async function handlePurchaseAction(id: string, status: "approved" | "rejected") {
    const res = await fetch("/api/purchases", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setPurchases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    }
  }

  const pendingCount = purchases.filter((p) => p.status === "pending").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-gold">Dashboard</h1>
        <button onClick={() => setTab("upload")} className="btn-gold text-sm">
          + Upload Video
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface border border-border rounded-lg p-1 mb-8 w-fit">
        {(["overview", "videos", "upload", "purchases"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-md text-sm capitalize transition-all ${
              tab === t
                ? "bg-gold text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
            {t === "purchases" && pendingCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Videos", value: videos.length },
              { label: "Pending Payments", value: pendingCount },
              { label: "Approved", value: purchases.filter((p) => p.status === "approved").length },
              { label: "Total Revenue", value: `$${purchases.filter((p) => p.status === "approved").reduce((s, p) => s + Number(p.amount), 0).toFixed(2)}` },
            ].map((s) => (
              <div key={s.label} className="card">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {pendingCount > 0 && (
            <div className="card border-gold/30 mb-6">
              <p className="text-gold font-semibold">
                You have {pendingCount} pending payment(s) to review.
              </p>
              <button onClick={() => setTab("purchases")} className="text-sm text-gold hover:text-gold-light mt-2 underline">
                Review now &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Videos */}
      {tab === "videos" && (
        <div>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : videos.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No videos yet.</p>
              <button onClick={() => setTab("upload")} className="btn-gold text-sm">
                Upload Your First Video
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {videos.map((v) => (
                <div key={v.id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {v.thumbnail_url && (
                      <img src={v.thumbnail_url} alt="" className="w-20 h-12 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">{v.title}</h3>
                      <p className="text-sm text-gray-500">
                        ${Number(v.price).toFixed(2)} &middot; {v.duration || "N/A"}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(v.id)} className="text-gray-500 hover:text-red-400 text-sm">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload */}
      {tab === "upload" && (
        <div className="max-w-xl">
          {message && (
            <div className={`card mb-4 ${message.includes("Error") ? "border-red-500/50" : "border-green-500/50"}`}>
              <p className={message.includes("Error") ? "text-red-400" : "text-green-400"}>
                {message}
              </p>
            </div>
          )}
          <form onSubmit={handleUpload} className="card space-y-4">
            <h2 className="text-xl font-display font-bold text-white mb-2">
              Upload New Video
            </h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title *</label>
              <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price ($) *</label>
                <input required type="number" step="0.01" min="0.99" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Duration</label>
                <input type="text" placeholder="e.g. 24:30" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gold focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Preview Video URL * (59 sec clip)</label>
              <input required type="url" value={form.preview_url} onChange={(e) => setForm({ ...form, preview_url: e.target.value })}
                placeholder="https://your-r2-bucket.../preview.mp4"
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Video URL *</label>
              <input required type="url" value={form.full_video_url} onChange={(e) => setForm({ ...form, full_video_url: e.target.value })}
                placeholder="https://your-r2-bucket.../full-video.mp4"
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Thumbnail URL</label>
              <input type="url" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gold focus:outline-none" />
            </div>
            <button type="submit" disabled={submitting} className="btn-gold w-full">
              {submitting ? "Publishing..." : "Publish Video"}
            </button>
          </form>
        </div>
      )}

      {/* Purchases / Payment verification */}
      {tab === "purchases" && (
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-4">
            Payment Verification
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : purchases.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500">No purchase requests yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...purchases]
                .sort((a, _b) => (a.status === "pending" ? -1 : 1))
                .map((p) => (
                  <div key={p.id} className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${p.status === "pending" ? "border-gold/30" : ""}`}>
                    <div>
                      <p className="text-white font-semibold">{p.user_email}</p>
                      <p className="text-sm text-gray-500">
                        ${Number(p.amount).toFixed(2)} via {p.payment_method} &middot;{" "}
                        Ref: <span className="text-gray-300">{p.payment_reference}</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(p.created_at).toLocaleDateString()} &middot;{" "}
                        Video: {p.videos?.title || p.video_id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handlePurchaseAction(p.id, "approved")}
                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handlePurchaseAction(p.id, "rejected")}
                            className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          p.status === "approved"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}>
                          {p.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
