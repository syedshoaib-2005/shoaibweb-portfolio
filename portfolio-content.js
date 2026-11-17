const heroIntroduction =
  "I’m Syed Shoaib H., an AI Engineer focused on practical machine learning, data analytics, and technology-driven product experiences that turn ideas into clear outcomes.";

const aboutIntroduction =
  "My professional focus is AI engineering, machine learning, and data analytics. I work across data preparation, exploratory analysis, predictive modelling, and clear communication to turn complex information into practical solutions.";

const contactIntroduction =
  "For AI engineering, machine learning, and data analytics opportunities, let’s connect and talk through the next step.";

const supportingProjectDescriptions = new Map([
  [
    "Lawyer Alexander’s Landing Page",
    "A landing page for a legal practice, focused on clear information and a direct consultation path.",
  ],
  [
    "Hebrew Marketing Agency’s Website",
    "A website presenting a marketing agency’s services and offerings.",
  ],
  [
    "KeyPharma Company’s Travo Product Website",
    "A product website built to present the Travo offering.",
  ],
  [
    "Robert’s Legal Landing Page",
    "A legal landing page with a focused lead-generation structure.",
  ],
]);

function setText(element, text) {
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

function setDirectText(element, text) {
  if (!element) {
    return;
  }

  const textNode = Array.from(element.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
  );
  if (textNode) {
    if (textNode.textContent !== text) {
      textNode.textContent = text;
    }
  } else {
    element.insertBefore(document.createTextNode(text), element.firstChild);
  }
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createMetric(value, label) {
  const metric = document.createElement("div");
  metric.className = "ai-project-metric";
  metric.append(
    createTextElement("strong", "", value),
    createTextElement("span", "", label),
  );
  return metric;
}

function createProjectDetail(title, description) {
  const detail = document.createElement("div");
  detail.className = "ai-project-detail";
  detail.append(
    createTextElement("h4", "", title),
    createTextElement("p", "", description),
  );
  return detail;
}

function createTelcoProjectCard() {
  const card = document.createElement("article");
  card.className = "ai-project-feature";
  card.setAttribute("aria-labelledby", "telco-project-title");

  const header = document.createElement("div");
  header.className = "ai-project-header";

  const introduction = document.createElement("div");
  introduction.className = "ai-project-introduction";
  introduction.append(
    createTextElement("p", "ai-project-eyebrow", "Featured · Machine Learning"),
    createTextElement("h3", "", "Telco Customer Churn Prediction"),
    createTextElement(
      "p",
      "ai-project-summary",
      "Explore customer churn patterns in telecom data and develop a classification workflow to predict churn from customer, service, account, and billing information.",
    ),
  );
  introduction.querySelector("h3").id = "telco-project-title";

  const metrics = document.createElement("div");
  metrics.className = "ai-project-metrics";
  metrics.append(
    createMetric("7,043", "customer records"),
    createMetric("21", "dataset columns"),
    createMetric("84.27%", "reported accuracy"),
  );
  header.append(introduction, metrics);

  const details = document.createElement("div");
  details.className = "ai-project-details";
  details.append(
    createProjectDetail(
      "Business problem",
      "Use customer demographics, services, account details, and billing information to study churn patterns and develop a workflow for predicting churn.",
    ),
    createProjectDetail(
      "Dataset & target",
      "IBM Telco Customer Churn CSV (WA_Fn-UseC_-Telco-Customer-Churn.csv). The target is Churn: 5,174 “No” and 1,869 “Yes” records.",
    ),
    createProjectDetail(
      "Data cleaning & EDA",
      "Converted TotalCharges to numeric, filled 11 missing values with 0, and removed customerID. Explored churn across contract types, internet services, payment methods, and customer charges.",
    ),
    createProjectDetail(
      "Machine-learning approach",
      "Built a supervised scikit-learn classification workflow and one-hot encoded categorical features with drop_first=True. The specific estimator was not recorded.",
    ),
    createProjectDetail(
      "Evaluation",
      "Reported accuracy increased from 80.48% to 84.27% after improved feature encoding (+3.79 percentage points). Precision, recall, and F1 results were not available.",
    ),
  );

  const technology = document.createElement("div");
  technology.className = "ai-project-technologies";
  technology.append(
    createTextElement("h4", "", "Technologies"),
  );

  const technologyList = document.createElement("ul");
  technologyList.className = "ai-project-technology-list";
  [
    "Python 3.12",
    "pandas",
    "NumPy",
    "scikit-learn",
    "Matplotlib",
    "Seaborn",
    "Jupyter Notebook",
    "VS Code",
    "venv",
  ].forEach((technologyName) => {
    technologyList.append(
      createTextElement("li", "", technologyName),
    );
  });
  technology.append(technologyList);

  const repositoryNote = createTextElement(
    "p",
    "ai-project-repository",
    "No public project repository link is currently available.",
  );

  card.append(header, details, technology, repositoryNote);
  return card;
}

function updateProjectCopy() {
  setText(
    document.querySelector(".detail-note h2"),
    "From Data Exploration to Practical Insights",
  );
  setText(
    document.querySelector(".detail-note p"),
    "I approach technical challenges through careful analysis, purposeful modeling, and clear communication.",
  );
  setText(
    document.querySelector(".projects-heading p"),
    "WEB DEVELOPMENT · SUPPORTING",
  );
  setText(
    document.querySelector(".projects-heading h2"),
    "Supporting Web Work",
  );

  document.querySelectorAll("#projects .project-item").forEach((project) => {
    const title = project.querySelector("h3")?.textContent.trim();
    const description = supportingProjectDescriptions.get(title);
    if (description) {
      setText(project.querySelector(":scope > p"), description);
    }
  });

  const dialog = document.querySelector(".project-dialog");
  if (dialog) {
    const title = dialog.querySelector("h2")?.textContent.trim();
    const description = supportingProjectDescriptions.get(title);
    if (description) {
      setText(dialog.querySelector("p"), description);
    }
  }
}

function updateTestimonialCopy() {
  const section = document.getElementById("testimonials");
  if (!section) {
    return;
  }

  setText(
    section.querySelector(".testimonials-subtitle"),
    "A concise snapshot of collaboration, clarity, and delivery.",
  );
  setText(
    section.querySelector(".testimonials-disclaimer"),
    "Feedback is presented with permission and framed as project experience, not fabricated endorsements.",
  );

  section.querySelectorAll(".testimonial-card").forEach((card) => {
    const title = card.querySelector(".testimonial-category")?.textContent.trim();
    if (!title) {
      return;
    }

    card.setAttribute(
      "aria-label",
      `${title} collaboration section`,
    );
    setText(
      card.querySelector(".testimonial-sample-label"),
      "Project feedback",
    );
    setText(
      card.querySelector(".testimonial-attribution-text"),
      `${title} collaboration`,
    );
  });
}

function updateServicesDialog() {
  const dialog = document.querySelector(".portfolio-dialog");
  const serviceList = dialog?.querySelector(".service-list");
  if (!dialog || !serviceList) {
    return;
  }

  setText(
    dialog.querySelector("h2"),
    "AI Engineering & Data Analytics",
  );
  setText(
    dialog.querySelector(".flex.flex-col p"),
    "A practical focus on machine learning, meaningful data insights, and technology-driven applications.",
  );

  const focusAreas = [
    "Machine Learning",
    "Data Analytics",
    "Supporting Web Development",
  ];
  serviceList.querySelectorAll("h3").forEach((heading, index) => {
    if (focusAreas[index]) {
      setText(heading, focusAreas[index]);
    }
  });
}

function updateContactDialog() {
  const dialog = document.querySelector(".portfolio-dialog");
  const contactPanel = dialog?.querySelector(".contact-panel");
  if (!dialog || !contactPanel) {
    return;
  }

  setText(dialog.querySelector("h2"), "Let’s Connect");
  setText(
    dialog.querySelector(".flex.flex-col p"),
    "Share an AI engineering, machine-learning, or data analytics opportunity or question.",
  );
  setText(
    contactPanel.querySelector('label[for="project-brief"]'),
    "Opportunity or project brief",
  );

  const brief = contactPanel.querySelector("#project-brief");
  if (
    brief &&
    brief.getAttribute("placeholder") !==
      "Share an AI or data opportunity you’d like to discuss…"
  ) {
    brief.setAttribute(
      "placeholder",
      "Share an AI or data opportunity you’d like to discuss…",
    );
  }
}

function updatePortfolioCopy() {
  const hero = document.querySelector(".portfolio-hero");
  const projects = document.getElementById("projects");
  if (!hero || !projects) {
    return false;
  }

  document.documentElement.classList.add("portfolio-ai-mode");
  hero.setAttribute("aria-label", "Syed Shoaib H., AI Engineer");
  document.title =
    "Syed Shoaib H. — AI Engineer | Machine Learning & Data Analytics";

  const metadata = [
    [
      'meta[name="description"]',
      "Syed Shoaib H. is an AI Engineer focused on practical machine learning, data analytics, and technology-driven applications.",
    ],
    [
      'meta[property="og:title"]',
      "Syed Shoaib H. — AI Engineer | Machine Learning & Data Analytics",
    ],
    [
      'meta[property="og:description"]',
      "Explore Syed Shoaib H.’s work in machine learning, data analytics, and technology-driven applications.",
    ],
  ];
  metadata.forEach(([selector, content]) => {
    document.querySelector(selector)?.setAttribute("content", content);
  });

  setText(
    document.querySelector(".hero-greeting"),
    "AI ENGINEER · MACHINE LEARNING · DATA ANALYTICS",
  );
  const name = document.getElementById("portfolio-name");
  setDirectText(name, "Syed Shoaib H");

  const heroOffer = document.querySelector(".hero-offer");
  const heroEyebrow = heroOffer?.querySelector(".eyebrow");
  setDirectText(heroEyebrow, "AI ENGINEERING");

  const heroHeadline = heroOffer?.querySelector("h2");
  setText(heroHeadline, "Engineering Intelligence. Creating Impact.");
  if (heroOffer && heroHeadline) {
    let summary = heroOffer.querySelector(".hero-summary");
    if (!summary) {
      summary = createTextElement("p", "hero-summary", heroIntroduction);
      heroHeadline.after(summary);
    } else {
      setText(summary, heroIntroduction);
    }
  }

  const trustCopy = document.querySelector(".trust-panel > p");
  if (trustCopy && trustCopy.textContent.trim() !== "Technical focus") {
    const emphasis = document.createElement("strong");
    emphasis.textContent = "Technical focus";
    trustCopy.replaceChildren(emphasis);
  }

  const trustTags = document.querySelector(".trust-tags");
  if (trustTags) {
    const labels = ["Machine Learning", "Data Analytics", "AI Applications"];
    labels.forEach((label, index) => {
      let tag = trustTags.children[index];
      if (!tag) {
        tag = document.createElement("span");
        trustTags.append(tag);
      }
      setText(tag, label);
    });
  }

  const focusLabels = [
    "MACHINE LEARNING",
    "DATA ANALYTICS",
    "AI ENGINEERING",
  ];
  document.querySelectorAll(".stats-group").forEach((group) => {
    group.querySelectorAll(":scope > span").forEach((item, index) => {
      if (focusLabels[index]) {
        setDirectText(item, focusLabels[index]);
      }
    });
  });
  const statsStrip = document.querySelector(".stats-strip");
  statsStrip?.setAttribute("aria-label", "Areas of technical focus");

  const aboutCopy = document.querySelector(".about-copy > p");
  setText(aboutCopy, aboutIntroduction);

  const buttonLabels = new Map([
    ["Start a Project", "Get in Touch"],
    ["View My Work", "Explore Projects"],
    ["Let’s create something great", "Connect with me"],
  ]);
  document.querySelectorAll("button").forEach((button) => {
    const replacement = buttonLabels.get(button.textContent.trim());
    if (replacement) {
      setDirectText(button, replacement);
    }
  });

  setText(
    document.querySelector(".contact-section-description"),
    contactIntroduction,
  );

  const projectHeading = projects.querySelector(".projects-heading h2");
  setText(projectHeading, "Supporting Web Work");
  const projectLabel = projects.querySelector(".projects-heading > p");
  setText(projectLabel, "WEB DESIGN & DEVELOPMENT");

  if (!projects.querySelector(".ai-project-feature")) {
    const firstColumn = projects.querySelector(".project-column");
    projects.insertBefore(createTelcoProjectCard(), firstColumn);
  }
  updateProjectCopy();
  updateTestimonialCopy();
  updateServicesDialog();
  updateContactDialog();

  return true;
}

function startPortfolioContent() {
  const applyContent = () => {
    updatePortfolioCopy();
  };

  if (updatePortfolioCopy()) {
    const observer = new MutationObserver(applyContent);
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function startAfterHydration() {
  window.setTimeout(startPortfolioContent, 350);
}

if (document.readyState === "complete") {
  startAfterHydration();
} else {
  window.addEventListener("load", startAfterHydration, { once: true });
}
