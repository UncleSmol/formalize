-- Add pricing and shipping fields to catalogue_items

alter table public.catalogue_items add column cost_price numeric(10, 2);
alter table public.catalogue_items add column markup_percent numeric(5, 2) not null default 35.00;
alter table public.catalogue_items add column selling_price numeric(10, 2);
alter table public.catalogue_items add column selling_price_overridden boolean not null default false;
alter table public.catalogue_items add column requires_shipping boolean not null default false;
alter table public.catalogue_items add column shipping_fee numeric(10, 2) not null default 0;
alter table public.catalogue_items add column shipping_overridden boolean not null default false;
