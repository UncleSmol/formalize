import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/client";

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export async function rateLimit(
  key: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60_000 },
): Promise<RateLimitResult> {
  const supabase = createServiceRoleClient();

  const expiresAt = new Date(Date.now() + config.windowMs).toISOString();

  const { data: existing } = await supabase
    .from("rate_limits")
    .select("count, expires_at")
    .eq("key", key)
    .single();

  if (!existing || new Date(existing.expires_at) < new Date()) {
    await supabase.from("rate_limits").upsert(
      { key, count: 1, expires_at: expiresAt },
      { onConflict: "key" },
    );

    return { allowed: true, remaining: config.maxRequests - 1, resetAt: Date.now() + config.windowMs };
  }

  if (existing.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: new Date(existing.expires_at).getTime() };
  }

  await supabase.rpc("increment_rate_limit", { lim_key: key });

  return { allowed: true, remaining: config.maxRequests - existing.count - 1, resetAt: new Date(existing.expires_at).getTime() };
}

export function getClientIp(request?: Request): string {
  if (request) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp;
  }
  return "unknown";
}
