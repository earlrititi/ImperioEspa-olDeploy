const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function animateCounter(element) {
  const original = element.textContent.trim();
  const match = original.match(/^(\D*)(\d+)(.*)$/);

  if (!match) return;

  const [, prefix, digits, suffix] = match;
  const target = Number(digits);
  let current = 0;
  const step = target / 60;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent = `${prefix}${Math.round(current)}${suffix}`;
  }, 16);
}

const statsContainer = document.querySelector(".about-stats");

if (statsContainer) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll(".stat-number").forEach(animateCounter);
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  statObserver.observe(statsContainer);
}
