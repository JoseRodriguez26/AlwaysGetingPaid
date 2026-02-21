"use client";

export default function MexicanFlag() {
  return (
    <>
      {/* Top banner */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-[6px] pointer-events-none">
        <div className="flex-1 bg-[#006847]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE1126]" />
      </div>

      {/* Left side */}
      <div className="fixed left-0 top-0 bottom-0 z-40 flex pointer-events-none">
        <div className="w-[4px] h-full bg-[#006847] opacity-70" />
        <div className="w-[4px] h-full bg-white opacity-50" />
        <div className="w-[4px] h-full bg-[#CE1126] opacity-70" />
      </div>

      {/* Right side */}
      <div className="fixed right-0 top-0 bottom-0 z-40 flex pointer-events-none">
        <div className="w-[4px] h-full bg-[#CE1126] opacity-70" />
        <div className="w-[4px] h-full bg-white opacity-50" />
        <div className="w-[4px] h-full bg-[#006847] opacity-70" />
      </div>
    </>
  );
}
