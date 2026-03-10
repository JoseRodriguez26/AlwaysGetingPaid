-- Caliente Hub — Simplified Schema
-- Run this in your Supabase SQL Editor

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL DEFAULT 9.99,
  preview_url TEXT NOT NULL,
  full_video_url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchases table (pay-per-video)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT NOT NULL,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cashapp',
  payment_reference TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Videos: anyone can read published videos
CREATE POLICY "Anyone can view published videos" ON videos
  FOR SELECT USING (published = true);

-- Allow service role full access to videos (for admin dashboard)
CREATE POLICY "Service role manages videos" ON videos
  FOR ALL USING (true);

-- Purchases: users can see their own purchases
CREATE POLICY "Users view own purchases" ON purchases
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Purchases: users can insert their own purchases
CREATE POLICY "Users insert own purchases" ON purchases
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Purchases: service role can manage all (for admin approval)
CREATE POLICY "Service role manages purchases" ON purchases
  FOR ALL USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_video ON purchases(video_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published);
