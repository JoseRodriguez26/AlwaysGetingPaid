export const metadata = { title: "Terms of Service | Caliente Hub XXX" };

export default function TermsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-white/30 text-sm mb-10">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-8 text-white/50 text-sm leading-loose">
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">1. Age Requirement</h2>
            <p>You must be at least 18 years of age to access this website. By accessing this site, you confirm you are 18 or older. If you are under 18, you must leave immediately.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">2. Membership & Billing</h2>
            <p>Memberships are billed on a recurring basis via CCBill or Segpay. You may cancel at any time. Refunds are handled per our refund policy. Your billing statement will show a discreet descriptor.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">3. Content Policy</h2>
            <p>All content on this platform features consenting adults 18 years of age or older at the time of production. All content is legally produced and compliant with 18 U.S.C. § 2257.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">4. Prohibited Use</h2>
            <p>You may not download, reproduce, redistribute, or share any content from this platform. Content is for personal viewing only. Violations will result in account termination and potential legal action.</p>
          </section>
          <div className="divider-gold" />
          <section>
            <h2 className="font-display text-xl font-bold text-white mb-3">5. Contact</h2>
            <p>For any questions regarding these terms, contact us at legal@calientehubxxx.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
