"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 overflow-hidden bg-near-black text-off-white"
    >
      {/* Gold accent glow */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl relative z-10">
        {/* Oversized typography as structure */}
        <h1
          className="font-[family-name:var(--font-display)] uppercase tracking-tighter leading-[0.85]"
          style={{ 
            fontSize: "clamp(4rem, 14vw, 10rem)",
            letterSpacing: "-0.04em"
          }}
        >
          COMMUNITY
          <br />
          PATROL
        </h1>

        {/* Gold accent line */}
        <div className="w-32 h-1 bg-gold my-8" />

        {/* Direct, non-corporate copy */}
        <p
          className="max-w-xl font-[family-name:var(--font-secondary)] italic"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.5 }}
        >
          Real-time security for neighborhoods that actually works.
          Your officers have phones. Use them.
        </p>

        <a
          href="#waitlist"
          className="inline-block mt-10 px-10 py-4 bg-gold text-near-black font-[family-name:var(--font-primary)] font-bold tracking-wide text-lg hover:bg-off-white transition-all duration-300"
        >
          Start Your Patrol
        </a>
      </div>

      {/* Shield watermark - subtle */}
      <div className="absolute bottom-24 right-8 md:right-24 opacity-5">
        <Image
          src="/shield.svg"
          alt=""
          width={300}
          height={360}
          aria-hidden="true"
          priority
        />
      </div>
    </section>
  );
}
