"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { Video } from "@/lib/supabase";
import Link from "next/link";

export default function PurchaseSection({
  video,
  isLoggedIn,
}: {
  video: Video;
  isLoggedIn: boolean;
}) {
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashapp");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const cashappTag = process.env.NEXT_PUBLIC_CASHAPP_TAG || "";
  const cashappLink = cashappTag
    ? `https://cash.app/${cashappTag}/${Number(video.price).toFixed(2)}`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentRef.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Please sign in first");
        return;
      }

      const { error: insertError } = await supabase.from("purchases").insert({
        user_id: user.id,
        user_email: user.email,
        video_id: video.id,
        amount: video.price,
        payment_method: paymentMethod,
        payment_reference: paymentRef.trim(),
        status: "pending",
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gold">
            ${Number(video.price).toFixed(2)}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-surface-2 text-gray-400 border border-border">
            Sign in to purchase
          </span>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in" className="btn-gold text-center flex-1">
            Sign In to Buy
          </Link>
          <Link href="/sign-up" className="btn-outline text-center flex-1">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="card border-green-500/20 bg-green-500/[0.03] space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-400">Payment Submitted!</h3>
            <p className="text-sm text-gray-400 mt-1">
              Your payment reference has been submitted for verification. You will
              get access once confirmed, usually within a few hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gold">
          ${Number(video.price).toFixed(2)}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gold/10 text-gold border border-gold/20">
          Full video access
        </span>
      </div>

      {/* Payment options */}
      <div className="space-y-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Step 1: Choose Payment Method & Pay
        </p>

        {/* Payment method selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("cashapp")}
            className={`py-3.5 rounded-xl border text-sm font-medium transition-all ${
              paymentMethod === "cashapp"
                ? "border-green-500/40 bg-green-500/5 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                : "border-border text-gray-400 hover:border-gray-500"
            }`}
          >
            Cash App
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("crypto")}
            className={`py-3.5 rounded-xl border text-sm font-medium transition-all ${
              paymentMethod === "crypto"
                ? "border-orange-500/40 bg-orange-500/5 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                : "border-border text-gray-400 hover:border-gray-500"
            }`}
          >
            Crypto (BTC/USDT)
          </button>
        </div>

        {/* Payment action */}
        {paymentMethod === "cashapp" && cashappLink && (
          <a
            href={cashappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20"
          >
            Pay ${Number(video.price).toFixed(2)} with Cash App
          </a>
        )}

        {paymentMethod === "crypto" && (
          <div className="bg-surface-2 border border-border rounded-xl p-4 space-y-2">
            <p className="text-sm text-gray-300">
              Send exactly <strong className="text-gold">${Number(video.price).toFixed(2)} USD</strong> equivalent in BTC or USDT.
            </p>
            <p className="text-xs text-gray-500">
              DM for wallet address or contact info. Include the video title in your message.
            </p>
          </div>
        )}
      </div>

      {/* Submit payment reference */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Step 2: Confirm Your Payment
        </p>
        <p className="text-sm text-gray-500">
          After paying, enter your transaction ID or payment reference below.
        </p>
        <input
          type="text"
          value={paymentRef}
          onChange={(e) => setPaymentRef(e.target.value)}
          placeholder="Transaction ID or payment reference"
          className="input-field"
          required
        />
        {error && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold w-full"
        >
          {submitting ? "Submitting..." : "Submit Payment Reference"}
        </button>
      </form>
    </div>
  );
}
