import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!hasSupabaseConfig()) return { supabase: null, user: null, configured: false } as const;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null, configured: false } as const;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorized");
  }

  return { supabase, user, configured: true } as const;
}
