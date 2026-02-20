import ContentGrid from "@/components/ContentGrid";

export const metadata = {
  title: "Content | Caliente Hub XXX",
  description: "Browse exclusive content — videos, photo sets, and more.",
};

export default function ContentPage() {
  return (
    <div className="pt-24">
      {/* Page header */}
      <div className="relative py-20 px-6 text-center overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(107,33,168,0.15) 0%, transparent 60%), #080808",
          }}
        />
        <div className="relative z-10">
          <p className="section-eyebrow mb-3">The Vault</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            All <span className="text-gold-gradient">Content</span>
          </h1>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>
      </div>

      <ContentGrid />
    </div>
  );
}
