"use client";

import { useEffect } from "react";

interface StreamPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

export default function StreamPlayer({ src, poster, title }: StreamPlayerProps) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="stream-container relative rounded-sm overflow-hidden bg-surface-2"
      style={{ aspectRatio: "16/9" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        src={src}
        poster={poster}
        controls
        controlsList="nodownload"
        disablePictureInPicture
        playsInline
        onDragStart={(e) => e.preventDefault()}
        className="w-full h-full object-contain bg-black"
        title={title}
      />
    </div>
  );
}
