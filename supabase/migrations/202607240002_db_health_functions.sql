-- Database health monitoring functions

create or replace function public.get_db_size()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select pg_size_pretty(pg_database_size(current_database()));
$$;

create or replace function public.get_active_connections()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'active', (select count(*) from pg_stat_activity where state = 'active' and pid <> pg_backend_pid()),
    'max', (select current_setting('max_connections')::int)
  );
$$;

create or replace function public.get_cache_hit_ratio()
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  select round(
    (sum(blks_hit)::numeric / nullif(sum(blks_hit + blks_read), 0) * 100)::numeric,
    1
  )
  from pg_stat_database
  where datname = current_database();
$$;

create or replace function public.get_top_tables()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  select coalesce(
    jsonb_agg(jsonb_build_object(
      'name', schemaname || '.' || relname,
      'size', pg_size_pretty(pg_total_relation_size(schemaname || '.' || relname)::bigint),
      'rows', n_live_tup
    )),
    '[]'::jsonb
  ) into result
  from (
    select schemaname, relname, n_live_tup
    from pg_stat_user_tables
    where schemaname = 'public'
    order by pg_total_relation_size(schemaname || '.' || relname) desc
    limit 5
  ) top;
  return result;
end;
$$;

create or replace function public.get_dead_tuples()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  select coalesce(
    jsonb_agg(jsonb_build_object(
      'table', relname,
      'dead', n_dead_tup
    )),
    '[]'::jsonb
  ) into result
  from (
    select relname, n_dead_tup
    from pg_stat_user_tables
    where schemaname = 'public' and n_dead_tup > 0
    order by n_dead_tup desc
    limit 5
  ) top;
  return result;
end;
$$;

create or replace function public.get_top_pages()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    jsonb_agg(jsonb_build_object(
      'path', path,
      'views', count::int
    ) order by count desc),
    '[]'::jsonb
  )
  from (
    select path, count(*) as count
    from public.page_views
    where visited_at >= now() - interval '30 days'
    group by path
    order by count desc
    limit 5
  ) top;
$$;

create or replace function public.get_index_usage()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  select coalesce(
    jsonb_agg(jsonb_build_object(
      'table', relname,
      'idxScan', coalesce(idx_scan, 0),
      'seqScan', coalesce(seq_scan, 0)
    )),
    '[]'::jsonb
  ) into result
  from (
    select relname, idx_scan, seq_scan
    from pg_stat_user_tables
    where schemaname = 'public'
    order by coalesce(seq_scan, 0) desc
    limit 5
  ) top;
  return result;
end;
$$;
