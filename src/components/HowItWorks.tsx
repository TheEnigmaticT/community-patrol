"use client";

import { useEffect, useRef } from "react";

const STOPS = [
  {
    number: "01",
    title: "Sign up for your neighborhood",
    description:
      "Pick your area. We group nearby homes into patrol zones so coverage is tight and consistent.",
  },
  {
    number: "02",
    title: "Officers patrol your streets",
    description:
      "Trained, uniformed officers walk and drive your blocks on a regular schedule. Visible presence, not hidden cameras.",
  },
  {
    number: "03",
    title: "Get alerts and updates",
    description:
      "Know what's happening on your street. Incident reports, patrol logs, and direct communication with your team.",
  },
  {
    number: "04",
    title: "Your community stays safe",
    description:
      "Crime drops when patrols are visible. Your neighbors feel it. Your property values reflect it.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    if (!section || !container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    function handleScroll() {
      const rect = section!.getBoundingClientRect();
      const sectionHeight = section!.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far through the section we've scrolled
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (sectionHeight - windowHeight))
      );

      // Translate the container horizontally
      const maxScroll = container!.scrollWidth - container!.clientWidth;
      container!.style.transform = `translateX(-${scrollProgress * maxScroll}px)`;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-24 py-32"
      style={{ minHeight: "200vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="mb-12">
          <p
            className="font-[family-name:var(--font-secondary)] italic text-near-black/50"
            style={{ fontSize: "1.125rem" }}
          >
            How it works
          </p>
          <h2
            className="mt-2 font-[family-name:var(--font-primary)] font-bold text-near-black"
            style={{ fontSize: "2rem", lineHeight: 1.15 }}
          >
            Four steps. No red tape.
          </h2>
        </div>

        <div
          ref={scrollContainerRef}
          className="horizontal-scroll-container"
          style={{ willChange: "transform" }}
        >
          {STOPS.map((stop) => (
            <div
              key={stop.number}
              className="w-[85vw] md:w-[50vw] lg:w-[35vw] flex-shrink-0 pr-8 md:pr-16"
            >
              <span
                className="font-[family-name:var(--font-display)] text-gold-dark/30 leading-none block"
                style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
              >
                {stop.number}
              </span>
              <h3
                className="mt-2 font-[family-name:var(--font-primary)] font-bold text-near-black"
                style={{ fontSize: "1.5rem", lineHeight: 1.2 }}
              >
                {stop.title}
              </h3>
              <p
                className="mt-3 font-[family-name:var(--font-primary)] text-near-black/60 max-w-sm"
                style={{ fontSize: "1.05rem", lineHeight: 1.5 }}
              >
                {stop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
