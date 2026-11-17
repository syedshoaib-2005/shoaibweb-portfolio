const iconScope = "main.portfolio-page, [role='dialog']";
const iconSelector = "main.portfolio-page svg, [role='dialog'] svg";
const iconGroupSelector =
  "section, .portfolio-header, .portfolio-footer, [role='dialog']";
const groupIndexes = new WeakMap();

const iconObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("icon-pop-up-visible");
            } else {
              entry.target.classList.remove("icon-pop-up-visible");
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px" },
      )
    : null;

export function PopUpIcon(icon) {
  if (
    !(icon instanceof SVGElement) ||
    icon.dataset.popUpIcon === "true" ||
    !icon.closest(iconScope) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  icon.dataset.popUpIcon = "true";
  icon.classList.add("icon-pop-up");

  const group = icon.closest(iconGroupSelector) || document.body;
  const index = groupIndexes.get(group) || 0;
  groupIndexes.set(group, index + 1);
  const groupSize = Array.from(group.querySelectorAll(iconSelector)).filter(
    (candidate) =>
      (candidate.closest(iconGroupSelector) || document.body) === group,
  ).length;
  const stagger = groupSize > 1 ? Math.min(90, 720 / (groupSize - 1)) : 0;
  icon.style.setProperty(
    "--icon-pop-up-delay",
    `${Math.round(index * stagger)}ms`,
  );

  icon.addEventListener("animationend", (event) => {
    if (event.animationName === "icon-pop-up") {
      icon.classList.remove("icon-pop-up-visible");
    }
  });

  if (iconObserver) {
    iconObserver.observe(icon);
  } else {
    icon.classList.add("icon-pop-up-visible");
  }
}

function initializePopUpIcons(root) {
  if (root instanceof SVGElement && root.matches(iconSelector)) {
    PopUpIcon(root);
  }

  root.querySelectorAll?.(iconSelector).forEach(PopUpIcon);
}

function startPopUpIcons() {
  initializePopUpIcons(document);

  const mutations = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          initializePopUpIcons(node);
        }
      });
    });
  });
  mutations.observe(document.body, { childList: true, subtree: true });
}

function startAfterHydration() {
  window.setTimeout(startPopUpIcons, 400);
}

if (document.readyState === "complete") {
  startAfterHydration();
} else {
  window.addEventListener("load", startAfterHydration, { once: true });
}
