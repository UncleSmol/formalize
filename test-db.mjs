import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const envRaw = readFileSync(".env", "utf-8");
console.log("Raw env lines:", envRaw.split("\n").length);

const env = {};
for (const line of envRaw.trim().split("\n")) {
  const idx = line.indexOf("=");
  if (idx === -1) continue;
  const k = line.slice(0, idx).trim();
  let v = line.slice(idx + 1).trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
  env[k] = v;
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("URL:", JSON.stringify(url));
console.log("Key prefix:", JSON.stringify(key?.substring(0, 25) + "..."));
console.log("Key length:", key?.length);

if (!url || !key) {
  console.log("Missing env vars!");
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  const { data: authData, error: authError } = await supabase.auth.getSession();
  console.log("\n--- Auth session ---");
  console.log("Session:", JSON.stringify(authData));
  console.log("Auth error:", authError?.message ?? "none");

  console.log("\n--- Table counts ---");
  for (const table of ["categories", "catalogue_items", "catalogue_item_categories", "catalogue_item_sections"]) {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    console.log(`${table}: count=${count}  error=${error?.message ?? "none"}`);
  }

  console.log("\n--- Categories ---");
  const { data: cats, error: catErr } = await supabase.from("categories").select("*");
  console.log("Error:", catErr?.message ?? "none");
  console.log("Data:", JSON.stringify(cats, null, 2));

  console.log("\n--- Catalogue items (simple) ---");
  const { data: items, error: itemErr } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("status", "published");
  console.log("Error:", itemErr?.message ?? "none");
  console.log("Count:", items?.length);
  if (items?.length) console.log("First:", JSON.stringify(items[0], null, 2));
  else console.log("Items:", JSON.stringify(items));

  console.log("\n--- Complex join query ---");
  const { data: joined, error: joinErr } = await supabase
    .from("catalogue_items")
    .select(`
      *,
      categories:catalogue_item_categories(
        category:categories(*)
      ),
      sections:catalogue_item_sections(*)
    `)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });
  console.log("Error:", joinErr?.message ?? "none");
  console.log("Count:", joined?.length);
  if (joined?.length) {
    console.log("First item:", JSON.stringify(joined[0], null, 2));
  }

  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    console.log("\n--- Service role test ---");
    const svc = createClient(url, serviceKey);
    const { data: svcItems, error: svcErr } = await svc
      .from("catalogue_items")
      .select("*")
      .eq("status", "published");
    console.log("Service role error:", svcErr?.message ?? "none");
    console.log("Service role count:", svcItems?.length);
  } else {
    console.log("\nNo SUPABASE_SERVICE_ROLE_KEY in .env");
  }

  // Try direct REST API to confirm
  console.log("\n--- Direct REST API test (count) ---");
  const resp = await fetch(url + "/rest/v1/catalogue_items?select=count", {
    headers: { "apikey": key, "Authorization": "Bearer " + key }
  });
  const text = await resp.text();
  console.log("Status:", resp.status, "Body:", text);

  // Check if migration was applied — inspect schema
  console.log("\n--- Schema introspection ---");
  const { data: schema, error: schemaErr } = await supabase
    .from("catalogue_items")
    .select("id, slug, title")
    .limit(1);
  console.log("Schema check error:", schemaErr?.message ?? "none");
  console.log("Schema check data:", JSON.stringify(schema));
}

test().catch(console.error);
