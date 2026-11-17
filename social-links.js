const socialLinks = {
  whatsapp: {
    name: "WhatsApp",
    url: "https://wa.me/971541369143",
    label: "Chat on WhatsApp",
  },
  telegram: {
    name: "Telegram",
    url: "https://t.me/+971541369143",
    label: "Connect on Telegram",
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/shoaibu.dxb?cplk=MXRpdW9nOHZvOGF6Yw%3D%3D&utm_source=qr",
    label: "Follow on Instagram",
  },
  twitter: {
    name: "X (Twitter)",
    url: "https://x.com/shoain143?s=11",
    label: "Follow on X",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/syed-shoaib-583703432?trk=contact-info",
    label: "Connect on LinkedIn",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/syedshoaib-2005",
    label: "Explore my GitHub",
  },
};

const icons = {
  whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  telegram: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  twitter: '<path d="M22 5.8a8.6 8.6 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9 8.5 8.5 0 0 1-5.2 1.8 8.6 8.6 0 0 1-1-.1 12 12 0 0 0 6.5 1.9c7.8 0 12-6.4 12-12v-.6A8.6 8.6 0 0 0 22 5.8Z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S18.5 1.2 15 3a13.4 13.4 0 0 0-7 0C4.5 1.2 3.3 1.5 3.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/>',
};

const externalLinkIcon = '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>';
const svgNamespace = "http://www.w3.org/2000/svg";

function createIcon(paths, className) {
  const icon = document.createElementNS(svgNamespace, "svg");
  icon.setAttribute("class", className);
  icon.setAttribute("width", "16");
  icon.setAttribute("height", "16");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.8");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = paths;
  return icon;
}

function createExternalLink(key, link, className) {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.setAttribute("aria-label", link.label);
  anchor.title = link.label;
  anchor.dataset.platform = key;
  return anchor;
}

function createSocialNav() {
  const nav = document.createElement("nav");
  nav.className = "social-links";
  nav.setAttribute("aria-label", "Social media links");

  for (const [key, linkData] of Object.entries(socialLinks)) {
    const link = createExternalLink(key, linkData, "");
    const name = document.createElement("span");
    name.textContent = linkData.name;
    link.append(createIcon(icons[key], "lucide social-icon"), name);
    nav.append(link);
  }

  return nav;
}

function createSocialCard(key, linkData) {
  const card = createExternalLink(key, linkData, "social-card");
  const icon = document.createElement("span");
  icon.className = "social-card-icon";
  icon.append(createIcon(icons[key], "lucide"));

  const content = document.createElement("span");
  content.className = "social-card-copy";

  const name = document.createElement("strong");
  name.textContent = linkData.name;
  const label = document.createElement("span");
  label.textContent = linkData.label;
  content.append(name, label);

  card.append(icon, content, createIcon(externalLinkIcon, "lucide social-card-arrow"));
  return card;
}

function createSocialGrid(className) {
  const grid = document.createElement("div");
  grid.className = className;

  for (const [key, linkData] of Object.entries(socialLinks)) {
    grid.append(createSocialCard(key, linkData));
  }

  return grid;
}

function createWhatsAppCTA(className) {
  const whatsapp = createExternalLink(
    "whatsapp",
    socialLinks.whatsapp,
    className,
  );
  whatsapp.append(
    createIcon(icons.whatsapp, "lucide whatsapp-cta-icon"),
    document.createTextNode(socialLinks.whatsapp.label),
    createIcon(externalLinkIcon, "lucide whatsapp-cta-arrow"),
  );
  return whatsapp;
}

function createContactSocials() {
  const section = document.createElement("section");
  section.className = "contact-socials";
  section.setAttribute("aria-label", "Social media contact links");

  const heading = document.createElement("h3");
  heading.className = "contact-socials-heading";
  heading.textContent = "Connect with me";

  const whatsapp = createWhatsAppCTA("whatsapp-cta");

  section.append(heading, whatsapp, createSocialGrid("contact-social-grid"));
  return section;
}

function createContactSection() {
  const section = document.createElement("section");
  section.id = "contact";
  section.className = "contact-section content-width";
  section.setAttribute("aria-labelledby", "contact-section-title");

  const header = document.createElement("div");
  header.className = "contact-section-header";
  const eyebrow = document.createElement("p");
  eyebrow.className = "contact-section-eyebrow";
  eyebrow.textContent = "Contact";

  const title = document.createElement("h2");
  title.id = "contact-section-title";
  title.className = "contact-section-title";
  title.textContent = "Let’s Connect";

  const description = document.createElement("p");
  description.className = "contact-section-description";
  description.textContent =
    "For project enquiries and collaboration, reach out on your preferred platform.";
  header.append(eyebrow, title, description);

  section.append(
    header,
    createWhatsAppCTA("whatsapp-cta contact-section-whatsapp"),
    createSocialGrid("contact-section-grid"),
  );
  return section;
}

function mountSocialLinks() {
  const footer = document.querySelector(".portfolio-footer");
  if (!footer) {
    return false;
  }

  if (!footer.querySelector(".social-links")) {
    footer.insertBefore(createSocialNav(), footer.children[1] ?? null);
  }

  return true;
}

function mountContactSection() {
  const footer = document.querySelector(".portfolio-footer");
  if (!footer) {
    return false;
  }

  if (!document.getElementById("contact")) {
    footer.before(createContactSection());
  }

  return true;
}

function mountContactSocials() {
  const panel = document.querySelector(".contact-panel");
  if (!panel || panel.querySelector(".contact-socials")) {
    return;
  }

  const note = panel.querySelector("p");
  if (note) {
    note.textContent = "For direct contact, choose a platform below.";
  }

  panel.append(createContactSocials());
}

function mountAfterHydration() {
  window.setTimeout(() => {
    mountSocialLinks();
    mountContactSection();
    mountContactSocials();

    new MutationObserver(() => {
      mountSocialLinks();
      mountContactSection();
      mountContactSocials();
    }).observe(document.body, { childList: true, subtree: true });
  }, 250);
}

if (document.readyState === "complete") {
  mountAfterHydration();
} else {
  window.addEventListener("load", mountAfterHydration, { once: true });
}

export default socialLinks;
