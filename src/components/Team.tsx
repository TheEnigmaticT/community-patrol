"use client";

import { useEffect, useRef } from "react";

const TEAM = [
  {
    name: "Doug",
    role: "CEO & Founder",
    bio: "Founded Trolleybus Development. Two decades building companies that fix broken systems. Saw Toronto's security gap firsthand and decided to close it.",
    size: "large" as const,
  },
  {
    name: "Tom",
    role: "Head of Operations",
    bio: "Ex-Toronto Police Service, Homicide Division. 25+ years investigating what happens when prevention fails. Now focused on making sure it doesn't.",
    size: "medium" as const,
  },
  {
    name: "Dave",
    role: "Director of Training",
    bio: "Retired TPS Staff Sergeant. Built training programs for hundreds of officers. Knows exactly what good patrol looks like.",
    size: "medium" as const,
  },
];

export default function Team() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            observer.unobserve(el);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="team"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="mb-16">
        <p
          className="font-[family-name:var(--font-secondary)] italic text-near-black/50"
          style={{ fontSize: "1.125rem" }}
        >
          Who&apos;s behind this
        </p>
        <h2
          className="mt-2 font-[family-name:var(--font-primary)] font-bold text-near-black"
          style={{ fontSize: "2rem", lineHeight: 1.15 }}
        >
          People who know this problem cold.
        </h2>
      </div>

      {/* Asymmetric grid: first member takes more space */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {TEAM.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => { refs.current[i] = el; }}
            className={`reveal reveal-delay-${i + 1} ${
              i === 0
                ? "md:col-span-7"
                : i === 1
                ? "md:col-span-5 md:mt-16"
                : "md:col-span-5 md:col-start-4"
            }`}
          >
            {/* Gold accent bar */}
            <div
              className="bg-gold mb-4"
              style={{
                width: member.size === "large" ? "80px" : "48px",
                height: "4px",
              }}
            />

            <h3
              className="font-[family-name:var(--font-secondary)] font-bold text-near-black"
              style={{
                fontSize: member.size === "large" ? "2rem" : "1.5rem",
              }}
            >
              {member.name}
            </h3>
            <p
              className="font-[family-name:var(--font-display)] uppercase text-gold-dark tracking-wider mt-1"
              style={{ fontSize: "0.75rem" }}
            >
              {member.role}
            </p>
            <p
              className="mt-4 font-[family-name:var(--font-primary)] text-near-black/70 max-w-md"
              style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
            >
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
