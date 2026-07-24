import { useEffect, useRef, useState } from "preact/hooks";
import { SERVICES_ITEMS } from "../config/home";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { withBase } from "../utils/basePath";

const FOUNDATION_CARDS = [
  {
    title: "Nuestra Historia",
    description:
      "Donde nunca se ponía el sol. Una historia de descubrimientos, hazañas y legado que cambió el mundo para siempre. Un linaje de exploradores, conquistadores y visionarios que se atrevieron a soñar más allá de lo conocido, dejando una marca imborrable en la historia de la humanidad.",
  },
  {
    title: "Forma parte",
    description:
      "Descarga el manifiesto del Imperio Español. Forma parte de este proyecto que recupera la increíble historia del imperio donde nunca se ponía el sol. Empápate de nuestros artículos exclusivos, información y divulgación, debates en el foro, acceso a preventa de drops en nuestra tienda y muchas más ventajas para suscriptores.",
  },
];

const NEXT_BUTTON_STAR_PATH =
  "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";

const NEXT_BUTTON_STARS = [1, 2, 3, 4, 5, 6];
const NEXT_BUTTON_LABEL = "OBT\u00c9N EL MANIFIESTO";
const SERVICE_CARD_IMAGES = {
  "01": "/images/card-1.webp",
  "02": "/images/card-2.webp",
  "03": "/images/card-3.webp",
};
const SERVICE_CARD_MORPH_IMAGES = {
  "01": "/images/card-1-morph.webp",
  "02": "/images/card-2-morph.webp",
  "03": "/images/card-3-morph.webp",
};

export default function Services() {
  const [isManifestFormOpen, setIsManifestFormOpen] = useState(false);
  const [manifestEmail, setManifestEmail] = useState("");
  const [manifestCompany, setManifestCompany] = useState("");
  const [manifestStatus, setManifestStatus] = useState("idle");
  const [manifestError, setManifestError] = useState("");
  const manifestModalRef = useRef(null);
  const manifestEmailInputRef = useRef(null);
  const isManifestFormReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manifestEmail.trim());

  useEffect(() => {
    if (!isManifestFormOpen) return;

    if (manifestModalRef.current && !manifestModalRef.current.open) {
      manifestModalRef.current.showModal();
    }

    manifestEmailInputRef.current?.focus();
  }, [isManifestFormOpen]);

  const handleManifestSubmit = async (event) => {
    event.preventDefault();
    if (!isManifestFormReady || manifestStatus === "submitting") return;

    setManifestStatus("submitting");
    setManifestError("");

    try {
      const response = await fetch("/api/manifesto.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: manifestEmail,
          company: manifestCompany,
          source: "home",
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar el manifiesto.");
      }

      setManifestStatus("sent");
      setManifestEmail("");
      setManifestCompany("");
    } catch (error) {
      setManifestStatus("idle");
      setManifestError(error.message || "No se pudo enviar el manifiesto.");
    }
  };

  return (
    <>
      <section class="services-section home-section bg-white">
        <div class="home-shell">
          <div class="section-header services-section__header text-center fade-in-up">
            <h2 class="services-title font-rosa-black text-center">
              <span class="services-title__secondary block">DUE&Ntilde;OS DEL MAR</span>
              <span class="services-title__primary block">SE&Ntilde;ORES DEL MUNDO</span>
            </h2>
            <div class="services-army-swap">
              <div class="services-army-hitbox" aria-hidden="true"></div>
              <img
                src={withBase("/images/ejercito-blanco_upscaled_2x.webp")}
                alt="Formacion historica del ejercito español"
                class="services-army-image services-army-image--default"
                loading="lazy"
                decoding="async"
              />
              <img
                src={withBase("/images/ejercito-rojo.webp")}
                alt=""
                aria-hidden="true"
                class="services-army-image services-army-image--hover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="services-foundation-grid services-foundation-grid--before-button fade-in-up">
            {FOUNDATION_CARDS.slice(0, 1).map((card) => (
              <article class="services-foundation-card" key={card.title}>
                <h3 class="services-foundation-card__title">
                  <TextHoverEffect text={card.title} duration={0.72} />
                </h3>
                <p class="services-foundation-card__copy">{card.description}</p>
              </article>
            ))}
          </div>
          </div>

          <div class="services-next-button-wrap services-next-button-wrap--between-foundation fade-in-up">
            <svg class="services-next-liquid-filter" aria-hidden="true" focusable="false">
              <filter id="services-next-liquid-glass" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
                <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence"></feTurbulence>
                <feComponentTransfer in="turbulence" result="mapped">
                  <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5"></feFuncR>
                  <feFuncG type="gamma" amplitude="0" exponent="1" offset="0"></feFuncG>
                  <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5"></feFuncB>
                </feComponentTransfer>
                <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap"></feGaussianBlur>
                <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lighting-color="white" result="specLight">
                  <fePointLight x="-200" y="-200" z="300"></fePointLight>
                </feSpecularLighting>
                <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage"></feComposite>
                <feDisplacementMap in="SourceGraphic" in2="softMap" scale="42" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
              </filter>
            </svg>
            <button
              class="services-next-button"
              type="button"
              aria-controls="services-manifest-modal"
              aria-expanded={isManifestFormOpen}
              onClick={() => setIsManifestFormOpen(true)}
            >
              <span class="services-next-liquid-lens" aria-hidden="true"></span>
              <span class="services-next-glass-outline" aria-hidden="true"></span>
              <span class="services-next-edge-sheen" aria-hidden="true"></span>
              <span class="services-next-edge services-next-edge--top" aria-hidden="true"></span>
              <span class="services-next-edge services-next-edge--left" aria-hidden="true"></span>
              <span class="services-next-edge services-next-edge--bottom" aria-hidden="true"></span>
              <span class="services-next-edge services-next-edge--right" aria-hidden="true"></span>
              <span class="services-next-button-content">
                <span class="services-next-content-plate" aria-hidden="true"></span>
                <svg class="services-next-sparkle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
                </svg>
                <span class="services-next-button-text">
                  {Array.from(NEXT_BUTTON_LABEL).map((letter, index) => (
                    <span class="services-next-letter" style={{ "--letter-index": index }} key={`${letter}-${index}`}>
                      {letter === " " ? "\u00a0" : letter}
                    </span>
                  ))}
                </span>
                <svg class="services-next-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43" aria-hidden="true" focusable="false">
                  <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                  <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                  <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                </svg>
              </span>
              {NEXT_BUTTON_STARS.map((star) => (
                <span class={`services-next-star services-next-star--${star}`} aria-hidden="true" key={star}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53" focusable="false">
                    <path class="services-next-star-fill" d={NEXT_BUTTON_STAR_PATH}></path>
                  </svg>
                </span>
              ))}
            </button>
          </div>

          <div class="services-foundation-grid services-foundation-grid--after-button fade-in-up">
            {FOUNDATION_CARDS.slice(1).map((card) => (
              <article class="services-foundation-card" key={card.title}>
                <h3 class="services-foundation-card__title">
                  <TextHoverEffect text={card.title} duration={0.72} />
                </h3>
                <p class="services-foundation-card__copy">{card.description}</p>
              </article>
            ))}
          </div>

          {isManifestFormOpen && (
            <dialog
              class="services-manifest-modal"
              id="services-manifest-modal"
              aria-labelledby="services-manifest-modal-title"
              ref={manifestModalRef}
              onCancel={(event) => event.preventDefault()}
            >
              <form class="services-manifest-modal__panel" method="dialog" onSubmit={handleManifestSubmit}>
                <h2 class="services-manifest-modal__title" id="services-manifest-modal-title">
                  {manifestStatus === "sent" ? "Manifiesto enviado" : "Recibe el manifiesto"}
                </h2>
                {manifestStatus === "sent" ? (
                  <>
                    <p class="services-manifest-modal__message" role="status">
                      Te hemos enviado el PDF a tu correo. Revisa tambien la carpeta de spam o promociones.
                    </p>
                    <button
                      class="services-manifest-modal__submit"
                      type="button"
                      onClick={() => {
                        manifestModalRef.current?.close();
                        setIsManifestFormOpen(false);
                        setManifestStatus("idle");
                        setManifestError("");
                      }}
                    >
                      Cerrar
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      ref={manifestEmailInputRef}
                      class="services-manifest-modal__field"
                      type="email"
                      name="email"
                      placeholder={"\u00a1Dinos tu correo!"}
                      aria-label={"\u00a1Dinos tu correo!"}
                      autocomplete="email"
                      value={manifestEmail}
                      onInput={(event) => setManifestEmail(event.currentTarget.value)}
                      required
                    />
                    <input
                      class="services-manifest-modal__trap"
                      type="text"
                      name="company"
                      value={manifestCompany}
                      onInput={(event) => setManifestCompany(event.currentTarget.value)}
                      autocomplete="organization"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    {manifestError && (
                      <p class="services-manifest-modal__error" role="alert">
                        {manifestError}
                      </p>
                    )}
                    <button
                      class="services-manifest-modal__submit"
                      type="submit"
                      disabled={!isManifestFormReady || manifestStatus === "submitting"}
                    >
                      {manifestStatus === "submitting" ? "Enviando..." : "Recibir manifiesto"}
                    </button>
                    <button
                      class="services-manifest-modal__close"
                      type="button"
                      onClick={() => {
                        manifestModalRef.current?.close();
                        setIsManifestFormOpen(false);
                        setManifestStatus("idle");
                        setManifestError("");
                      }}
                    >
                      Cerrar
                    </button>
                  </>
                )}
              </form>
            </dialog>
          )}

          <div class="services-grid">
            {SERVICES_ITEMS.map((service) => {
              const cardImageSrc = SERVICE_CARD_IMAGES[service.id];
              const cardMorphSrc = SERVICE_CARD_MORPH_IMAGES[service.id];
              const serviceStatLabel = service.statLabel || service.id;

              if (service.highlights?.length) {
                return (
                  <article
                    class={`service-cta-card fade-in-up${cardImageSrc ? " service-cta-card--image-bg" : ""}${service.priceBadge ? " service-cta-card--has-price" : ""}`}
                    data-stat-counter-group
                    style={cardImageSrc ? {
                      "--service-card-image": `url("${withBase(cardImageSrc)}")`,
                      "--service-card-morph-image": cardMorphSrc ? `url("${withBase(cardMorphSrc)}")` : undefined,
                    } : undefined}
                    key={service.id}
                  >
                    <span class="service-cta-card__stat-rail" aria-hidden="true"></span>
                    <span class="service-cta-card__event-bg" aria-hidden="true"></span>
                    <span class="service-cta-card__grid-pattern" aria-hidden="true"></span>
                    {cardMorphSrc && <span class="service-cta-card__morph-bg" aria-hidden="true"></span>}
                    <span class="service-cta-card__bg" aria-hidden="true"></span>
                    {service.priceBadge && (
                      <span class="service-cta-card__price-flag">{service.priceBadge}</span>
                    )}
                    <div class="service-cta-card__body">
                      <span
                        class="service-number service-cta-card__number"
                        data-stat-counter
                        data-stat-value={serviceStatLabel}
                        data-stat-duration="920"
                      >
                        {serviceStatLabel}
                      </span>
                      <h3 class="service-cta-card__title">
                        <TextHoverEffect text={service.title} duration={0.78} />
                      </h3>
                      <p class="service-cta-card__copy">{service.description}</p>
                      <button class="service-cta-card__button" type="button">
                        <span>Empezar</span>
                        <span class="service-cta-card__button-arrow" aria-hidden="true">-></span>
                      </button>
                    </div>
                    <ul class="service-cta-card__list" aria-label={`Puntos clave de ${service.title}`}>
                      {service.highlights.map((highlight) => (
                        <li class="service-cta-card__list-item" key={highlight}>
                          <span class="service-cta-card__check" aria-hidden="true">&#10003;</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              }

              const contentClassName = [
                "service-content",
                service.reverseOnDesktop && "md:order-2",
              ]
                .filter(Boolean)
                .join(" ");
              const imageClassName = [
                "service-image relative overflow-hidden rounded-lg",
                service.reverseOnDesktop && "md:order-1",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div class="service-item grid md:grid-cols-2 gap-12 items-center fade-in-up" key={service.id}>
                  <div class={contentClassName}>
                    <h3 class="text-4xl font-bold mb-6">
                      <TextHoverEffect text={service.title} duration={0.78} />
                    </h3>
                    <p class="text-lg leading-relaxed text-black/70">{service.description}</p>
                  </div>
                  <div class={imageClassName}>
                    <img
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      class="w-full h-[400px] object-cover hover-scale"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @property --services-next-angle-1 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -75deg;
        }

        @property --services-next-angle-2 {
          syntax: "<angle>";
          inherits: false;
          initial-value: -45deg;
        }

        .services-section {
          padding-block: calc(var(--home-section-space) * 0.72) calc(var(--home-section-space) * 0.62);
        }

        .service-number {
          font-variant-numeric: lining-nums;
          letter-spacing: 0.1em;
          margin-bottom: var(--space-2);
        }

        .services-title {
          color: var(--color-black-pure);
          display: grid;
          justify-items: center;
          letter-spacing: 0.01em;
          line-height: 1;
          margin-bottom: 0;
          margin-top: var(--services-title-offset-y);
          overflow-wrap: anywhere;
          transition: color 0.35s ease;
        }

        .services-title__primary {
          font-size: var(--services-title-primary-size);
        }

        .services-title__secondary {
          font-size: var(--services-title-secondary-size);
        }

        .services-title span + span {
          margin-top: 0.04em;
        }

        .services-section__header {
          display: grid;
          gap: 0;
          margin-bottom: var(--space-2);
        }

        .services-grid {
          display: grid;
          gap: var(--space-4);
          position: relative;
        }

        .service-cta-card {
          --service-glow-hsl: 356 78% 49%;
          --service-card-bg-start: rgba(255, 255, 255, 0.78);
          --service-card-bg-mid: hsl(var(--service-glow-hsl) / 0.12);
          --service-card-bg-end: hsl(var(--service-glow-hsl) / 0.2);
          --service-card-bg-base: hsl(var(--service-glow-hsl) / 0.08);
          --service-card-copy-color: rgba(0, 0, 0, 0.68);
          --service-card-check-color: hsl(var(--service-glow-hsl));
          --service-stat-rail-color: hsl(var(--service-glow-hsl));
          --service-button-bg: hsl(var(--service-glow-hsl) / 0.96);
          --service-button-bg-hover: hsl(var(--service-glow-hsl) / 1);
          --service-button-bg-active: hsl(var(--service-glow-hsl) / 0.88);
          --service-button-text-color: var(--color-white-pure);
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--space-4);
          align-items: center;
          width: 100%;
          min-height: clamp(176px, 16vw, 220px);
          padding: clamp(var(--space-3), 4.8vw, var(--space-8));
          border-radius: calc(var(--space-2) * 1.25);
          border: 1px solid hsl(var(--service-glow-hsl) / 0.14);
          background:
            linear-gradient(145deg, var(--service-card-bg-start) 0%, var(--service-card-bg-mid) 52%, var(--service-card-bg-end) 100%),
            var(--service-card-bg-base);
          color: var(--color-black-pure);
          position: relative;
          z-index: 0;
          overflow: hidden;
          isolation: isolate;
          box-shadow:
            0 6px 6px rgba(0, 0, 0, 0.14),
            0 18px 38px -28px rgba(0, 0, 0, 0.44),
            0 0 22px rgba(0, 0, 0, 0.08),
            0 0 0 1px hsl(var(--service-glow-hsl) / 0.12),
            inset 1px 1px 0 rgba(255, 255, 255, 0.54);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition:
            transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2),
            min-height 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.2),
            border-color 0.3s ease,
            box-shadow 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2),
            background 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        }

        .service-cta-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          border-radius: inherit;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.42), transparent 34%),
            linear-gradient(315deg, hsl(var(--service-glow-hsl) / 0.12), transparent 38%);
          box-shadow:
            inset 2px 2px 1px rgba(255, 255, 255, 0.44),
            inset -1px -1px 1px rgba(255, 255, 255, 0.32);
          opacity: 0.92;
        }

        .service-cta-card__stat-rail,
        .service-cta-card__bg,
        .service-cta-card__event-bg,
        .service-cta-card__morph-bg,
        .service-cta-card__grid-pattern {
          position: absolute;
          pointer-events: none;
        }

        .service-cta-card__stat-rail {
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 5;
          width: 5px;
          border-radius: inherit;
          background: var(--service-stat-rail-color);
          box-shadow:
            0 0 16px color-mix(in srgb, var(--service-stat-rail-color) 42%, transparent),
            0 0 34px color-mix(in srgb, var(--service-stat-rail-color) 22%, transparent);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.32s ease;
        }

        .service-cta-card__event-bg {
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          background:
            radial-gradient(
              34rem 24rem at 50% 50%,
              hsl(var(--service-glow-hsl) / 0.18),
              transparent 68%
            ),
            linear-gradient(135deg, hsl(var(--service-glow-hsl) / 0.2) 0%, rgba(255, 255, 255, 0.06) 52%, hsl(var(--service-glow-hsl) / 0.1) 100%);
          transform: scale(1);
          transform-origin: center;
          transition: transform 0.5s ease, opacity 0.3s ease;
          will-change: transform;
        }

        .service-cta-card__grid-pattern {
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          background-image:
            linear-gradient(hsl(var(--service-glow-hsl) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--service-glow-hsl) / 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-cta-card__morph-bg {
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.44)),
            var(--service-card-morph-image) center / cover no-repeat;
          opacity: 0;
          transform: scale(1.045);
          filter: saturate(1.05) contrast(1.03);
          transition:
            opacity 0.42s ease,
            transform 0.72s cubic-bezier(0.175, 0.885, 0.32, 1.08),
            filter 0.72s ease;
          will-change: opacity, transform;
        }

        .service-cta-card__bg {
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.1) 58%, hsl(var(--service-glow-hsl) / 0.08)),
            hsl(var(--service-glow-hsl) / 0.04),
            rgba(255, 255, 255, 0.16);
          outline: 0;
          overflow: hidden;
          opacity: 1;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          filter: none;
          box-shadow: none;
          transform: none;
          transition: opacity 0.16s ease, transform 0.16s ease, border-radius 0.16s ease, background 0.16s ease;
        }

        .service-cta-card:hover,
        .service-cta-card:focus-within {
          min-height: clamp(236px, 21vw, 300px);
          transform: translateY(-6px);
          border-color: hsl(var(--service-glow-hsl) / 0.42);
          background:
            linear-gradient(163deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.18) 42%, hsl(var(--service-glow-hsl) / 0.16) 100%),
            hsl(var(--service-glow-hsl) / 0.06),
            rgba(255, 255, 255, 0.2);
          box-shadow:
            0 0 18px 1px hsl(var(--service-glow-hsl) / 0.14),
            0 0 48px hsl(var(--service-glow-hsl) / 0.1),
            0 22px 42px -26px rgba(0, 0, 0, 0.42),
            10px 10px 32px rgba(190, 190, 190, 0.18),
            -10px -10px 32px rgba(255, 255, 255, 0.58);
        }

        .service-cta-card:hover .service-cta-card__stat-rail,
        .service-cta-card:focus-within .service-cta-card__stat-rail {
          transform: scaleY(1);
        }

        .service-cta-card:hover .service-cta-card__event-bg,
        .service-cta-card:focus-within .service-cta-card__event-bg {
          transform: scale(1.05);
        }

        .service-cta-card:hover .service-cta-card__grid-pattern,
        .service-cta-card:focus-within .service-cta-card__grid-pattern {
          opacity: 1;
        }

        .service-cta-card:hover .service-cta-card__bg,
        .service-cta-card:focus-within .service-cta-card__bg {
          opacity: 1;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.13) 58%, hsl(var(--service-glow-hsl) / 0.1)),
            hsl(var(--service-glow-hsl) / 0.04),
            rgba(255, 255, 255, 0.18);
          border-radius: inherit;
          transform: none;
        }

        .service-cta-card__body {
          display: grid;
          justify-items: start;
          gap: var(--space-2);
          max-width: 58ch;
          position: relative;
          z-index: 3;
        }

        .service-cta-card__number {
          margin-bottom: 0;
          color: hsl(var(--service-glow-hsl));
          font-family: var(--font-display);
          font-size: clamp(3.15rem, 6vw, 4.8rem);
          font-weight: 800;
          line-height: 0.86;
          text-shadow:
            0 0 10px hsl(var(--service-glow-hsl) / 0.24),
            0 0 24px hsl(var(--service-glow-hsl) / 0.12);
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .service-cta-card__price-flag {
          position: absolute;
          top: 0;
          right: clamp(var(--space-2), 2.6vw, var(--space-4));
          z-index: 5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(5.2rem, 10vw, 7.2rem);
          min-height: clamp(3.1rem, 5.6vw, 4.25rem);
          padding: 0.55rem 0.78rem 0.92rem;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.36), transparent 34%),
            linear-gradient(180deg, #f5d46a 0%, #d5a329 56%, #9a6a08 100%);
          color: #1a1203;
          box-shadow:
            0 12px 24px rgba(77, 49, 0, 0.24),
            inset 1px 1px 0 rgba(255, 255, 255, 0.54),
            inset -1px -1px 0 rgba(90, 55, 0, 0.26);
          font-family: var(--font-display);
          font-size: clamp(0.74rem, 1.55vw, 0.92rem);
          font-weight: 900;
          line-height: 1.05;
          text-align: center;
          text-transform: uppercase;
          text-wrap: balance;
          transform: translateY(-1px);
          transition:
            color 0.3s ease,
            filter 0.3s ease,
            transform 0.3s ease;
        }

        .service-cta-card__title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.95rem, 3.65vw, 2.85rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0;
          color: var(--color-black-pure);
        }

        .service-cta-card__copy {
          margin: 0;
          color: var(--service-card-copy-color);
          font-size: clamp(0.96rem, 1.12vw, 1.16rem);
          line-height: 1.48;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-0.35rem);
          transition:
            max-height 0.48s ease,
            opacity 0.28s ease,
            transform 0.48s ease;
        }

        .service-cta-card:hover .service-cta-card__copy,
        .service-cta-card:focus-within .service-cta-card__copy {
          max-height: 8rem;
          opacity: 1;
          transform: translateY(0);
        }

        .service-cta-card__button {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-height: 50px;
          margin-top: var(--space-2);
          padding: 0.88rem 1.18rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--space-1);
          background:
            radial-gradient(
              12rem 8rem at 50% 50%,
              hsl(var(--service-glow-hsl) / 0.2),
              transparent 58%
            ),
            var(--service-button-bg);
          color: var(--service-button-text-color);
          font-weight: 800;
          line-height: 1;
          text-decoration: none;
          box-shadow:
            0 0 0 1px hsl(var(--service-glow-hsl) / 0),
            0 0 0 hsl(var(--service-glow-hsl) / 0);
          transition:
            transform 0.18s ease,
            border-color 0.22s ease,
            background 0.22s ease,
            box-shadow 0.22s ease;
        }

        .service-cta-card:hover .service-cta-card__button {
          border-color: hsl(var(--service-glow-hsl) / 0.72);
          background:
            radial-gradient(
              12rem 8rem at 50% 50%,
              hsl(var(--service-glow-hsl) / 0.44),
              transparent 58%
            ),
            var(--service-button-bg-hover);
          box-shadow:
            0 0 0 1px hsl(var(--service-glow-hsl) / 0.44),
            0 0 22px hsl(var(--service-glow-hsl) / 0.34),
            0 0 48px hsl(var(--service-glow-hsl) / 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .service-cta-card__button > span {
          position: relative;
          z-index: 1;
        }

        .service-cta-card__button:hover {
          transform: translateY(-1px);
        }

        .service-cta-card__button:active {
          transform: translateY(1px) scale(0.965);
          border-color: hsl(var(--service-glow-hsl) / 0.92);
          background:
            radial-gradient(
              10rem 7rem at 50% 50%,
              hsl(var(--service-glow-hsl) / 0.62),
              transparent 58%
            ),
            var(--service-button-bg-active);
          box-shadow:
            0 0 0 1px hsl(var(--service-glow-hsl) / 0.62),
            0 0 16px hsl(var(--service-glow-hsl) / 0.28),
            inset 0 3px 10px rgba(0, 0, 0, 0.52),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .service-cta-card__button-arrow {
          font-size: 1.2em;
          line-height: 0.8;
        }

        .service-cta-card__list {
          display: grid;
          gap: 1.05rem;
          justify-self: start;
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: clamp(1rem, 1.35vw, 1.18rem);
          font-weight: 800;
          line-height: 1.25;
          position: relative;
          z-index: 3;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateX(-0.75rem);
          transition:
            max-height 0.56s ease,
            opacity 0.32s ease,
            transform 0.56s ease;
        }

        .service-cta-card:hover .service-cta-card__list,
        .service-cta-card:focus-within .service-cta-card__list {
          max-height: 18rem;
          opacity: 1;
          transform: translateX(0);
        }

        .service-cta-card__list-item {
          display: grid;
          grid-template-columns: 1.3rem minmax(0, 1fr);
          align-items: center;
          gap: 1rem;
        }

        .service-cta-card__check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--service-card-check-color);
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1;
        }

        .services-next-button-wrap {
          --services-next-hover-time: 700ms;
          --services-next-hover-ease: cubic-bezier(0.175, 0.885, 0.32, 2.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(0.7rem, 1.6vw, 1rem);
          margin: var(--space-4) 0 var(--space-8);
          position: relative;
          border-radius: 2rem;
          transition: transform var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-manifest-modal {
          position: fixed;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          width: min(calc(100vw - 2rem), 520px);
          max-height: calc(100dvh - 2rem);
          margin: 0;
          border: 0;
          border-radius: 24px;
          background: transparent;
          color: inherit;
          padding: 0;
          overflow: visible;
          z-index: 10000;
        }

        .services-manifest-modal:not([open]) {
          display: none !important;
        }

        .services-manifest-modal::backdrop {
          background:
            radial-gradient(circle at 50% 44%, rgba(193, 18, 31, 0.2), transparent 32rem),
            rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
        }

        .services-manifest-modal__panel {
          display: grid;
          gap: 1rem;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.26);
          border-radius: 24px;
          background:
            linear-gradient(145deg, rgba(18, 18, 18, 0.96), rgba(64, 10, 15, 0.94)),
            #111;
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.52),
            0 0 0 6px rgba(193, 18, 31, 0.12),
            inset 1px 1px 0 rgba(255, 255, 255, 0.12);
          padding: clamp(1.2rem, 4vw, 2rem);
        }

        .services-manifest-modal__title {
          color: var(--color-white-pure);
          font-family: var(--font-serif);
          font-size: clamp(2rem, 7vw, 3.15rem);
          line-height: 1;
          margin: 0 0 0.35rem;
          text-align: center;
        }

        .services-manifest-modal__field {
          width: 100%;
          min-height: clamp(3.45rem, 6vw, 4.1rem);
          border: 2px solid rgba(193, 18, 31, 0.82);
          border-radius: 18px;
          background: rgba(255, 249, 241, 0.98);
          color: #1a0f0c;
          box-shadow:
            0 12px 28px rgba(0, 0, 0, 0.28),
            inset 1px 1px 0 rgba(255, 255, 255, 0.86);
          font: inherit;
          font-size: clamp(1.04rem, 1.7vw, 1.24rem);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 1.2;
          outline: none;
          padding: 1rem 1.2rem;
          text-align: center;
        }

        .services-manifest-modal__field::placeholder {
          color: rgba(26, 15, 12, 0.76);
          opacity: 1;
        }

        .services-manifest-modal__field:focus {
          border-color: var(--color-red-accent);
          box-shadow:
            0 0 0 7px rgba(193, 18, 31, 0.24),
            0 18px 42px rgba(0, 0, 0, 0.34),
            inset 1px 1px 0 rgba(255, 255, 255, 0.9);
        }

        .services-manifest-modal__trap {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          border: 0;
          padding: 0;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          overflow: hidden;
          white-space: nowrap;
        }

        .services-manifest-modal__error,
        .services-manifest-modal__message {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.35;
          text-align: center;
        }

        .services-manifest-modal__message {
          font-size: clamp(1rem, 1.7vw, 1.18rem);
        }

        .services-manifest-modal__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 3.35rem;
          margin-top: 0.2rem;
          border: 0;
          border-radius: 999px;
          background: var(--color-red-spanish);
          color: var(--color-white-pure);
          cursor: pointer;
          font: inherit;
          font-weight: 800;
          letter-spacing: 0;
          transition: opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease;
        }

        .services-manifest-modal__submit:disabled {
          cursor: not-allowed;
          filter: grayscale(1);
          opacity: 0.46;
          transform: none;
        }

        .services-manifest-modal__submit:not(:disabled):hover {
          transform: translateY(-1px);
        }

        .services-manifest-modal__close {
          justify-self: center;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.74);
          cursor: pointer;
          font: inherit;
          font-size: 0.92rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
        }

        .services-manifest-modal__close:hover {
          color: var(--color-white-pure);
        }

        .service-cta-card:nth-child(1) {
          --service-glow-hsl: 0 0% 7%;
          --service-card-bg-start: rgba(250, 250, 250, 0.86);
          --service-card-bg-mid: hsl(0 0% 7% / 0.1);
          --service-card-bg-end: hsl(0 0% 7% / 0.22);
          --service-card-bg-base: hsl(0 0% 7% / 0.08);
          --service-stat-rail-color: hsl(0 0% 58%);
          --service-button-bg: hsl(0 0% 7%);
          --service-button-bg-hover: hsl(0 0% 0%);
          --service-button-bg-active: hsl(0 0% 4%);
        }

        .service-cta-card:nth-child(2) {
          --service-glow-hsl: 356 78% 45%;
          --service-card-bg-start: rgba(255, 248, 248, 0.84);
          --service-card-bg-mid: hsl(356 78% 45% / 0.14);
          --service-card-bg-end: hsl(356 78% 45% / 0.26);
          --service-card-bg-base: hsl(356 78% 45% / 0.1);
          --service-button-bg: hsl(356 78% 42%);
          --service-button-bg-hover: hsl(356 82% 48%);
          --service-button-bg-active: hsl(356 74% 34%);
        }

        .service-cta-card:nth-child(3) {
          --service-glow-hsl: 43 82% 48%;
          --service-card-bg-start: rgba(255, 252, 239, 0.86);
          --service-card-bg-mid: hsl(43 82% 48% / 0.18);
          --service-card-bg-end: hsl(43 82% 48% / 0.32);
          --service-card-bg-base: hsl(43 82% 48% / 0.12);
          --service-button-bg: hsl(43 82% 52%);
          --service-button-bg-hover: hsl(43 88% 58%);
          --service-button-bg-active: hsl(43 74% 43%);
          --service-button-text-color: var(--color-black-pure);
        }

        .service-cta-card--image-bg:hover,
        .service-cta-card--image-bg:focus-within {
          --service-card-copy-color: rgba(255, 255, 255, 0.86);
          --service-card-check-color: var(--color-white-pure);
          --service-button-text-color: hsl(var(--service-glow-hsl));
          color: var(--color-white-pure);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5)),
            var(--service-card-image) center / cover no-repeat;
        }

        .service-cta-card--image-bg .service-cta-card__grid-pattern {
          display: none;
        }

        .service-cta-card--image-bg:hover .service-cta-card__event-bg,
        .service-cta-card--image-bg:hover .service-cta-card__bg,
        .service-cta-card--image-bg:focus-within .service-cta-card__event-bg,
        .service-cta-card--image-bg:focus-within .service-cta-card__bg {
          opacity: 0;
        }

        .service-cta-card--image-bg:hover .service-cta-card__morph-bg,
        .service-cta-card--image-bg:focus-within .service-cta-card__morph-bg {
          opacity: 1;
          transform: scale(1);
          filter: saturate(1.08) contrast(1.05);
          transition-delay: 1.3s;
        }

        .service-cta-card--image-bg:hover .service-cta-card__number,
        .service-cta-card--image-bg:hover .service-cta-card__price-flag,
        .service-cta-card--image-bg:hover .service-cta-card__title,
        .service-cta-card--image-bg:hover .text-hover-effect__base,
        .service-cta-card--image-bg:focus-within .service-cta-card__number,
        .service-cta-card--image-bg:focus-within .service-cta-card__price-flag,
        .service-cta-card--image-bg:focus-within .service-cta-card__title,
        .service-cta-card--image-bg:focus-within .text-hover-effect__base {
          color: var(--color-white-pure);
        }

        .service-cta-card--image-bg:hover .service-cta-card__price-flag,
        .service-cta-card--image-bg:focus-within .service-cta-card__price-flag {
          color: #1a1203;
          filter: saturate(1.12) brightness(1.04);
          transform: translateY(-1px) scale(1.03);
        }

        .service-cta-card--image-bg:hover .text-hover-effect__gradient,
        .service-cta-card--image-bg:hover .text-hover-effect__outline,
        .service-cta-card--image-bg:focus-within .text-hover-effect__gradient,
        .service-cta-card--image-bg:focus-within .text-hover-effect__outline {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }

        .service-cta-card--image-bg:hover .service-cta-card__button,
        .service-cta-card--image-bg:focus-within .service-cta-card__button {
          border-color: rgba(255, 255, 255, 0.76);
          background:
            radial-gradient(
              11rem 7rem at 50% 50%,
              rgba(255, 255, 255, 0.82),
              rgba(255, 255, 255, 0.52) 58%,
              rgba(255, 255, 255, 0.34)
            ),
            rgba(255, 255, 255, 0.9);
          color: hsl(var(--service-glow-hsl));
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.36),
            0 0 22px rgba(255, 255, 255, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .service-cta-card--image-bg:hover .service-cta-card__button:active,
        .service-cta-card--image-bg:focus-within .service-cta-card__button:active {
          background:
            radial-gradient(
              10rem 7rem at 50% 50%,
              rgba(255, 255, 255, 0.72),
              rgba(255, 255, 255, 0.42) 58%,
              rgba(255, 255, 255, 0.28)
            ),
            rgba(255, 255, 255, 0.82);
        }

        .services-next-button-wrap:has(.services-next-button:active) {
          transform: rotate3d(1, 0, 0, 12deg);
        }

        .services-next-liquid-filter {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .services-next-button {
          --main-size: clamp(0.98rem, 1.45vw, 1.34rem);
          --border-width: 0;
          --color-background: var(--color-red-spanish);
          --color-text: rgba(255, 255, 255, 0.94);
          --color-outline: rgba(193, 18, 31, 0.28);
          --color-shadow: rgba(0, 0, 0, 0.36);
          --color-star: var(--color-red-accent);
          --glass-edge: transparent;
          --glass-highlight: rgba(255, 255, 255, 0.74);
          --glass-plate: rgba(255, 255, 255, 0.22);
          position: relative;
          z-index: 3;
          isolation: isolate;
          cursor: pointer;
          appearance: none;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: none;
          border-radius: 1.5rem;
          padding: 0;
          font-family: "Poppins", var(--font-display);
          font-weight: 600;
          font-size: var(--main-size);
          color: var(--color-text);
          background: transparent;
          box-shadow:
            0 6px 6px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(0, 0, 0, 0.1);
          transition:
            color var(--services-next-hover-time) var(--services-next-hover-ease),
            transform var(--services-next-hover-time) var(--services-next-hover-ease),
            border-radius var(--services-next-hover-time) var(--services-next-hover-ease),
            box-shadow var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.96);
          outline-offset: 0.22em;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.3),
            0 0 0 4px rgba(193, 18, 31, 0.32),
            0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .services-next-button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          filter: saturate(0.65);
        }

        .services-next-button::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -38%;
          height: 62%;
          z-index: -2;
          border-radius: 999px;
          background:
            radial-gradient(ellipse at 50% 26%, rgba(255, 255, 255, 0.42), transparent 26%),
            radial-gradient(ellipse at 50% 46%, rgba(193, 18, 31, 0.22), rgba(193, 18, 31, 0.06) 64%, transparent 78%),
            linear-gradient(90deg, rgba(193, 18, 31, 0), rgba(193, 18, 31, 0.12), rgba(193, 18, 31, 0));
          filter: blur(9px);
          opacity: 0.58;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .services-next-liquid-lens {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          overflow: hidden;
          isolation: isolate;
          background: transparent;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          filter: url(#services-next-liquid-glass);
          transition: filter var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-liquid-lens::before {
          display: none;
        }

        .services-next-liquid-lens::after {
          display: none;
        }

        .services-next-glass-outline {
          position: absolute;
          z-index: 2;
          inset: 0;
          border-radius: inherit;
          padding: 0;
          box-sizing: border-box;
          overflow: hidden;
          background: transparent;
          box-shadow:
            inset 2px 2px 1px rgba(255, 255, 255, 0.5),
            inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
          pointer-events: none;
          transition:
            border-radius var(--services-next-hover-time) var(--services-next-hover-ease),
            box-shadow var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button:hover .services-next-glass-outline {
          --services-next-angle-1: -125deg;
        }

        .services-next-button:active .services-next-glass-outline {
          --services-next-angle-1: -75deg;
        }

        .services-next-edge-sheen {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
        }

        .services-next-edge-sheen::before {
          content: "";
          position: absolute;
          top: 58%;
          left: -34%;
          width: 34%;
          height: 36%;
          border-radius: 999px;
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.14) 46%, transparent 74%);
          filter: blur(3px);
          opacity: 0;
          transform: rotate(-18deg) scaleY(0.62);
        }

        .services-next-button:hover .services-next-edge-sheen::before {
          animation: services-next-curve-sheen 1.05s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .services-next-edge {
          position: absolute;
          z-index: 4;
          display: block;
          background: rgba(255, 255, 255, 0.58);
          box-shadow: 0 0 7px rgba(255, 255, 255, 0.42);
          pointer-events: none;
          transition: 0.5s ease;
        }

        .services-next-edge--top {
          top: 0;
          left: 0;
          width: 0;
          height: 1px;
        }

        .services-next-button:hover .services-next-edge--top {
          width: 100%;
          transform: translateX(100%);
        }

        .services-next-edge--left {
          top: 0;
          left: 0;
          width: 1px;
          height: 0;
        }

        .services-next-button:hover .services-next-edge--left {
          height: 100%;
          transform: translateY(100%);
        }

        .services-next-edge--bottom {
          right: 0;
          bottom: 0;
          width: 0;
          height: 1px;
        }

        .services-next-button:hover .services-next-edge--bottom {
          width: 100%;
          transform: translateX(-100%);
        }

        .services-next-edge--right {
          right: 0;
          bottom: 0;
          width: 1px;
          height: 0;
        }

        .services-next-button:hover .services-next-edge--right {
          height: 100%;
          transform: translateY(-100%);
        }

        .services-next-button-content {
          position: relative;
          z-index: 3;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 100%;
          padding: 0.86em 1em 0.84em 1.64em;
          border-radius: inherit;
          user-select: none;
          overflow: hidden;
          transition:
            color var(--services-next-hover-time) var(--services-next-hover-ease),
            padding var(--services-next-hover-time) var(--services-next-hover-ease),
            transform var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-content-plate {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition:
            background var(--services-next-hover-time) var(--services-next-hover-ease),
            transform var(--services-next-hover-time) var(--services-next-hover-ease),
            border-radius var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button-content::after {
          content: "";
          position: absolute;
          top: 12%;
          bottom: 12%;
          left: -42%;
          z-index: 5;
          width: 34%;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(193, 18, 31, 0) 0%,
            rgba(193, 18, 31, 0.08) 18%,
            rgba(230, 57, 70, 0.42) 48%,
            rgba(193, 18, 31, 0.08) 82%,
            rgba(193, 18, 31, 0) 100%
          );
          filter: blur(3px);
          opacity: 0;
          mix-blend-mode: screen;
          pointer-events: none;
          transform: translateX(0);
        }

        .services-next-button-content::before {
          content: "";
          position: absolute;
          top: 58%;
          left: -32%;
          z-index: 6;
          width: 30%;
          height: 34%;
          border-radius: 999px;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.34) 42%, transparent 72%),
            linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
          filter: blur(1.8px);
          opacity: 0;
          pointer-events: none;
          transform: rotate(-16deg) scaleY(0.58);
        }

        .services-next-button:active {
          transform: scale(0.96);
          border-color: transparent;
          background-color: rgba(0, 0, 0, 0);
          box-shadow:
            inset 0 0.125em 0.125em rgba(193, 18, 31, 0.08),
            inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
            0 0.125em 0.125em -0.125em rgba(193, 18, 31, 0.2),
            0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2),
            0 0.225em 0.05em rgba(193, 18, 31, 0.05),
            0 0.25em 0 rgba(255, 255, 255, 0.65);
        }

        .services-next-button:active .services-next-content-plate {
          transform: translateY(1px) scaleX(0.99);
        }

        .services-next-button:hover {
          color: var(--color-red-accent);
          background: transparent;
          border-color: transparent;
          outline: 0.1em solid transparent;
          outline-offset: 0.2em;
          border-radius: 2rem;
          box-shadow:
            0 7px 8px rgba(0, 0, 0, 0.18),
            0 0 24px rgba(193, 18, 31, 0.14);
          animation:
            services-next-ripple 1s linear infinite;
          transform: scale(1.03);
        }

        .services-next-button:hover .services-next-liquid-lens {
          filter: url(#services-next-liquid-glass) saturate(1.06);
        }

        .services-next-button:hover .services-next-content-plate {
          background: rgba(255, 255, 255, 0.28);
        }

        .services-next-button:hover .services-next-button-content {
          padding: 0.96em 1.12em 0.94em 1.76em;
          transform: scale(0.95);
        }

        .services-next-button:hover:active {
          transform: scale(0.96);
        }

        .services-next-button:hover .services-next-button-content::after {
          opacity: 1;
          animation: services-next-red-band 1.35s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .services-next-button:hover .services-next-button-content::before {
          animation: services-next-cartoon-shine 1.05s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .services-next-button:active .services-next-button-content::before {
          --services-next-angle-2: -15deg;
        }

        .services-next-button-text {
          position: relative;
          z-index: 7;
          display: inline-flex;
          align-items: center;
          margin-right: 0.3em;
          text-shadow:
            0 2px 2px rgba(255, 255, 255, 0.82),
            0 5px 8px rgba(255, 255, 255, 0.48),
            0 0 8px rgba(193, 18, 31, 0.32);
          transition: 0.5s;
        }

        .services-next-letter {
          position: relative;
          display: inline-block;
          color: rgba(0, 0, 0, 0.8);
          animation: services-next-letter-glow 2s ease-in-out infinite;
          animation-delay: calc(var(--letter-index) * 0.06s);
          transition:
            color var(--services-next-hover-time) var(--services-next-hover-ease),
            text-shadow var(--services-next-hover-time) var(--services-next-hover-ease),
            transform var(--services-next-hover-time) var(--services-next-hover-ease),
            filter var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button:hover .services-next-letter {
          color: var(--color-red-accent);
        }

        .services-next-button:focus .services-next-letter {
          animation:
            services-next-focused-letter 1s ease-in-out forwards,
            services-next-letter-glow 1.2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }

        .services-next-button:hover .services-next-button-text {
          text-shadow:
            0 0 6px rgba(255, 255, 255, 0.86),
            0 0 14px rgba(255, 255, 255, 0.62),
            0 2px 2px rgba(0, 0, 0, 0.58),
            0 5px 8px rgba(0, 0, 0, 0.34);
        }

        .services-next-button:active .services-next-button-text {
          text-shadow:
            0 1px 1px rgba(0, 0, 0, 0.62),
            0 3px 5px rgba(0, 0, 0, 0.36);
        }

        .services-next-arrow {
          z-index: 7;
          height: 0.8em;
          fill: currentColor;
          margin-right: -0.16em;
          position: relative;
          transition: 0.5s;
        }

        .services-next-sparkle {
          position: relative;
          z-index: 7;
          flex: 0 0 auto;
          width: 1.08em;
          height: 1.08em;
          margin-right: 0.55rem;
          fill: currentColor;
          opacity: 0.86;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.6));
          animation: services-next-sparkle-flicker 2s linear infinite;
          animation-delay: 0.5s;
          transition:
            fill var(--services-next-hover-time) var(--services-next-hover-ease),
            filter var(--services-next-hover-time) var(--services-next-hover-ease),
            opacity var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button:hover .services-next-sparkle,
        .services-next-button:focus .services-next-sparkle {
          opacity: 1;
          animation-duration: 1.2s;
          filter:
            drop-shadow(0 0 3px rgba(255, 255, 255, 0.85))
            drop-shadow(0 0 7px rgba(193, 18, 31, 0.58));
        }

        .services-next-button:hover .services-next-arrow {
          margin-right: 0.66em;
          transition: 0.5s;
          filter:
            drop-shadow(0 0 5px rgba(255, 255, 255, 0.82))
            drop-shadow(0 0 12px rgba(255, 255, 255, 0.58));
        }

        .services-next-button:active .services-next-arrow {
          filter: none;
        }

        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .services-next-liquid-lens {
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.16) 44%, rgba(193, 18, 31, 0.18)),
              rgba(255, 255, 255, 0.18);
          }

          .services-next-content-plate {
            background: rgba(255, 255, 255, 0.34);
          }
        }

        .services-next-arrow polygon:nth-child(1) {
          transition: 0.4s;
          transform: translateX(-60%);
        }

        .services-next-arrow polygon:nth-child(2) {
          transition: 0.5s;
          transform: translateX(-30%);
        }

        .services-next-button:hover .services-next-arrow polygon:nth-child(1) {
          transform: translateX(0%);
          animation: services-next-opacity 1s infinite 0.6s;
        }

        .services-next-button:hover .services-next-arrow polygon:nth-child(2) {
          transform: translateX(0%);
          animation: services-next-opacity 1s infinite 0.4s;
        }

        .services-next-button:hover .services-next-arrow polygon:nth-child(3) {
          animation: services-next-opacity 1s infinite 0.2s;
        }

        .services-next-star {
          position: absolute;
          display: block;
          height: auto;
          opacity: 0;
          pointer-events: none;
          filter: drop-shadow(0 0 0 var(--color-star));
          z-index: -1;
        }

        .services-next-star svg {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          fill: none;
        }

        .services-next-star-fill {
          fill: var(--color-star);
        }

        .services-next-star--1 {
          top: 20%;
          left: 20%;
          width: 25px;
          transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
        }

        .services-next-star--2 {
          top: 45%;
          left: 45%;
          width: 15px;
          transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
        }

        .services-next-star--3 {
          top: 40%;
          left: 40%;
          width: 5px;
          transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
        }

        .services-next-star--4 {
          top: 20%;
          left: 40%;
          width: 8px;
          transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
        }

        .services-next-star--5 {
          top: 25%;
          left: 45%;
          width: 15px;
          transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
        }

        .services-next-star--6 {
          top: 5%;
          left: 50%;
          width: 5px;
          transition: all 0.8s ease;
        }

        .services-next-button:hover .services-next-star {
          opacity: 1;
          filter: drop-shadow(0 0 10px var(--color-star));
          z-index: 2;
        }

        .services-next-button:hover .services-next-star--1 {
          top: -80%;
          left: -30%;
          width: 25px;
        }

        .services-next-button:hover .services-next-star--2 {
          top: -25%;
          left: 10%;
          width: 15px;
        }

        .services-next-button:hover .services-next-star--3 {
          top: 108%;
          left: 12%;
          width: 5px;
        }

        .services-next-button:hover .services-next-star--4 {
          top: -42%;
          left: 78%;
          width: 8px;
        }

        .services-next-button:hover .services-next-star--5 {
          top: 25%;
          left: 115%;
          width: 15px;
        }

        .services-next-button:hover .services-next-star--6 {
          top: 104%;
          left: 72%;
          width: 5px;
        }

        .services-foundation-grid {
          display: grid;
          gap: clamp(var(--space-3), 1.6vw, var(--space-6));
          grid-template-columns: minmax(0, 1fr);
          position: relative;
          z-index: 5;
          margin-top: calc(var(--space-10) * -0.58);
          margin-bottom: var(--space-4);
        }

        .services-foundation-card {
          position: relative;
          display: grid;
          align-content: start;
          justify-items: center;
          gap: var(--space-2);
          width: 100%;
          padding: clamp(var(--space-3), 3.2vw, var(--space-6)) 0;
          text-align: center;
          overflow: visible;
          isolation: isolate;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition:
            color 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2),
            opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2);
        }

        .services-foundation-card:hover {
          box-shadow: none;
        }

        .services-foundation-card__title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.2vw, 5.1rem);
          font-weight: 700;
          letter-spacing: 0.01em;
          line-height: 1.05;
          margin: 0;
          color: var(--color-black-pure);
          position: relative;
          z-index: 2;
        }

        .services-foundation-card__copy {
          max-width: 86ch;
          margin: 0 auto;
          color: rgba(0, 0, 0, 0.62);
          font-size: clamp(1.2rem, 1.55vw, 1.72rem);
          font-weight: 600;
          line-height: 1.28;
          text-wrap: balance;
          position: relative;
          z-index: 2;
        }

        .services-army-swap {
          --army-hitbox-width: 62%;
          --army-hitbox-height: 56%;
          position: relative;
          width: min(100%, 980px);
          margin: calc(var(--space-3) * -0.45) auto calc(var(--space-10) * -0.4);
        }

        .services-army-hitbox {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 4;
          width: var(--army-hitbox-width);
          height: var(--army-hitbox-height);
          transform: translate(-50%, -50%);
          background: transparent;
        }

        .service-item {
          gap: var(--space-4);
        }

        .service-content h3 {
          margin-bottom: var(--space-3);
        }

        .services-army-image {
          display: block;
          width: 100%;
          height: auto;
          position: relative;
          z-index: 1;
        }

        .services-army-image--default,
        .services-army-image--hover {
          transition: opacity 0.3s ease;
        }

        .services-army-image--hover {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }

        .services-army-hitbox:hover ~ .services-army-image--default {
          opacity: 0;
        }

        .services-army-hitbox:hover ~ .services-army-image--hover {
          opacity: 1;
        }

        .services-title:hover {
          color: var(--color-red-spanish);
        }

        @media (min-width: 960px) {
          .services-grid {
            gap: var(--space-5, 40px);
          }

          .service-cta-card {
            grid-template-columns: minmax(0, 1.1fr) minmax(230px, 0.72fr);
          }

          .service-cta-card__list {
            justify-self: center;
          }

          .service-item {
            gap: var(--space-6);
          }

          .services-foundation-grid {
            grid-template-columns: minmax(0, 1fr);
            margin-top: calc(var(--space-12) * -0.6);
            margin-bottom: var(--space-3);
          }

          .services-foundation-card {
            padding: clamp(var(--space-4), 3.4vw, var(--space-8)) 0;
          }

          .services-army-swap {
            margin-top: calc(var(--space-4) * -0.4);
            margin-bottom: calc(var(--space-12) * -0.5);
          }
        }

        @media (max-width: 767px) {
          .services-section {
            padding-block: var(--space-6) var(--space-8);
          }

          .services-section__header {
            margin-bottom: var(--space-6);
          }

          .services-title {
            letter-spacing: 0;
          }

          .services-army-swap {
            width: min(100%, 520px);
            margin: var(--space-2) auto;
          }

          .services-foundation-grid {
            margin-top: var(--space-2);
            margin-bottom: var(--space-6);
          }

          .services-foundation-card {
            padding: var(--space-3) 0;
          }

          .services-foundation-card__title {
            font-size: clamp(2rem, 10vw, 2.85rem);
          }

          .services-foundation-card__copy {
            max-width: 100%;
            font-size: 1.12rem;
            line-height: 1.34;
          }

          .service-content h3 {
            font-size: clamp(2rem, 10vw, 2.75rem);
            margin-bottom: var(--space-2);
          }

          .services-grid {
            gap: calc(var(--space-unit) * 7);
          }

          .service-cta-card {
            min-height: auto;
            padding: var(--space-3) calc(var(--space-unit) * 2.5);
          }

          .service-cta-card--has-price {
            padding-top: calc(var(--space-3) + 1rem);
          }

          .service-cta-card__price-flag {
            right: calc(var(--space-unit) * 2);
            min-width: 4.9rem;
            min-height: 3rem;
            font-size: 0.72rem;
          }

          .service-cta-card__button {
            width: 100%;
          }

          .service-cta-card__list {
            gap: 0.86rem;
            width: 100%;
          }

          .services-next-button-wrap {
            margin: var(--space-2) 0 var(--space-6);
          }

          .service-item {
            grid-template-columns: minmax(0, 1fr);
            gap: var(--space-3);
          }

          .service-image img {
            height: clamp(260px, 76vw, 360px);
          }
        }

        .services-foundation-grid--before-button {
          margin-bottom: 0;
        }

        .services-foundation-grid--after-button {
          margin-top: 0;
          margin-bottom: var(--space-4);
        }

        .services-foundation-grid--after-button .services-foundation-card {
          padding-top: clamp(var(--space-2), 2vw, var(--space-4));
        }

        .services-next-button-wrap--between-foundation {
          margin: clamp(var(--space-2), 1.8vw, var(--space-4)) 0;
        }

        @keyframes services-next-opacity {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes services-next-ripple {
          0% {
            outline: 0em solid transparent;
            outline-offset: -0.1em;
          }
          50% {
            outline: 0.2em solid var(--color-outline);
            outline-offset: 0.2em;
          }
          100% {
            outline: 0.4em solid transparent;
            outline-offset: 0.4em;
          }
        }

        @keyframes services-next-letter-glow {
          50% {
            color: var(--color-red-accent);
            text-shadow:
              0 0 4px rgba(193, 18, 31, 0.72),
              0 2px 2px rgba(255, 255, 255, 0.78),
              0 5px 8px rgba(255, 255, 255, 0.44);
          }
        }

        @keyframes services-next-focused-letter {
          0%,
          100% {
            filter: blur(0);
          }

          50% {
            filter: blur(8px) brightness(150%) drop-shadow(-28px 10px 10px rgba(193, 18, 31, 0.72));
            transform: scale(1.65);
          }
        }

        @keyframes services-next-sparkle-flicker {
          50% {
            opacity: 0.34;
          }
        }

        @keyframes services-next-red-band {
          0% {
            transform: translateX(0);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          78% {
            opacity: 1;
          }

          100% {
            transform: translateX(420%);
            opacity: 0;
          }
        }

        @keyframes services-next-curve-sheen {
          0% {
            left: -34%;
            top: 58%;
            opacity: 0;
            transform: rotate(-20deg) scaleY(0.55);
          }

          16% {
            top: 22%;
            opacity: 0.92;
          }

          48% {
            top: 5%;
            opacity: 0.82;
            transform: rotate(-4deg) scaleY(0.55);
          }

          78% {
            top: 22%;
            opacity: 0.62;
          }

          100% {
            left: 104%;
            top: 58%;
            opacity: 0;
            transform: rotate(18deg) scaleY(0.55);
          }
        }

        @keyframes services-next-cartoon-shine {
          0% {
            left: -32%;
            top: 58%;
            transform: rotate(-18deg) scaleY(0.58);
            opacity: 0;
          }

          14% {
            top: 24%;
            opacity: 0.96;
          }

          48% {
            top: 6%;
            opacity: 0.9;
            transform: rotate(-4deg) scaleY(0.58);
          }

          70% {
            top: 24%;
            opacity: 0.64;
          }

          100% {
            left: 102%;
            top: 58%;
            transform: rotate(18deg) scaleY(0.58);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-cta-card,
          .service-cta-card__stat-rail,
          .service-cta-card__bg,
          .service-cta-card__event-bg,
          .service-cta-card__grid-pattern {
            animation: none;
            transition: none;
          }

          .service-cta-card:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
