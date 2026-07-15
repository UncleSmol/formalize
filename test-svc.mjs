import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const envRaw = readFileSync(".env", "utf-8");
const env = {};
for (const line of envRaw.trim().split("\n")) {
  const idx = line.indexOf("=");
  if (idx === -1) continue;
  let k = line.slice(0, idx).trim();
  let v = line.slice(idx + 1).trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
  env[k] = v;
}

const svc = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function t() {
  for (const table of [
    "categories",
    "catalogue_items",
    "catalogue_item_categories",
    "catalogue_item_sections",
  ]) {
    const { count, error } = await svc
      .from(table)
      .select("*", { count: "exact", head: true });
    console.log(
      `${table}: ${count} rows`,
      error ? `(error: ${error.message})` : "",
    );
  }

  const { data, error } = await svc
    .from("catalogue_items")
    .select("slug, title, item_type, status")
    .eq("status", "published");

  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log(`\nPublished items (${data.length}):`);
  data.forEach((i) =>
    console.log(`  - [${i.item_type}] ${i.title} (/${i.slug})`),
  );
}

t().catch(console.error);
