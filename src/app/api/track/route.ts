import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const { path, referrer } = await request.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    await supabase.from("page_views").insert({
      path,
      referrer: typeof referrer === "string" ? referrer.slice(0, 500) : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
