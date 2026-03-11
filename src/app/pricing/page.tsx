const plans = [
  {
    name: "Starter",
    price: 49,
    badge: null,
    color: "#00ffcc",
    agents: ["ARIA-7 (Fan DM Agent)", "MUSE-3 (Post Scheduler)"],
    features: [
      "2 AI Agents included",
      "1,000 DMs per month",
      "30 scheduled posts",
      "Basic analytics dashboard",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 149,
    badge: "MOST POPULAR",
    color: "#aa55ff",
    agents: ["ARIA-7", "SHIELD-X", "MUSE-3", "PRISM", "ECHO-V"],
    features: [
      "5 AI Agents included",
      "Unlimited DMs",
      "Unlimited scheduled posts",
      "Advanced analytics & reports",
      "Revenue tracking (PRISM)",
      "Voice messages (ECHO-V)",
      "Priority email support",
    ],
    cta: "Go Pro",
  },
  {
    name: "Empire",
    price: 299,
    badge: null,
    color: "#ff3388",
    agents: ["All 8 Agents"],
    features: [
      "All 8 AI Agents included",
      "Unlimited DMs & posts",
      "White-label option",
      "Custom voice training (ECHO-V)",
      "DMCA auto-filing (GUARD-2)",
      "Dedicated account manager",
      "Priority 24/7 support",
      "Early access to new agents",
    ],
    cta: "Build Your Empire",
  },
];

const faqs = [
  {
    q: "What exactly is an AI agent?",
    a: "Each agent is a specialized AI model trained for a specific task — replying to DMs, scheduling posts, hunting leaks, etc. They run 24/7 in the cloud and connect to your platforms via our secure API integrations.",
  },
  {
    q: "Do I need technical skills to set up the agents?",
    a: "No. Setup takes about 10 minutes through our guided onboarding. You answer a few questions about your voice and content style, and the agents configure themselves. No code required.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts. Cancel from your dashboard at any time and your agents will stop at the end of the billing period.",
  },
  {
    q: "How does ARIA-7 learn my voice?",
    a: "During onboarding you provide sample DMs, preferred phrases, and tone preferences. ARIA-7 uses these to match your style. You can refine it anytime from your dashboard.",
  },
  {
    q: "Is my content and data secure?",
    a: "Absolutely. We use end-to-end encryption for all data in transit and at rest. We never train AI models on your private content without explicit consent. SHIELD-X also monitors for unauthorized distribution of your content.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: "#08070e", minHeight: "100vh", color: "#e5e5e5", paddingTop: "80px" }}>

      {/* Header */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(170,85,255,0.08)", border: "1px solid rgba(170,85,255,0.3)",
          borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
        }}>
          <span style={{ color: "#aa55ff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Simple Pricing</span>
        </div>
        <h1 style={{
          fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 0%, #ccccff 60%, #aa55ff 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: "16px",
        }}>
          Pick Your Plan
        </h1>
        <p style={{ color: "#666688", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Start with 2 agents or deploy all 8. Scale as your creator business grows.
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: "0 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.badge
                  ? "linear-gradient(145deg, rgba(170,85,255,0.1) 0%, rgba(170,85,255,0.04) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: plan.badge
                  ? "1px solid rgba(170,85,255,0.5)"
                  : `1px solid ${plan.color}33`,
                borderRadius: "24px",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.badge ? "0 0 60px rgba(170,85,255,0.15), 0 20px 60px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
              }} />

              {/* Background glow */}
              {plan.badge && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "200px", pointerEvents: "none",
                  background: "radial-gradient(ellipse at 50% 0%, rgba(170,85,255,0.15) 0%, transparent 70%)",
                }} />
              )}

              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "linear-gradient(135deg, #aa55ff, #cc77ff)",
                  color: "#ffffff", fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.12em", padding: "4px 10px", borderRadius: "6px",
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{ marginBottom: "24px", position: "relative" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: plan.color, marginBottom: "16px", letterSpacing: "0.05em" }}>
                  {plan.name}
                </h2>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    ${plan.price}
                  </span>
                  <span style={{ fontSize: "14px", color: "#555577", marginLeft: "4px" }}>/month</span>
                </div>
              </div>

              {/* Agents included */}
              <div style={{
                background: `${plan.color}0d`,
                border: `1px solid ${plan.color}22`,
                borderRadius: "12px",
                padding: "14px 16px",
                marginBottom: "24px",
              }}>
                <p style={{ fontSize: "10px", color: plan.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Agents Included
                </p>
                {plan.agents.map((agent) => (
                  <p key={agent} style={{ fontSize: "13px", color: "#aaaacc", marginBottom: "2px" }}>
                    • {agent}
                  </p>
                ))}
              </div>

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#9999bb" }}>
                    <span style={{ color: plan.color, marginTop: "1px", flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/sign-up"
                style={{
                  display: "block", width: "100%", textAlign: "center",
                  padding: "14px 24px", borderRadius: "12px",
                  fontWeight: 700, fontSize: "15px", textDecoration: "none",
                  background: plan.badge
                    ? "linear-gradient(135deg, #aa55ff, #cc77ff)"
                    : "transparent",
                  color: plan.badge ? "#ffffff" : plan.color,
                  border: plan.badge ? "none" : `1px solid ${plan.color}55`,
                  boxShadow: plan.badge ? "0 8px 30px rgba(170,85,255,0.3)" : "none",
                  boxSizing: "border-box",
                }}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <p style={{ textAlign: "center", marginTop: "40px", color: "#444466", fontSize: "13px" }}>
          🔒 30-day money-back guarantee · Cancel anytime · No hidden fees
        </p>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: "80px 24px 120px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        maxWidth: "760px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800,
          color: "#ffffff", textAlign: "center", marginBottom: "56px",
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq) => (
            <div
              key={faq.q}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px 28px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ddddff", marginBottom: "10px" }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: "14px", color: "#666688", lineHeight: 1.7, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ color: "#555577", fontSize: "14px", marginBottom: "20px" }}>
            Still have questions? We&apos;re here to help.
          </p>
          <a href="/sign-up" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "linear-gradient(135deg, #00ffcc, #00ddaa)",
            color: "#08070e", fontWeight: 700, fontSize: "15px",
            padding: "14px 36px", borderRadius: "12px", textDecoration: "none",
            boxShadow: "0 0 24px rgba(0,255,204,0.25), 0 8px 24px rgba(0,0,0,0.4)",
          }}>
            🤖 Start Free — No Card Needed
          </a>
        </div>
      </section>
    </div>
  );
}
