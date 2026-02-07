"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    word: "DETER",
    description:
      "Visible patrols on your streets. Officers your neighbors recognize. Crime moves to easier targets.",
  },
  {
    word: "DETECT",
    description:
      "Trained eyes catch what cameras miss. Unusual activity gets flagged before it becomes a headline.",
  },
  {
    word: "INTERCEPT",
    description:
      "Our officers are already in your neighborhood. Response times measured in seconds, not city averages.",
  },
  {
    word: "ENGAGE",
    description:
      "Real interaction with residents. You'll know your officers and they'll know your street.",
  },
];

function Step({
  word,
  description,
  index,
}: {
  word: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${index + 1} flex flex-col ${
        isEven ? "md:items-start" : "md:items-end md:text-right"
      }`}
    >
      <span
        className="font-[family-name:var(--font-display)] text-gold uppercase leading-none"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        {word}
      </span>
      <p
        className="mt-3 max-w-md font-[family-name:var(--font-primary)] text-off-white/70"
        style={{ fontSize: "1.125rem", lineHeight: 1.5 }}
      >
        {description}
      </p>
    </div>
  );
}

export default function WhatWeDo() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-we-do"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div ref={headingRef} className="reveal mb-20">
        <p
          className="font-[family-name:var(--font-secondary)] italic text-gold-pale"
          style={{ fontSize: "1.125rem" }}
        >
          What we do
        </p>
        <h2
          className="mt-2 font-[family-name:var(--font-primary)] font-bold"
          style={{ fontSize: "2rem", lineHeight: 1.15 }}
        >
          We patrol. We watch. We respond.
        </h2>
      </div>

      <div className="space-y-16 md:space-y-24">
        {STEPS.map((step, i) => (
          <Step key={step.word} word={step.word} description={step.description} index={i} />
        ))}
      </div>
    </section>
  );
}
