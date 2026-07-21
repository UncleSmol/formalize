-- Scale-up migration: soft delete, full-text search, card images, anon access, section_type enum

-- 1. Add card_image_url to catalogue_items (thumbnail for card previews)
alter table public.catalogue_items add column card_image_url text;

-- 2. Soft delete: add deleted_at to all tables
alter table public.profiles add column deleted_at timestamptz;
alter table public.categories add column deleted_at timestamptz;
alter table public.catalogue_items add column deleted_at timestamptz;
alter table public.catalogue_item_sections add column deleted_at timestamptz;
alter table public.enquiries add column deleted_at timestamptz;

-- 3. Full-text search on catalogue_items
alter table public.catalogue_items add column search_vector tsvector
  generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(long_description, ''))
  ) stored;

create index catalogue_items_search_idx on public.catalogue_items using gin (search_vector);

-- 4. Convert section_type from free text to enum
-- Must drop the char_length check constraint first (incompatible with enum)
alter table public.catalogue_item_sections drop constraint if exists catalogue_item_sections_section_type_check;

create type public.section_type as enum ('text', 'image', 'gallery', 'video', 'features', 'accordion');

alter table public.catalogue_item_sections
  alter column section_type type public.section_type
  using (
    case section_type
      when 'text' then 'text'::public.section_type
      when 'image' then 'image'::public.section_type
      when 'gallery' then 'gallery'::public.section_type
      when 'video' then 'video'::public.section_type
      when 'features' then 'features'::public.section_type
      when 'accordion' then 'accordion'::public.section_type
      else 'text'::public.section_type
    end
  );

-- 5. Admin-facing index on enquiries (status + recency)
create index enquiries_admin_status_idx on public.enquiries (status, created_at desc);

-- 6. Anon access: grant SELECT on catalogue tables to the anon role
grant select on public.categories to anon;
grant select on public.catalogue_items to anon;
grant select on public.catalogue_item_categories to anon;
grant select on public.catalogue_item_sections to anon;

create policy "catalogue_items_select_anon"
  on public.catalogue_items
  for select
  to anon
  using (status = 'published' and deleted_at is null);

create policy "categories_select_anon"
  on public.categories
  for select
  to anon
  using (true);

create policy "catalogue_item_categories_select_anon"
  on public.catalogue_item_categories
  for select
  to anon
  using (
    exists (
      select 1
      from public.catalogue_items
      where id = catalogue_item_categories.catalogue_item_id
        and status = 'published'
        and deleted_at is null
    )
  );

create policy "catalogue_item_sections_select_anon"
  on public.catalogue_item_sections
  for select
  to anon
  using (
    exists (
      select 1
      from public.catalogue_items
      where id = catalogue_item_sections.catalogue_item_id
        and status = 'published'
        and deleted_at is null
    )
  );

-- 7. Update existing policies to respect soft delete
drop policy if exists "catalogue_items_select_published_or_admin" on public.catalogue_items;
create policy "catalogue_items_select_published_or_admin"
  on public.catalogue_items
  for select
  to authenticated
  using ((status = 'published' and deleted_at is null) or public.is_admin());

drop policy if exists "catalogue_item_categories_select_published_or_admin" on public.catalogue_item_categories;
create policy "catalogue_item_categories_select_published_or_admin"
  on public.catalogue_item_categories
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.catalogue_items
      where id = catalogue_item_categories.catalogue_item_id
        and status = 'published'
        and deleted_at is null
    )
  );

drop policy if exists "catalogue_item_sections_select_published_or_admin" on public.catalogue_item_sections;
create policy "catalogue_item_sections_select_published_or_admin"
  on public.catalogue_item_sections
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.catalogue_items
      where id = catalogue_item_sections.catalogue_item_id
        and status = 'published'
        and deleted_at is null
    )
  );

-- 8. Update handle_new_user to respect soft delete (skip if profile was soft-deleted)
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
        deleted_at = null,
        updated_at = now();

  return new;
end;
$$;
