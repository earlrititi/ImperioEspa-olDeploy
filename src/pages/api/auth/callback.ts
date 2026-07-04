import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect, request, url }) => {
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/cuenta";

  if (!code) {
    return redirect("/login?error=missing_code");
  }

  const supabase = createSupabaseServerClient({ cookies, request });
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Supabase auth callback error:", error);
    return redirect("/login?error=auth_callback");
  }

  return redirect(next.startsWith("/") ? next : "/cuenta");
};
