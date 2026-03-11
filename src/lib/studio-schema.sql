-- Models / Performers CRM
CREATE TABLE IF NOT EXISTS models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  stage_name text NOT NULL,
  legal_name text,
  platform_handle text,
  contact_platform text DEFAULT 'twitter',
  contact_info text,
  rate_bg decimal,
  rate_bgg decimal,
  rate_gg decimal,
  rate_anal decimal,
  rate_custom decimal,
  status text DEFAULT 'prospect',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2257 Compliance per model
CREATE TABLE IF NOT EXISTS model_compliance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  model_id uuid REFERENCES models(id) ON DELETE CASCADE NOT NULL UNIQUE,
  id1_type text,
  id1_verified boolean DEFAULT false,
  id2_type text,
  id2_verified boolean DEFAULT false,
  photo_with_id boolean DEFAULT false,
  contract_signed boolean DEFAULT false,
  contract_date date,
  std_test_date date,
  std_test_lab text,
  std_test_result text DEFAULT 'pending',
  std_test_expiry date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Productions
CREATE TABLE IF NOT EXISTS productions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  scene_type text NOT NULL,
  status text DEFAULT 'scouting',
  location text,
  shoot_date date,
  agreed_rate decimal,
  cameraman text,
  editor text,
  raw_ready boolean DEFAULT false,
  edit_complete boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Production <-> Model linking
CREATE TABLE IF NOT EXISTS production_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id uuid REFERENCES productions(id) ON DELETE CASCADE NOT NULL,
  model_id uuid REFERENCES models(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'performer',
  UNIQUE(production_id, model_id)
);

-- Distribution tracking per platform
CREATE TABLE IF NOT EXISTS distributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  production_id uuid REFERENCES productions(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  platform_title text,
  platform_tags text[],
  platform_description text,
  upload_url text,
  status text DEFAULT 'pending',
  views integer DEFAULT 0,
  revenue decimal DEFAULT 0,
  uploaded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own models" ON models FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own compliance" ON model_compliance FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own productions" ON productions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own prod_models" ON production_models FOR ALL USING (
  production_id IN (SELECT id FROM productions WHERE user_id = auth.uid())
);
CREATE POLICY "Own distributions" ON distributions FOR ALL USING (auth.uid() = user_id);
