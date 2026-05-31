const parseCounterValue = (element) => {
  const original = element.dataset.statValue || element.textContent.trim();
  const match = original.match(/^(\D*)(\d+)(.*)$/);

  if (!match) return null;

  const [, prefix, digits, suffix] = match;

  return {
    prefix,
    suffix,
    target: Number(digits),
    padLength: digits.length,
    duration: Number(element.dataset.statDuration || 900),
  };
};

const formatCounterValue = ({ prefix, suffix, padLength }, value) =>
  `${prefix}${String(value).padStart(padLength, "0")}${suffix}`;

const animateCounter = (element, reducedMotion) => {
  if (element.dataset.statAnimated === "true") return;

  const parsed = parseCounterValue(element);
  if (!parsed || Number.isNaN(parsed.target)) return;

  element.dataset.statAnimated = "true";

  if (reducedMotion) {
    element.textContent = formatCounterValue(parsed, parsed.target);
    return;
  }

  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / parsed.duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(parsed.target * eased);

    element.textContent = formatCounterValue(parsed, current);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    }
  };

  element.textContent = formatCounterValue(parsed, 0);
  window.requestAnimationFrame(tick);
};

export const createStatCounterController = ({ reducedMotion = false } = {}) => {
  let observer;

  return {
    initialize() {
      const groups = document.querySelectorAll("[data-stat-counter-group]");
      if (!groups.length) return;

      if (reducedMotion || !("IntersectionObserver" in window)) {
        groups.forEach((group) => {
          group
            .querySelectorAll("[data-stat-counter]")
            .forEach((counter) => animateCounter(counter, reducedMotion));
        });
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target
              .querySelectorAll("[data-stat-counter]")
              .forEach((counter) => animateCounter(counter, false));
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.45, rootMargin: "0px 0px -80px 0px" }
      );

      groups.forEach((group) => {
        group.querySelectorAll("[data-stat-counter]").forEach((counter) => {
          const parsed = parseCounterValue(counter);
          if (parsed) {
            counter.textContent = formatCounterValue(parsed, 0);
          }
        });
        observer.observe(group);
      });
    },

    cleanup() {
      observer?.disconnect();
    },
  };
};
