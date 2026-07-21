import Link from "next/link";
import { getAllCatalogueItems, getAllEnquiries } from "@/lib/supabase/admin-queries";
import { getCategories } from "@/lib/supabase/queries";

export const metadata = { title: "Admin Dashboard | Formalize" };

export default async function AdminDashboard() {
  const [items, categories, enquiries] = await Promise.all([
    getAllCatalogueItems(),
    getCategories(),
    getAllEnquiries(),
  ]);

  const published = items.filter((i) => i.status === "published");
  const draft = items.filter((i) => i.status === "draft");
  const newEnquiries = enquiries.filter((e) => e.status === "new");

  const statCards = [
    { label: "Total Items", value: items.length, href: "/admin/catalogue", color: "text-primary", border: "border-primary/20" },
    { label: "Published", value: published.length, href: "/admin/catalogue", color: "text-green-600", border: "border-green-200" },
    { label: "Drafts", value: draft.length, href: "/admin/catalogue", color: "text-yellow-600", border: "border-yellow-200" },
    { label: "Categories", value: categories.length, href: "/admin/categories", color: "text-blue-600", border: "border-blue-200" },
    { label: "Enquiries", value: enquiries.length, href: "/admin/enquiries", color: "text-purple-600", border: "border-purple-200" },
    { label: "New Enquiries", value: newEnquiries.length, href: "/admin/enquiries", color: "text-red-600", border: "border-red-200" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your catalogue and enquiries.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`border ${card.border} bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
          >
            <p className={`text-4xl font-black ${card.color}`}>{card.value}</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>

      {newEnquiries.length > 0 && (
        <div className="mt-8 border border-yellow-300 bg-yellow-50 p-6">
          <div className="flex items-center gap-3">
            <i className="bi-exclamation-triangle text-yellow-600" aria-hidden="true" />
            <p className="text-sm font-bold text-yellow-700">
              {newEnquiries.length} new enquiry{newEnquiries.length > 1 ? "ies" : "y"} awaiting review
            </p>
            <Link
              href="/admin/enquiries"
              className="ml-auto text-sm font-bold text-primary underline"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
