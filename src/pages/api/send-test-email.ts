import type { APIRoute } from "astro";
import { sendPiqueroWelcomeEmail } from "../../lib/emails";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.PROD) {
    return new Response(JSON.stringify({ error: "Not available in production" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email)) {
    return new Response(JSON.stringify({ error: "Missing or invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await sendPiqueroWelcomeEmail({
    to: email,
    name: typeof body?.name === "string" ? body.name.trim() : "Pablo",
  });

  if (error) {
    console.error("send-test-email error:", error);
    return new Response(JSON.stringify({ error: "Email could not be sent" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, id: data?.id ?? null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
