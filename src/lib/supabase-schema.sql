-- Caliente Hub XXX — Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Content table
create table if not exists content (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text check (type in ('video', 'photo')) not null,
  thumbnail_url text not null,
  storage_url text,
  bunny_video_id text,
  price decimal(10,2),
  tier_required text check (tier_required in ('fan', 'vip', 'elite')),
  is_free_preview boolean default false,
  duration text,
  views integer default 0,
  likes integer default 0,
  published boolean default true,
  created_at timestamptz default now()
);

-- Subscriptions table
create table if not exists subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id text,  -- Clerk user ID
  tier text check (tier in ('fan', 'vip', 'elite')) not null,
  status text check (status in ('active', 'cancelled', 'expired')) default 'active',
  ccbill_subscription_id text unique,
  current_period_end timestamptz not null,
  created_at timestamptz default now()
);

-- Purchases table (pay-per-view)
create table if not exists purchases (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,  -- Clerk user ID
  content_id uuid references content(id),
  amount decimal(10,2) not null,
  payment_ref text,
  purchased_at timestamptz default now()
);

-- Row Level Security
alter table content enable row level security;
alter table subscriptions enable row level security;
alter table purchases enable row level security;

-- Content: public read for free previews, authenticated for rest
create policy "Public can read free content" on content
  for select using (is_free_preview = true or published = true);

-- Subscriptions: users can read their own
create policy "Users read own subscriptions" on subscriptions
  for select using (auth.uid()::text = user_id);

-- Purchases: users can read their own
create policy "Users read own purchases" on purchases
  for select using (auth.uid()::text = user_id);

-- Increment view count function
create or replace function increment_views(content_id uuid)
returns void as $$
  update content set views = views + 1 where id = content_id;
$$ language sql;
