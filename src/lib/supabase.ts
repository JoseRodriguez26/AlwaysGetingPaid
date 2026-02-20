import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder_anon_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type ContentType = "video" | "photo";
export type TierType = "fan" | "vip" | "elite";

export interface Content {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  thumbnail_url: string;
  storage_url: string;
  bunny_video_id?: string;
  price?: number;
  tier_required?: TierType;
  is_free_preview: boolean;
  duration?: string;
  views: number;
  likes: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: TierType;
  status: "active" | "cancelled" | "expired";
  ccbill_subscription_id?: string;
  current_period_end: string;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  content_id: string;
  amount: number;
  payment_ref: string;
  purchased_at: string;
}
