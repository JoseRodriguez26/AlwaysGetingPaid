"use client";

import { useState, useEffect } from "react";

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("age_verified")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
          <span className="text-black font-bold text-xl">CH</span>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-1">Age Verification</h2>
          <p className="text-sm text-gray-400">This website contains adult content</p>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          You must be <span className="text-white font-semibold">18 years or older</span> to enter this site.
        </p>
        <p className="text-xs text-gray-600">
          By entering, you confirm you are at least 18 and agree to our{" "}
          <a href="/terms" className="text-gold/70 hover:text-gold underline">Terms of Service</a>.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => {
              sessionStorage.setItem("age_verified", "true");
              setShow(false);
            }}
            className="btn-gold flex-1 text-base py-3.5"
          >
            I am 18+ &mdash; Enter
          </button>
          <button
            onClick={() => (window.location.href = "https://google.com")}
            className="btn-outline flex-1 text-base py-3.5"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
