import type { APIRoute } from "astro";
import { getRequiredEnv } from "../../lib/env";
import { getCheckoutPlan } from "../../lib/stripe-prices";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const prerender = false;

function siteUrl() {
  return getRequiredEnv("PUBLIC_SITE_URL").replace(/\/$/, "");
}

function isSameOrigin(request: Request, publicSiteUrl: string) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === publicSiteUrl;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const publicSiteUrl = siteUrl();

    if (!isSameOrigin(request, publicSiteUrl)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json().catch(() => null);
    const selectedPlan = getCheckoutPlan(body?.plan);

    if (!selectedPlan) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const email =
      typeof body?.email === "string" && EMAIL_PATTERN.test(body.email.trim())
        ? body.email.trim().toLowerCase()
        : undefined;

    const { stripe } = await import("../../lib/stripe");
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${publicSiteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicSiteUrl}/suscribirse`,
      metadata: {
        plan: selectedPlan.plan,
        billingInterval: selectedPlan.billingInterval,
      },
      subscription_data: {
        metadata: {
          plan: selectedPlan.plan,
          billingInterval: selectedPlan.billingInterval,
        },
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-checkout-session error:", error);

    return new Response(
      JSON.stringify({ error: "Unable to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
