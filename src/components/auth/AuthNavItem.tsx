"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";

export function AuthNavItem() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();

    function refreshUser() {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data?.user ?? null);
        setLoading(false);
        setImgError(false);
      });
    }

    refreshUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setImgError(false);
    });

    window.addEventListener("user-metadata-updated", refreshUser);

    return () => {
      listener?.subscription.unsubscribe();
      window.removeEventListener("user-metadata-updated", refreshUser);
    };
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <li className="flex items-center px-2 py-2">
        <i className="bi-circle text-xs text-background/30" aria-hidden="true" />
      </li>
    );
  }

  if (user) {
    const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
    const showImg = avatarUrl && !imgError;
    const initial = (user.user_metadata?.full_name as string)?.charAt(0)?.toUpperCase()
      ?? user.email?.charAt(0).toUpperCase()
      ?? "?";

    return (
      <li className="flex items-center gap-1">
        <Link
          href="/account/profile"
          className="flex items-center px-2 py-2"
          title="Profile"
        >
          {showImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="h-8 w-8 rounded-full border border-white/20 object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-black text-primary">
              {initial}
            </span>
          )}
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center px-2 py-2 text-xs text-background/40 transition-colors hover:text-red-400"
          title="Sign out"
        >
          <i className="bi-box-arrow-right text-base" aria-hidden="true" />
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        href="/login"
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-background/60 transition-colors hover:text-background"
      >
        <i className="bi-person text-base" aria-hidden="true" />
        <span>Sign In</span>
      </Link>
    </li>
  );
}
