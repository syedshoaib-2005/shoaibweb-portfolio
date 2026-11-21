/**
 * SHOAIBWEB — Core Portfolio Content & Component Engine
 * Professional AI Engineer Portfolio of Syed Shoaib H.
 */

const heroCopy = {
  badge: "AI ENGINEER · MACHINE LEARNING · DATA ANALYTICS",
  name: "SYED SHOAIB H",
  headlineLine1: "ENGINEERING INTELLIGENCE.",
  headlineLine2: "CREATING IMPACT.",
  description:
    "I’m an aspiring AI Engineer focused on building practical machine learning solutions, transforming data into meaningful insights and developing technology-driven applications.",
  ctaPrimary: "Get in Touch",
  ctaSecondary: "Explore Projects",
};

const technicalFocusAreas = [
  {
    key: "ml",
    title: "Machine Learning",
    summary: "Predictive Models & Pipelines",
    detail: "Scikit-learn, supervised algorithms, feature encoding, model evaluation",
    icon: `<path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L17 11a5 5 0 0 1-5 5 5 5 0 0 1-5-5l2.17-2.17A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/><circle cx="12" cy="6" r="1.5"/><path d="M9 18l-3 4M15 18l3 4M12 16v6"/>`
  },
  {
    key: "analytics",
    title: "Data Analytics",
    summary: "Exploratory & Statistical EDA",
    detail: "Pandas, NumPy, data cleaning, statistical distributions & pattern extraction",
    icon: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`
  },
  {
    key: "ai",
    title: "AI Applications",
    summary: "End-to-End Smart Solutions",
    detail: "Applied ML solutions, workflow automation, modern tech integration",
    icon: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`
  }
];

const technicalSkillsCategories = [
  {
    category: "Programming",
    icon: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
    skills: ["Python 3.12", "SQL", "JavaScript", "TypeScript", "Bash / Shell"]
  },
  {
    category: "Machine Learning",
    icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    skills: ["scikit-learn", "Classification", "Regression", "Feature Engineering", "Model Evaluation & Metrics"]
  },
  {
    category: "Data Analytics",
    icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
    skills: ["pandas", "NumPy", "Exploratory Data Analysis", "Data Cleaning", "Statistical Modeling"]
  },
  {
    category: "Visualization",
    icon: `<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>`,
    skills: ["Matplotlib", "Seaborn", "Data Storytelling", "Interactive Dashboards", "Statistical Plotting"]
  },
  {
    category: "Development Tools",
    icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
    skills: ["Git & GitHub", "VS Code", "Jupyter Notebook", "Virtual Environments (venv)", "Linux / CLI"]
  },
  {
    category: "AI Technologies",
    icon: `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>`,
    skills: ["Prompt Engineering", "Applied ML Workflows", "API Integration", "Model Deployment Basics", "Automation"]
  }
];

const experienceItems = [
  {
    period: "2024 — Present",
    role: "AI & Machine Learning Engineering",
    type: "Technical Specialization",
    description:
      "Developing end-to-end predictive machine learning pipelines, structured data preprocessing workflows, and exploratory analysis solutions with scikit-learn, pandas, and modern AI development tools.",
    highlights: ["Telco Churn Prediction Model (84.27% accuracy)", "Custom Feature Engineering Pipelines", "Exploratory Data Analysis & Modeling"]
  },
  {
    period: "2023 — Present",
    role: "Modern Web & Interface Development",
    type: "Supporting Development",
    description:
      "Designing and implementing responsive, performant user interfaces and interactive web applications with modern styling systems, robust accessibility standards, and clean component architecture.",
    highlights: ["High-performance UI implementations", "Modern CSS & Motion Systems", "Cross-platform Responsive Design"]
  },
  {
    period: "Academic & Professional Growth",
    role: "Computer Science & Artificial Intelligence",
    type: "Education & Continuous Training",
    description:
      "Ongoing rigorous study and applied practice in machine learning algorithms, computational mathematics, statistical inference, and scalable software engineering.",
    highlights: ["Supervised & Unsupervised Learning", "Data Structures & Algorithms", "Applied Statistics"]
  }
];

const supportingProjectDescriptions = new Map([
  [
    "Lawyer Alexander’s Landing Page",
    "A landing page for a legal practice, focused on clear information hierarchy and a direct consultation path.",
  ],
  [
    "Hebrew Marketing Agency’s Website",
    "A website presenting a marketing agency’s services, brand identity, and client offerings.",
  ],
  [
    "KeyPharma Company’s Travo Product Website",
    "A product showcase website built to present the Travo pharmaceutical offering with clarity.",
  ],
  [
    "Robert’s Legal Landing Page",
    "A legal landing page with a conversion-focused lead-generation structure and responsive layout.",
  ],
]);

function setText(element, text) {
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

function setDirectText(element, text) {
  if (!element) return;
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
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/**
 * Build the unified, balanced Hero Left Content Column
 */
function rebuildHeroSection() {
  const hero = document.querySelector(".portfolio-hero");
  if (!hero) return;

  // Remove old duplicate hero-visual image container if present
  const oldVisual = hero.querySelector(".hero-visual");
  if (oldVisual) oldVisual.remove();

  // Check if already transformed to modern structure
  let heroContainer = hero.querySelector(".hero-balanced-container");
  if (!heroContainer) {
    heroContainer = document.createElement("div");
    heroContainer.className = "hero-balanced-container";

    // Clean existing hero children and rebuild into balanced layout
    const oldIntro = hero.querySelector(".hero-introduction");
    const oldBottom = hero.querySelector(".hero-bottom");
    if (oldIntro) oldIntro.remove();
    if (oldBottom) oldBottom.remove();

    hero.appendChild(heroContainer);
  }

  heroContainer.innerHTML = `
    <div class="hero-content-column">
      <div class="hero-badge-row">
        <span class="hero-status-pulse"></span>
        <span class="hero-badge-text">${heroCopy.badge}</span>
      </div>

      <h1 class="hero-name-title" id="portfolio-name">
        ${heroCopy.name}<span class="hero-dot">.</span>
      </h1>

      <div class="hero-headline-block">
        <h2 class="hero-main-headline">
          <span>${heroCopy.headlineLine1}</span><br/>
          <span>${heroCopy.headlineLine2}</span>
        </h2>
      </div>

      <p class="hero-description-text">
        ${heroCopy.description}
      </p>

      <div class="hero-cta-group">
        <button class="hero-btn-primary" id="hero-action-contact">
          <span>${heroCopy.ctaPrimary}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </button>
        <button class="hero-btn-secondary" id="hero-action-projects">
          <span>${heroCopy.ctaSecondary}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right"><path d="m7 7 10 10"></path><path d="M17 7v10H7"></path></svg>
        </button>
      </div>

      <!-- Refined Technical Focus Component -->
      <div class="hero-technical-focus-panel" id="trust">
        <div class="focus-panel-eyebrow">
          <span class="focus-pulse-dot"></span>
          <span>Technical Focus</span>
        </div>
        <div class="focus-cards-row">
          ${technicalFocusAreas.map(item => `
            <div class="focus-mini-card" data-focus="${item.key}">
              <div class="focus-mini-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
              </div>
              <div class="focus-mini-info">
                <strong>${item.title}</strong>
                <span>${item.summary}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach button events
  const contactBtn = heroContainer.querySelector("#hero-action-contact");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open("https://wa.me/971541369143", "_blank");
      }
    });
  }

  const projectsBtn = heroContainer.querySelector("#hero-action-projects");
  if (projectsBtn) {
    projectsBtn.addEventListener("click", () => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/**
 * Telco Customer Churn Prediction Featured Card
 */
function createTelcoProjectCard() {
  const card = document.createElement("article");
  card.className = "ai-project-feature";
  card.setAttribute("aria-labelledby", "telco-project-title");

  card.innerHTML = `
    <div class="ai-project-header">
      <div class="ai-project-introduction">
        <div class="ai-project-badge-row">
          <span class="ai-project-dot"></span>
          <span class="ai-project-eyebrow">Featured Project · Machine Learning</span>
        </div>
        <h3 id="telco-project-title">Telco Customer Churn Prediction</h3>
        <p class="ai-project-summary">
          An end-to-end predictive machine learning classification workflow developed to forecast customer churn patterns from telecommunication service, contract, demographic, and billing datasets.
        </p>
      </div>
      <div class="ai-project-metrics">
        <div class="ai-project-metric">
          <strong>7,043</strong>
          <span>Customer Records</span>
        </div>
        <div class="ai-project-metric">
          <strong>21</strong>
          <span>Dataset Features</span>
        </div>
        <div class="ai-project-metric highlight">
          <strong>84.27%</strong>
          <span>Verified Accuracy</span>
        </div>
      </div>
    </div>

    <div class="ai-project-details-grid">
      <div class="ai-project-detail-box">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Business Problem
        </h4>
        <p>Proactively anticipate customer churn using customer profiles, subscribed services, account tenure, and monthly billing to retain high-value telecommunications accounts.</p>
      </div>

      <div class="ai-project-detail-box">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>
          Dataset &amp; Distribution
        </h4>
        <p>IBM Telco Customer Churn dataset with 7,043 rows. Target column <code>Churn</code> comprises 5,174 "No" records (73.46%) and 1,869 "Yes" records (26.54%).</p>
      </div>

      <div class="ai-project-detail-box">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          Data Cleaning &amp; EDA
        </h4>
        <p>Converted <code>TotalCharges</code> to numeric, resolved 11 missing values with zero-imputation, dropped unique identifiers, and analyzed correlation across contract structures and payment options.</p>
      </div>

      <div class="ai-project-detail-box">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.1-.45 2.1-1.17 2.83L17 11a5 5 0 0 1-5 5 5 5 0 0 1-5-5l2.17-2.17A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/><circle cx="12" cy="6" r="1.5"/></svg>
          Machine Learning Approach
        </h4>
        <p>Engineered a supervised scikit-learn classification pipeline. Transformed categorical predictors with one-hot encoding (<code>drop_first=True</code>) and standard scaling on numerical features.</p>
      </div>

      <div class="ai-project-detail-box highlight-box">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Verified Evaluation Results
        </h4>
        <p>Classification accuracy climbed from baseline <strong>80.48%</strong> to <strong>84.27%</strong> following optimized feature encoding and clean preprocessing (+3.79% accuracy boost).</p>
      </div>
    </div>

    <div class="ai-project-footer">
      <div class="ai-project-technologies">
        <h4>Technologies Used</h4>
        <ul class="ai-project-technology-list">
          <li>Python 3.12</li>
          <li>pandas</li>
          <li>NumPy</li>
          <li>scikit-learn</li>
          <li>Matplotlib</li>
          <li>Seaborn</li>
          <li>Jupyter Notebook</li>
          <li>VS Code</li>
        </ul>
      </div>

      <div class="ai-project-links">
        <a href="https://github.com/syedshoaib-2005" target="_blank" rel="noopener noreferrer" class="ai-project-repo-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S18.5 1.2 15 3a13.4 13.4 0 0 0-7 0C4.5 1.2 3.3 1.5 3.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.7V22"/></svg>
          <span>Explore on GitHub (syedshoaib-2005)</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
        </a>
      </div>
    </div>
  `;

  return card;
}

/**
 * Dedicated Technical Skills Section (6 categories)
 */
function createSkillsSection() {
  const section = document.createElement("section");
  section.id = "skills";
  section.className = "skills-section content-width";
  section.setAttribute("aria-labelledby", "skills-title");

  section.innerHTML = `
    <div class="section-header-block">
      <p class="section-label"><span></span>Technical Skills</p>
      <h2 id="skills-title" class="section-main-title">Core Engineering Capabilities</h2>
      <p class="section-subtitle-text">
        Organized technical domain proficiencies spanning machine learning, data analytics, predictive modeling, and applied systems development.
      </p>
    </div>

    <div class="skills-grid">
      ${technicalSkillsCategories.map(cat => `
        <div class="skills-category-card">
          <div class="skills-card-header">
            <span class="skills-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${cat.icon}</svg>
            </span>
            <h3>${cat.category}</h3>
          </div>
          <ul class="skills-pill-list">
            ${cat.skills.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>
  `;

  return section;
}

/**
 * Dedicated Experience & Education Timeline Section
 */
function createExperienceSection() {
  const section = document.createElement("section");
  section.id = "experience";
  section.className = "experience-section content-width";
  section.setAttribute("aria-labelledby", "experience-title");

  section.innerHTML = `
    <div class="section-header-block">
      <p class="section-label"><span></span>Experience &amp; Education</p>
      <h2 id="experience-title" class="section-main-title">Professional Journey</h2>
      <p class="section-subtitle-text">
        A structured overview of practical technical applications, engineering experience, and ongoing computer science specialization.
      </p>
    </div>

    <div class="timeline-container">
      ${experienceItems.map((item, idx) => `
        <div class="timeline-item" data-index="${idx}">
          <div class="timeline-marker">
            <span class="timeline-dot"></span>
            <span class="timeline-line"></span>
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-period">${item.period}</span>
              <span class="timeline-type">${item.type}</span>
            </div>
            <h3 class="timeline-role">${item.role}</h3>
            <p class="timeline-desc">${item.description}</p>
            <ul class="timeline-highlights">
              ${item.highlights.map(h => `<li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${h}</li>`).join("")}
            </ul>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  return section;
}

/**
 * Update Project Copy & Mount Featured Card
 */
function updateProjectsSection() {
  const projects = document.getElementById("projects");
  if (!projects) return;

  setText(
    projects.querySelector(".projects-heading p"),
    "SUPPORTING WORK · WEB DEVELOPMENT",
  );
  setText(
    projects.querySelector(".projects-heading h2"),
    "Selected Web Development Projects",
  );

  const detailNoteH2 = document.querySelector(".detail-note h2");
  if (detailNoteH2) {
    setText(detailNoteH2, "Precision in Every Line of Code.");
  }
  const detailNoteP = document.querySelector(".detail-note p");
  if (detailNoteP) {
    setText(
      detailNoteP,
      "From rigorous data exploration to production deployment, every solution is built with purpose, clarity, and mathematical care.",
    );
  }

  // Update descriptions on supporting projects
  projects.querySelectorAll(".project-item").forEach((project) => {
    const title = project.querySelector("h3")?.textContent.trim();
    const description = supportingProjectDescriptions.get(title);
    if (description) {
      setText(project.querySelector(":scope > p"), description);
    }
  });

  // Mount Featured Telco project at the top of the projects section if not present
  if (!projects.querySelector(".ai-project-feature")) {
    const firstColumn = projects.querySelector(".project-column");
    projects.insertBefore(createTelcoProjectCard(), firstColumn);
  }
}

/**
 * Update About Copy
 */
function updateAboutSection() {
  const about = document.getElementById("about");
  if (!about) return;

  const aboutCopy = about.querySelector(".about-copy > p");
  if (aboutCopy) {
    setText(
      aboutCopy,
      "My professional focus is AI engineering, machine learning, and data analytics. I work across rigorous data preparation, exploratory analysis, predictive modeling, and scalable software architecture to turn complex data problems into practical, high-impact intelligent systems."
    );
  }
}

/**
 * Mount Navigation Links for all sections
 */
function setupNavigation() {
  const nav = document.querySelector(".portfolio-nav");
  if (!nav) return;

  const targetSections = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  // Rebuild navigation buttons
  nav.innerHTML = targetSections.map(item => `
    <button class="nav-item-btn" data-target="${item.id}">${item.label}</button>
  `).join("");

  nav.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Update active section on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        nav.querySelectorAll(".nav-item-btn").forEach(btn => {
          if (btn.getAttribute("data-target") === id) {
            btn.classList.add("nav-active");
          } else {
            btn.classList.remove("nav-active");
          }
        });
      }
    });
  }, { threshold: 0.35 });

  targetSections.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });
}

/**
 * Main Portfolio Content Initializer
 */
export function updatePortfolio() {
  document.documentElement.classList.add("portfolio-ai-mode");
  document.title = "Syed Shoaib H. — AI Engineer | Machine Learning & Data Analytics";

  rebuildHeroSection();
  updateAboutSection();

  // Mount Skills Section if not present
  const aboutSection = document.getElementById("about");
  if (aboutSection && !document.getElementById("skills")) {
    aboutSection.after(createSkillsSection());
  }

  // Mount Experience Section if not present
  const projectsSection = document.getElementById("projects");
  if (projectsSection && !document.getElementById("experience")) {
    projectsSection.after(createExperienceSection());
  }

  updateProjectsSection();
  setupNavigation();

  return true;
}

function startAfterHydration() {
  window.setTimeout(() => {
    updatePortfolio();

    // Observe body for React hydration or dynamic changes
    let debounceTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        // Ensure structure stays mounted
        if (!document.getElementById("skills") || !document.querySelector(".hero-balanced-container")) {
          updatePortfolio();
        }
      }, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }, 250);
}

if (document.readyState === "complete") {
  startAfterHydration();
} else {
  window.addEventListener("load", startAfterHydration, { once: true });
}
