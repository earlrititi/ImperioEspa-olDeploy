import type { APIRoute } from "astro";

export const prerender = false;

const requiredVariables = [
  "PUBLIC_SITE_URL",
  "PUBLIC_SUPABASE_URL",
  "PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_ARCABUCERO_MONTHLY",
  "STRIPE_PRICE_MAESTRE_CAMPO_MONTHLY",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
] as const;

function describeVariable(name: (typeof requiredVariables)[number]) {
  const value = import.meta.env[name];
  const present = typeof value === "string" && value.trim().length > 0;

  if (!present) {
    return { present: false };
  }

  if (name === "PUBLIC_SITE_URL" || name === "RESEND_FROM_EMAIL") {
    return { present: true, value };
  }

  if (name.startsWith("STRIPE_PRICE_")) {
    return {
      present: true,
      startsWithPrice: value.startsWith("price_"),
      length: value.length,
    };
  }

  if (name === "STRIPE_SECRET_KEY") {
    return {
      present: true,
      mode: value.startsWith("sk_live_")
        ? "live"
        : value.startsWith("sk_test_")
          ? "test"
          : "unknown",
    };
  }

  return { present: true };
}

export const GET: APIRoute = async () => {
  const variables = Object.fromEntries(
    requiredVariables.map((name) => [name, describeVariable(name)])
  );

  return new Response(
    JSON.stringify(
      {
        ok: true,
        variables,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    }
  );
};
