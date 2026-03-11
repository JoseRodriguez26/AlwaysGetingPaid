"use client";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          lang === "en" ? "bg-gold text-black" : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          lang === "es" ? "bg-gold text-black" : "text-gray-400 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
