import { Lock, Eye, Heart, Crown, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Photo Set | Caliente Hub XXX",
};

const mockPhotoSet = {
  id: "p1",
  title: "Golden Hour Sessions Vol. 1",
  description: "50 professionally shot photos from a golden hour session. Exclusive to Fan tier and above.",
  photoCount: 50,
  views: 9400,
  likes: 1920,
  tier: "fan",
  locked: false,
  photos: Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i}`,
    url: `https://images.unsplash.com/photo-${["1534528741775-53994a69daeb", "1529626455594-4ff0802cfb7e", "1524504388940-b1c1722653e1", "1469460340997-2f854421e72f", "1531746020798-e6953c6e8e04", "1496440737103-cd596325d314", "1508214751196-bcfd4ca60f91", "1544005313-94ddf0286df2", "1492106087820-71f1a00d2b11"][i]}?w=800&q=80`,
    locked: i >= 3 && true,
  })),
};

export default function PhotoSetPage({ params }: { params: { id: string } }) {
  const set = mockPhotoSet;

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/content"
          className="inline-flex items-center gap-2 text-white/40 hover:text-gold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Content
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {set.tier && (
                <span className="text-[10px] tracking-widest uppercase text-gold border border-gold/30 px-3 py-1 rounded-full">
                  {set.tier}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/40 text-sm">
                <ImageIcon className="w-3.5 h-3.5" />
                {set.photoCount} photos
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">{set.title}</h1>
            <p className="text-white/40 max-w-xl">{set.description}</p>
          </div>
          <div className="flex items-center gap-6 text-white/30 text-sm shrink-0">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {set.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> {set.likes.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {set.photos.map((photo, i) => (
            <div
              key={photo.id}
              className="relative rounded-sm overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "3/4" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: photo.locked ? "blur(10px) brightness(0.3)" : "brightness(0.9)",
                }}
              />
              {photo.locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="glass w-10 h-10 rounded-full flex items-center justify-center gold-glow-sm">
                    <Lock className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase">Members Only</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unlock CTA if any locked */}
        {set.photos.some((p) => p.locked) && (
          <div className="mt-12 glass border border-gold/20 rounded-sm p-8 text-center">
            <Lock className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Unlock All {set.photoCount} Photos
            </h3>
            <p className="text-white/40 mb-6">
              Subscribe to {set.tier?.toUpperCase()} or higher for full access.
            </p>
            <Link href="/subscribe" className="btn-gold py-3 px-10">
              <Crown className="w-4 h-4" />
              Unlock Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
