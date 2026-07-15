import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";

export function createClient() {
  const cookieStore: ReturnType<typeof cookies> | null = null;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    },
  );
}
