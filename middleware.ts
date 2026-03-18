import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT = 120; // requests
const WINDOW = "10 m"; // sliding window duration
const BLOCKED_AGENTS = [/^curl/i, /^wget/i, /^python-requests/i, /^scrapy/i, /^okhttp/i, /^java/i];

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT, WINDOW),
      analytics: true,
    })
  : null;

type MemEntry = { count: number; reset: number };
const memoryStore = new Map<string, MemEntry>();

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isBotUserAgent(ua: string | null) {
  if (!ua) return true;
  return BLOCKED_AGENTS.some((r) => r.test(ua));
}

function memoryLimit(key: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = memoryStore.get(key);
  if (!entry || entry.reset < now) {
    memoryStore.set(key, { count: 1, reset: now + windowMs });
    return { success: true, remaining: RATE_LIMIT - 1, reset: now + windowMs };
  }
  if (entry.count >= RATE_LIMIT) {
    return { success: false, remaining: 0, reset: entry.reset };
  }
  entry.count += 1;
  memoryStore.set(key, entry);
  return { success: true, remaining: RATE_LIMIT - entry.count, reset: entry.reset };
}

export async function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent");
  if (isBotUserAgent(ua)) {
    return NextResponse.json({ error: "Blocked" }, { status: 403 });
  }

  const ip = getClientIp(req);

  const limitResult = ratelimit ? await ratelimit.limit(ip) : memoryLimit(ip);
  if (!limitResult.success) {
    const res = NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    res.headers.set("Retry-After", Math.ceil((limitResult.reset - Date.now()) / 1000).toString());
    res.headers.set("X-RateLimit-Limit", RATE_LIMIT.toString());
    res.headers.set("X-RateLimit-Remaining", "0");
    return res;
  }

  const res = NextResponse.next();
  const country = req.geo?.country || "US";
  res.cookies.set("user_country", country, {
    path: "/",
    sameSite: "lax",
  });
  res.headers.set("X-RateLimit-Limit", RATE_LIMIT.toString());
  res.headers.set("X-RateLimit-Remaining", limitResult.remaining.toString());
  res.headers.set("X-RateLimit-Reset", Math.ceil((limitResult.reset - Date.now()) / 1000).toString());
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
