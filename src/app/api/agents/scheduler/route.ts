import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { checkAndIncrementUsage, TIER_NAMES } from "@/lib/usage";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const usage = await checkAndIncrementUsage(user.id, "schedule");
    if (!usage.allowed) {
      return NextResponse.json({
        error: `Monthly schedule limit reached (${usage.used}/${usage.limit}) on ${TIER_NAMES[usage.plan as keyof typeof TIER_NAMES] ?? usage.plan} plan. Upgrade at /pricing`,
        upgrade: true,
        plan: usage.plan,
      }, { status: 429 });
    }

    const { contentDescription, platforms = ["twitter", "reddit"], daysAhead = 7 } = await req.json();

    const { data: config } = await supabase
      .from("agent_configs")
      .select("config")
      .eq("user_id", user.id)
      .eq("agent_id", "muse3")
      .single();

    const creatorConfig = config?.config ?? {};
    const niche = creatorConfig.niche ?? "adult content creator";
    const style = creatorConfig.style ?? "flirty and teasing";
    const brandKeywords = creatorConfig.brand_keywords ?? [];

    const now = new Date();
    const systemPrompt = `You are MUSE-3, an expert social media scheduler for adult content creators.
You create platform-optimized captions and find the best posting times.

CREATOR NICHE: ${niche}
CONTENT STYLE: ${style}
${brandKeywords.length > 0 ? `BRAND KEYWORDS: ${brandKeywords.join(", ")}` : ""}

PEAK ENGAGEMENT TIMES BY PLATFORM:
- Twitter/X: Tue-Thu 12pm, 5pm, 9pm EST
- Reddit (NSFW subs): Mon-Wed 8pm-11pm EST, Sat 2pm-6pm EST
- Instagram: Mon/Wed/Fri 11am-1pm, 7pm-9pm EST

You must respond with valid JSON only. No markdown, no explanation.`;

    const userPrompt = `Create a ${daysAhead}-day content schedule for: "${contentDescription}"

Return JSON in this exact format:
{
  "schedule": [
    {
      "platform": "twitter",
      "caption": "...",
      "hashtags": ["tag1", "tag2"],
      "scheduled_for": "2024-01-15T17:00:00Z",
      "engagement_prediction": "high|medium|low",
      "tip": "Why this time works"
    }
  ],
  "strategy_note": "Overall strategy insight"
}

Generate ${platforms.length * daysAhead} posts total, spread across: ${platforms.join(", ")}.
Start date: ${now.toISOString()}`;

    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = response.content.find(b => b.type === "text")?.text ?? "{}";
    let schedule;
    try {
      schedule = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      schedule = jsonMatch ? JSON.parse(jsonMatch[0]) : { schedule: [], strategy_note: "Parse error" };
    }

    // Save to DB
    if (schedule.schedule?.length > 0) {
      await supabase.from("content_schedule").insert(
        schedule.schedule.map((item: any) => ({
          user_id: user.id,
          platform: item.platform,
          caption: item.caption,
          hashtags: item.hashtags ?? [],
          scheduled_for: item.scheduled_for,
          status: "queued",
        }))
      );
    }

    return NextResponse.json(schedule);
  } catch (err: any) {
    console.error("Scheduler error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data } = await supabase
      .from("content_schedule")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_for", { ascending: true });

    return NextResponse.json({ schedule: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
