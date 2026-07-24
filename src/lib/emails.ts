import { getRequiredEnv } from "./env";
import { resend } from "./resend";

const from = getRequiredEnv("RESEND_FROM_EMAIL");

function greeting(name?: string | null) {
  return name ? `Bienvenido, ${name}` : "Bienvenido";
}

export async function sendPiqueroWelcomeEmail(params: {
  to: string;
  name?: string | null;
}) {
  const { to, name } = params;

  return resend.emails.send({
    from,
    to,
    subject: "Tu cuenta PIQUERO esta activa",
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
        <h1>${greeting(name)}</h1>
        <p>Tu cuenta <strong>PIQUERO</strong> esta activa.</p>
        <p>Ya formas parte del circulo de lectores y puedes acceder al contenido gratuito ampliado.</p>
        <p><strong>Plus Ultra.</strong></p>
      </div>
    `,
    text: `${greeting(name)}. Tu cuenta PIQUERO esta activa. Ya formas parte del circulo de lectores y puedes acceder al contenido gratuito ampliado. Plus Ultra.`,
  });
}

export async function sendPaidWelcomeEmail(params: {
  to: string;
  name?: string | null;
  planName: "ARCABUCERO" | "MAESTRE DE CAMPO";
}) {
  const { to, name, planName } = params;
  const copy =
    planName === "MAESTRE DE CAMPO"
      ? "Ya tienes acceso superior al archivo, las cronicas premium y las ventajas reservadas de la comunidad."
      : "Ya puedes acceder al archivo completo, las cronicas premium y las rutas de lectura.";

  return resend.emails.send({
    from,
    to,
    subject: `Tu suscripcion ${planName} esta activa`,
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
        <h1>${greeting(name)}</h1>
        <p>Tu suscripcion <strong>${planName}</strong> esta activa.</p>
        <p>${copy}</p>
        <p><strong>Plus Ultra.</strong></p>
      </div>
    `,
    text: `${greeting(name)}. Tu suscripcion ${planName} esta activa. ${copy} Plus Ultra.`,
  });
}

export async function sendPaymentFailedEmail(params: { to: string }) {
  return resend.emails.send({
    from,
    to: params.to,
    subject: "No hemos podido procesar tu pago",
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
        <h1>Problema con el pago</h1>
        <p>No hemos podido procesar el ultimo pago de tu suscripcion.</p>
        <p>Actualiza tu metodo de pago para mantener el acceso al archivo.</p>
      </div>
    `,
    text: "No hemos podido procesar el ultimo pago de tu suscripcion. Actualiza tu metodo de pago para mantener el acceso al archivo.",
  });
}

export async function sendSubscriptionCancelledEmail(params: { to: string }) {
  return resend.emails.send({
    from,
    to: params.to,
    subject: "Tu suscripcion ha sido cancelada",
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
        <h1>Suscripcion cancelada</h1>
        <p>Tu suscripcion ha sido cancelada correctamente.</p>
        <p>Tu cuenta PIQUERO seguira disponible como acceso gratuito.</p>
      </div>
    `,
    text: "Tu suscripcion ha sido cancelada correctamente. Tu cuenta PIQUERO seguira disponible como acceso gratuito.",
  });
}

export async function sendMerchPurchaseEmail(params: {
  to: string;
  productName: string;
  size: string;
}) {
  const { to, productName, size } = params;
  const sizeCopy = size ? `, talla ${size}` : "";

  return resend.emails.send({
    from,
    to,
    subject: "Hemos recibido tu pedido",
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #111;">
        <h1>Pedido confirmado</h1>
        <p>Hemos recibido el pago de <strong>${productName}${sizeCopy}</strong>.</p>
        <p>Prepararemos el pedido y te informaremos cuando salga hacia su destino.</p>
        <p><strong>Plus Ultra.</strong></p>
      </div>
    `,
    text: `Pedido confirmado. Hemos recibido el pago de ${productName}${sizeCopy}. Prepararemos el pedido y te informaremos cuando salga hacia su destino. Plus Ultra.`,
  });
}
