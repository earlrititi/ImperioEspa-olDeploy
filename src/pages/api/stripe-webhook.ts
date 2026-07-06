import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { getRequiredEnv } from "../../lib/env";
import {
  findUserIdByEmail,
  type PaidPlanName,
  upsertSubscription,
} from "../../lib/subscriptions";

export const prerender = false;

function getObjectId(value: string | { id: string } | null | undefined) {
  return typeof value === "string" ? value : value?.id ?? null;
}

function getPlanFromMetadata(metadata?: Stripe.Metadata | null): PaidPlanName {
  return metadata?.plan === "maestre_campo" ? "maestre_campo" : "arcabucero";
}

function getPlanLabel(plan: PaidPlanName) {
  return plan === "maestre_campo" ? "MAESTRE DE CAMPO" : "ARCABUCERO";
}

async function safeFindUserIdByEmail(email: string | null) {
  if (!email) {
    return null;
  }

  try {
    return await findUserIdByEmail(email);
  } catch (error) {
    console.error("Stripe webhook profile lookup failed:", error);
    return null;
  }
}

async function safeSendWebhookEmail(
  label: string,
  sendEmail: () => Promise<unknown>
) {
  try {
    await sendEmail();
  } catch (error) {
    console.error(`Stripe webhook email failed (${label}):`, error);
  }
}

function getSubscriptionPeriod(subscription: Stripe.Subscription) {
  const firstItem = subscription.items.data[0];

  return {
    currentPeriodStart: firstItem?.current_period_start
      ? new Date(firstItem.current_period_start * 1000)
      : null,
    currentPeriodEnd: firstItem?.current_period_end
      ? new Date(firstItem.current_period_end * 1000)
      : null,
  };
}

async function getCustomerEmail(customerId: string, stripe: Stripe) {
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    return null;
  }

  return customer.email ?? null;
}

async function upsertFromSubscription(
  subscription: Stripe.Subscription,
  stripe: Stripe,
  forcedStatus?: string
) {
  const stripeCustomerId = getObjectId(subscription.customer);
  const email = stripeCustomerId
    ? await getCustomerEmail(stripeCustomerId, stripe)
    : null;
  const userId = await safeFindUserIdByEmail(email);
  const plan = getPlanFromMetadata(subscription.metadata);
  const { currentPeriodStart, currentPeriodEnd } =
    getSubscriptionPeriod(subscription);

  await upsertSubscription({
    userId,
    email,
    stripeCustomerId,
    stripeSubscriptionId: subscription.id,
    plan,
    billingInterval: "month",
    status: forcedStatus ?? subscription.status,
    currentPeriodStart,
    currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });

  return { email, plan };
}

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  const webhookSecret = getRequiredEnv("STRIPE_WEBHOOK_SECRET");
  const { stripe } = await import("../../lib/stripe");

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = getObjectId(session.subscription);
        const customerId = getObjectId(session.customer);
        const email =
          session.customer_details?.email ?? session.customer_email ?? null;
        const userId = await safeFindUserIdByEmail(email);
        const plan = getPlanFromMetadata(session.metadata);

        if (subscriptionId) {
          await upsertSubscription({
            userId,
            email,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            plan,
            billingInterval: "month",
            status: "active",
          });
        }

        if (email) {
          const { sendPaidWelcomeEmail } = await import("../../lib/emails");
          await safeSendWebhookEmail("paid welcome", () => {
            return sendPaidWelcomeEmail({
              to: email,
              planName: getPlanLabel(plan),
            });
          });
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await upsertFromSubscription(event.data.object as Stripe.Subscription, stripe);
        break;
      }

      case "customer.subscription.deleted": {
        const { email } = await upsertFromSubscription(
          event.data.object as Stripe.Subscription,
          stripe,
          "canceled"
        );

        if (email) {
          const { sendSubscriptionCancelledEmail } = await import("../../lib/emails");
          await safeSendWebhookEmail("subscription cancelled", () => {
            return sendSubscriptionCancelledEmail({ to: email });
          });
        }

        break;
      }

      case "invoice.payment_succeeded": {
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = getObjectId(invoice.customer);

        if (customerId) {
          const email = await getCustomerEmail(customerId, stripe);

          if (email) {
            const { sendPaymentFailedEmail } = await import("../../lib/emails");
            await safeSendWebhookEmail("payment failed", () => {
              return sendPaymentFailedEmail({ to: email });
            });
          }
        }

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }
};
