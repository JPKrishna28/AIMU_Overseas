import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { findUser } from "@/lib/authStore";
import { AuthWallOverlay } from "@/components/AuthWallOverlay";

/**
 * Content teaser wall.
 *
 * Signed-in users get the children untouched. Everyone else sees the real page
 * fading and blurring into an overlaid sign-in card — the pattern used by news
 * sites and research portals.
 *
 * Note: the children are still rendered and sent to the browser, so the blur is
 * a conversion device, not a security boundary. Anything genuinely private must
 * be gated server-side (see the `authed` prop passed down to callers that need it).
 */
export async function AuthWall({
  children,
  title,
  subtitle,
  next,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  next: string;
}) {
  const email = (await cookies()).get(SESSION_COOKIE)?.value;
  const authed = Boolean(email && findUser(email));

  if (authed) return <>{children}</>;

  return (
    <div className="relative">
      {/* Teaser: top stays legible, content fades and blurs downward */}
      <div className="relative max-h-[540px] overflow-hidden sm:max-h-[620px]">
        <div aria-hidden className="pointer-events-none select-none blur-[6px]">
          {children}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent via-white/80 to-white" />
      </div>

      <AuthWallOverlay title={title} subtitle={subtitle} next={next} />
    </div>
  );
}
