export type AppRole = "customer" | "admin";

export type CatalogueItemType = "service" | "product" | "resource";

export type CatalogueStatus = "draft" | "published" | "archived";

export type EnquiryStatus = "new" | "contacted" | "closed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  role: AppRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CatalogueItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  item_type: CatalogueItemType;
  status: CatalogueStatus;
  hero_image_url: string | null;
  card_image_url: string | null;
  cta_label: string;
  metadata: Record<string, unknown>;
  cost_price: number | null;
  markup_percent: number;
  selling_price: number | null;
  selling_price_overridden: boolean;
  requires_shipping: boolean;
  shipping_fee: number;
  shipping_overridden: boolean;
  sort_order: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogueItemCategory {
  catalogue_item_id: string;
  category_id: string;
}

export interface CatalogueItemSection {
  id: string;
  catalogue_item_id: string;
  section_type: string;
  heading: string | null;
  body: string | null;
  media_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  profile_id: string;
  catalogue_item_id: string;
  message: string;
  status: EnquiryStatus;
  admin_notes: string | null;
  notified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogueItemImage {
  id: string;
  catalogue_item_id: string;
  url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface CatalogueItemWithRelations extends CatalogueItem {
  categories: Category[];
  sections: CatalogueItemSection[];
  images: CatalogueItemImage[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}
