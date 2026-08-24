import { withBase } from "../utils/basePath";

export const NAV_ITEMS = [
  {
    href: withBase("/sobre-nosotros"),
    label: "Memorial",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { href: withBase("/papeles-y-tratados"), label: "Papeles y Tratados" },
  { href: withBase("/libreria"), label: "Archivo" },
  { href: withBase("/foro"), label: "Foro" },
  { href: withBase("/tienda"), label: "Tienda" },
  { href: withBase("/contacto"), label: "Audiencia" },
];
