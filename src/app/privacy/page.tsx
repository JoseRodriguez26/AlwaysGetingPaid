export const metadata = { title: "Privacy Policy | Caliente Hub" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-gold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">
        <h2 className="text-white text-lg font-semibold">Information We Collect</h2>
        <p>We collect your email address when you create an account and payment references when you make purchases. We do not store payment card details.</p>
        <h2 className="text-white text-lg font-semibold">How We Use Your Information</h2>
        <p>Your email is used for account authentication and purchase verification. We do not sell or share your information with third parties.</p>
        <h2 className="text-white text-lg font-semibold">Security</h2>
        <p>We use industry-standard encryption and secure authentication through Supabase. Your browsing activity on this site is not tracked or logged beyond what is necessary for the service.</p>
        <h2 className="text-white text-lg font-semibold">Cookies</h2>
        <p>We use essential cookies for authentication only. No tracking or advertising cookies are used.</p>
        <h2 className="text-white text-lg font-semibold">Contact</h2>
        <p>For privacy-related questions, reach out through the contact methods provided on the site.</p>
      </div>
    </div>
  );
}
