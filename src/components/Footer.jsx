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
          z-index: 1;
        }

        .image-footer__hotspot {
          position: absolute;
          display: block;
          border-radius: 4px;
        }

        .image-footer__hotspot:focus-visible {
          outline: 3px solid #c1121f;
          outline-offset: 3px;
          background: rgb(255 255 255 / 18%);
        }

        .image-footer__hotspot--email {
          top: 4%;
          left: 58%;
          width: 16%;
          height: 14%;
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
