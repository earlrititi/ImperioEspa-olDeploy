import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from "../env";

if (!import.meta.env.SSR) {
  throw new Error("supabaseAdmin can only be used on the server.");
}

export const supabaseAdmin = createClient(
  getRequiredEnv("PUBLIC_SUPABASE_URL"),
  getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
