/* =====================================================
   SCROLL REVEAL (SINGLE SOURCE OF TRUTH)
===================================================== */

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-card, .model-step, .step-image-wrapper",
);

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -60px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));

/* =====================================================
   ORBIT / AI MODULE SCENE
===================================================== */

const modules = [
  {
    title: "Process Flow Mapping",
    icon: "fa-diagram-project",
    desc: "Advanced spatial visualization of utility lifecycles for bottleneck prediction.",
  },
  {
    title: "AI Business Intelligence",
    icon: "fa-chart-pie",
    desc: "Strategic grid stability insights derived from deep-learning meter data analysis.",
  },
  {
    title: "Payment History Insights",
    icon: "fa-vault",
    desc: "Predictive algorithms detecting anomalous patterns and financial risks.",
  },
  {
    title: "Seamless Integration",
    icon: "fa-plug",
    desc: "Middleware connecting legacy SCADA systems to modern edge frameworks.",
  },
  {
    title: "Workflow Automation",
    icon: "fa-robot",
    desc: "Autonomous resolution of service requests via robotic process automation.",
  },
  {
    title: "Conversation Assistant",
    icon: "fa-comment-dots",
    desc: "Generative AI trained on utility compliance and customer service protocols.",
  },
  {
    title: "Task Hub Management",
    icon: "fa-tasks",
    desc: "Omnichannel control center for field operations and repair prioritization.",
  },
  {
    title: "System Navigation Guide",
    icon: "fa-compass",
    desc: "Immersive UI assistance reducing agent training friction and system latency.",
  },
];

const scene = document.getElementById("orbitSection");
const svg = document.getElementById("svgCanvas");
const detailPanel = document.getElementById("detailPanel");
const panelTitle = document.getElementById("panelTitle");
const panelDesc = document.getElementById("panelDesc");

function drawScene() {
  if (!scene || !svg || window.innerWidth <= 768) return;

  svg.innerHTML = "";
  scene.querySelectorAll(".sub-topic-tile").forEach((e) => e.remove());

  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;

  const radiusX = Math.min(width * 0.42, 600);
  const radiusY = Math.min(height * 0.38, 400);

  modules.forEach((mod, i) => {
    const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    const tile = document.createElement("div");
    tile.className = "sub-topic-tile";
    tile.innerHTML = `
      <div class="tile-icon-box"><i class="fas ${mod.icon}"></i></div>
      <div class="tile-title">${mod.title}</div>
    `;

    tile.style.left = `${x - 110}px`;
    tile.style.top = `${y - 35}px`;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("class", "beam");

    svg.appendChild(line);
    scene.appendChild(tile);

    tile.addEventListener("mouseenter", () => {
      line.classList.add("active");
      panelTitle.innerText = mod.title;
      panelDesc.innerText = mod.desc;
      detailPanel.classList.add("show");
    });

    tile.addEventListener("mouseleave", () => {
      line.classList.remove("active");
      detailPanel.classList.remove("show");
    });
  });
}

window.addEventListener("load", drawScene);
window.addEventListener("resize", drawScene);

/* =====================================================
   HERO PARALLAX
===================================================== */

const hero = document.querySelector(".hero-section");
const heroBg = document.querySelector(".hero-bg-layer");

let mouseX = 0;
let mouseY = 0;

function updateHeroTransform() {
  if (!heroBg) return;
  heroBg.style.transform = `scale(1.15) translate(${mouseX}px, ${mouseY}px)`;
}

if (hero && heroBg) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    requestAnimationFrame(updateHeroTransform);
  });

  hero.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
    requestAnimationFrame(updateHeroTransform);
  });
}

/* =====================================================
   FORCE MODEL VISIBILITY (SAFETY)
===================================================== */

window.addEventListener("load", () => {
  document
    .querySelectorAll(".model-step, .step-image-wrapper")
    .forEach((el) => el.classList.add("revealed"));
});

/* =====================================================
   HEADER SCROLL + MOBILE MENU (FINAL, SINGLE SOURCE)
===================================================== */

function initHeaderAndMobileMenu() {
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (!header) return;

  /* Header scroll */
  header.classList.add("header-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.remove("header-top");
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
      header.classList.add("header-top");
    }
  });

  /* Mobile menu */
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }
}

/* =====================================================
   LOAD HEADER & FOOTER (FETCH)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
      initHeaderAndMobileMenu();
    });

  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    });
});
/* ======================================================
   HEADER & SERVICES DROPDOWN – FINAL WORKING VERSION
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initDesktopDropdown();
  initMobileNav();
});

/* ================= DESKTOP DROPDOWN (HOVER) ================= */
function initDesktopDropdown() {
  if (window.innerWidth <= 900) return;

  document.querySelectorAll(".desktop-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("active");
    });

    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("active");
    });
  });
}

/* ================= MOBILE NAV ================= */
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (!menuBtn || !mobileNav) return;

  /* Hamburger toggle */
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileNav.classList.toggle("open");
  });

  /* Mobile Services dropdown (ARROW ONLY) */
  document.querySelectorAll(".mobile-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
  });

  /* Close mobile menu on outside click */
  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileNav.classList.remove("open");
    }
  });
}
/* ======================================================
   HEADER DROPDOWN + MOBILE MENU – FINAL
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAndMobileMenu();
});

function initHeaderAndMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  /* Hamburger toggle */
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }

  /* Mobile services dropdown */
  document.querySelectorAll(".mobile-dropdown").forEach((dropdown) => {
    const btn = dropdown.querySelector(".mobile-services-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
  });
}
