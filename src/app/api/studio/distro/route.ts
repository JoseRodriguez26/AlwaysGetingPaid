import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { checkAndIncrementUsage } from "@/lib/usage";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PLATFORM_RULES: Record<string, string> = {
  xhamster:
    "xHamster favors descriptive titles with model names, scene type keywords, 5-8 tags max, description 100-200 chars",
  manyvideos:
    "ManyVideos ranks on niche keywords, longer descriptions 200-400 chars, 10-15 tags, include 'amateur' or 'professional' indicator",
  faphouse:
    "FapHouse prefers clean titles without excessive capitalization, 6-10 tags, description focuses on scene vibe and performers",
  pornhub:
    "Pornhub prioritizes HD quality mentions, clear scene type in title, 8-12 tags, description 150-300 chars with CTA",
  xvideos:
    "xVideos ranks on exact keyword match in title, 5-10 tags, short punchy description under 150 chars",
  eporner:
    "ePorner favors professional quality keywords, 6-8 tags, description emphasizes production quality",
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const usage = await checkAndIncrementUsage(user.id, "analytics");
    if (!usage.allowed)
      return NextResponse.json(
        { error: "Usage limit reached. Upgrade at /pricing", upgrade: true },
        { status: 429 }
      );

    const { production_id, scene_type, model_names, notes, platforms } = await req.json();

    const platformList: string[] = platforms ?? ["xhamster", "manyvideos", "faphouse", "pornhub"];

    const response = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      system: `You are DISTRO, an expert adult content distribution agent. You create platform-optimized titles, descriptions, and tags for adult films. You understand SEO for each platform's algorithm. Be professional and direct. Return valid JSON only.`,
      messages: [
        {
          role: "user",
          content: `Generate distribution metadata for this production:
Scene type: ${scene_type}
Performers: ${model_names?.join(", ") || "Not specified"}
Notes: ${notes || "None"}

Platform rules:
${platformList.map((p: string) => `${p}: ${PLATFORM_RULES[p] || "Standard adult platform"}`).join("\n")}

Return JSON:
{
  "platforms": {
    "${platformList[0]}": {
      "title": "...",
      "description": "...",
      "tags": ["tag1", "tag2"]
    }
  },
  "strategy_note": "Overall distribution strategy"
}`,
        },
      ],
    });

    const text = response.content.find((b) => b.type === "text")
      ? (response.content.find((b) => b.type === "text") as { type: "text"; text: string }).text
      : "{}";
    let result: Record<string, unknown>;
    try {
      result = JSON.parse(text);
    } catch {
      const m = text.match(/\{[\s\S]*\}/);
      result = m ? JSON.parse(m[0]) : {};
    }

    // Save distributions to DB
    if (production_id && result.platforms) {
      const rows = Object.entries(result.platforms as Record<string, Record<string, unknown>>).map(
        ([platform, meta]) => ({
          user_id: user.id,
          production_id,
          platform,
          platform_title: meta.title,
          platform_tags: (meta.tags as string[]) ?? [],
          platform_description: meta.description,
          status: "pending",
        })
      );
      await supabase
        .from("distributions")
        .upsert(rows, { onConflict: "production_id,platform" });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
