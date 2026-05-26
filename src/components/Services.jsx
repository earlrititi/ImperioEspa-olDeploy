import { SERVICES_ITEMS } from "../config/home";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { withBase } from "../utils/basePath";

const FOUNDATION_CARDS = [
  {
    title: "Nuestra Historia",
    description:
      "Donde nunca se ponía el sol. Una historia de descubrimientos, hazañas y legado que cambió el mundo para siempre. Un linaje de exploradores, conquistadores y visionarios que se atrevieron a soñar más allá de lo conocido, dejando una marca imborrable en la historia de la humanidad.",
  },
];

const NEXT_BUTTON_STAR_PATH =
  "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";

const NEXT_BUTTON_STARS = [1, 2, 3, 4, 5, 6];
const NEXT_BUTTON_LABEL = "OBT\u00c9N EL MANIFIESTO";

export default function Services() {
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
                src={withBase("/images/ejercito-blanco_upscaled_2x.png")}
                alt="Formacion historica del ejercito"
                class="services-army-image services-army-image--default"
                loading="lazy"
                decoding="async"
              />
              <img
                src={withBase("/images/ejercito-rojo.png")}
                alt=""
                aria-hidden="true"
                class="services-army-image services-army-image--hover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="services-foundation-grid fade-in-up">
            {FOUNDATION_CARDS.map((card) => (
              <article class="services-foundation-card" key={card.title}>
                <h3 class="services-foundation-card__title">
                  <TextHoverEffect text={card.title} duration={0.72} />
                </h3>
                <p class="services-foundation-card__copy">{card.description}</p>
              </article>
            ))}
          </div>
          </div>

          <div class="services-next-button-wrap fade-in-up">
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
            <button class="services-next-button" type="button">
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
            <div class="services-next-button-shadow" aria-hidden="true"></div>
          </div>

          <div class="services-grid">
            {SERVICES_ITEMS.map((service) => {
              if (service.highlights?.length) {
                return (
                  <article class="service-cta-card fade-in-up" key={service.id}>
                    <span class="service-cta-card__bg" aria-hidden="true"></span>
                    <span class="service-cta-card__pointer" aria-hidden="true"></span>
                    <div class="service-cta-card__body">
                      <span class="service-number service-cta-card__number">
                        {service.id}
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
            <div class="service-cards-overlay" aria-hidden="true"></div>
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

        .service-cards-overlay {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          user-select: none;
          opacity: var(--service-cards-overlay-opacity, 0);
          -webkit-mask:
            radial-gradient(
              24rem 24rem at var(--service-cards-overlay-x, 50%) var(--service-cards-overlay-y, 50%),
              #000 1%,
              transparent 50%
            );
          mask:
            radial-gradient(
              24rem 24rem at var(--service-cards-overlay-x, 50%) var(--service-cards-overlay-y, 50%),
              #000 1%,
              transparent 50%
            );
          transition: opacity 0.18s ease, mask 0.4s ease, -webkit-mask 0.4s ease;
          will-change: opacity, mask, -webkit-mask;
        }

        .service-cards-overlay__card {
          --service-glow-hsl: 356 78% 49%;
          position: absolute;
          border: 1px solid hsl(var(--service-glow-hsl));
          border-radius: calc(var(--space-2) * 1.25);
          background:
            radial-gradient(
              38rem 24rem at var(--service-overlay-card-x, 50%) var(--service-overlay-card-y, 50%),
              hsl(var(--service-glow-hsl) / 0.18),
              transparent 64%
            ),
            hsl(var(--service-glow-hsl) / 0.075);
          box-shadow:
            inset 0 0 0 1px hsl(var(--service-glow-hsl) / 0.55),
            inset 0 0 28px hsl(var(--service-glow-hsl) / 0.16),
            0 0 28px hsl(var(--service-glow-hsl) / 0.24),
            0 0 64px hsl(var(--service-glow-hsl) / 0.12);
        }

        .service-cards-overlay__card:nth-child(1) {
          --service-glow-hsl: 356 78% 45%;
        }

        .service-cards-overlay__card:nth-child(2) {
          --service-glow-hsl: 43 82% 48%;
        }

        .service-cards-overlay__card:nth-child(3) {
          --service-glow-hsl: 0 0% 7%;
        }

        .service-cards-overlay__cta {
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          left: var(--service-overlay-cta-left, clamp(var(--space-3), 4.8vw, var(--space-8)));
          top: var(--service-overlay-cta-top, auto);
          width: var(--service-overlay-cta-width, min(132px, calc(100% - clamp(var(--space-3), 4.8vw, var(--space-8)) * 2)));
          height: var(--service-overlay-cta-height, 50px);
          border-radius: var(--service-overlay-cta-radius, var(--space-1));
          background: hsl(var(--service-glow-hsl) / 0.86);
          color: #fff;
          font-weight: 800;
          line-height: 1;
          box-shadow:
            0 0 0 1px hsl(var(--service-glow-hsl)),
            0 0 22px hsl(var(--service-glow-hsl) / 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.36);
        }

        .service-cta-card {
          --service-card-pointer-opacity: 0;
          --service-card-pointer-x: 50%;
          --service-card-pointer-y: 50%;
          --service-glow-hsl: 356 78% 49%;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--space-4);
          align-items: center;
          min-height: clamp(236px, 21vw, 300px);
          padding: clamp(var(--space-3), 4.8vw, var(--space-8));
          border-radius: calc(var(--space-2) * 1.25);
          border: 0;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.11) 52%, rgba(193, 18, 31, 0.1)),
            rgba(255, 255, 255, 0.18);
          color: var(--color-black-pure);
          position: relative;
          z-index: 0;
          overflow: hidden;
          isolation: isolate;
          box-shadow:
            0 6px 6px rgba(0, 0, 0, 0.14),
            0 18px 38px -28px rgba(0, 0, 0, 0.44),
            0 0 22px rgba(0, 0, 0, 0.08),
            inset 1px 1px 0 rgba(255, 255, 255, 0.54);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition:
            transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2),
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
            linear-gradient(315deg, rgba(193, 18, 31, 0.16), transparent 38%);
          box-shadow:
            inset 2px 2px 1px rgba(255, 255, 255, 0.44),
            inset -1px -1px 1px rgba(255, 255, 255, 0.32);
          opacity: 0.92;
        }

        .service-cta-card__bg,
        .service-cta-card__pointer {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.16s ease;
        }

        .service-cta-card__bg {
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.1) 58%, rgba(193, 18, 31, 0.08)),
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

        .service-cta-card__pointer {
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          background:
            radial-gradient(
              22rem 22rem at var(--service-card-pointer-x) var(--service-card-pointer-y),
              rgba(255, 0, 43, 0.18),
              rgba(255, 0, 43, 0.07) 34%,
              transparent 62%
            );
          opacity: var(--service-card-pointer-opacity);
          mix-blend-mode: multiply;
          will-change: opacity, background;
        }

        .service-cta-card:hover {
          transform: none;
          background:
            linear-gradient(163deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.18) 42%, rgba(193, 18, 31, 0.22) 100%),
            rgba(255, 255, 255, 0.2);
          box-shadow:
            0 0 18px 1px hsl(var(--service-glow-hsl) / 0.14),
            0 0 48px hsl(var(--service-glow-hsl) / 0.1),
            0 22px 42px -26px rgba(0, 0, 0, 0.42),
            10px 10px 32px rgba(190, 190, 190, 0.18),
            -10px -10px 32px rgba(255, 255, 255, 0.58);
        }

        .service-cta-card:hover .service-cta-card__bg {
          opacity: 1;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.13) 58%, rgba(193, 18, 31, 0.12)),
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
          color: rgba(0, 0, 0, 0.58);
          font-size: clamp(0.96rem, 1.12vw, 1.16rem);
          line-height: 1.48;
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
              12rem 8rem at var(--service-card-pointer-x, 50%) var(--service-card-pointer-y, 50%),
              hsl(var(--service-glow-hsl) / 0.2),
              transparent 58%
            ),
            #1b1b1b;
          color: var(--color-white-pure);
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

        .service-cta-card__button::before {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: inherit;
          opacity: var(--service-card-pointer-opacity, 0);
          background:
            radial-gradient(
              10rem 8rem at var(--service-card-pointer-x, 50%) var(--service-card-pointer-y, 50%),
              hsl(var(--service-glow-hsl) / 0.88),
              hsl(var(--service-glow-hsl) / 0.22) 42%,
              transparent 72%
            );
          filter: blur(10px);
          transition: opacity 0.18s ease;
        }

        .service-cta-card:hover .service-cta-card__button {
          border-color: hsl(var(--service-glow-hsl) / 0.72);
          background:
            radial-gradient(
              12rem 8rem at var(--service-card-pointer-x, 50%) var(--service-card-pointer-y, 50%),
              hsl(var(--service-glow-hsl) / 0.44),
              transparent 58%
            ),
            #111;
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
              10rem 7rem at var(--service-card-pointer-x, 50%) var(--service-card-pointer-y, 50%),
              hsl(var(--service-glow-hsl) / 0.62),
              transparent 58%
            ),
            #080808;
          box-shadow:
            0 0 0 1px hsl(var(--service-glow-hsl) / 0.62),
            0 0 16px hsl(var(--service-glow-hsl) / 0.28),
            inset 0 3px 10px rgba(0, 0, 0, 0.52),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .service-cta-card__button:active::before {
          opacity: 1;
          filter: blur(6px);
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
          color: var(--color-black-pure);
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1;
        }

        .services-next-button-wrap {
          --services-next-hover-time: 700ms;
          --services-next-hover-ease: cubic-bezier(0.175, 0.885, 0.32, 2.2);
          display: flex;
          justify-content: center;
          margin: var(--space-4) 0 var(--space-8);
          position: relative;
          border-radius: 999px;
          transition: transform var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .service-cta-card:nth-child(1) {
          --service-glow-hsl: 356 78% 45%;
        }

        .service-cta-card:nth-child(2) {
          --service-glow-hsl: 43 82% 48%;
        }

        .service-cta-card:nth-child(3) {
          --service-glow-hsl: 0 0% 7%;
        }

        .services-next-button-wrap:has(.services-next-button:active) {
          transform: rotate3d(1, 0, 0, 12deg);
        }

        .services-next-button-shadow {
          --shadow-cutoff-fix: 2em;
          position: absolute;
          top: calc(0% - var(--shadow-cutoff-fix) / 2);
          left: calc(50% - var(--shadow-cutoff-fix) / 2);
          z-index: 0;
          width: calc(100% + var(--shadow-cutoff-fix));
          height: calc(100% + var(--shadow-cutoff-fix));
          max-width: 520px;
          filter: blur(clamp(2px, 0.125em, 12px));
          overflow: visible;
          pointer-events: none;
          transform: translateX(-50%);
          transition: filter var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button-shadow::after {
          content: "";
          position: absolute;
          top: calc(var(--shadow-cutoff-fix) - 0.5em);
          left: calc(var(--shadow-cutoff-fix) - 0.875em);
          width: calc(100% - var(--shadow-cutoff-fix) - 0.25em);
          height: calc(100% - var(--shadow-cutoff-fix) - 0.25em);
          border-radius: 999px;
          padding: 0.125em;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(193, 18, 31, 0.16));
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: 0.54;
          transition: top var(--services-next-hover-time) var(--services-next-hover-ease), opacity var(--services-next-hover-time) var(--services-next-hover-ease);
        }

        .services-next-button-wrap:has(.services-next-button:hover) .services-next-button-shadow {
          filter: blur(clamp(2px, 0.0625em, 6px));
        }

        .services-next-button-wrap:has(.services-next-button:hover) .services-next-button-shadow::after {
          top: calc(var(--shadow-cutoff-fix) - 0.875em);
          opacity: 1;
        }

        .services-next-button-wrap:has(.services-next-button:active) .services-next-button-shadow {
          filter: blur(clamp(2px, 0.125em, 12px));
        }

        .services-next-button-wrap:has(.services-next-button:active) .services-next-button-shadow::after {
          top: calc(var(--shadow-cutoff-fix) - 0.5em);
          opacity: 0.75;
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
          .service-cta-card__bg,
          .service-cta-card__pointer {
            animation: none;
            transition: none;
          }

          .service-cta-card:hover {
            transform: none;
          }
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const setupServiceCardPointer = () => {
                document.querySelectorAll(".service-cta-card").forEach((card) => {
                  if (card.dataset.servicePointerReady === "true") return;
                  card.dataset.servicePointerReady = "true";

                  card.addEventListener("pointermove", (event) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty("--service-card-pointer-opacity", "1");
                    card.style.setProperty("--service-card-pointer-x", (event.clientX - rect.left) + "px");
                    card.style.setProperty("--service-card-pointer-y", (event.clientY - rect.top) + "px");
                  });

                  card.addEventListener("pointerleave", () => {
                    card.style.setProperty("--service-card-pointer-opacity", "0");
                  });
                });
              };

              const setupServiceCardsOverlay = () => {
                const grid = document.querySelector(".services-grid");
                const overlay = grid?.querySelector(".service-cards-overlay");
                if (!grid || !overlay) return;

                const cards = Array.from(grid.querySelectorAll(".service-cta-card"));

                const ensureOverlayCards = () => {
                  while (overlay.children.length < cards.length) {
                    const sourceCard = cards[overlay.children.length];
                    const overlayCard = document.createElement("div");
                    overlayCard.className = "service-cards-overlay__card";

                    const overlayCta = document.createElement("div");
                    overlayCta.className = "service-cards-overlay__cta";
                    overlayCta.textContent = sourceCard?.querySelector(".service-cta-card__button")?.innerText || "Empezar";
                    overlayCard.append(overlayCta);

                    overlay.append(overlayCard);
                  }

                  while (overlay.children.length > cards.length) {
                    overlay.lastElementChild?.remove();
                  }
                };

                const syncOverlayCards = () => {
                  const gridRect = grid.getBoundingClientRect();
                  cards.forEach((card, index) => {
                    const overlayCard = overlay.children[index];
                    if (!overlayCard) return;

                    const rect = card.getBoundingClientRect();
                    overlayCard.style.left = (rect.left - gridRect.left) + "px";
                    overlayCard.style.top = (rect.top - gridRect.top) + "px";
                    overlayCard.style.width = rect.width + "px";
                    overlayCard.style.height = rect.height + "px";

                    const button = card.querySelector(".service-cta-card__button");
                    if (button) {
                      const buttonRect = button.getBoundingClientRect();
                      overlayCard.style.setProperty("--service-overlay-cta-left", (buttonRect.left - rect.left) + "px");
                      overlayCard.style.setProperty("--service-overlay-cta-top", (buttonRect.top - rect.top) + "px");
                      overlayCard.style.setProperty("--service-overlay-cta-width", buttonRect.width + "px");
                      overlayCard.style.setProperty("--service-overlay-cta-height", buttonRect.height + "px");
                      overlayCard.style.setProperty("--service-overlay-cta-radius", getComputedStyle(button).borderRadius);
                    }
                  });
                };

                ensureOverlayCards();
                syncOverlayCards();

                if (overlay.dataset.serviceOverlayReady !== "true") {
                  overlay.dataset.serviceOverlayReady = "true";

                  grid.addEventListener("pointermove", (event) => {
                    const rect = grid.getBoundingClientRect();
                    const cards = Array.from(grid.querySelectorAll(".service-cta-card"));
                    overlay.style.setProperty("--service-cards-overlay-opacity", "1");
                    overlay.style.setProperty("--service-cards-overlay-x", (event.clientX - rect.left) + "px");
                    overlay.style.setProperty("--service-cards-overlay-y", (event.clientY - rect.top) + "px");

                    cards.forEach((card, index) => {
                      const overlayCard = overlay.children[index];
                      if (!overlayCard) return;

                      const cardRect = card.getBoundingClientRect();
                      overlayCard.style.setProperty("--service-overlay-card-x", (event.clientX - cardRect.left) + "px");
                      overlayCard.style.setProperty("--service-overlay-card-y", (event.clientY - cardRect.top) + "px");
                    });
                  });

                  grid.addEventListener("pointerleave", () => {
                    overlay.style.setProperty("--service-cards-overlay-opacity", "0");
                  });

                  window.addEventListener("resize", syncOverlayCards);
                  window.addEventListener("scroll", syncOverlayCards, { passive: true });

                  if ("ResizeObserver" in window) {
                    const observer = new ResizeObserver(syncOverlayCards);
                    cards.forEach((card) => observer.observe(card));
                    overlay._serviceOverlayObserver = observer;
                  }
                }
              };

              const setupServiceCardEffects = () => {
                setupServiceCardPointer();
                setupServiceCardsOverlay();
              };

              if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", setupServiceCardEffects, { once: true });
              } else {
                setupServiceCardEffects();
              }

              document.addEventListener("astro:page-load", setupServiceCardEffects);
            })();
          `,
        }}
      />
    </>
  );
}
