"use client";

import { useState } from "react";
import { Upload, Film, Image, DollarSign, Users, Eye, TrendingUp, Plus, Trash2 } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$4,820", icon: <DollarSign className="w-5 h-5" />, change: "+12%" },
  { label: "Subscribers", value: "284", icon: <Users className="w-5 h-5" />, change: "+8%" },
  { label: "Total Views", value: "142K", icon: <Eye className="w-5 h-5" />, change: "+24%" },
  { label: "This Month", value: "$960", icon: <TrendingUp className="w-5 h-5" />, change: "+5%" },
];

const recentContent = [
  { id: "v1", title: "Behind the Scenes", type: "video", status: "published", views: 18200, earnings: "$340" },
  { id: "p1", title: "Golden Hour Vol. 1", type: "photo", status: "published", views: 9400, earnings: "$210" },
  { id: "v2", title: "Red Room Private", type: "video", status: "draft", views: 0, earnings: "$0" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "content">("overview");
  const [uploading, setUploading] = useState(false);

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-eyebrow mb-1">Creator Studio</p>
            <h1 className="font-display text-4xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => setActiveTab("upload")}
            className="btn-gold text-xs py-3 px-6"
          >
            <Plus className="w-4 h-4" />
            Upload Content
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass p-1 rounded-sm mb-10 w-fit">
          {(["overview", "content", "upload"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-sm text-xs tracking-widest uppercase transition-all ${
                activeTab === tab
                  ? "bg-gold text-background font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="glass border border-gold/10 rounded-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center text-gold">
                      {s.icon}
                    </div>
                    <span className="text-green-400 text-xs font-medium">{s.change}</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-white/30 text-xs tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent content */}
            <div className="glass border border-gold/10 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-gold/10">
                <h3 className="font-display text-lg font-bold text-white">Recent Content</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Title", "Type", "Status", "Views", "Earnings", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs tracking-widest uppercase text-white/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentContent.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 text-white text-sm font-medium">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-white/50 text-xs">
                          {item.type === "video" ? <Film className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "published"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-white/5 text-white/40"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">{item.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gold text-sm font-medium">{item.earnings}</td>
                      <td className="px-6 py-4">
                        <button className="text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload */}
        {activeTab === "upload" && (
          <div className="max-w-2xl">
            <div className="glass border border-gold/20 rounded-sm p-8">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Upload New Content</h2>

              {/* Upload dropzone */}
              <div className="border-2 border-dashed border-gold/20 rounded-sm p-12 text-center mb-6 hover:border-gold/40 transition-colors cursor-pointer group">
                <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-gold/50 transition-colors">
                  <Upload className="w-6 h-6 text-gold/60 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-white/50 text-sm mb-1">Drag & drop your file here</p>
                <p className="text-white/30 text-xs">MP4, MOV, JPG, PNG — max 4GB</p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter content title..."
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe this content..."
                    className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Access Tier</label>
                    <select className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40">
                      <option value="free">Free Preview</option>
                      <option value="fan">Fan</option>
                      <option value="vip">VIP</option>
                      <option value="elite">Elite</option>
                      <option value="ppv">Pay-Per-View</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">Price (PPV only)</label>
                    <input
                      type="number"
                      placeholder="$0.00"
                      className="w-full bg-surface-2 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                    />
                  </div>
                </div>
                <button className="btn-gold w-full py-3.5 mt-2">
                  <Upload className="w-4 h-4" />
                  Publish Content
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content manager */}
        {activeTab === "content" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentContent.map((item) => (
                <div key={item.id} className="glass border border-gold/10 rounded-sm p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/50 text-xs">
                      {item.type === "video" ? <Film className="w-3.5 h-3.5 text-gold" /> : <Image className="w-3.5 h-3.5 text-gold" />}
                      {item.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === "published" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/40"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {item.views.toLocaleString()}</span>
                    <span className="text-gold font-semibold">{item.earnings}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-xs py-2 border border-gold/20 text-gold/70 rounded-sm hover:border-gold/50 transition-colors">Edit</button>
                    <button className="text-xs py-2 px-3 border border-red-500/20 text-red-400/60 rounded-sm hover:border-red-500/40 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
