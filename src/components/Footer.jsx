const SOCIAL_LINKS = [
  {
    className: "image-footer__hotspot--instagram",
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    className: "image-footer__hotspot--facebook",
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    className: "image-footer__hotspot--x",
    href: "https://x.com",
    label: "X",
  },
];

export default function Footer() {
  return (
    <footer class="image-footer" aria-label="Pie de pagina">
      <div class="image-footer__frame">
        <img
          class="image-footer__art"
          src="/images/imperio-espanol-footer.webp"
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
          <rect class="image-footer__label-cover" x="1118" y="25" width="178" height="45" />
          <rect class="image-footer__label-cover" x="1468" y="20" width="205" height="55" />

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
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Siguenos en redes sociales"
          >
            <text class="image-footer__label-text image-footer__label-text--social" x="1478" y="64">
              {"\u00a1S\u00edguenos!"}
            </text>
          </a>
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

        .image-footer__label-cover {
          fill: #fdfcfb;
        }

        .image-footer__label-link {
          pointer-events: auto;
          cursor: pointer;
        }

        .image-footer__label-text {
          fill: #ff1018;
          font-family: "Inter", "Segoe UI", sans-serif;
          font-size: 38px;
          font-weight: 800;
          letter-spacing: 0;
          transform-box: fill-box;
          transform-origin: center;
          transition:
            fill 220ms ease,
            transform 220ms ease;
        }

        .image-footer__label-text--social {
          font-size: 42px;
        }

        .image-footer__label-link:hover .image-footer__label-text,
        .image-footer__label-link:focus-visible .image-footer__label-text {
          fill: #000;
          transform: scale(1.1);
        }

        .image-footer__label-link:focus-visible {
          outline: none;
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
