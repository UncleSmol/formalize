-- Seed relevant business categories matching our service offerings

insert into public.categories (slug, name, description) values
  ('finance', 'Finance', 'Financial management, accounting, budgeting, and reporting solutions'),
  ('operations', 'Operations', 'Operational efficiency, process optimisation, and workflow solutions'),
  ('it-systems', 'IT & Systems', 'Technology infrastructure, software, and systems integration'),
  ('marketing-branding', 'Marketing & Branding', 'Brand strategy, digital marketing, and communications'),
  ('hr-management', 'HR Management', 'Human resources, recruitment, training, and compliance'),
  ('office-setup', 'Office Setup', 'Physical workspace design, equipment, and office infrastructure')
on conflict (slug) do nothing;
