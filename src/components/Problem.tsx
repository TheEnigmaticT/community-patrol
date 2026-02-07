"use client";

import { useEffect, useRef } from "react";

function StatBlock({
  number,
  label,
  context,
  delay,
}: {
  number: string;
  label: string;
  context: string;
  delay: number;
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay}`}
    >
      <div className="flex items-end gap-4 md:gap-6">
        <span
          className="font-[family-name:var(--font-display)] text-gold leading-none"
          style={{ fontSize: "clamp(5rem, 15vw, 12rem)" }}
        >
          {number}
        </span>
        <div className="pb-2 md:pb-4">
          <span
            className="block font-[family-name:var(--font-display)] uppercase text-gold-pale tracking-wider"
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
          >
            {label}
          </span>
          <span
            className="block font-[family-name:var(--font-secondary)] italic text-off-white/70 mt-1"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)" }}
          >
            {context}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
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
      id="problem"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div ref={headingRef} className="reveal max-w-3xl mb-16 md:mb-24">
        <h2
          className="font-[family-name:var(--font-primary)] font-bold tracking-tight"
          style={{ fontSize: "2rem", lineHeight: 1.15 }}
        >
          Toronto&apos;s emergency response is broken.
        </h2>
        <p
          className="mt-4 font-[family-name:var(--font-secondary)] text-off-white/60"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
        >
          When you call 911 in Toronto, here&apos;s how long you&apos;re
          actually waiting.
        </p>
      </div>

      <div className="space-y-12 md:space-y-20">
        <StatBlock
          number="17"
          label="minutes"
          context="Average Priority 1 response. That's a break-in already happening."
          delay={1}
        />
        <StatBlock
          number="54"
          label="minutes"
          context="Average Priority 2. Suspicious person on your street? Good luck."
          delay={2}
        />
      </div>

      <div className="mt-16 md:mt-24 max-w-xl">
        <p
          className="font-[family-name:var(--font-primary)] text-off-white/80"
          style={{ fontSize: "1.25rem", lineHeight: 1.5 }}
        >
          Your neighborhood shouldn&apos;t depend on being a top priority to
          feel safe. We think you deserve better than a 54-minute wait.
        </p>
      </div>
    </section>
  );
}
