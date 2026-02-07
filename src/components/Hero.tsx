"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 overflow-hidden"
    >
      {/* Shield logo, asymmetric placement */}
      <div className="absolute top-12 right-8 md:right-16 lg:right-24 opacity-15 shield-float pointer-events-none">
        <Image
          src="/shield.svg"
          alt=""
          width={180}
          height={216}
          aria-hidden="true"
          priority
        />
      </div>

      <div className="max-w-4xl">
        <h1
          className="font-[family-name:var(--font-display)] uppercase tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          Your neighborhood
          <br />
          shouldn&apos;t scare you
        </h1>

        <p
          className="mt-8 max-w-lg font-[family-name:var(--font-primary)]"
          style={{ fontSize: "1.25rem", lineHeight: 1.5 }}
        >
          Community Patrol puts trained officers on your streets before trouble
          starts. Toronto&apos;s first proactive security service, built for
          neighborhoods that refuse to wait.
        </p>

        <a
          href="#waitlist"
          className="inline-block mt-10 px-8 py-4 bg-near-black text-off-white font-[family-name:var(--font-primary)] font-semibold tracking-wide text-lg hover:bg-gold hover:text-near-black transition-colors duration-300"
        >
          Join the Waitlist
        </a>
      </div>

      {/* Small shield in bottom-left for asymmetry */}
      <div className="absolute bottom-16 left-8 md:left-16 opacity-8">
        <Image
          src="/shield.svg"
          alt=""
          width={48}
          height={58}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
