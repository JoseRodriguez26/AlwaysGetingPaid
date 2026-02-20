export const metadata = { title: "Privacy Policy | Caliente Hub XXX" };

export default function PrivacyPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-8 text-white/50 text-sm leading-loose">
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">Data We Collect</h2>
            <p>We collect your email address, billing information (processed securely by CCBill/Segpay — we never store full card numbers), and site usage analytics. We do not sell your personal data to third parties.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">Discreet Billing</h2>
            <p>Your privacy matters. Charges on your billing statement will appear under a discreet descriptor unrelated to adult content. We use industry-standard discreet billing practices.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">Cookies</h2>
            <p>We use essential cookies to keep you logged in and functional analytics cookies to improve the site experience. We do not use third-party advertising cookies.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">Contact</h2>
            <p>For privacy requests, email: privacy@calientehubxxx.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
