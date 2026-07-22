-- Page views table for lightweight visitor tracking

create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  visited_at timestamptz not null default now()
);

create index page_views_visited_at_idx on public.page_views (visited_at desc);
create index page_views_path_date_idx on public.page_views (path, visited_at desc);

alter table public.page_views enable row level security;

grant insert on public.page_views to anon;
grant insert on public.page_views to authenticated;
grant select on public.page_views to authenticated;

create policy "page_views_insert_any"
  on public.page_views
  for insert
  to anon, authenticated
  with check (true);

create policy "page_views_select_admin"
  on public.page_views
  for select
  to authenticated
  using (public.is_admin());
