import { withBase } from "../utils/basePath";

export const NAV_ITEMS = [
  {
    href: withBase("/sobre-nosotros"),
    label: "Memorial",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { href: withBase("/papeles-y-tratados"), label: "Papeles y Tratados" },
  { href: withBase("/libreria"), label: "Libreria" },
  { href: withBase("/mentidero"), label: "Mentidero" },
  { href: withBase("/tienda"), label: "Casa de Mercaderias" },
  { href: withBase("/contacto"), label: "Audiencia" },
];
