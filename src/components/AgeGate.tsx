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
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-display font-bold text-gold">Caliente Hub</h2>
        <h3 className="text-xl text-white">Age Verification</h3>
        <p className="text-gray-300">
          This website contains adult content. You must be 18 years or older to enter.
        </p>
        <p className="text-sm text-gray-500">
          By entering, you confirm you are at least 18 years old and agree to our{" "}
          <a href="/terms" className="text-gold hover:text-gold-light underline">Terms of Service</a>.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              sessionStorage.setItem("age_verified", "true");
              setShow(false);
            }}
            className="btn-gold"
          >
            I am 18+ Enter
          </button>
          <button
            onClick={() => (window.location.href = "https://google.com")}
            className="btn-outline"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
