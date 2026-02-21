export const metadata = { title: "DMCA | Caliente Hub XXX" };

export default function DMCAPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-white mb-2">DMCA Policy</h1>
        <p className="text-white/30 text-sm mb-10">Digital Millennium Copyright Act</p>
        <div className="space-y-6 text-white/50 text-sm leading-loose">
          <p>
            Caliente Hub Media LLC (DBA Caliente Hub XXX) respects intellectual property rights and expects users to do the same.
            We respond to notices of alleged copyright infringement in accordance with the DMCA.
          </p>
          <p>
            If you believe that content on this site infringes your copyright, please send a DMCA takedown
            notice to our designated agent at:
          </p>
          <div className="glass border border-gold/10 rounded-sm p-6">
            <p className="text-white/70 font-medium mb-1">DMCA Agent — Caliente Hub Media LLC (DBA Caliente Hub XXX)</p>
            <p>dmca@calientehubxxx.com</p>
          </div>
          <p>Your notice must include: identification of the copyrighted work, identification of the allegedly infringing material, your contact information, a statement of good faith belief, and your signature.</p>
          <p>Repeat infringers will have their accounts terminated.</p>
        </div>
      </div>
    </div>
  );
}
