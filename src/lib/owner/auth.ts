import { createHash } from "crypto";
import { cookies } from "next/headers";

export const OWNER_COOKIE = "vaphia-owner";
export const DEV_ADMIN_PASSWORD = "vaphia-owner-dev";

export function ownerPassword() {
  return process.env.ADMIN_PASSWORD || DEV_ADMIN_PASSWORD;
}

export function ownerToken(password = ownerPassword()) {
  return createHash("sha256").update(`vaphia-owner:${password}`).digest("hex");
}

export async function isOwnerUnlocked() {
  const store = await cookies();
  return store.get(OWNER_COOKIE)?.value === ownerToken();
}

export async function setOwnerSession() {
  const store = await cookies();
  store.set(OWNER_COOKIE, ownerToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export async function clearOwnerSession() {
  const store = await cookies();
  store.delete(OWNER_COOKIE);
}
