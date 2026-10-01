gsap.registerPlugin(ScrollTrigger);

const heroTitle = document.querySelector("#heroTitle");
const stats = document.querySelectorAll(".stat");
const car = document.querySelector("#car");
const scrollIndicator = document.querySelector(".scroll-indicator");

/* INITIAL STATES */

gsap.set(heroTitle, {
  opacity: 0,
  y: 50,
  letterSpacing: "18px",
});

gsap.set(stats, {
  opacity: 0,
  y: 45,
});

/* PAGE LOAD
   ONLY HEADLINE INTRO */

const intro = gsap.timeline({
  defaults: {
    ease: "power3.out",
  },
});

intro.to(heroTitle, {
  opacity: 1,
  y: 0,
  letterSpacing: "8px",
  duration: 1.2,
});

/* MAIN SCROLL TIMELINE */

const animation = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",

    start: "top top",

    end: "bottom top",

    scrub: 0.6,

    invalidateOnRefresh: true,
  },
});

/* CAR
   LEFT → RIGHT */

animation.fromTo(
  car,

  {
    x: "-90vw",
  },

  {
    x: "90vw",

    ease: "none",

    duration: 0.65,
  },

  0,
);

/* TITLE
   APPEAR WITH CAR */

animation.fromTo(
  heroTitle,

  {
    opacity: 0,
    y: 50,
  },

  {
    opacity: 1,
    y: 0,
    letterSpacing: "8px",
    duration: 0.22,
    ease: "power3.out",
  },

  0.18,
);

/* PERCENTAGES
   APPEAR WITH SCROLL */

animation.fromTo(
  stats,

  {
    opacity: 0,
    y: 45,
  },

  {
    opacity: 1,
    y: 0,
    duration: 0.25,
    stagger: 0.08,
    ease: "power2.out",
  },

  0.38,
);

/* KEEP CONTENT VISIBLE */

animation.to(
  {},

  {
    duration: 0.35,
  },
);

/* PERCENTAGES
   DISAPPEAR NEAR END */

animation.to(
  stats,

  {
    opacity: 0,
    y: -35,
    duration: 0.15,
    stagger: 0.05,
    ease: "power2.in",
  },

  0.85,
);

/* TITLE
   DISAPPEAR NEAR END */

animation.to(
  heroTitle,

  {
    opacity: 0,
    y: -35,
    duration: 0.15,
    ease: "power2.in",
  },

  0.9,
);

/* SCROLL INDICATOR */

gsap.to(
  scrollIndicator,

  {
    opacity: 0,

    scrollTrigger: {
      trigger: ".hero",

      start: "top top",

      end: "15% top",

      scrub: true,
    },
  },
);
