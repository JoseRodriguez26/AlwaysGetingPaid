export const metadata = { title: "DMCA | Caliente Hub" };

export default function DMCAPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-gold mb-8">DMCA Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300">
        <p>Caliente Hub respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).</p>
        <h2 className="text-white text-lg font-semibold">Copyright Infringement Claims</h2>
        <p>If you believe content on this site infringes your copyright, please contact us with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>A description of the copyrighted work</li>
          <li>The URL where the infringing content is located</li>
          <li>Your contact information</li>
          <li>A statement that you have a good faith belief the use is not authorized</li>
          <li>A statement under penalty of perjury that the information is accurate</li>
          <li>Your physical or electronic signature</li>
        </ul>
        <h2 className="text-white text-lg font-semibold">Response</h2>
        <p>We will review and respond to valid DMCA takedown notices promptly. Infringing content will be removed within 24-48 hours of verification.</p>
      </div>
    </div>
  );
}
