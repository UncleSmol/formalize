-- Seed data for local development
-- Run with: supabase db seed

-- Categories
insert into public.categories (slug, name, description) values
  ('finance', 'Finance', 'Financial management, accounting, budgeting, and reporting solutions'),
  ('operations', 'Operations', 'Operational efficiency, process optimisation, and workflow solutions'),
  ('it-systems', 'IT & Systems', 'Technology infrastructure, software, and systems integration'),
  ('marketing-branding', 'Marketing & Branding', 'Brand strategy, digital marketing, and communications'),
  ('hr-management', 'HR Management', 'Human resources, recruitment, training, and compliance'),
  ('office-setup', 'Office Setup', 'Physical workspace design, equipment, and office infrastructure')
on conflict (slug) do nothing;

-- Sample catalogue items

-- IT product: Financial Dashboard
insert into public.catalogue_items (
  slug, title, short_description, long_description, item_type, status,
  hero_image_url, card_image_url, cta_label, sort_order, metadata,
  cost_price, markup_percent, requires_shipping, shipping_fee
) values (
  'financial-dashboard',
  'Financial Dashboard',
  'Real-time financial intelligence for your entire business operations.',
  'A comprehensive financial dashboard that consolidates all your financial data into one intuitive interface. Track cash flow, monitor expenses, forecast revenue, and generate reports with a few clicks. Built for growing businesses that need real-time financial intelligence without the complexity of enterprise ERP systems.',
  'product', 'published',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60',
  'Enquire', 1,
  '{"features": ["Real-time cash flow tracking", "Automated expense categorisation", "Revenue forecasting", "Custom report builder", "Multi-currency support"]}',
  1500.00, 35.00, true, 120.00
);

-- Service: IT Infrastructure Audit
insert into public.catalogue_items (
  slug, title, short_description, long_description, item_type, status,
  hero_image_url, card_image_url, cta_label, sort_order, metadata,
  cost_price, markup_percent, requires_shipping
) values (
  'it-infrastructure-audit',
  'IT Infrastructure Audit',
  'A thorough assessment of your current technology stack and infrastructure.',
  'Our IT Infrastructure Audit service provides a complete evaluation of your current technology environment. We analyse your hardware, software, network architecture, security protocols, and operational workflows to identify gaps, risks, and opportunities for improvement. Delivered as a comprehensive report with actionable recommendations and a prioritised roadmap.',
  'service', 'published',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=60',
  'Enquire', 2,
  '{"deliverables": ["Audit report", "Risk assessment matrix", "Improvement roadmap", "ROI analysis"]}',
  5000.00, 35.00, false
);

-- Resource: Business Continuity Template
insert into public.catalogue_items (
  slug, title, short_description, long_description, item_type, status,
  hero_image_url, card_image_url, cta_label, sort_order, metadata,
  cost_price, markup_percent, requires_shipping
) values (
  'business-continuity-template',
  'Business Continuity Plan Template',
  'A ready-to-use framework for building your business continuity strategy.',
  'A comprehensive, editable template that guides you through creating a robust business continuity plan. Covers risk assessment, critical function identification, recovery strategies, communication protocols, and testing schedules. Designed for SMEs that need a professional BCP without hiring expensive consultants.',
  'resource', 'published',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=60',
  'Download', 3,
  '{"format": "Google Docs / Word", "pages": 24, "includes": ["Risk register", "Recovery checklists", "Communication trees", "Testing schedule"]}',
  250.00, 35.00, false
);

-- Link items to categories

-- Financial Dashboard → Finance, IT & Systems
insert into public.catalogue_item_categories (catalogue_item_id, category_id)
select ci.id, c.id
from public.catalogue_items ci, public.categories c
where ci.slug = 'financial-dashboard' and c.slug in ('finance', 'it-systems');

-- IT Infrastructure Audit → IT & Systems, Operations
insert into public.catalogue_item_categories (catalogue_item_id, category_id)
select ci.id, c.id
from public.catalogue_items ci, public.categories c
where ci.slug = 'it-infrastructure-audit' and c.slug in ('it-systems', 'operations');

-- Business Continuity Template → Operations, Office Setup
insert into public.catalogue_item_categories (catalogue_item_id, category_id)
select ci.id, c.id
from public.catalogue_items ci, public.categories c
where ci.slug = 'business-continuity-template' and c.slug in ('operations', 'office-setup');

-- Sections for Financial Dashboard
insert into public.catalogue_item_sections (
  catalogue_item_id, section_type, heading, body, media_url, sort_order
)
select ci.id, 'text', 'Key Features',
  'The Financial Dashboard brings all your financial data together in one place:\n\n• Real-time cash flow monitoring with alerts\n• Automated transaction categorisation using smart rules\n• Revenue forecasting powered by historical trends\n• Customisable dashboards for different stakeholders\n• One-click report generation for board meetings\n• Multi-currency support for international operations',
  null, 1
from public.catalogue_items ci where ci.slug = 'financial-dashboard';

insert into public.catalogue_item_sections (
  catalogue_item_id, section_type, heading, body, media_url, sort_order
)
select ci.id, 'image', 'Dashboard Preview',
  null,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 2
from public.catalogue_items ci where ci.slug = 'financial-dashboard';

-- Sections for IT Infrastructure Audit
insert into public.catalogue_item_sections (
  catalogue_item_id, section_type, heading, body, media_url, sort_order
)
select ci.id, 'text', 'What We Assess',
  'Our auditors evaluate every layer of your IT environment:\n\n• Hardware lifecycle and capacity planning\n• Software licensing and compliance\n• Network architecture and performance\n• Security posture and vulnerability assessment\n• Backup and disaster recovery readiness\n• Vendor and service provider management',
  null, 1
from public.catalogue_items ci where ci.slug = 'it-infrastructure-audit';

insert into public.catalogue_item_sections (
  catalogue_item_id, section_type, heading, body, media_url, sort_order
)
select ci.id, 'image', 'Audit Process Overview',
  null,
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', 2
from public.catalogue_items ci where ci.slug = 'it-infrastructure-audit';
