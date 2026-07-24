"use client";

import { useActionState, useEffect, useState } from "react";
import type { Profile } from "@/lib/supabase/types";

interface ProfileFormProps {
  profile: Profile | null;
  userEmail: string;
  avatarUrl?: string | null;
  onSubmit: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<{ error?: string; success?: boolean } | undefined>;
}

export function ProfileForm({ profile, userEmail, avatarUrl, onSubmit }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(onSubmit, undefined);
  const [previewUrl, setPreviewUrl] = useState(avatarUrl ?? "");

  useEffect(() => {
    if (state && !state.error) {
      window.dispatchEvent(new CustomEvent("user-metadata-updated"));
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm font-bold text-red-400">{state.error}</p>
        </div>
      )}

      {/* Avatar Preview */}
      {previewUrl && (
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Profile"
            className="h-20 w-20 rounded-full border-2 border-primary/30 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Email (read-only) */}
      <div>
        <label className="mb-1 block text-sm font-bold text-white/80">
          Email
        </label>
        <input
          value={userEmail}
          readOnly
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50"
        />
        <p className="mt-1 text-xs text-white/40">
          Email cannot be changed
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="mb-1 block text-sm font-bold text-white/80">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          defaultValue={profile?.full_name ?? ""}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your full name"
        />
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="company_name" className="mb-1 block text-sm font-bold text-white/80">
          Company Name
        </label>
        <input
          id="company_name"
          name="company_name"
          defaultValue={profile?.company_name ?? ""}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your company (optional)"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-bold text-white/80">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile?.phone ?? ""}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="+27 XX XXX XXXX"
        />
      </div>

      {/* Avatar URL */}
      <div>
        <label htmlFor="avatar_url" className="mb-1 block text-sm font-bold text-white/80">
          Avatar URL
        </label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={avatarUrl ?? ""}
          onChange={(e) => setPreviewUrl(e.target.value)}
          className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="https://example.com/avatar.jpg"
        />
        <p className="mt-1 text-xs text-white/40">
          Link to your profile picture (stored with your account)
        </p>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary px-8 py-3 text-sm font-black uppercase tracking-wide text-[#08080c] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
