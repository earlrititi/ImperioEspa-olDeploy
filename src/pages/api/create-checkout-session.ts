import type { APIRoute } from "astro";
import { getRequiredEnv } from "../../lib/env";
import { getCheckoutPlan } from "../../lib/stripe-prices";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const prerender = false;

const SHIRT_SIZES = new Set(["S", "M", "L", "XL"]);

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

    const email =
      typeof body?.email === "string" && EMAIL_PATTERN.test(body.email.trim())
        ? body.email.trim().toLowerCase()
        : undefined;

    const { stripe } = await import("../../lib/stripe");

    if (body?.product === "camiseta-imperial") {
      const size = typeof body?.size === "string" ? body.size.toUpperCase() : "";

      if (!SHIRT_SIZES.has(size)) {
        return new Response(JSON.stringify({ error: "Selecciona una talla valida" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        locale: "es",
        customer_creation: "always",
        customer_email: email,
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["ES"],
        },
        phone_number_collection: {
          enabled: true,
        },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: 2999,
              product_data: {
                name: "Camiseta Imperial",
                description: `Camiseta Imperial - talla ${size}`,
                metadata: {
                  product: "camiseta-imperial",
                },
              },
            },
          },
        ],
        success_url: `${publicSiteUrl}/gracias-compra?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${publicSiteUrl}/tienda#camiseta`,
        metadata: {
          purchaseType: "merchandise",
          product: "camiseta-imperial",
          size,
        },
        payment_intent_data: {
          metadata: {
            purchaseType: "merchandise",
            product: "camiseta-imperial",
            size,
          },
        },
      });

      return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const selectedPlan = getCheckoutPlan(body?.plan);

    if (!selectedPlan) {
      return new Response(JSON.stringify({ error: "Invalid plan or product" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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

    if (
      error instanceof Error &&
      error.message.startsWith("Missing required environment variable:")
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing server configuration",
          variable: error.message.replace("Missing required environment variable: ", ""),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unable to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
