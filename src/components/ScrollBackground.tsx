"use client";

import { useEffect } from "react";

const ZONES = [
  { id: "hero", className: "bg-white-zone" },
  { id: "problem", className: "bg-dark-zone" },
  { id: "what-we-do", className: "bg-dark-zone" },
  { id: "how-it-works", className: "bg-white-zone" },
  { id: "team", className: "bg-white-zone" },
  { id: "waitlist", className: "bg-gold-zone" },
];

export default function ScrollBackground() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const observers: IntersectionObserver[] = [];

    ZONES.forEach(({ id, className }) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            document.body.classList.remove(
              "bg-white-zone",
              "bg-dark-zone",
              "bg-gold-zone"
            );
            document.body.classList.add(className);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
