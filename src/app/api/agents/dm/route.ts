import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { fanMessage, fanName, conversationHistory = [] } = await req.json();
    if (!fanMessage) return NextResponse.json({ error: "fanMessage is required" }, { status: 400 });

    // Load creator's ARIA-7 config
    const { data: config } = await supabase
      .from("agent_configs")
      .select("config")
      .eq("user_id", user.id)
      .eq("agent_id", "aria7")
      .single();

    const creatorConfig = config?.config ?? {};
    const voiceSamples = creatorConfig.voice_samples ?? [];
    const personality = creatorConfig.personality ?? "flirty, confident, and playful";
    const boundaries = creatorConfig.boundaries ?? "Keep it suggestive but tasteful unless the fan pushes further";
    const creatorName = creatorConfig.creator_name ?? "the creator";
    const upsellMessage = creatorConfig.upsell_message ?? "If they seem interested, casually mention your premium content is available";

    const systemPrompt = `You are ARIA-7, an AI agent that responds to fan DMs on behalf of ${creatorName}, an adult content creator.

CREATOR PERSONALITY: ${personality}

${voiceSamples.length > 0 ? `VOICE SAMPLES (write EXACTLY like these examples):
${voiceSamples.map((s: string, i: number) => `${i + 1}. "${s}"`).join("\n")}` : ""}

RULES:
- Match the creator's tone and voice perfectly
- Keep responses SHORT (1-4 sentences max) like real DMs
- Be warm, engaging, and personal
- Use their name if provided
- ${upsellMessage}
- ${boundaries}
- Never break character or mention you are AI
- Use casual language, occasional emojis if the creator style calls for it
- Mirror the fan's energy level

Respond ONLY with the DM message text. No quotes, no labels, just the message.`;

    // Build conversation for Claude
    const messages: Anthropic.MessageParam[] = [];

    // Add history
    for (const msg of conversationHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }

    // Add current fan message
    messages.push({
      role: "user",
      content: fanName ? `Fan "${fanName}" says: ${fanMessage}` : fanMessage,
    });

    const stream = anthropic.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 300,
      thinking: { type: "adaptive" },
      system: systemPrompt,
      messages,
    });

    const response = await stream.finalMessage();
    const aiResponse = response.content.find(b => b.type === "text")?.text ?? "";

    // Log to DB
    await supabase.from("dm_logs").insert({
      user_id: user.id,
      fan_name: fanName ?? null,
      fan_message: fanMessage,
      ai_response: aiResponse,
      tokens_used: response.usage.input_tokens + response.usage.output_tokens,
    });

    return NextResponse.json({
      response: aiResponse,
      tokens: response.usage.input_tokens + response.usage.output_tokens,
    });
  } catch (err: any) {
    console.error("DM agent error:", err);
    return NextResponse.json({ error: err.message ?? "Failed to generate response" }, { status: 500 });
  }
}

// GET: fetch recent DM logs
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: logs } = await supabase
      .from("dm_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    return NextResponse.json({ logs: logs ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
