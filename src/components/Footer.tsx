import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 py-12 bg-near-black text-off-white/50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/shield.svg"
            alt="Community Patrol"
            width={32}
            height={38}
          />
          <span
            className="font-[family-name:var(--font-display)] uppercase text-off-white tracking-wider"
            style={{ fontSize: "0.75rem" }}
          >
            Community Patrol
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 font-[family-name:var(--font-primary)]" style={{ fontSize: "0.85rem" }}>
          <a
            href="mailto:hello@communitypatrol.ca"
            className="hover:text-gold transition-colors"
          >
            hello@communitypatrol.ca
          </a>
          <span className="hidden md:inline text-off-white/20">|</span>
          <span>Toronto, Ontario</span>
        </div>
      </div>

      <div
        className="mt-8 pt-6 border-t border-off-white/10 font-[family-name:var(--font-primary)]"
        style={{ fontSize: "0.75rem" }}
      >
        &copy; {new Date().getFullYear()} Community Patrol Inc. All rights reserved.
      </div>
    </footer>
  );
}
