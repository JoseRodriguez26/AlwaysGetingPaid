-- Agent configurations per creator
create table if not exists agent_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  agent_id text not null, -- 'aria7', 'muse3', 'prism', etc.
  enabled boolean default false,
  config jsonb default '{}'::jsonb, -- agent-specific settings
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, agent_id)
);

-- DM conversation logs
create table if not exists dm_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  fan_name text,
  fan_message text not null,
  ai_response text not null,
  tokens_used int,
  created_at timestamptz default now()
);

-- Content schedule queue
create table if not exists content_schedule (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null, -- 'twitter', 'reddit', 'instagram', etc.
  caption text not null,
  hashtags text[],
  scheduled_for timestamptz not null,
  status text default 'queued', -- 'queued', 'posted', 'failed'
  created_at timestamptz default now()
);

-- Analytics snapshots
create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  report jsonb not null, -- AI-generated insights
  created_at timestamptz default now()
);

-- RLS policies
alter table agent_configs enable row level security;
alter table dm_logs enable row level security;
alter table content_schedule enable row level security;
alter table analytics_snapshots enable row level security;

create policy "Users manage own agent configs" on agent_configs for all using (auth.uid() = user_id);
create policy "Users manage own dm logs" on dm_logs for all using (auth.uid() = user_id);
create policy "Users manage own schedule" on content_schedule for all using (auth.uid() = user_id);
create policy "Users manage own analytics" on analytics_snapshots for all using (auth.uid() = user_id);
