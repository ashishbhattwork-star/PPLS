/* =====================================================
   FEATURE CARD – HOVER & LIGHT EFFECT
   ===================================================== */
const cards = document.querySelectorAll(".feature-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // Update 3D Tilt
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    
    // Update Light Sweep Position
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
});

/* =====================================================
   SCROLL REVEAL (STAGGERED ANIMATION)
   ===================================================== */
const scrollElements = document.querySelectorAll("[data-scroll]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get index of current element to stagger the animation
        const index = Array.from(scrollElements).indexOf(entry.target);
        
        // Add class with a delay based on the card's position
        setTimeout(() => {
          entry.target.classList.add("in-view");
        }, (index % 3) * 150); 
        
        observer.unobserve(entry.target); // Stops observing once animated
      }
    });
  },
  { threshold: 0.15 }
);

scrollElements.forEach(el => observer.observe(el));