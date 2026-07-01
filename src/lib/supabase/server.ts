import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { AstroCookies } from "astro";
import { getRequiredEnv } from "../env";

type CreateSupabaseServerClientOptions = {
  cookies: AstroCookies;
  request: Request;
};

function decodeCookieValue(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getRequestCookies(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return [];
  }

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .map((cookie) => {
      const separatorIndex = cookie.indexOf("=");

      if (separatorIndex === -1) {
        return { name: cookie, value: "" };
      }

      return {
        name: cookie.slice(0, separatorIndex),
        value: decodeCookieValue(cookie.slice(separatorIndex + 1)),
      };
    });
}

function toAstroCookieOptions(options: CookieOptions = {}) {
  return {
    ...options,
    path: options.path ?? "/",
  };
}

export function createSupabaseServerClient({
  cookies,
  request,
}: CreateSupabaseServerClientOptions) {
  return createServerClient(
    getRequiredEnv("PUBLIC_SUPABASE_URL"),
    getRequiredEnv("PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return getRequestCookies(request);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, toAstroCookieOptions(options));
          });
        },
      },
    }
  );
}
