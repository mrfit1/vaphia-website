import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { isOwnerUnlocked } from "@/lib/owner/auth";

export async function requireAdmin() {
  if (hasSupabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) redirect("/admin/login?error=not-configured");
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
    return { supabase, user, configured: true, mode: "supabase" as const };
  }

  if (!(await isOwnerUnlocked())) redirect("/admin/login");
  return { supabase: null, user: { email: "owner@local" }, configured: true, mode: "password" as const };
}
