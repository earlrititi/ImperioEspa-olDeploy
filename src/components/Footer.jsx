const SOCIAL_LINKS = [
  {
    className: "image-footer__hotspot--instagram",
    href: "https://www.instagram.com/imperio_e/",
    label: "Instagram",
    iconClassName: "image-footer__social-mark--instagram",
    x: 1479,
    y: 80,
    width: 45,
    height: 45,
    iconPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    className: "image-footer__hotspot--facebook",
    href: "https://www.facebook.com/ElMayorImperioDeTodos/",
    label: "Facebook",
    iconClassName: "image-footer__social-mark--facebook",
    x: 1548,
    y: 79,
    width: 47,
    height: 46,
    iconPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    className: "image-footer__hotspot--x",
    href: "https://x.com/imperioespa%C3%B1ol",
    label: "X",
    iconClassName: "image-footer__social-mark--x",
    x: 1615,
    y: 81,
    width: 49,
    height: 44,
    iconPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
];

export default function Footer({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <footer class={`image-footer image-footer--${variant}`} aria-label="Pie de pagina">
      <div class="image-footer__frame">
        <img
          class="image-footer__art"
          src={
            isDark
              ? "/images/dark-footer-interactive.webp"
              : "/images/imperio-espanol-footer-interactive.webp"
          }
          alt="Imperio Espanol. Mapa historico, contacto y redes sociales."
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        />

        <svg
          class="image-footer__labels"
          viewBox="0 0 1920 660"
          preserveAspectRatio="none"
          role="group"
          aria-label="Enlaces destacados del pie de pagina"
        >
          <a
            class="image-footer__label-link"
            href="mailto:hola@imperioes.com"
            aria-label="Contacto"
          >
            <text class="image-footer__label-text" x="1127" y="60">
              Contacto
            </text>
          </a>

          <a
            class="image-footer__label-link"
            href="https://www.instagram.com/imperio_e/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Siguenos en redes sociales"
          >
            <text class="image-footer__label-text image-footer__label-text--social" x="1478" y="64">
              {"\u00a1S\u00edguenos!"}
            </text>
          </a>

          <text class="image-footer__email-mark" x="1128" y="100">
            contacto@imperioes.com
          </text>

          {SOCIAL_LINKS.map((link) => (
            <svg
              class={`image-footer__social-mark ${link.iconClassName}`}
              x={link.x}
              y={link.y}
              width={link.width}
              height={link.height}
              viewBox="0 0 24 24"
              aria-hidden="true"
              key={`${link.label}-mark`}
            >
              <path d={link.iconPath} />
            </svg>
          ))}
        </svg>

        <nav class="image-footer__links" aria-label="Contacto y redes sociales">
          <a
            class="image-footer__hotspot image-footer__hotspot--email"
            href="mailto:hola@imperioes.com"
          >
            <span class="image-footer__sr-only">
              Escribir a hola@imperioes.com
            </span>
          </a>

          {SOCIAL_LINKS.map((link) => (
            <a
              class={`image-footer__hotspot ${link.className}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              key={link.label}
            />
          ))}
        </nav>
      </div>

      <style>{`
        .image-footer {
          width: 100%;
          overflow: hidden;
          background: #f7f5f1;
        }

        .image-footer--dark {
          background: #000;
        }

        .image-footer__frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1920 / 660;
          overflow: hidden;
        }

        .image-footer__art {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .image-footer__links {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .image-footer__labels {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .image-footer__label-link {
          pointer-events: auto;
          cursor: pointer;
        }

        .image-footer__label-text {
          fill: #ff1018;
          font-family: "Inter", "Segoe UI", sans-serif;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 0;
          transform-box: fill-box;
          transform-origin: center;
          transition:
            fill 220ms ease,
            transform 220ms ease;
        }

        .image-footer__label-link:hover .image-footer__label-text,
        .image-footer__label-link:focus-visible .image-footer__label-text {
          fill: #000;
          transform: scale(1.1);
        }

        .image-footer--dark .image-footer__label-link:hover .image-footer__label-text,
        .image-footer--dark .image-footer__label-link:focus-visible .image-footer__label-text {
          fill: #ead7c1;
        }

        .image-footer__label-link:focus-visible {
          outline: none;
        }

        .image-footer__email-mark {
          fill: #000;
          font-family: "Inter", "Segoe UI", sans-serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0;
          pointer-events: none;
          transition: fill 220ms ease;
        }

        .image-footer__social-mark {
          fill: #000;
          pointer-events: none;
          transition: fill 220ms ease;
        }

        .image-footer--dark .image-footer__email-mark,
        .image-footer--dark .image-footer__social-mark {
          fill: #ead7c1;
        }

        .image-footer__frame:has(.image-footer__hotspot--email:hover) .image-footer__email-mark,
        .image-footer__frame:has(.image-footer__hotspot--email:focus-visible) .image-footer__email-mark,
        .image-footer__frame:has(.image-footer__hotspot--instagram:hover) .image-footer__social-mark--instagram,
        .image-footer__frame:has(.image-footer__hotspot--instagram:focus-visible) .image-footer__social-mark--instagram,
        .image-footer__frame:has(.image-footer__hotspot--facebook:hover) .image-footer__social-mark--facebook,
        .image-footer__frame:has(.image-footer__hotspot--facebook:focus-visible) .image-footer__social-mark--facebook,
        .image-footer__frame:has(.image-footer__hotspot--x:hover) .image-footer__social-mark--x,
        .image-footer__frame:has(.image-footer__hotspot--x:focus-visible) .image-footer__social-mark--x {
          fill: #ff1018;
        }

        .image-footer__hotspot {
          position: absolute;
          display: block;
          border-radius: 4px;
          pointer-events: auto;
        }

        .image-footer__hotspot:focus-visible {
          outline: 3px solid #c1121f;
          outline-offset: 3px;
          background: rgb(255 255 255 / 18%);
        }

        .image-footer__hotspot--email {
          top: 10.5%;
          left: 58%;
          width: 16%;
          height: 7%;
        }

        .image-footer__hotspot--instagram {
          top: 11.5%;
          left: 76.7%;
          width: 3.1%;
          height: 9%;
        }

        .image-footer__hotspot--facebook {
          top: 11.5%;
          left: 80.4%;
          width: 3.1%;
          height: 9%;
        }

        .image-footer__hotspot--x {
          top: 11.5%;
          left: 84.1%;
          width: 3.2%;
          height: 9%;
        }

        .image-footer__sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </footer>
  );
}
