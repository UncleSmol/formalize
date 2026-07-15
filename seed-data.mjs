import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_PUBLIC_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

async function seed() {
  // 1. Insert categories
  const categories = [
    { slug: "finance", name: "Finance", description: "Financial systems, controls, and visibility tools" },
    { slug: "operations", name: "Operations", description: "Process optimization, SOPs, and workflow tools" },
    { slug: "it-infrastructure", name: "IT Infrastructure", description: "Networks, hardware, and cloud systems" },
    { slug: "software", name: "Software", description: "Business software and web applications" },
    { slug: "marketing", name: "Marketing", description: "Brand, content, and campaign tools" },
    { slug: "hr-people", name: "HR & People", description: "People operations and team management" },
    { slug: "office-workspace", name: "Office & Workspace", description: "Physical workspace setup and supplies" },
    { slug: "security", name: "Security", description: "Access control, surveillance, and data protection" },
    { slug: "communication", name: "Communication", description: "Email, collaboration, and phone systems" },
    { slug: "data-protection", name: "Data Protection", description: "Backup, recovery, and compliance" },
  ];

  const { data: catData, error: catError } = await supabase
    .from("categories")
    .upsert(categories, { onConflict: "slug" })
    .select();

  if (catError) {
    console.error("Categories insert error:", catError.message);
    return;
  }
  console.log(`Inserted ${catData.length} categories`);

  const catMap = Object.fromEntries(catData.map((c) => [c.slug, c.id]));

  // 2. Insert catalogue items
  const items = [
    {
      slug: "financial-dashboard",
      title: "Financial Dashboard",
      short_description: "Real-time visibility into your business finances",
      long_description:
        "A comprehensive financial dashboard that consolidates all your financial data into one place. Track cash flow, monitor expenses, manage invoices, and generate reports with real-time data. Built for business owners who need complete control over their financial position without the complexity of traditional accounting software.",
      item_type: "product",
      status: "published",
      cta_label: "Enquire",
      sort_order: 1,
      hero_image_url: null,
      metadata: { includes: ["Monthly reports", "Cash flow tracking", "Budgeting tools"] },
    },
    {
      slug: "sop-framework",
      title: "SOP Framework",
      short_description: "Standard operating procedures that your team will actually use",
      long_description:
        "A structured framework for documenting, organizing, and maintaining your standard operating procedures. Move beyond scattered Google Docs to a centralized system where every process is mapped, every role is clear, and every team member knows exactly what to do. Includes templates, review workflows, and performance metrics.",
      item_type: "product",
      status: "published",
      cta_label: "Explore",
      sort_order: 2,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "business-email-setup",
      title: "Business Email Setup",
      short_description: "Professional email with your own domain, configured and supported",
      long_description:
        "Set up custom business email addresses using Google Workspace or Microsoft 365. We handle the full configuration including DNS records, SPF/DKIM/DMARC security, mobile device sync, and team onboarding. Includes ongoing support and spam filtering.",
      item_type: "product",
      status: "published",
      cta_label: "Inquire",
      sort_order: 3,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "network-infrastructure",
      title: "Network Infrastructure",
      short_description: "Secure, high-performance networks designed for business",
      long_description:
        "End-to-end network design and installation for businesses. Includes WiFi 6 access points, wired backbone, VLAN segmentation, VPN access for remote workers, and enterprise-grade firewall protection. Built for reliability, security, and growth.",
      item_type: "product",
      status: "published",
      cta_label: "Get Quote",
      sort_order: 4,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "hr-operating-system",
      title: "HR Operating System",
      short_description: "Complete people operations platform for growing teams",
      long_description:
        "An integrated HR system covering payroll processing, attendance tracking, leave management, and recruitment. Designed for businesses that have outgrown spreadsheets but aren't ready for enterprise HR software. Includes compliance documentation and performance review tools.",
      item_type: "product",
      status: "published",
      cta_label: "Explore",
      sort_order: 5,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "cctv-security-system",
      title: "CCTV & Security System",
      short_description: "Modern surveillance with remote monitoring and alerts",
      long_description:
        "HD CCTV systems with remote access, motion detection, and cloud backup. Includes DVR/NVR storage, mobile alerts, and optional 24/7 monitoring. Suitable for offices, warehouses, and retail spaces. Scalable from 4 to 64 cameras.",
      item_type: "product",
      status: "published",
      cta_label: "Inquire",
      sort_order: 6,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "business-process-audit",
      title: "Business Process Audit",
      short_description: "Identify where momentum is being lost in your operations",
      long_description:
        "A systematic review of your business processes to identify bottlenecks, redundancies, and opportunities for improvement. We map your current workflows, measure efficiency, and deliver a prioritized action plan. Includes a 30-page report with process maps, metrics, and recommendations.",
      item_type: "service",
      status: "published",
      cta_label: "Book Audit",
      sort_order: 7,
      hero_image_url: null,
      metadata: {},
    },
    {
      slug: "it-support-retainer",
      title: "IT Support Retainer",
      short_description: "Ongoing IT support and system maintenance",
      long_description:
        "Monthly IT support retainer covering remote and on-site support, system monitoring, patch management, backup verification, and preventative maintenance. Includes helpdesk access during business hours with 4-hour response times. Essential for businesses without a dedicated IT team.",
      item_type: "service",
      status: "published",
      cta_label: "Subscribe",
      sort_order: 8,
      hero_image_url: null,
      metadata: {},
    },
  ];

  const { data: itemData, error: itemError } = await supabase
    .from("catalogue_items")
    .upsert(items, { onConflict: "slug" })
    .select();

  if (itemError) {
    console.error("Items insert error:", itemError.message);
    return;
  }
  console.log(`Inserted ${itemData.length} catalogue items`);

  // 3. Map items to categories (many-to-many)
  const itemCatMappings = [
    { slug: "financial-dashboard", cats: ["finance"] },
    { slug: "sop-framework", cats: ["operations"] },
    { slug: "business-email-setup", cats: ["it-infrastructure", "communication"] },
    { slug: "network-infrastructure", cats: ["it-infrastructure", "security"] },
    { slug: "hr-operating-system", cats: ["hr-people", "operations"] },
    { slug: "cctv-security-system", cats: ["security", "it-infrastructure"] },
    { slug: "business-process-audit", cats: ["operations", "finance"] },
    { slug: "it-support-retainer", cats: ["it-infrastructure"] },
  ];

  const itemMap = Object.fromEntries(itemData.map((i) => [i.slug, i.id]));

  const itemCats = [];
  for (const mapping of itemCatMappings) {
    const itemId = itemMap[mapping.slug];
    if (!itemId) continue;
    for (const catSlug of mapping.cats) {
      const catId = catMap[catSlug];
      if (!catId) continue;
      itemCats.push({ catalogue_item_id: itemId, category_id: catId });
    }
  }

  if (itemCats.length > 0) {
    const { error: icError } = await supabase
      .from("catalogue_item_categories")
      .upsert(itemCats, { onConflict: "catalogue_item_id,category_id" });

    if (icError) {
      console.error("Item-category mapping error:", icError.message);
    } else {
      console.log(`Linked ${itemCats.length} item-category relationships`);
    }
  }

  // 4. Insert sections for catalogue items
  const sections = [
    {
      catalogue_item_slug: "financial-dashboard",
      sections: [
        {
          section_type: "feature",
          heading: "Real-time financial overview",
          body: "See your complete financial position at a glance. The dashboard aggregates data from your bank accounts, invoicing system, and expense tracking into a single, real-time view. Monitor cash flow trends, track outstanding invoices, and spot potential issues before they become problems.",
          sort_order: 1,
        },
        {
          section_type: "feature",
          heading: "Automated reporting",
          body: "Generate professional financial reports with one click. Profit and loss statements, balance sheets, cash flow forecasts, and budget vs. actual comparisons are available on demand. Schedule weekly or monthly reports to be emailed to stakeholders automatically.",
          sort_order: 2,
        },
      ],
    },
    {
      catalogue_item_slug: "sop-framework",
      sections: [
        {
          section_type: "feature",
          heading: "Centralized procedure library",
          body: "All your standard operating procedures in one searchable, organized library. Categorize by department, role, or process. Version control ensures everyone is working from the latest procedures, with a full audit trail of changes.",
          sort_order: 1,
        },
        {
          section_type: "feature",
          heading: "Accountability mapping",
          body: "Every procedure is linked to a responsible person, review schedule, and performance metric. No more wondering who owns what. Clear accountability means procedures actually get followed and updated.",
          sort_order: 2,
        },
      ],
    },
  ];

  for (const sectionGroup of sections) {
    const itemId = itemMap[sectionGroup.catalogue_item_slug];
    if (!itemId) continue;
    for (const sec of sectionGroup.sections) {
      const { error: secError } = await supabase
        .from("catalogue_item_sections")
        .insert({ ...sec, catalogue_item_id: itemId });
      if (secError) console.error(`Section error for ${sectionGroup.catalogue_item_slug}:`, secError.message);
    }
  }
  console.log("Sections inserted");

  // Verify
  console.log("\n--- Verification ---");
  for (const table of ["categories", "catalogue_items", "catalogue_item_categories", "catalogue_item_sections"]) {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    console.log(`${table}: ${count} rows ${error ? "(error: " + error.message + ")" : ""}`);
  }

  const { data: published } = await supabase
    .from("catalogue_items")
    .select("slug, title, item_type")
    .eq("status", "published");
  console.log("\nPublished items:");
  for (const item of published ?? []) {
    console.log(`  - ${item.title} (${item.item_type}) [/${item.slug}]`);
  }
}

seed().catch(console.error);
