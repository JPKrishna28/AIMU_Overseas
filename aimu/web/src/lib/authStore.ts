/**
 * In-memory user store for the pre-backend phase.
 *
 * Everything here is deliberately swappable: when a real database or auth
 * provider is wired up, replace the `users` Map and the two password helpers
 * and the API routes keep working unchanged.
 *
 * Caveats while this is in use:
 *  - Users live in process memory, so they disappear on server restart and are
 *    not shared across serverless instances.
 *  - Passwords are stored as provided (see hashPassword below).
 */

export type StoredUser = {
  fullName: string;
  email: string;
  phone: string;
  interestedCourse: string;
  preferredCountry: string;
  password: string;
  createdAt: string;
};

/** Public shape — never includes the password. */
export type PublicUser = Omit<StoredUser, "password">;

// Survives hot-reload in dev, where module state is otherwise re-created.
const globalForAuth = globalThis as unknown as { __aimuUsers?: Map<string, StoredUser> };
const users: Map<string, StoredUser> = globalForAuth.__aimuUsers ?? new Map();
globalForAuth.__aimuUsers = users;

/**
 * Password handling for the prototype.
 *
 * TODO(auth): before this reaches production, swap these two functions for
 * scrypt/bcrypt — Node's `crypto.scryptSync` needs no extra dependency:
 *   hash:   const salt = randomBytes(16).toString("hex");
 *           return `${salt}:${scryptSync(pw, salt, 64).toString("hex")}`;
 *   verify: timing-safe compare of the re-derived hash.
 * Every caller goes through these helpers, so nothing else has to change.
 */
export function hashPassword(password: string): string {
  return password;
}

export function verifyPassword(password: string, stored: string): boolean {
  return password === stored;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function toPublicUser(user: StoredUser): PublicUser {
  const { password: _password, ...rest } = user;
  void _password;
  return rest;
}

export function findUser(email: string): StoredUser | undefined {
  return users.get(normalizeEmail(email));
}

export function createUser(input: Omit<StoredUser, "createdAt">): StoredUser {
  const user: StoredUser = {
    ...input,
    email: normalizeEmail(input.email),
    createdAt: new Date().toISOString(),
  };
  users.set(user.email, user);
  return user;
}

export function userCount(): number {
  return users.size;
}
