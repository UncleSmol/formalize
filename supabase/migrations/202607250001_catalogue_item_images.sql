create table public.catalogue_item_images (
  id uuid primary key default gen_random_uuid(),
  catalogue_item_id uuid not null references public.catalogue_items(id) on delete cascade,
  url text not null,
  alt_text text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.catalogue_item_images enable row level security;

create index idx_catalogue_item_images_item_id on public.catalogue_item_images(catalogue_item_id);

-- Anon can read images of published items
create policy "Anyone can view item images"
  on public.catalogue_item_images for select
  using (
    exists (
      select 1 from public.catalogue_items
      where id = catalogue_item_id
        and status = 'published'
        and deleted_at is null
    )
  );

-- Admins have full CRUD
create policy "Admins can insert item images"
  on public.catalogue_item_images for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update item images"
  on public.catalogue_item_images for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete item images"
  on public.catalogue_item_images for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

grant select on public.catalogue_item_images to anon;
grant select, insert, update, delete on public.catalogue_item_images to authenticated;
