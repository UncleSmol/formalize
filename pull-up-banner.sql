-- Insert the catalogue item
with new_item as (
  insert into public.catalogue_items (
    slug,
    title,
    short_description,
    long_description,
    item_type,
    status,
    hero_image_url,
    card_image_url,
    cta_label,
    cost_price,
    requires_shipping,
    sort_order,
    metadata
  ) values (
    'pull-up-banner-1-2-x-2m',
    'Pull Up Banner 1.2 x 2m',
    'Digitally printed PVC pull up banner with executive chrome base',
    'High-quality pull up banner professionally printed on durable PVC. The banner measures 1.2m wide by 2m high, making it ideal for exhibitions, events, retail displays, and corporate presentations. Complete with an executive chrome base for stability and a premium finish. The banner is retractable, lightweight, portable, and easy to set up in seconds. Digitally printed to ensure crisp, vibrant colours and sharp detail.',
    'product',
    'published',
    'https://www.nationalflag.co.za/wp-content/uploads/2025/06/c542da60-84fe-4497-b451-f4511742920b7CPull-Up-Banner-Deluxe-Base-2.png',
    'https://www.nationalflag.co.za/wp-content/uploads/2025/06/c542da60-84fe-4497-b451-f4511742920b7CPull-Up-Banner-Deluxe-Base-2.png',
    'Enquire',
    1450.00,
    true,
    0,
    '{}'::jsonb
  )
  returning id
)
-- Link to existing "Marketing & Branding" category
insert into public.catalogue_item_categories (catalogue_item_id, category_id)
select new_item.id, c.id
from new_item, public.categories c
where c.slug = 'marketing-branding';

-- Insert image into gallery
insert into public.catalogue_item_images (catalogue_item_id, url, alt_text, sort_order)
select id, 'https://www.nationalflag.co.za/wp-content/uploads/2025/06/c542da60-84fe-4497-b451-f4511742920b7CPull-Up-Banner-Deluxe-Base-2.png', 'Pull Up Banner 1.2 x 2m', 0
from public.catalogue_items
where slug = 'pull-up-banner-1-2-x-2m';

-- B.YOND LITHO Hanging Banner (Single Sided Silver) 1100 x 1000mm
with new_item as (
  insert into public.catalogue_items (
    slug,
    title,
    short_description,
    long_description,
    item_type,
    status,
    hero_image_url,
    card_image_url,
    cta_label,
    cost_price,
    requires_shipping,
    sort_order,
    metadata
  ) values (
    'byond-litho-hanging-banner-single-sided-silver-1100-x-1000mm',
    'B.YOND LITHO Hanging Banner (Single Sided Silver) 1100 x 1000mm',
    'Dye-sublimation print onto B.Yond Litho non-curl material',
    'Dye-sublimation print onto B.Yond Litho non-curl polyester material. Single-sided print only. Two eyelets at the top. Suitable for indoor use. White-backed with a silver metallic printable face.',
    'product',
    'published',
    'https://www.nationalflag.co.za/wp-content/uploads/2026/06/9f336525-f1a3-445b-9cf6-2182f6f529e47CB.Yond-Litho-Silver-Hanging-Banner-12C1-x-1m.png',
    'https://www.nationalflag.co.za/wp-content/uploads/2026/06/9f336525-f1a3-445b-9cf6-2182f6f529e47CB.Yond-Litho-Silver-Hanging-Banner-12C1-x-1m.png',
    'Enquire',
    93.50,
    true,
    1,
    '{}'::jsonb
  )
  returning id
)
-- Link to "Marketing & Branding" category
insert into public.catalogue_item_categories (catalogue_item_id, category_id)
select new_item.id, c.id
from new_item, public.categories c
where c.slug = 'marketing-branding';

-- Insert image into gallery
insert into public.catalogue_item_images (catalogue_item_id, url, alt_text, sort_order)
select id, 'https://www.nationalflag.co.za/wp-content/uploads/2026/06/9f336525-f1a3-445b-9cf6-2182f6f529e47CB.Yond-Litho-Silver-Hanging-Banner-12C1-x-1m.png', 'B.YOND LITHO Hanging Banner', 0
from public.catalogue_items
where slug = 'byond-litho-hanging-banner-single-sided-silver-1100-x-1000mm';
