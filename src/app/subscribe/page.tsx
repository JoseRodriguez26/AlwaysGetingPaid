import Link from "next/link";

export default function SubscribePage() {
  const cashappTag = process.env.NEXT_PUBLIC_CASHAPP_TAG || "$YourCashTag";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-gold text-center mb-4">
        How to Get Access
      </h1>
      <p className="text-gray-400 text-center mb-12">
        Simple 3-step process to unlock any video
      </p>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="card flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold shrink-0">
            1
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              Browse & Pick a Video
            </h3>
            <p className="text-gray-400 mt-1">
              Browse our collection on the home page. Each video has a free
              preview (up to 1 minute) so you know what you are getting.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold shrink-0">
            2
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              Pay the Listed Price
            </h3>
            <p className="text-gray-400 mt-1">
              Pay using one of these options:
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-green-400">
                Cash App: <strong>{cashappTag}</strong> (US customers)
              </p>
              <p className="text-orange-400">
                Crypto (BTC/USDT): DM for wallet address (worldwide)
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold shrink-0">
            3
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              Submit & Watch
            </h3>
            <p className="text-gray-400 mt-1">
              After paying, go to the video page and enter your transaction
              reference. Once verified, the full video unlocks for you to stream.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4">
        <Link href="/" className="btn-gold inline-block">
          Browse Videos
        </Link>
        <p className="text-sm text-gray-500">
          Payments accepted worldwide. Need help? Reach out and we will get back
          to you.
        </p>
      </div>
    </div>
  );
}
