-- Rate limiting table (postgresql-backed, scales across instances)

create table public.rate_limits (
  key text primary key,
  count int not null default 1,
  expires_at timestamptz not null
);

create index rate_limits_expires_at_idx on public.rate_limits (expires_at);

alter table public.rate_limits enable row level security;

grant delete on public.rate_limits to service_role;
grant insert on public.rate_limits to service_role;
grant select on public.rate_limits to service_role;
grant update on public.rate_limits to service_role;

create or replace function public.increment_rate_limit(lim_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.rate_limits
  set count = count + 1
  where key = lim_key;
end;
$$;
