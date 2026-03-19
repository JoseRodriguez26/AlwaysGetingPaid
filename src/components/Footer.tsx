import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "32px", marginBottom: "32px" }}>
          {/* Logo */}
          <div>
            <div style={{ fontSize: "18px", fontWeight: 900, color: "#ffffff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              Caliente<span style={{ color: "#e4b84d" }}>Hub</span>
            </div>
            <p style={{ fontSize: "13px", color: "#444433", maxWidth: "220px", lineHeight: 1.6 }}>
              Exclusive adult content. Members only.
            </p>
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontSize: "11px", color: "#555544", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>Legal</p>
            {[
              { href: "/terms", label: "Terms of Service" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/dmca", label: "DMCA" },
              { href: "/2257", label: "18 U.S.C. 2257" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontSize: "13px", color: "#444433", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "#333322" }}>© 2025 CalienteHub. All rights reserved.</span>
            <span style={{ fontSize: "10px", color: "#ff6666", border: "1px solid rgba(255,80,80,0.3)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>18+</span>
          </div>
          <p style={{ fontSize: "12px", color: "#333322" }}>www.calientehubxxx.com</p>
        </div>

      </div>
    </footer>
  );
}
