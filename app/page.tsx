"use client";

import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Nav from "@/components/navbar/Nav";
import Preload from "@/components/preload/Preload";
import Projects from "@/components/projects/Projects";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState<boolean>(true);
  const [endedLoading, setEndedLoading] = useState<boolean>(false);

  // Refs untuk animasi GSAP
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Animasi GSAP untuk Nav dan Main
  useEffect(() => {
    if (endedLoading) {
      const tl = gsap.timeline();
      tl.fromTo(
        navRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          mainRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5" // Overlap animasi main dengan nav
        );
    }
  }, [endedLoading]);

    return (
      <>
        <div ref={navRef}>
          <Nav />
        </div>
        <Hero />
        <About />
        <Projects />
        <Contact />
        {/* <main
          ref={mainRef}
          data-scroll-container
          className="flex flex-col items-center scrollbar-hide"
        >
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main> */}
      </>
    );
  }
