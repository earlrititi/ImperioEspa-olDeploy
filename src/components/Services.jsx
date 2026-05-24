import { SERVICES_ITEMS } from "../config/home";
import { withBase } from "../utils/basePath";

const FOUNDATION_CARDS = [
  {
    title: "Nuestra Historia",
    description:
      "Donde nunca se ponía el sol. Una historia de descubrimientos, hazañas y legado que cambió el mundo para siempre. Un linaje de exploradores, conquistadores y visionarios que se atrevieron a soñar más allá de lo conocido, dejando una marca imborrable en la historia de la humanidad.",
  },
  {
    title: "Nuestra Practica",
    description:
      "Integramos investigacion, criterio y diseno para dar forma a un marco coherente. El proceso es deliberado, abierto y preciso: hacemos las preguntas grandes, depuramos lo esencial y articulamos una posicion con peso propio.",
  },
  {
    title: "Nuestra Gente",
    description:
      "Trabajamos con intensidad, humor y exigencia. Nos interesa rodearnos de perfiles que piensan por cuenta propia, discuten con fundamento y entienden el diseno como una herramienta real de influencia, conexion y cambio.",
  },
];

const NEXT_BUTTON_STAR_PATH =
  "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";

const NEXT_BUTTON_STARS = [1, 2, 3, 4, 5, 6];

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
                <span class="services-foundation-card__accent" aria-hidden="true"></span>
                <h3 class="services-foundation-card__title">{card.title}</h3>
                <p class="services-foundation-card__copy">{card.description}</p>
              </article>
            ))}
          </div>
          </div>

          <div class="services-next-button-wrap fade-in-up">
            <svg class="services-next-liquid-filter" aria-hidden="true" focusable="false">
              <filter id="services-next-liquid-glass">
                <feTurbulence type="fractalNoise" baseFrequency="0.018 0.042" numOctaves="2" seed="17" result="map"></feTurbulence>
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="blur"></feGaussianBlur>
                <feDisplacementMap in="blur" in2="map" scale="8" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
              </filter>
            </svg>
            <button class="services-next-button" type="button">
              <span class="services-next-liquid-lens" aria-hidden="true"></span>
              <span class="services-next-button-content">
                <span class="services-next-button-text">OBT&Eacute;N EL MANIFIESTO</span>
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

          <div class="services-grid">
            {SERVICES_ITEMS.map((service) => {
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
                    <span class="service-number text-[var(--color-red-spanish)] text-xl font-bold block">
                      {service.id}
                    </span>
                    <h3 class="text-4xl font-bold mb-6">{service.title}</h3>
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
          gap: var(--space-8);
        }

        .services-next-button-wrap {
          display: flex;
          justify-content: center;
          margin: var(--space-4) 0 var(--space-8);
          position: relative;
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
          --color-background: #ff4b64;
          --color-text: rgba(255, 255, 255, 0.94);
          --color-outline: rgba(255, 66, 116, 0.32);
          --color-shadow: rgba(44, 0, 15, 0.36);
          --color-star: #ff3b5c;
          position: relative;
          z-index: 0;
          isolation: isolate;
          cursor: pointer;
          appearance: none;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: 1px solid rgba(255, 206, 218, 0.38);
          border-radius: 999px;
          padding: 0;
          font-family: "Poppins", var(--font-display);
          font-weight: 600;
          font-size: var(--main-size);
          color: var(--color-text);
          background: transparent;
          box-shadow:
            0 2px 5px rgba(60, 0, 24, 0.28),
            0 14px 22px rgba(163, 0, 91, 0.26),
            0 24px 36px -16px rgba(255, 70, 190, 0.78);
          transition: color 0.4s cubic-bezier(1, 0, 0.4, 1), transform 0.3s ease-out, box-shadow 0.4s cubic-bezier(1, 0, 0.4, 1);
        }

        .services-next-button::after {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: -36%;
          height: 58%;
          z-index: -2;
          border-radius: 999px;
          background:
            radial-gradient(ellipse at 50% 30%, rgba(255, 75, 205, 0.85), rgba(255, 75, 205, 0.18) 58%, transparent 72%),
            linear-gradient(90deg, rgba(255, 111, 203, 0), rgba(255, 111, 203, 0.5), rgba(255, 111, 203, 0));
          filter: blur(9px);
          opacity: 0.92;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .services-next-liquid-lens {
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 16% 20%, rgba(255, 255, 255, 0.42), transparent 18%),
            radial-gradient(ellipse at 9% 73%, rgba(255, 96, 10, 0.98), rgba(255, 96, 10, 0.26) 18%, transparent 30%),
            radial-gradient(ellipse at 50% 104%, rgba(255, 88, 201, 0.86), rgba(255, 88, 201, 0.22) 40%, transparent 66%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(255, 255, 255, 0.2) 7%, rgba(255, 255, 255, 0.04) 18%, transparent 31%),
            linear-gradient(180deg, #4d101d 0%, #731b3b 38%, #4a0d16 60%, #d44719 78%, #5d1015 100%);
          backdrop-filter: blur(8px) url(#services-next-liquid-glass) saturate(150%);
          -webkit-backdrop-filter: blur(8px) saturate(150%);
          box-shadow:
            inset 0 0 0 1px rgba(255, 230, 235, 0.24),
            inset 3px 5px 5px -5px rgba(255, 255, 255, 0.9),
            inset -3px -4px 4px -4px rgba(255, 240, 246, 0.72),
            inset 0 10px 11px -12px rgba(255, 255, 255, 0.82),
            inset 0 -8px 8px -7px rgba(255, 130, 20, 0.78),
            inset 0 -15px 16px -13px rgba(255, 53, 178, 0.72),
            inset -7px 0 10px -10px rgba(0, 0, 0, 0.68),
            inset 7px 0 10px -10px rgba(255, 255, 255, 0.44),
            0 1px 1px rgba(255, 255, 255, 0.2);
          transition: background 0.4s cubic-bezier(1, 0, 0.4, 1), box-shadow 0.4s cubic-bezier(1, 0, 0.4, 1);
        }

        .services-next-liquid-lens::before {
          content: "";
          position: absolute;
          inset: 6px 12px auto;
          height: 28%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.16));
          filter: blur(0.4px);
          opacity: 0.75;
        }

        .services-next-liquid-lens::after {
          content: "";
          position: absolute;
          left: 14%;
          right: 12%;
          bottom: 9%;
          height: 9%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255, 102, 0, 0), rgba(255, 137, 24, 0.96), rgba(255, 77, 31, 0.42));
          box-shadow: 0 0 14px rgba(255, 93, 25, 0.58);
        }

        .services-next-button-content {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 100%;
          padding: 0.64em 0.66em 0.62em 1.36em;
          border-radius: inherit;
          user-select: none;
        }

        .services-next-button:active {
          transform: scale(0.96);
        }

        .services-next-button:hover {
          color: #ffffff;
          background: transparent;
          outline: 0.1em solid transparent;
          outline-offset: 0.2em;
          box-shadow:
            0 0 0 1px rgba(255, 116, 157, 0.22),
            0 0 25px rgba(255, 59, 124, 0.36),
            0 18px 36px rgba(105, 0, 35, 0.18);
          animation:
            services-next-ripple 1s linear infinite;
          transform: scale(1.03);
          transition: 0.5s;
        }

        .services-next-button:hover .services-next-liquid-lens {
          background:
            radial-gradient(ellipse at 16% 20%, rgba(255, 255, 255, 0.36), transparent 18%),
            radial-gradient(ellipse at 9% 73%, rgba(255, 96, 10, 0.88), rgba(255, 96, 10, 0.18) 18%, transparent 30%),
            radial-gradient(ellipse at 50% 104%, rgba(255, 88, 201, 0.72), rgba(255, 88, 201, 0.18) 40%, transparent 66%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.16) 7%, rgba(255, 255, 255, 0.03) 18%, transparent 31%),
            linear-gradient(180deg, rgba(77, 16, 29, 0.82) 0%, rgba(115, 27, 59, 0.82) 38%, rgba(74, 13, 22, 0.78) 60%, rgba(212, 71, 25, 0.76) 78%, rgba(93, 16, 21, 0.82) 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255, 206, 218, 0.28),
            inset 3px 5px 5px -5px rgba(255, 255, 255, 0.82),
            inset 0 -8px 8px -7px rgba(255, 130, 20, 0.64),
            inset 0 -15px 16px -13px rgba(255, 53, 178, 0.58),
            0 0 25px rgba(255, 59, 124, 0.24);
        }

        .services-next-button:hover:active {
          transform: scale(0.96);
        }

        .services-next-button-text {
          margin-right: 0.3em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.42);
          transition: 0.5s;
        }

        .services-next-button:hover .services-next-button-text {
          text-shadow: 5px 5px 5px var(--color-shadow);
        }

        .services-next-button:active .services-next-button-text {
          text-shadow: none;
        }

        .services-next-arrow {
          height: 0.8em;
          fill: currentColor;
          margin-right: -0.16em;
          position: relative;
          transition: 0.5s;
        }

        .services-next-button:hover .services-next-arrow {
          margin-right: 0.66em;
          transition: 0.5s;
          filter: drop-shadow(5px 5px 2.5px var(--color-shadow));
        }

        .services-next-button:active .services-next-arrow {
          filter: none;
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
          grid-template-columns: repeat(1, minmax(0, 1fr));
          position: relative;
          z-index: 5;
          margin-top: calc(var(--space-10) * -0.58);
          margin-bottom: var(--space-4);
        }

        .services-foundation-card {
          position: relative;
          display: grid;
          align-content: start;
          gap: var(--space-2);
          min-height: 100%;
          padding: var(--space-3) var(--space-2) 0;
          text-align: left;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.98) 100%);
        }

        .services-foundation-card__accent {
          display: block;
          width: 100%;
          height: 1px;
          background: var(--color-red-accent);
          margin-bottom: var(--space-2);
        }

        .services-foundation-card__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 2.2vw, 2.85rem);
          font-weight: 800;
          letter-spacing: 0.01em;
          line-height: 1.05;
          margin: 0;
          color: var(--color-black-pure);
        }

        .services-foundation-card__copy {
          max-width: 30ch;
          margin: 0;
          color: rgba(0, 0, 0, 0.62);
          font-size: clamp(1.05rem, 1.15vw, 1.35rem);
          font-weight: 500;
          line-height: 1.34;
          text-wrap: balance;
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
            gap: var(--space-16);
          }

          .service-item {
            gap: var(--space-6);
          }

          .services-foundation-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin-top: calc(var(--space-12) * -0.6);
            margin-bottom: var(--space-3);
          }

          .services-foundation-card {
            padding: var(--space-4) var(--space-4) 0;
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
            padding: var(--space-3) 0 0;
          }

          .services-foundation-card__title {
            font-size: clamp(1.6rem, 9vw, 2.2rem);
          }

          .services-foundation-card__copy {
            max-width: 100%;
            font-size: 1rem;
            line-height: 1.42;
          }

          .service-content h3 {
            font-size: clamp(2rem, 10vw, 2.75rem);
            margin-bottom: var(--space-2);
          }

          .services-grid {
            gap: calc(var(--space-unit) * 7);
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
      `}</style>
    </>
  );
}
