const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 130 && rect.bottom >= 130;
  });

  navLinks.forEach((link) => {
    const isActive = currentSection && link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("active", isActive);
  });
};

const animateCounters = () => {
  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 35));

    const tick = () => {
      value = Math.min(target, value + step);
      counter.textContent = value;

      if (value < target) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  });
};

const applyButton = document.querySelector("#applyButton");
const formMessage = document.querySelector("#formMessage");

applyButton.addEventListener("click", () => {
  formMessage.textContent = "Great! Your application email is opening now.";

  window.location.href =
    "mailto:careers@example.com?subject=Frontend%20Developer%20Internship%20Application";
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", () => {
  setActiveLink();
  animateCounters();
});
