"use client";

export default function MexicanFlag() {
  return (
    <>
      {/* Left side */}
      <div className="fixed left-0 top-0 bottom-0 z-40 flex pointer-events-none">
        <div className="w-[5px] h-full bg-[#006847] opacity-35" />
        <div className="w-[5px] h-full bg-white opacity-25" />
        <div className="w-[5px] h-full bg-[#CE1126] opacity-35" />
      </div>

      {/* Right side */}
      <div className="fixed right-0 top-0 bottom-0 z-40 flex pointer-events-none">
        <div className="w-[5px] h-full bg-[#CE1126] opacity-35" />
        <div className="w-[5px] h-full bg-white opacity-25" />
        <div className="w-[5px] h-full bg-[#006847] opacity-35" />
      </div>
    </>
  );
}
