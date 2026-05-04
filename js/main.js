const app = document.getElementById("app");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navLinks");

const sections = [
  "home",
  "about",
  "education",
  "skills",
  "projects",
  "research",
  "certificates",
  "experience",
  "contact"
];

async function loadSections() {
  for (const section of sections) {
    const response = await fetch(`sections/${section}.html`);
    const html = await response.text();
    app.insertAdjacentHTML("beforeend", html);
  }

  setupTabs();
}

function setupTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  const tabSections = document.querySelectorAll(".tab-section");
  const navLinks = document.querySelectorAll(".nav-link");

  function openTab(tabName) {
    tabSections.forEach((section) => {
      section.classList.remove("active");
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const selectedSection = document.getElementById(tabName);

    if (selectedSection) {
      selectedSection.classList.add("active");
    }

    document.querySelectorAll(`.nav-link[data-tab="${tabName}"]`).forEach((link) => {
      link.classList.add("active");
    });

    navMenu.classList.remove("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      if (tabName) {
        openTab(tabName);
      }
    });
  });

  openTab("home");
}

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    navMenu.classList.remove("show");
  }
});

loadSections();