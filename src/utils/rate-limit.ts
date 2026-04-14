import { NextResponse } from "next/server";

export type Usage = { count: number; resetAt: number };

export function checkRateLimit(cookieStore: any): { limitReached: boolean; remaining: number; usage: Usage } {
  const usageCookie = cookieStore.get("usage_token")?.value;
  const now = Date.now();
  let usage: Usage = { count: 0, resetAt: now + 24 * 60 * 60 * 1000 };

  if (usageCookie) {
    try {
      const parsed = JSON.parse(usageCookie);
      if (parsed && typeof parsed.count === 'number' && typeof parsed.resetAt === 'number') {
        if (now < parsed.resetAt) {
          usage = parsed;
        }
      }
    } catch (e) {
      // Ignore parse error, start fresh
    }
  }

  if (usage.count >= 20) {
    return { limitReached: true, remaining: 0, usage };
  }

  usage.count += 1;
  const remaining = 20 - usage.count;

  return { limitReached: false, remaining, usage };
}

export function setRateLimitCookie(response: NextResponse, usage: Usage) {
  const maxAgeSeconds = Math.max(0, Math.floor((usage.resetAt - Date.now()) / 1000));
  response.cookies.set("usage_token", JSON.stringify(usage), {
    maxAge: maxAgeSeconds,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
