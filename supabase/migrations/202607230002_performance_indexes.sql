-- Performance indexes for 5000 concurrent user scale

-- Cover index for paginated catalogue listing queries
drop index if exists public.catalogue_items_status_item_type_idx;
create index catalogue_items_list_idx
  on public.catalogue_items (status, deleted_at, item_type, sort_order, title)
  include (id, slug, title, short_description, card_image_url, cost_price, markup_percent, selling_price, selling_price_overridden);

-- Enquiry admin dashboard index
create index if not exists enquiries_admin_list_idx
  on public.enquiries (status, created_at desc);

-- Profile role lookup for admin guard (called on every admin page)
create index if not exists profiles_role_idx
  on public.profiles (role, deleted_at)
  where role = 'admin';
