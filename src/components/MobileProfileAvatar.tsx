"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";

export function MobileProfileAvatar() {
  const [user, setUser] = useState<User | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();

    function refreshUser() {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data?.user ?? null);
        setImgError(false);
      });
    }

    refreshUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setImgError(false);
    });

    window.addEventListener("user-metadata-updated", refreshUser);

    return () => {
      listener?.subscription.unsubscribe();
      window.removeEventListener("user-metadata-updated", refreshUser);
    };
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex h-8 w-8 items-center justify-center text-background/60 transition-colors hover:text-background"
      >
        <i className="bi-person text-base" />
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const showImg = avatarUrl && !imgError;
  const initial = (user.user_metadata?.full_name as string)?.charAt(0)?.toUpperCase()
    ?? user.email?.charAt(0).toUpperCase()
    ?? "?";

  return (
    <Link
      href="/account/profile"
      className="flex h-8 w-8 items-center justify-center"
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt=""
          className="h-7 w-7 rounded-full border border-white/20 object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-black text-primary">
          {initial}
        </span>
      )}
    </Link>
  );
}
