import { requireAdmin } from "@/lib/admin-guard";
import { createServiceRoleClient } from "@/lib/supabase/client";
import { getDbHealthStats } from "@/lib/db-health";

export const metadata = { title: "Monitoring | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminMonitoringPage() {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();

  const [
    { count: todayViews },
    { count: weekViews },
    { count: monthViews },
    { data: topPages },
    { data: recentViews },
    dbHealth,
  ] = await Promise.all([
    supabase.from("page_views").select("*", { count: "exact", head: true }).gte("visited_at", todayStart),
    supabase.from("page_views").select("*", { count: "exact", head: true }).gte("visited_at", weekAgo),
    supabase.from("page_views").select("*", { count: "exact", head: true }).gte("visited_at", monthAgo),
    supabase.rpc("get_top_pages"),
    supabase.from("page_views").select("path, visited_at").order("visited_at", { ascending: false }).limit(20),
    getDbHealthStats(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Monitoring</h1>
        <p className="mt-1 text-sm text-gray-500">Website traffic and database health.</p>
      </div>

      {/* Visitors */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gray-500">Visitors</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-primary">{todayViews ?? 0}</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">Today</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-primary">{weekViews ?? 0}</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">This Week</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-black text-primary">{monthViews ?? 0}</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">This Month</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-500">Most Visited Pages</h3>
            {topPages && (topPages as { path: string; views: number }[]).length > 0 ? (
              <div className="space-y-2">
                {(topPages as { path: string; views: number }[]).map((page) => (
                  <div key={page.path} className="flex items-center justify-between text-sm">
                    <code className="text-gray-700">{page.path}</code>
                    <span className="font-bold text-primary">{page.views}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No data yet.</p>
            )}
          </div>

          {/* Recent Views */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-500">Recent Page Views</h3>
            {recentViews && recentViews.length > 0 ? (
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {recentViews.map((v) => (
                  <div key={v.visited_at + v.path} className="flex items-center justify-between text-xs">
                    <code className="text-gray-600">{v.path}</code>
                    <span className="text-gray-400">
                      {new Date(v.visited_at).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No data yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Database Health */}
      <section>
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gray-500">Database Health</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">DB Size</p>
            <p className="mt-1 text-2xl font-black text-gray-900">{dbHealth.dbSize}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Active Connections</p>
            <p className="mt-1 text-2xl font-black text-gray-900">
              {dbHealth.activeConnections}
              <span className="text-base font-normal text-gray-400"> / {dbHealth.maxConnections}</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Cache Hit Ratio</p>
            <p className={`mt-1 text-2xl font-black ${(dbHealth.cacheHitRatio ?? 100) >= 95 ? "text-green-600" : "text-yellow-600"}`}>
              {dbHealth.cacheHitRatio != null ? `${dbHealth.cacheHitRatio}%` : "N/A"}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total page views</p>
            <p className="mt-1 text-2xl font-black text-gray-900">{monthViews ?? 0}</p>
          </div>
        </div>

        {/* Top Tables */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-500">Largest Tables</h3>
          {dbHealth.topTables.length > 0 ? (
            <div className="space-y-2">
              {dbHealth.topTables.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <code className="text-gray-700">{t.name}</code>
                  <span className="font-semibold text-gray-500">{t.size} ({t.rows.toLocaleString()} rows)</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
