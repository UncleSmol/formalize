create extension if not exists pgcrypto with schema extensions;

create type public.app_role as enum ('customer', 'admin');
create type public.catalogue_item_type as enum ('service', 'product', 'resource');
create type public.catalogue_status as enum ('draft', 'published', 'archived');
create type public.enquiry_status as enum ('new', 'contacted', 'closed');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  company_name text,
  phone text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.catalogue_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  long_description text not null,
  item_type public.catalogue_item_type not null,
  status public.catalogue_status not null default 'draft',
  hero_image_url text,
  cta_label text not null default 'Enquire',
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint catalogue_items_slug_check check (slug = lower(slug)),
  constraint catalogue_items_title_check check (char_length(title) > 0),
  constraint catalogue_items_short_description_check check (char_length(short_description) > 0),
  constraint catalogue_items_long_description_check check (char_length(long_description) > 0),
  constraint catalogue_items_cta_label_check check (char_length(cta_label) > 0)
);

create table public.catalogue_item_categories (
  catalogue_item_id uuid not null references public.catalogue_items (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (catalogue_item_id, category_id)
);

create table public.catalogue_item_sections (
  id uuid primary key default gen_random_uuid(),
  catalogue_item_id uuid not null references public.catalogue_items (id) on delete cascade,
  section_type text not null,
  heading text,
  body text,
  media_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint catalogue_item_sections_section_type_check check (char_length(section_type) > 0)
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  catalogue_item_id uuid not null references public.catalogue_items (id) on delete restrict,
  message text not null,
  status public.enquiry_status not null default 'new',
  admin_notes text,
  notified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_message_check check (char_length(message) > 0)
);

create index catalogue_items_status_item_type_idx
  on public.catalogue_items (status, item_type, sort_order, title);

create index catalogue_item_categories_category_idx
  on public.catalogue_item_categories (category_id, catalogue_item_id);

create index catalogue_item_sections_item_idx
  on public.catalogue_item_sections (catalogue_item_id, sort_order);

create index enquiries_profile_status_idx
  on public.enquiries (profile_id, status, created_at desc);

create index enquiries_catalogue_item_idx
  on public.enquiries (catalogue_item_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        updated_at = now();

  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select role = 'admin'
      from public.profiles
      where id = auth.uid()
    ),
    false
  );
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_catalogue_items_updated_at
before update on public.catalogue_items
for each row
execute function public.set_updated_at();

create trigger set_catalogue_item_sections_updated_at
before update on public.catalogue_item_sections
for each row
execute function public.set_updated_at();

create trigger set_enquiries_updated_at
before update on public.enquiries
for each row
execute function public.set_updated_at();

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.catalogue_items enable row level security;
alter table public.catalogue_item_categories enable row level security;
alter table public.catalogue_item_sections enable row level security;
alter table public.enquiries enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.categories to authenticated;
grant select on public.catalogue_items to authenticated;
grant select on public.catalogue_item_categories to authenticated;
grant select on public.catalogue_item_sections to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert on public.enquiries to authenticated;

create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id or public.is_admin());

create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id or public.is_admin())
with check ((select auth.uid()) = id or public.is_admin());

create policy "categories_select_authenticated"
on public.categories
for select
to authenticated
using (true);

create policy "categories_admin_insert"
on public.categories
for insert
to authenticated
with check (public.is_admin());

create policy "categories_admin_update"
on public.categories
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "categories_admin_delete"
on public.categories
for delete
to authenticated
using (public.is_admin());

create policy "catalogue_items_select_published_or_admin"
on public.catalogue_items
for select
to authenticated
using (status = 'published' or public.is_admin());

create policy "catalogue_items_admin_insert"
on public.catalogue_items
for insert
to authenticated
with check (public.is_admin());

create policy "catalogue_items_admin_update"
on public.catalogue_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "catalogue_items_admin_delete"
on public.catalogue_items
for delete
to authenticated
using (public.is_admin());

create policy "catalogue_item_categories_select_published_or_admin"
on public.catalogue_item_categories
for select
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.catalogue_items
    where public.catalogue_items.id = catalogue_item_categories.catalogue_item_id
      and public.catalogue_items.status = 'published'
  )
);

create policy "catalogue_item_categories_admin_insert"
on public.catalogue_item_categories
for insert
to authenticated
with check (public.is_admin());

create policy "catalogue_item_categories_admin_delete"
on public.catalogue_item_categories
for delete
to authenticated
using (public.is_admin());

create policy "catalogue_item_sections_select_published_or_admin"
on public.catalogue_item_sections
for select
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.catalogue_items
    where public.catalogue_items.id = catalogue_item_sections.catalogue_item_id
      and public.catalogue_items.status = 'published'
  )
);

create policy "catalogue_item_sections_admin_insert"
on public.catalogue_item_sections
for insert
to authenticated
with check (public.is_admin());

create policy "catalogue_item_sections_admin_update"
on public.catalogue_item_sections
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "catalogue_item_sections_admin_delete"
on public.catalogue_item_sections
for delete
to authenticated
using (public.is_admin());

create policy "enquiries_select_own_or_admin"
on public.enquiries
for select
to authenticated
using (profile_id = (select auth.uid()) or public.is_admin());

create policy "enquiries_insert_own_or_admin"
on public.enquiries
for insert
to authenticated
with check (profile_id = (select auth.uid()) or public.is_admin());

create policy "enquiries_admin_update"
on public.enquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "enquiries_admin_delete"
on public.enquiries
for delete
to authenticated
using (public.is_admin());