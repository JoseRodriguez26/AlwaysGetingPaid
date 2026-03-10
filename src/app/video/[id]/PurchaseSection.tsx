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
          <span className="text-2xl font-bold text-gold">
            ${Number(video.price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">
            Preview only - sign in to purchase
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
      <div className="card border-gold/50 space-y-3">
        <h3 className="text-lg font-semibold text-gold">Payment Submitted!</h3>
        <p className="text-gray-300">
          Your payment reference has been submitted for verification. You will
          get access once your payment is confirmed. This is usually within a few
          hours.
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gold">
          ${Number(video.price).toFixed(2)}
        </span>
        <span className="text-sm text-gray-400">Full video access</span>
      </div>

      {/* Payment options */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
          Step 1: Choose Payment Method & Pay
        </p>

        {/* Payment method selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("cashapp")}
            className={`py-3 rounded-lg border text-sm transition-all ${
              paymentMethod === "cashapp"
                ? "border-green-500/60 bg-green-500/10 text-green-400"
                : "border-border text-gray-400 hover:border-gray-500"
            }`}
          >
            Cash App
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("crypto")}
            className={`py-3 rounded-lg border text-sm transition-all ${
              paymentMethod === "crypto"
                ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
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
            className="block w-full text-center py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
          >
            Pay ${Number(video.price).toFixed(2)} with Cash App
          </a>
        )}

        {paymentMethod === "crypto" && (
          <div className="bg-surface-2 border border-border rounded-lg p-4 space-y-2">
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
        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
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
          className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gold focus:outline-none"
          required
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
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
