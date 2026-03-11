import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Pull real data from the DB
    const [videosRes, purchasesRes, dmLogsRes, scheduleRes] = await Promise.all([
      supabase.from("videos").select("id, title, price, created_at").eq("published", true),
      supabase.from("purchases").select("amount, status, created_at, video_id").eq("user_id", user.id),
      supabase.from("dm_logs").select("created_at, tokens_used").eq("user_id", user.id),
      supabase.from("content_schedule").select("platform, status, scheduled_for").eq("user_id", user.id),
    ]);

    const videos = videosRes.data ?? [];
    const purchases = purchasesRes.data ?? [];
    const dmLogs = dmLogsRes.data ?? [];
    const schedule = scheduleRes.data ?? [];

    const approvedPurchases = purchases.filter(p => p.status === "approved");
    const totalRevenue = approvedPurchases.reduce((s, p) => s + Number(p.amount), 0);
    const conversionRate = purchases.length > 0
      ? ((approvedPurchases.length / purchases.length) * 100).toFixed(1)
      : "0";

    const dataContext = `
CREATOR PERFORMANCE DATA:
- Total Videos: ${videos.length}
- Total Revenue: $${totalRevenue.toFixed(2)}
- Total Orders: ${purchases.length} (${approvedPurchases.length} approved)
- Conversion Rate: ${conversionRate}%
- DMs Handled by AI: ${dmLogs.length}
- Tokens Used by AI: ${dmLogs.reduce((s, d) => s + (d.tokens_used ?? 0), 0)}
- Scheduled Posts: ${schedule.length} (${schedule.filter(s => s.status === "posted").length} posted)
- Platform Breakdown: ${JSON.stringify(
      schedule.reduce((acc: Record<string, number>, s) => {
        acc[s.platform] = (acc[s.platform] ?? 0) + 1;
        return acc;
      }, {})
    )}
- Videos: ${videos.map(v => `${v.title} ($${v.price})`).join(", ") || "None yet"}
`;

    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      thinking: { type: "adaptive" },
      system: `You are PRISM, an elite analytics AI for adult content creators.
You analyze real performance data and give brutally honest, actionable insights.
Be specific with numbers. Identify revenue leaks. Find growth opportunities.
Format as JSON only.`,
      messages: [{
        role: "user",
        content: `Analyze this creator's data and generate a strategy report:

${dataContext}

Return JSON:
{
  "revenue_score": 0-100,
  "top_insight": "Most important finding",
  "revenue_breakdown": { "total": 0, "avg_per_video": 0, "best_performer": "..." },
  "ai_impact": { "dms_handled": 0, "time_saved_hours": 0, "estimated_revenue_from_ai": 0 },
  "recommendations": [
    { "priority": "high|medium|low", "action": "...", "expected_impact": "..." }
  ],
  "churn_risk": "low|medium|high",
  "churn_reason": "...",
  "growth_opportunity": "Biggest untapped opportunity",
  "weekly_goals": ["goal1", "goal2", "goal3"]
}`
      }],
    });

    const text = response.content.find(b => b.type === "text")?.text ?? "{}";
    let report;
    try {
      report = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      report = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    // Save snapshot
    await supabase.from("analytics_snapshots").insert({
      user_id: user.id,
      report,
    });

    return NextResponse.json({ report, raw_data: { totalRevenue, purchases: purchases.length, videos: videos.length } });
  } catch (err: any) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
