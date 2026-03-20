-- ============================================================
-- CalienteHub — Run this in Supabase > SQL Editor
-- ============================================================

-- 1. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS videos (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  description    text DEFAULT '',
  price          decimal DEFAULT 0,
  preview_url    text NOT NULL DEFAULT '',
  full_video_url text NOT NULL DEFAULT '',
  thumbnail_url  text DEFAULT '',
  duration       text DEFAULT '',
  published      boolean DEFAULT true,
  created_at     timestamptz DEFAULT now()
);

-- 2. USER SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                uuid REFERENCES auth.users NOT NULL UNIQUE,
  plan                   text NOT NULL DEFAULT 'free',
  ccbill_subscription_id text,
  mp_payment_id          text,
  current_period_end     timestamptz,
  created_at             timestamptz DEFAULT now(),
  updated_at             timestamptz DEFAULT now()
);

-- 3. ROW LEVEL SECURITY
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Videos: anyone can read published videos
CREATE POLICY "Anyone can view published videos"
  ON videos FOR SELECT
  USING (published = true);

-- Videos: service role can do everything (for admin uploads)
CREATE POLICY "Service role manages videos"
  ON videos FOR ALL
  USING (true);

-- Subscriptions: users can only see their own
CREATE POLICY "Users view own subscription"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Subscriptions: service role manages all (for webhook updates)
CREATE POLICY "Service role manages subscriptions"
  ON user_subscriptions FOR ALL
  USING (true);

-- ============================================================
-- 4. STORAGE BUCKETS (run these too)
-- ============================================================
-- Go to Supabase > Storage > New Bucket:
--   Name: videos     | Public: OFF
--   Name: thumbnails | Public: ON
--
-- Then add this policy for the videos bucket (private):
-- "Authenticated users can upload"
-- For: INSERT — auth.role() = 'authenticated'
--
-- And for thumbnails (public read):
-- "Public read"
-- For: SELECT — true
-- ============================================================
