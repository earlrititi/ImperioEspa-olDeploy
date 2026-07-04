import type { APIRoute } from "astro";
import { getRequiredEnv } from "../../lib/env";
import { getSubscriptionByUserId } from "../../lib/subscriptions";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
  const supabase = createSupabaseServerClient({ cookies, request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const subscription = await getSubscriptionByUserId(user.id);

  if (!subscription?.stripe_customer_id) {
    return new Response(JSON.stringify({ error: "No Stripe customer found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const siteUrl = getRequiredEnv("PUBLIC_SITE_URL").replace(/\/$/, "");
  const { stripe } = await import("../../lib/stripe");
  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${siteUrl}/cuenta`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
