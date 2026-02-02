/* =====================================================
   REGISTER GSAP PLUGINS
===================================================== */
gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   DISABLE LOADER & LENIS ON MOBILE
===================================================== */
const isMobile = window.innerWidth <= 768;

/* =====================================================
   INITIALIZE LENIS (DESKTOP ONLY)
===================================================== */
let lenis = null;

if (!isMobile) {
  lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* =====================================================
   CUSTOM CURSOR (DESKTOP ONLY)
===================================================== */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (!isMobile && cursor && follower) {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
  });
}

/* =====================================================
   LOADER (DESKTOP ONLY)
===================================================== */
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");
const progress = document.querySelector(".progress");

if (!isMobile && loader && loaderText && progress) {
  const words = ["PPLS", "at", "your", "service"];
  let wordIndex = 0;

  loaderText.textContent = words[0];
  progress.style.width = "25%";

  const wordInterval = setInterval(() => {
    wordIndex++;

    if (wordIndex < words.length) {
      loaderText.textContent = words[wordIndex];
      gsap.to(progress, {
        width: ((wordIndex + 1) / words.length) * 100 + "%",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      clearInterval(wordInterval);

      gsap.to("#loader", {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.6,
        onComplete: () => {
          loader.classList.add("hide");
          loader.style.pointerEvents = "none";
        },
      });
    }
  }, 800);
}

/* =====================================================
   FORCE LOADER OFF ON MOBILE
===================================================== */
if (isMobile && loader) {
  loader.classList.add("hide");
  loader.style.display = "none";
  loader.style.pointerEvents = "none";
}

/* =====================================================
   SCROLL-ANIMATED GIFS
===================================================== */
gsap.to(".scroll-gif", {
  opacity: 1,
  y: isMobile ? 0 : -50,
  scale: isMobile ? 1 : 1.1,
  scrollTrigger: {
    trigger: ".hero",
    start: "top 80%",
    scrub: !isMobile,
  },
});

gsap.to(".capabilities-gif-top", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".split",
    start: "top 85%",
    scrub: !isMobile,
  },
});

gsap.to(".philosophy-gif", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".philosophy",
    start: "top 85%",
    scrub: !isMobile,
  },
});

gsap.to(".cta-gif", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".cta",
    start: "top 85%",
    scrub: !isMobile,
  },
});

/* =====================================================
   REST OF ANIMATIONS (SAFE ON MOBILE)
===================================================== */
gsap.utils.toArray(".list-line").forEach((line) => {
  gsap.from(line, {
    scaleX: 0,
    duration: 1,
    scrollTrigger: {
      trigger: line,
      start: "top 90%",
    },
  });
});

gsap.utils.toArray(".split-items .item").forEach((item) => {
  gsap.from(item, {
    y: isMobile ? 0 : 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
    },
  });
});

gsap.utils.toArray(".step-card").forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    y: isMobile ? 0 : 50,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    },
  });
});

/* =====================================================
   MAGNETIC BUTTON (DESKTOP ONLY)
===================================================== */
const magnetBtn = document.querySelector(".btn-magnetic");

if (!isMobile && magnetBtn) {
  magnetBtn.addEventListener("mousemove", (e) => {
    const rect = magnetBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(magnetBtn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
  });

  magnetBtn.addEventListener("mouseleave", () => {
    gsap.to(magnetBtn, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  });
}
