/* ======================================================
   GLOBAL SCRIPT – SINGLE SOURCE OF TRUTH
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  initRevealSafe();
});

/* ================= LOAD HEADER ================= */
function loadHeader() {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      headerContainer.innerHTML = html;

      initHeaderScroll();
      initMobileMenu();
      initDesktopDropdown();
    })
    .catch((err) => console.error("Header load error:", err));
}

/* ================= LOAD FOOTER ================= */
function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (!footerContainer) return;

  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((err) => console.error("Footer load error:", err));
}

/* ================= HEADER SCROLL ================= */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  header.classList.add("header-top");

  window.addEventListener("scroll", () => {
    header.classList.toggle("header-scrolled", window.scrollY > 80);
    header.classList.toggle("header-top", window.scrollY <= 80);
  });
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  nav.querySelectorAll(".mobile-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".mobile-services-btn");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
  });
}

/* ================= DESKTOP DROPDOWN ================= */
function initDesktopDropdown() {
  if (window.innerWidth <= 900) return;

  document.querySelectorAll(".desktop-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", () =>
      dropdown.classList.add("active"),
    );
    dropdown.addEventListener("mouseleave", () =>
      dropdown.classList.remove("active"),
    );
  });
}

/* ================= SCROLL REVEAL ================= */
function initRevealSafe() {
  const elements = document.querySelectorAll(".reveal, .reveal-card");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}
/* ======================================================
   ORBIT SECTION – AI ENABLED CX (SAFE & ISOLATED)
====================================================== */

(function initOrbitSection() {
  const scene = document.getElementById("orbitSection");
  const svg = document.getElementById("svgCanvas");

  if (!scene || !svg) return; // 🔒 page doesn't use orbit

  const modules = [
    {
      key: "process",
      title: "Process Flow Mapping",
      icon: "fa-diagram-project",
      desc: "Advanced spatial visualization of utility lifecycles for bottleneck prediction and optimization.",
    },
    {
      key: "bi",
      title: "AI Business Intelligence",
      icon: "fa-chart-pie",
      desc: "Predictive analytics and AI-driven dashboards enabling smarter enterprise decisions.",
    },
    {
      key: "payment",
      title: "Payment History Insights",
      icon: "fa-wallet",
      desc: "Deep insights into billing patterns, collections, and revenue assurance.",
    },
    {
      key: "integration",
      title: "Seamless Integration",
      icon: "fa-plug",
      desc: "Effortless integration across legacy, cloud, and third-party utility systems.",
    },
    {
      key: "workflow", // 🔥 FIXED
      title: "Workflow Automation",
      icon: "fa-robot",
      desc: "End-to-end automation of operational workflows using AI-driven orchestration.",
    },
    {
      key: "assistant",
      title: "Conversation Assistant",
      icon: "fa-comment-dots",
      desc: "AI-powered conversational interfaces delivering instant customer support.",
    },
    {
      key: "taskhub",
      title: "Task Hub Management",
      icon: "fa-list-check",
      desc: "Centralized task orchestration improving operational efficiency.",
    },
    {
      key: "navigation",
      title: "System Navigation Guide",
      icon: "fa-compass",
      desc: "Intelligent guidance reducing onboarding time and user friction.",
    },
  ];

  function drawOrbit() {
    svg.innerHTML = "";
    scene.querySelectorAll(".sub-topic-tile").forEach((e) => e.remove());

    const rect = scene.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const radiusX =
      window.innerWidth <= 768
        ? rect.width * 0.28
        : Math.min(rect.width * 0.38, 520);
    const radiusY =
      window.innerWidth <= 768
        ? rect.height * 0.24
        : Math.min(rect.height * 0.32, 360);

    modules.forEach((mod, i) => {
      const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + radiusX * Math.cos(angle);
      const y = cy + radiusY * Math.sin(angle);

      // SVG beam
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("class", "beam");
      svg.appendChild(line);

      // Tile
      const tile = document.createElement("div");
      tile.className = "sub-topic-tile";
      tile.dataset.key = mod.key;

      tile.innerHTML = `
        <div class="tile-icon-box">
          <i class="fas ${mod.icon}"></i>
        </div>
        <div class="tile-title">${mod.title}</div>
      `;

      tile.style.left = `${x - 110}px`;
      tile.style.top = `${y - 30}px`;

      scene.appendChild(tile);

      // Attach interactions
      attachOrbitEvents(tile, line, mod);
    });
  }

  window.addEventListener("load", drawOrbit);
  window.addEventListener("resize", drawOrbit);

  /* ======================================================
     ORBIT DETAIL PANEL – DESKTOP + MOBILE
  ====================================================== */

  const panel = document.getElementById("detailPanel");
  const titleEl = document.getElementById("panelTitle");
  const descEl = document.getElementById("panelDesc");

  function showPanel(mod) {
    if (!panel || !titleEl || !descEl) return;

    titleEl.textContent = mod.title;
    descEl.textContent = mod.desc;
    panel.classList.add("show");
  }

  function hidePanel() {
    panel?.classList.remove("show");
  }

  function attachOrbitEvents(tile, line, mod) {
    /* Desktop hover */
    tile.addEventListener("mouseenter", () => {
      line.classList.add("active");
      showPanel(mod);
    });

    tile.addEventListener("mouseleave", () => {
      line.classList.remove("active");
      hidePanel();
    });

    /* Mobile tap */
    tile.addEventListener("click", (e) => {
      e.stopPropagation();
      showPanel(mod);
    });
  }

  /* Close panel on outside tap (mobile UX) */
  document.addEventListener("click", hidePanel);
})();
