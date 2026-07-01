import { Resend } from "resend";
import { getRequiredEnv } from "./env";

if (!import.meta.env.SSR) {
  throw new Error("resend can only be used on the server.");
}

export const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));
