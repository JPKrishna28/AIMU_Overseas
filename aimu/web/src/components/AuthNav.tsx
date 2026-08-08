"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type SessionUser = { fullName: string; email: string } | null;

/**
 * Reads the session client-side so the shared Navbar stays a client component
 * and doesn't force every page to become dynamic.
 */
export function AuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const [user, setUser] = useState<SessionUser>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setUser(data?.user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    onNavigate?.();
    router.push("/");
    router.refresh();
  }

  // Avoid a flash of the wrong control before the session resolves.
  if (!loaded) return <span className="h-9 w-24" aria-hidden />;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-navy/70 xl:inline">
          {user.fullName.split(" ")[0]}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full border border-navy/15 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-light-gray"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        onClick={onNavigate}
        className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-light-gray"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        onClick={onNavigate}
        className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition-transform hover:scale-[1.03]"
      >
        Get Started
      </Link>
    </div>
  );
}
