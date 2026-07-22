import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/client";

export interface DbHealthStats {
  dbSize: string;
  activeConnections: number;
  maxConnections: number;
  cacheHitRatio: number | null;
  topTables: { name: string; size: string; rows: number }[];
  deadTuples: { table: string; dead: number }[];
  indexUsage: { table: string; idxScan: number; seqScan: number }[];
}

export async function getDbHealthStats(): Promise<DbHealthStats> {
  const supabase = createServiceRoleClient();

  const [
    { data: sizeResult },
    { data: connectionsResult },
    { data: cacheResult },
    { data: tablesResult },
    { data: deadTuplesResult },
    { data: indexResult },
  ] = await Promise.all([
    supabase.rpc("get_db_size"),
    supabase.rpc("get_active_connections"),
    supabase.rpc("get_cache_hit_ratio"),
    supabase.rpc("get_top_tables"),
    supabase.rpc("get_dead_tuples"),
    supabase.rpc("get_index_usage"),
  ]);

  return {
    dbSize: sizeResult ?? "Unknown",
    activeConnections: connectionsResult?.active ?? 0,
    maxConnections: connectionsResult?.max ?? 100,
    cacheHitRatio: cacheResult ?? null,
    topTables: tablesResult ?? [],
    deadTuples: deadTuplesResult ?? [],
    indexUsage: indexResult ?? [],
  };
}
