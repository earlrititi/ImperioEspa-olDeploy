import type { APIRoute } from "astro";
import { getRequiredEnv } from "../../lib/env";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const prerender = false;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

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

function safeName(input: unknown) {
  if (typeof input !== "string") {
    return "";
  }

  return input.trim().slice(0, 80);
}

function safeSource(input: unknown) {
  if (typeof input !== "string") {
    return "web";
  }

  return input.trim().slice(0, 40) || "web";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const publicSiteUrl = siteUrl();

    if (!isSameOrigin(request, publicSiteUrl)) {
      return jsonResponse({ ok: false, error: "Origen no permitido." }, 403);
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonResponse({ ok: false, error: "Solicitud invalida." }, 400);
    }

    const payload = body as Record<string, unknown>;
    const honeypot = safeName(payload.company);

    if (honeypot) {
      return jsonResponse({ ok: true });
    }

    const email =
      typeof payload.email === "string"
        ? payload.email.trim().toLowerCase()
        : "";

    if (!EMAIL_PATTERN.test(email)) {
      return jsonResponse({ ok: false, error: "Introduce un correo valido." }, 400);
    }

    const name = safeName(payload.name);
    const greetingName = name || "lector";
    const source = safeSource(payload.source);
    const from =
      import.meta.env.MANIFESTO_FROM_EMAIL?.trim() ||
      getRequiredEnv("RESEND_FROM_EMAIL");
    const attachmentPath =
      import.meta.env.MANIFESTO_ATTACHMENT_URL?.trim() ||
      import.meta.env.MANIFESTO_PDF_URL?.trim() ||
      import.meta.env.MANIFESTO_ATTACHMENT_PATH?.trim() ||
      import.meta.env.MANIFESTO_PDF_PATH?.trim() ||
      "/manifesto-email.pdf";
    const attachmentUrl = attachmentPath.startsWith("http")
      ? attachmentPath
      : `${publicSiteUrl}/${attachmentPath.replace(/^\/+/, "")}`;
    const subject = "Tu manifiesto de Imperio Espanol";
    const text = `Hola ${greetingName},\n\nGracias por pedir el manifiesto. Te lo dejamos adjunto a este correo.\n\nImperio Espanol`;
    const { resend } = await import("../../lib/resend");
    const result = await resend.emails.send({
      from,
      to: email,
      subject,
      html: `
        <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
          <p>Hola ${escapeHtml(greetingName)},</p>
          <p>Gracias por pedir el manifiesto. Te lo dejamos adjunto a este correo.</p>
          <p><strong>Imperio Espanol</strong></p>
        </div>
      `,
      text,
      attachments: [
        {
          filename: "Manifiesto Imperio Espanol.pdf",
          path: attachmentUrl,
        },
      ],
      tags: [
        {
          name: "source",
          value: source,
        },
      ],
    });

    if (result.error) {
      console.error("Resend manifesto email failed:", result.error);
      return jsonResponse(
        { ok: false, error: "No se pudo enviar el correo. Intentalo de nuevo." },
        502
      );
    }

    return jsonResponse({
      ok: true,
      message: "Te hemos enviado el manifiesto por correo.",
    });
  } catch (error) {
    console.error("manifesto endpoint error:", error);
    return jsonResponse(
      { ok: false, error: "No se pudo enviar el correo. Intentalo de nuevo." },
      500
    );
  }
};
