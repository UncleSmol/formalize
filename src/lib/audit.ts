import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/client";
import { requireAdmin } from "@/lib/admin-guard";

export async function logAdminAction(
  action: string,
  entity: string,
  entityId?: string,
  details?: Record<string, unknown>,
): Promise<void> {
  try {
    const actor = await requireAdmin();
    if (!actor?.id) return;

    const supabase = createServiceRoleClient();
    await supabase.from("audit_log").insert({
      actor_id: actor.id,
      action,
      entity,
      entity_id: entityId,
      details: details ?? null,
    });
  } catch {
    // Audit failures must never break the calling operation
  }
}
