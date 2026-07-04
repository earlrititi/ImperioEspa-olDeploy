import { getRequiredEnv } from "./env";

export type CheckoutPlan = "arcabucero-monthly" | "maestre-campo-monthly";

type CheckoutPlanConfig = {
  priceEnvName: string;
  plan: "arcabucero" | "maestre_campo";
  billingInterval: "month";
  label: string;
};

export const checkoutPlans: Record<CheckoutPlan, CheckoutPlanConfig> = {
  "arcabucero-monthly": {
    priceEnvName: "STRIPE_PRICE_ARCABUCERO_MONTHLY",
    plan: "arcabucero",
    billingInterval: "month",
    label: "ARCABUCERO mensual",
  },
  "maestre-campo-monthly": {
    priceEnvName: "STRIPE_PRICE_MAESTRE_CAMPO_MONTHLY",
    plan: "maestre_campo",
    billingInterval: "month",
    label: "MAESTRE DE CAMPO mensual",
  },
};

export function getCheckoutPlan(input: unknown) {
  if (typeof input !== "string") {
    return null;
  }

  if (!(input in checkoutPlans)) {
    return null;
  }

  const plan = checkoutPlans[input as CheckoutPlan];

  return {
    ...plan,
    priceId: getRequiredEnv(plan.priceEnvName),
  };
}
