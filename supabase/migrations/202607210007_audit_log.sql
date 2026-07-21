-- Audit log table for tracking admin actions

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create index audit_log_actor_idx on public.audit_log (actor_id, created_at desc);
create index audit_log_action_idx on public.audit_log (action, created_at desc);

grant select on public.audit_log to authenticated;

create policy "audit_log_select_admin"
  on public.audit_log
  for select
  to authenticated
  using (public.is_admin());
