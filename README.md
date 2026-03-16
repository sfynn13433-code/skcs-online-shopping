# SKCS Online Shopping & Booking Centre

Production-ready Next.js 14 (App Router) marketplace that aggregates global retail + travel partners with AI-assisted search.

## Stack
- Next.js 14 + TypeScript + TailwindCSS (App Router, RSC where possible)
- Supabase (Postgres, Auth, logging)
- AI waterfall (Groq / Gemini / DeepSeek / etc.) for curated product matches
- Vercel for hosting

## Key Features
- Product marketplace search with filters (brand, price, rating, shipping).
- Booking search page with affiliate-ready redirects (Expedia, Booking.com, car rentals).
- AI Shopping Assistant and AI Booking Assistant.
- Affiliate click tracking endpoint (`/api/track-click`).
- Supabase schema for users, saved items, search logs, affiliate clicks, product catalog.
- Multi-marketplace adapters (Amazon, eBay, Walmart, AliExpress, Takealot) and booking adapters (Expedia, Booking.com, Agoda, Hotels.com, RentalCars).
- AI ranking with deal scores and badges.

## Running locally
1) Install deps  
```bash
npm install
```
2) Copy envs  
```bash
cp .env.example .env.local
```
Fill Supabase keys, AI provider keys, and affiliate IDs.

3) Start dev server  
```bash
npm run dev
```

4) Open http://localhost:3000

## Supabase
- Schema lives in `supabase/schema.sql`. Apply via SQL editor or `supabase db push`.
- Tables: `users` (tier + subscription_status), `saved_items`, `search_logs`, `affiliate_clicks`, `products`, `bookings_cache`, `price_history`, `user_activity`.
- RLS templates included (enable and tune as needed).

## Deployment (Vercel)
- Add env vars in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server routes only)
  - Affiliate + AI provider keys (`AMAZON_AFFILIATE_TAG`, `EXPEDIA_AFFILIATE_ID`, `BOOKING_AFFILIATE_ID`, `AGODA_AFFILIATE_ID`, `HOTELS_AFFILIATE_ID`, `TRAVELPAYOUTS_ID`)
- Run `npm run build` locally to verify.
- Connect GitHub repo to Vercel and deploy the main branch.

## Project Structure
```
src/
  app/           // routes (products, bookings, api routes)
  components/    // UI building blocks
  lib/           // Supabase + affiliate helpers
  ai/            // deterministic query parser
supabase/schema.sql
.env.example
```

## Notes
- Use `/api/ai/parse-query` to turn natural language into structured product/booking search params.
- `/products` and `/bookings` are affiliate-ready and loggable via Supabase.
