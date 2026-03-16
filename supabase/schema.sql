-- SKCS Online Shopping & Booking Centre - Supabase schema
-- Generated 2026-03-16

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now(),
  tier text not null default 'normal',
  subscription_status text default 'inactive'
);

create table if not exists public.profiles (
  id uuid primary key,
  email text,
  tier text not null default 'normal',
  subscription_status text default 'inactive',
  created_at timestamptz not null default now()
);

create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  item_title text not null,
  item_url text not null,
  price numeric(12,2),
  source text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.search_logs (
  id bigint generated always as identity primary key,
  user_id uuid references public.users(id) on delete set null,
  search_query text not null,
  search_type text check (search_type in ('product','booking')) not null,
  structured_params jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_clicks (
  id bigint generated always as identity primary key,
  user_id uuid references public.users(id) on delete set null,
  product_or_booking text not null,
  partner text not null,
  product_id uuid,
  original_link text not null,
  clicked_at timestamptz not null default now()
);

create table if not exists public.price_history (
  id bigint generated always as identity primary key,
  product_id uuid not null,
  store text not null,
  price numeric(12,2) not null,
  currency text default 'USD',
  recorded_at timestamptz not null default now()
);

create table if not exists public.product_events (
  id bigint generated always as identity primary key,
  product_id uuid,
  event_type text check (event_type in ('view','click','save','search')),
  user_id uuid,
  created_at timestamptz not null default now()
);

-- live deals table (if not already applied from separate sql)
create table if not exists public.live_deals (
  id bigint generated always as identity primary key,
  product_id uuid,
  product_title text,
  store text,
  price numeric(12,2),
  currency text default 'USD',
  discount_percent numeric(5,2),
  image_url text,
  affiliate_url text,
  detected_at timestamptz not null default now(),
  expires_at timestamptz
);
create index if not exists idx_live_deals_detected_at on public.live_deals(detected_at desc);
create index if not exists idx_live_deals_discount_percent on public.live_deals(discount_percent desc);
create index if not exists idx_live_deals_expires_at on public.live_deals(expires_at);

create table if not exists public.price_predictions (
  id bigint generated always as identity primary key,
  product_id uuid,
  current_price numeric(12,2),
  predicted_price numeric(12,2),
  prediction_type text,
  confidence numeric(5,2),
  prediction_window int,
  created_at timestamptz not null default now()
);

create table if not exists public.prediction_accuracy (
  id bigint generated always as identity primary key,
  prediction_id bigint,
  predicted_price numeric(12,2),
  actual_price numeric(12,2),
  accuracy_score numeric(5,2),
  timestamp timestamptz not null default now()
);

-- User activity tracking for personalization
create table if not exists public.user_activity (
  id bigint generated always as identity primary key,
  user_id uuid references public.users(id) on delete set null,
  activity_type text check (activity_type in ('search','click','save')) not null,
  query text,
  product_id uuid,
  category text,
  created_at timestamptz not null default now()
);

-- Indexes for analytics
create index if not exists idx_search_logs_query on public.search_logs using gin (to_tsvector('english', search_query));
create index if not exists idx_affiliate_clicks_product on public.affiliate_clicks(product_id);
create index if not exists idx_user_activity_category on public.user_activity(category);

-- Product catalog (minimal for demo; extend as needed)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand text,
  category text,
  price numeric(12,2),
  rating numeric(3,2),
  shipping_location text,
  image_url text,
  affiliate_url text,
  created_at timestamptz not null default now()
);

-- Search index for full‑text
create index if not exists idx_products_search on public.products using gin (
  to_tsvector('english', coalesce(title,'') || ' ' || coalesce(brand,'') || ' ' || coalesce(category,''))
);

-- Booking cache (optional)
create table if not exists public.bookings_cache (
  id uuid primary key default gen_random_uuid(),
  destination text not null,
  check_in date,
  check_out date,
  guests int,
  rooms int,
  price_per_night numeric(12,2),
  rating numeric(3,2),
  thumbnail text,
  partner text,
  affiliate_url text,
  created_at timestamptz not null default now()
);

-- RLS templates (adjust when enabling RLS)
alter table public.saved_items enable row level security;
alter table public.search_logs enable row level security;
alter table public.affiliate_clicks enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'users can see their saved items' and tablename = 'saved_items') then
    create policy "users can see their saved items" on public.saved_items
      for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'users can insert their saved items' and tablename = 'saved_items') then
    create policy "users can insert their saved items" on public.saved_items
      for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'users can see their search logs' and tablename = 'search_logs') then
    create policy "users can see their search logs" on public.search_logs
      for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'users can insert search logs' and tablename = 'search_logs') then
    create policy "users can insert search logs" on public.search_logs
      for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'log clicks open' and tablename = 'affiliate_clicks') then
    create policy "log clicks open" on public.affiliate_clicks
      for insert with check (true);
  end if;
end $$;
