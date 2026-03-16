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
