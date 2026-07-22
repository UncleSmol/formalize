-- E-commerce tables for EFT / Bank Transfer order flow

-- Shopping cart (session-level, not persisted past checkout)
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  catalogue_item_id uuid not null references public.catalogue_items (id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (profile_id, catalogue_item_id)
);

alter table public.cart_items enable row level security;

grant select, insert, update, delete on public.cart_items to authenticated;

create policy "cart_items_manage_own"
  on public.cart_items
  for all
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

create index cart_items_profile_idx on public.cart_items (profile_id);

-- Orders
create type public.order_status as enum (
  'pending_payment',
  'paid',
  'processing',
  'fulfilled',
  'cancelled'
);

create type public.payment_method as enum ('eft');

create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text not null unique,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  status public.order_status not null default 'pending_payment',
  subtotal numeric(10, 2) not null,
  shipping_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  catalogue_item_id uuid not null references public.catalogue_items (id) on delete restrict,
  title text not null,
  quantity int not null check (quantity > 0),
  unit_price numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  method public.payment_method not null default 'eft',
  status public.payment_status not null default 'pending',
  pop_reference text,
  amount numeric(10, 2) not null,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index orders_profile_idx on public.orders (profile_id, created_at desc);
create index orders_status_idx on public.orders (status, created_at desc);
create index order_items_order_idx on public.order_items (order_id);
create index payments_order_idx on public.payments (order_id);

-- RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

grant select, insert on public.orders to authenticated;
grant select, insert on public.order_items to authenticated;
grant select, insert on public.payments to authenticated;
grant update on public.orders to authenticated;
grant update on public.payments to authenticated;

-- Policies: users see own orders, admins see all
create policy "orders_select_own_or_admin"
  on public.orders
  for select
  to authenticated
  using (profile_id = (select auth.uid()) or public.is_admin());

create policy "orders_insert_own"
  on public.orders
  for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

create policy "orders_admin_update"
  on public.orders
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "order_items_select_own_or_admin"
  on public.order_items
  for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and (orders.profile_id = (select auth.uid()) or public.is_admin())
    )
  );

create policy "order_items_insert_own"
  on public.order_items
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.profile_id = (select auth.uid())
    )
  );

create policy "payments_select_own_or_admin"
  on public.payments
  for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and (orders.profile_id = (select auth.uid()) or public.is_admin())
    )
  );

create policy "payments_insert_own"
  on public.payments
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.profile_id = (select auth.uid())
    )
  );

create policy "payments_admin_update"
  on public.payments
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Updated_at triggers
create trigger set_orders_updated_at
  before update on public.orders
  for each row
  execute function public.set_updated_at();

create trigger set_payments_updated_at
  before update on public.payments
  for each row
  execute function public.set_updated_at();
