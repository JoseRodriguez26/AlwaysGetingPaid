export const metadata = { title: "Terms of Service | Caliente Hub" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-gold mb-8">Terms of Service</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">
        <p>By accessing Caliente Hub, you agree to these terms.</p>
        <h2 className="text-white text-lg font-semibold">Age Requirement</h2>
        <p>You must be at least 18 years old to access this website. By using this site, you confirm you meet this age requirement.</p>
        <h2 className="text-white text-lg font-semibold">Content & Purchases</h2>
        <p>All content is for personal viewing only. No downloading, redistribution, or sharing is permitted. Purchases are per-video and non-refundable once access is granted.</p>
        <h2 className="text-white text-lg font-semibold">Account</h2>
        <p>You are responsible for maintaining the security of your account. Do not share your login credentials.</p>
        <h2 className="text-white text-lg font-semibold">Prohibited Use</h2>
        <p>You may not record, screenshot, download, or redistribute any content. Violation will result in immediate account termination.</p>
        <h2 className="text-white text-lg font-semibold">Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance.</p>
      </div>
    </div>
  );
}
