import { createBrowserClient } from "@supabase/ssr";
import { getRequiredEnv } from "../env";

export const supabase = createBrowserClient(
  getRequiredEnv("PUBLIC_SUPABASE_URL"),
  getRequiredEnv("PUBLIC_SUPABASE_ANON_KEY")
);
