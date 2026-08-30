import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "../actions";
import { hasSupabaseConfig } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Vaphia Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : "";
  const configured = hasSupabaseConfig();
  return (
    <main className="admin-shell">
      <section className="admin-login-card">
        <span className="admin-lock"><LockKeyhole /></span>
        <h1>Vaphia Admin</h1>
        <p>Private content-management area for the site owner.</p>
        <form action={loginAction} className="admin-form">
          {configured ? <label>Email<input type="email" name="email" required autoComplete="username" /></label> : null}
          <label>{configured ? "Password" : "Owner password"}<input type="password" name="password" required autoComplete="current-password" /></label>
          {error && <div className="admin-error">Login failed. Check the owner password{configured ? " or admin account" : ""}.</div>}
          {!configured ? <p className="admin-alert">No Supabase. Use the ADMIN_PASSWORD from the server environment (dev default is documented in .env.example).</p> : null}
          <button className="button primary" type="submit">Sign in</button>
        </form>
        <Link href="/en">← Back to Vaphia</Link>
      </section>
    </main>
  );
}
