import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatWeDo from "@/components/WhatWeDo";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";

export default function Home() {
  return (
    <>
      <ScrollBackground />
      <main>
        <Hero />
        <Problem />
        <WhatWeDo />
        <HowItWorks />
        <Team />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
