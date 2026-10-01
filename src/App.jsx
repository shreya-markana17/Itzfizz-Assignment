import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "../assets/car.svg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const carRef = useRef(null);
  const shadowRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const car = carRef.current;
      const shadow = shadowRef.current;
      const stats = Array.from(statsRef.current.children);

      const carStart = () => -(car.offsetWidth + 40);
      const carEnd = () => window.innerWidth + 40;

      gsap.set(title, {
        opacity: 0,
        y: 35,
        letterSpacing: "18px",
      });

      gsap.set(stats, {
        opacity: 0,
        y: 30,
      });

      gsap.set(car, {
        x: carStart(),
      });

      gsap.set(shadow, {
        x: carStart(),
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      });

      // Heading + first stat
      timeline.to(
        title,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "8px",
          duration: 0.12,
          ease: "power2.out",
        },
        0
      );

      timeline.to(
        stats[0],
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        0
      );

      // Car
      timeline.to(
        car,
        {
          x: carEnd,
          duration: 0.75,
          ease: "none",
        },
        0
      );

      // Car shadow
      timeline.to(
        shadow,
        {
          x: carEnd,
          duration: 0.75,
          ease: "none",
        },
        0
      );

      // Remaining stats
      timeline.to(
        stats[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.18
      );

      timeline.to(
        stats[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.36
      );

      timeline.to(
        stats[3],
        {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.54
      );
    }, heroRef);

    const indicatorAnimation = gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "8% top",
        scrub: true,
      },
    });

    return () => {
      ctx.revert();
      indicatorAnimation.kill();
    };
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className="hero relative w-full"
      >
        <div className="hero-sticky">
          {/* Heading */}
          <div className="hero-heading text-center">
            <p className="small-heading">
              DIGITAL EXPERIENCE
            </p>

            <h1 ref={titleRef}>
              W E L C O M E
              <span>I T Z F I Z Z</span>
            </h1>
          </div>

          {/* Visual */}
          <div className="visual-area">
            <div
              ref={shadowRef}
              className="car-shadow"
            ></div>

            <div className="road">
              <div className="road-line"></div>
            </div>

            <img
              ref={carRef}
            src={carImage}
              alt="Car moving on road"
              className="car select-none"
            />
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="stats"
          >
            <div className="stat">
              <h2>58%</h2>
              <p>Increase in pick up point use</p>
            </div>

            <div className="stat">
              <h2>23%</h2>
              <p>Decrease in customer phone calls</p>
            </div>

            <div className="stat">
              <h2>27%</h2>
              <p>Increase in customer engagement</p>
            </div>

            <div className="stat">
              <h2>40%</h2>
              <p>Decrease in customer support calls</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="scroll-indicator text-center"
          >
            <span>SCROLL TO EXPLORE</span>

            <div className="scroll-arrow">
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* NEXT SECTION */}
      <section className="next-section">
        <div className="next-content text-center">
          <p>ITZFIZZ DIGITAL</p>

          <h2>
            Creating Digital Experiences
          </h2>
        </div>
      </section>
    </main>
  );
}

export default App;