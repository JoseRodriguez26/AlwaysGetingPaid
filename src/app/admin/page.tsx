"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail_url: string;
  published: boolean;
  created_at: string;
};

export default function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (data.user && data.user.email === adminEmail) {
        setAuthorized(true);
        loadVideos();
      } else {
        setAuthorized(false);
      }
    });
  }, []);

  async function loadVideos() {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data.videos ?? []);
  }

  async function uploadFile(file: File, bucket: string): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    form.append("bucket", bucket);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!data.url) throw new Error(data.error ?? "Upload failed");
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!videoFile || !previewFile) {
      setMsg({ text: "Full video and preview clip are required.", ok: false });
      return;
    }
    setUploading(true);
    setMsg(null);
    try {
      const [fullUrl, previewUrl, thumbUrl] = await Promise.all([
        uploadFile(videoFile, "videos"),
        uploadFile(previewFile, "videos"),
        thumbFile ? uploadFile(thumbFile, "thumbnails") : Promise.resolve(""),
      ]);

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          duration,
          full_video_url: fullUrl,
          preview_url: previewUrl,
          thumbnail_url: thumbUrl,
          price: 0,
          published: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save video");

      setMsg({ text: "✓ Video uploaded and published!", ok: true });
      setTitle(""); setDescription(""); setDuration("");
      setVideoFile(null); setPreviewFile(null); setThumbFile(null);
      loadVideos();
    } catch (err: any) {
      setMsg({ text: err.message, ok: false });
    }
    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    loadVideos();
  }

  if (authorized === null) return (
    <div style={styles.center}><span style={{ color: "#555" }}>Checking access...</span></div>
  );

  if (!authorized) return (
    <div style={styles.center}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h2 style={{ color: "#cc0000", fontWeight: 800, marginBottom: 8 }}>Access Denied</h2>
        <p style={{ color: "#555" }}>Admin accounts only.</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "80px 20px 60px", color: "#e5e5e5" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: 0 }}>
            Admin <span style={{ color: "#cc0000" }}>Upload</span>
          </h1>
          <p style={{ color: "#444", fontSize: 14, marginTop: 6 }}>Upload videos for your subscribers</p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} style={styles.card}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            New Video
          </h2>

          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input required value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Video title..." style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Short description..." rows={3}
              style={{ ...styles.input, resize: "vertical" }} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Duration (e.g. 12:34)</label>
            <input value={duration} onChange={e => setDuration(e.target.value)}
              placeholder="12:34" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Full Video File (MP4) *</label>
            <input type="file" accept="video/*" required
              onChange={e => setVideoFile(e.target.files?.[0] ?? null)}
              style={styles.fileInput} />
            {videoFile && <span style={styles.fileName}>{videoFile.name}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Preview Clip (short teaser) *</label>
            <input type="file" accept="video/*" required
              onChange={e => setPreviewFile(e.target.files?.[0] ?? null)}
              style={styles.fileInput} />
            {previewFile && <span style={styles.fileName}>{previewFile.name}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Thumbnail Image (optional)</label>
            <input type="file" accept="image/*"
              onChange={e => setThumbFile(e.target.files?.[0] ?? null)}
              style={styles.fileInput} />
            {thumbFile && <span style={styles.fileName}>{thumbFile.name}</span>}
          </div>

          {msg && (
            <div style={{
              padding: "12px 16px", borderRadius: 6, marginBottom: 16,
              background: msg.ok ? "rgba(0,180,80,0.1)" : "rgba(204,0,0,0.1)",
              border: `1px solid ${msg.ok ? "rgba(0,180,80,0.3)" : "rgba(204,0,0,0.3)"}`,
              color: msg.ok ? "#4ade80" : "#ff6666", fontSize: 14, fontWeight: 600,
            }}>
              {msg.text}
            </div>
          )}

          <button type="submit" disabled={uploading} style={{
            width: "100%", padding: "14px", borderRadius: 6,
            background: uploading ? "#880000" : "#cc0000",
            color: "#fff", fontWeight: 800, fontSize: 15, border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
            textTransform: "uppercase", letterSpacing: "0.08em",
            boxShadow: "0 0 20px rgba(204,0,0,0.3)",
          }}>
            {uploading ? "Uploading... please wait" : "Upload & Publish"}
          </button>
        </form>

        {/* Video list */}
        {videos.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Published Videos ({videos.length})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {videos.map(v => (
                <div key={v.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", borderRadius: 6,
                  background: "#111", border: "1px solid #1a1a1a", gap: 12,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e5e5", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {v.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#444" }}>
                      {v.duration && `${v.duration} · `}{new Date(v.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(v.id)} style={{
                    padding: "6px 14px", borderRadius: 4, border: "1px solid rgba(204,0,0,0.3)",
                    background: "rgba(204,0,0,0.08)", color: "#cc0000",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0,
                  }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "#0a0a0a",
  },
  card: {
    background: "#111", border: "1px solid #1a1a1a",
    borderRadius: 8, padding: 28,
  },
  field: { marginBottom: 20 },
  label: {
    display: "block", fontSize: 12, fontWeight: 700, color: "#666",
    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
  },
  input: {
    width: "100%", padding: "11px 14px", borderRadius: 6,
    border: "1px solid #222", background: "rgba(255,255,255,0.04)",
    color: "#e5e5e5", fontSize: 14, outline: "none",
    boxSizing: "border-box" as const,
  },
  fileInput: {
    display: "block", width: "100%", fontSize: 13, color: "#888",
    background: "rgba(255,255,255,0.03)", border: "1px solid #222",
    borderRadius: 6, padding: "10px 14px", cursor: "pointer",
    boxSizing: "border-box" as const,
  },
  fileName: { fontSize: 12, color: "#cc0000", marginTop: 6, display: "block" },
};
