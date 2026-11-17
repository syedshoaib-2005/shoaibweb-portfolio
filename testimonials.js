const testimonials = [
  {
    title: "Website Development",
    quote:
      "Clear communication, thoughtful execution, and reliable follow-through made the process smooth from kickoff to launch.",
    attribution: "Project collaboration",
    icon: "M16 18l6-6-6-6M8 6l-6 6 6 6M14.5 4l-5 16",
  },
  {
    title: "AI & Technology",
    quote:
      "Strong technical thinking and a collaborative approach helped turn a complex challenge into a clear, workable solution.",
    attribution: "Technical partnership",
    icon:
      "M4 4h16v16H4zM8 8h8v8H8zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2",
  },
  {
    title: "Creative Collaboration",
    quote:
      "A focused, detail-driven process made it easy to move from ideas to a polished final product with confidence.",
    attribution: "Creative partnership",
    icon:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
];

const svgNamespace = "http://www.w3.org/2000/svg";
let testimonialZoomInitialized = false;

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createCategoryIcon(pathData) {
  const icon = document.createElementNS(svgNamespace, "svg");
  icon.classList.add("lucide", "testimonial-category-icon");
  icon.setAttribute("width", "20");
  icon.setAttribute("height", "20");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.7");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS(svgNamespace, "path");
  path.setAttribute("d", pathData);
  icon.append(path);
  return icon;
}

function createTestimonialCard(testimonial) {
  const card = document.createElement("article");
  card.className = "testimonial-card";
  card.setAttribute(
    "aria-label",
    `${testimonial.title} feedback section`,
  );

  const cardHeader = document.createElement("div");
  cardHeader.className = "testimonial-card-header";

  const icon = document.createElement("span");
  icon.className = "testimonial-icon";
  icon.append(createCategoryIcon(testimonial.icon));

  cardHeader.append(
    icon,
    createTextElement("h3", "testimonial-category", testimonial.title),
    createTextElement("span", "testimonial-quote-mark", "“"),
  );

  const quote = document.createElement("blockquote");
  quote.className = "testimonial-quote";
  quote.append(createTextElement("p", "", testimonial.quote));

  const attribution = document.createElement("footer");
  attribution.className = "testimonial-attribution";
  attribution.append(
    createTextElement(
      "span",
      "testimonial-sample-label",
      "Client feedback",
    ),
    createTextElement(
      "p",
      "testimonial-attribution-text",
      testimonial.attribution,
    ),
  );

  card.append(cardHeader, quote, attribution);
  return card;
}

function createTestimonialsSection() {
  const section = document.createElement("section");
  section.id = "testimonials";
  section.className = "testimonials-section content-width";
  section.setAttribute("aria-labelledby", "testimonials-title");

  const header = document.createElement("div");
  header.className = "testimonials-header";
  header.append(
    createTextElement("p", "section-label", "Testimonials"),
    createTextElement("h2", "testimonials-title", "Words of Appreciation"),
    createTextElement(
      "p",
      "testimonials-subtitle",
      "Professional feedback shared with permission and approval.",
    ),
    createTextElement(
      "p",
      "testimonials-disclaimer",
      "Verified recommendations will appear here as they are approved for public sharing.",
    ),
  );
  header.querySelector("h2").id = "testimonials-title";

  const grid = document.createElement("div");
  grid.className = "testimonials-grid";
  testimonials.forEach((testimonial) => {
    grid.append(createTestimonialCard(testimonial));
  });

  section.append(header, grid);
  return section;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value) {
  return value * value * (3 - 2 * value);
}

function setCardZoom(card, progress, index) {
  const stagger = index * 0.075;
  const cardProgress = clamp((progress - stagger) / (1 - stagger), 0, 1);
  const peakProgress = 0.58;
  let scale;
  let verticalOffset;
  let depthOffset;
  let glow;
  let shadow;

  if (cardProgress <= peakProgress) {
    const eased = smoothStep(cardProgress / peakProgress);
    scale = 0.85 + (1.08 - 0.85) * eased;
    verticalOffset = 22 - 28 * eased;
    depthOffset = -18 + 28 * eased;
    glow = 0.92 * eased;
    shadow = 0.14 + 0.2 * eased;
  } else {
    const eased = smoothStep(
      (cardProgress - peakProgress) / (1 - peakProgress),
    );
    scale = 1.08 - 0.08 * eased;
    verticalOffset = -6 + 6 * eased;
    depthOffset = 10 - 10 * eased;
    glow = 0.92 - 0.68 * eased;
    shadow = 0.34 - 0.12 * eased;
  }

  card.style.setProperty("--testimonial-zoom-scale", scale.toFixed(3));
  card.style.setProperty(
    "--testimonial-zoom-y",
    `${verticalOffset.toFixed(2)}px`,
  );
  card.style.setProperty(
    "--testimonial-zoom-z",
    `${depthOffset.toFixed(2)}px`,
  );
  card.style.setProperty("--testimonial-glow-opacity", glow.toFixed(3));
  card.style.setProperty("--testimonial-shadow-alpha", shadow.toFixed(3));
}

function setupTestimonialScrollZoom() {
  if (testimonialZoomInitialized) {
    return;
  }

  const section = document.getElementById("testimonials");
  const cards = Array.from(section?.querySelectorAll(".testimonial-card") || []);
  if (!section || cards.length !== 3) {
    return;
  }

  testimonialZoomInitialized = true;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let pendingFrame = 0;

  function updateZoom() {
    pendingFrame = 0;

    if (reducedMotion.matches) {
      cards.forEach((card) => {
        card.style.removeProperty("--testimonial-zoom-scale");
        card.style.removeProperty("--testimonial-zoom-y");
        card.style.removeProperty("--testimonial-zoom-z");
        card.style.removeProperty("--testimonial-glow-opacity");
        card.style.removeProperty("--testimonial-shadow-alpha");
      });
      return;
    }

    const rect = section.getBoundingClientRect();
    const progress = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      0,
      1,
    );
    cards.forEach((card, index) => setCardZoom(card, progress, index));
  }

  function scheduleZoom() {
    if (!pendingFrame) {
      pendingFrame = window.requestAnimationFrame(updateZoom);
    }
  }

  window.addEventListener("scroll", scheduleZoom, { passive: true });
  window.addEventListener("resize", scheduleZoom, { passive: true });
  reducedMotion.addEventListener("change", scheduleZoom);
  scheduleZoom();
}

function mountTestimonials() {
  const footer = document.querySelector(".portfolio-footer");
  if (!footer) {
    return false;
  }

  if (!document.getElementById("testimonials")) {
    const contact = document.getElementById("contact");
    (contact || footer).before(createTestimonialsSection());
  }
  setupTestimonialScrollZoom();

  const testimonialsButton = Array.from(
    document.querySelectorAll(".portfolio-nav button"),
  ).find((button) => button.textContent.trim() === "Testimonials");

  if (testimonialsButton && !testimonialsButton.dataset.testimonialsScroll) {
    testimonialsButton.dataset.testimonialsScroll = "true";
    testimonialsButton.addEventListener("click", () => {
      document.getElementById("testimonials")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  return true;
}

function mountAfterHydration() {
  window.setTimeout(() => {
    if (mountTestimonials()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (mountTestimonials()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }, 250);
}

if (document.readyState === "complete") {
  mountAfterHydration();
} else {
  window.addEventListener("load", mountAfterHydration, { once: true });
}
