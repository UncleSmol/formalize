-- Contact form submissions table (public, no login required)

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

grant insert on public.contact_submissions to anon;
grant select on public.contact_submissions to authenticated;

create policy "contact_submissions_insert_anon"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

create policy "contact_submissions_select_admin"
  on public.contact_submissions
  for select
  to authenticated
  using (public.is_admin());
