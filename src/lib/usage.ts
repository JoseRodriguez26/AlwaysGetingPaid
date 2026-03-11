import { createClient } from "@/lib/supabase-server";

export const TIER_LIMITS = {
  free:    { dm: 10,       schedule: 2,        analytics: 1        },
  starter: { dm: 500,      schedule: 10,       analytics: 5        },
  pro:     { dm: 2000,     schedule: 50,       analytics: 20       },
  empire:  { dm: Infinity, schedule: Infinity, analytics: Infinity },
};

export const TIER_NAMES = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  empire: "Empire",
};

export async function getUserPlan(userId: string): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_subscriptions")
    .select("plan")
    .eq("user_id", userId)
    .single();
  return data?.plan ?? "free";
}

export async function checkAndIncrementUsage(
  userId: string,
  feature: "dm" | "schedule" | "analytics"
): Promise<{ allowed: boolean; plan: string; used: number; limit: number | string }> {
  const supabase = await createClient();
  const month = new Date().toISOString().slice(0, 7);

  const plan = await getUserPlan(userId);
  const planLimits = TIER_LIMITS[plan as keyof typeof TIER_LIMITS] ?? TIER_LIMITS.free;
  const limit = planLimits[feature];

  const { data: usage } = await supabase
    .from("usage_logs")
    .select("count")
    .eq("user_id", userId)
    .eq("feature", feature)
    .eq("month", month)
    .single();

  const used = usage?.count ?? 0;

  if (limit !== Infinity && used >= limit) {
    return { allowed: false, plan, used, limit };
  }

  await supabase.from("usage_logs").upsert(
    { user_id: userId, feature, month, count: used + 1, updated_at: new Date().toISOString() },
    { onConflict: "user_id,feature,month" }
  );

  return { allowed: true, plan, used: used + 1, limit: limit === Infinity ? "Unlimited" : limit };
}

export async function getMonthlyUsage(userId: string) {
  const supabase = await createClient();
  const month = new Date().toISOString().slice(0, 7);
  const plan = await getUserPlan(userId);
  const limits = TIER_LIMITS[plan as keyof typeof TIER_LIMITS] ?? TIER_LIMITS.free;

  const { data } = await supabase
    .from("usage_logs")
    .select("feature, count")
    .eq("user_id", userId)
    .eq("month", month);

  const usageMap: Record<string, number> = {};
  for (const row of data ?? []) usageMap[row.feature] = row.count;

  return {
    plan,
    month,
    dm:        { used: usageMap.dm ?? 0,        limit: limits.dm === Infinity ? "Unlimited" : limits.dm },
    schedule:  { used: usageMap.schedule ?? 0,  limit: limits.schedule === Infinity ? "Unlimited" : limits.schedule },
    analytics: { used: usageMap.analytics ?? 0, limit: limits.analytics === Infinity ? "Unlimited" : limits.analytics },
  };
}
