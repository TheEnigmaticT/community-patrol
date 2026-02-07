"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

export default function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      neighborhood: form.get("neighborhood") as string,
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong. Try again.");
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div ref={sectionRef} className="reveal max-w-2xl">
        <h2
          className="font-[family-name:var(--font-display)] uppercase tracking-tight text-near-black"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95 }}
        >
          We&apos;re starting
          <br />
          in one neighborhood.
        </h2>
        <p
          className="mt-6 font-[family-name:var(--font-primary)] text-near-black/70"
          style={{ fontSize: "1.25rem", lineHeight: 1.5 }}
        >
          Want yours to be first? Join the waitlist and we&apos;ll reach out
          when we&apos;re ready for your area.
        </p>

        {status === "success" ? (
          <div className="mt-10 p-6 border-2 border-near-black/20">
            <p
              className="font-[family-name:var(--font-primary)] font-semibold text-near-black"
              style={{ fontSize: "1.25rem" }}
            >
              You&apos;re on the list.
            </p>
            <p
              className="mt-2 font-[family-name:var(--font-primary)] text-near-black/60"
              style={{ fontSize: "1rem" }}
            >
              We&apos;ll be in touch when patrols begin in your area.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 max-w-lg"
          >
            <div>
              <label
                htmlFor="name"
                className="block font-[family-name:var(--font-primary)] font-semibold text-near-black mb-2"
                style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}
              >
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-near-black/30 font-[family-name:var(--font-primary)] text-near-black placeholder:text-near-black/30 focus:border-near-black focus:outline-none transition-colors"
                style={{ fontSize: "1rem" }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-[family-name:var(--font-primary)] font-semibold text-near-black mb-2"
                style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-transparent border-2 border-near-black/30 font-[family-name:var(--font-primary)] text-near-black placeholder:text-near-black/30 focus:border-near-black focus:outline-none transition-colors"
                style={{ fontSize: "1rem" }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="neighborhood"
                className="block font-[family-name:var(--font-primary)] font-semibold text-near-black mb-2"
                style={{ fontSize: "0.875rem", letterSpacing: "0.05em" }}
              >
                NEIGHBORHOOD <span className="font-normal text-near-black/40">(optional)</span>
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                className="w-full px-4 py-3 bg-transparent border-2 border-near-black/30 font-[family-name:var(--font-primary)] text-near-black placeholder:text-near-black/30 focus:border-near-black focus:outline-none transition-colors"
                style={{ fontSize: "1rem" }}
                placeholder="e.g. The Annex, Leslieville, High Park"
              />
            </div>

            {status === "error" && (
              <p className="text-red-700 font-[family-name:var(--font-primary)]" style={{ fontSize: "0.9rem" }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-4 bg-near-black text-gold-cream font-[family-name:var(--font-primary)] font-semibold tracking-wide text-lg hover:bg-near-black/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Join the Waitlist"}
            </button>

            <p
              className="font-[family-name:var(--font-primary)] text-near-black/40 mt-4"
              style={{ fontSize: "0.8rem" }}
            >
              We won&apos;t share your info. No spam, just patrol updates for your area.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
