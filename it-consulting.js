document.addEventListener("DOMContentLoaded", () => {
  /* ================= LOAD HEADER ================= */
  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      const headerEl = document.getElementById("header");
      if (headerEl) headerEl.innerHTML = html;
      initHeaderScroll();
    })
    .catch((err) => console.error("Header load error:", err));
  /* =====================================================
   MOBILE MENU – FINAL RELIABLE FIX (ALL PAGES)
===================================================== */
  function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("mobileNav");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

  /* HEADER LOAD (SINGLE SOURCE) */
  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
      initMobileMenu(); // 🔥 THIS IS THE KEY
    });

  /* ================= LOAD FOOTER ================= */
  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      const footerEl = document.getElementById("footer");
      if (footerEl) footerEl.innerHTML = html;
    })
    .catch((err) => console.error("Footer load error:", err));
});

/* ================= HEADER SCROLL ================= */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

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
}
/* ======================================================
   HEADER DROPDOWN + MOBILE MENU – BULLETPROOF
====================================================== */

function initHeaderAndMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (!mobileMenuBtn || !mobileNav) return;

  /* Hamburger toggle */
  mobileMenuBtn.onclick = () => {
    mobileNav.classList.toggle("active");
  };

  /* Mobile services dropdown */
  mobileNav.querySelectorAll(".mobile-dropdown").forEach((dropdown) => {
    const btn = dropdown.querySelector(".mobile-services-btn");
    if (!btn) return;

    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("open");
    };
  });
}

/* 🔥 IMPORTANT: wait until header is actually in DOM */
function waitForHeader() {
  const header = document.querySelector(".header");
  const mobileNav = document.getElementById("mobileNav");

  if (header && mobileNav) {
    initHeaderAndMobileMenu();
  } else {
    requestAnimationFrame(waitForHeader);
  }
}

waitForHeader();
