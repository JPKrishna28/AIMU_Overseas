/** Session cookie config, shared by the auth API routes and the AuthWall. */

export const SESSION_COOKIE = "aimu_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
