gsap.registerPlugin(ScrollTrigger);

/* CARD ANIMATION */
gsap.utils.toArray(".ai-card").forEach((card) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
  });
});

/* IMAGE ANIMATION */
gsap.utils.toArray(".ai-image").forEach((img) => {
  gsap.from(img, {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: img,
      start: "top 85%",
    },
  });
});

/* FLOAT EFFECT */
gsap.to(".ai-image", {
  y: 14,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
