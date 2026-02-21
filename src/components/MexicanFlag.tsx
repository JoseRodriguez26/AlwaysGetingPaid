"use client";

export default function MexicanFlag() {
  return (
    <>
      {/* Top banner — above navbar */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex h-[5px] pointer-events-none">
        <div className="flex-1 bg-[#006847]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE1126]" />
      </div>

      {/* Bottom banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] flex h-[5px] pointer-events-none">
        <div className="flex-1 bg-[#006847]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE1126]" />
      </div>

      {/* Left side */}
      <div className="fixed left-0 top-0 bottom-0 z-[60] flex pointer-events-none">
        <div className="w-[5px] h-full bg-[#006847]" />
        <div className="w-[5px] h-full bg-white opacity-80" />
        <div className="w-[5px] h-full bg-[#CE1126]" />
      </div>

      {/* Right side */}
      <div className="fixed right-0 top-0 bottom-0 z-[60] flex pointer-events-none">
        <div className="w-[5px] h-full bg-[#CE1126]" />
        <div className="w-[5px] h-full bg-white opacity-80" />
        <div className="w-[5px] h-full bg-[#006847]" />
      </div>
    </>
  );
}
