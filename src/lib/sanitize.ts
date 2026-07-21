import "server-only";

const HTML_TAG_RE = /<[^>]*>/g;

export function stripHtml(value: string): string {
  return value.replace(HTML_TAG_RE, "");
}

const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

const ENTITY_RE = /[&<>"']/g;

export function encodeHtml(value: string): string {
  return value.replace(ENTITY_RE, (ch) => ENTITY_MAP[ch] ?? ch);
}
