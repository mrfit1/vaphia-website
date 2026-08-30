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
        {!configured ? (
          <div className="admin-alert">Supabase is not configured yet. Add the Supabase environment variables in Vercel after running <code>supabase/schema.sql</code>.</div>
        ) : (
          <form action={loginAction} className="admin-form">
            <label>Email<input type="email" name="email" required autoComplete="username" /></label>
            <label>Password<input type="password" name="password" required autoComplete="current-password" /></label>
            {error && <div className="admin-error">Login failed or this account is not authorized.</div>}
            <button className="button primary" type="submit">Sign in</button>
          </form>
        )}
        <Link href="/en">← Back to Vaphia</Link>
      </section>
    </main>
  );
}
