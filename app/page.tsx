"use client";

import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import Nav from "@/components/navbar/Nav";
import Preload from "@/components/preload/Preload";
import Projects from "@/components/projects/Projects";
import MouseFollowEffect from "@/components/MouseFollowEffect";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState<boolean>(true);
  const [endedLoading, setEndedLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setLoadingPreloader(false), 4000);
    setTimeout(() => setEndedLoading(true), 3000);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-neueMontreal">
      {/* Preloader sebagai overlay */}
      <AnimatePresence mode="wait">
        {loadingPreloader && (
          <div className="absolute inset-0 z-[2000]">
            <Preload endedLoading={endedLoading} />
          </div>
        )}
      </AnimatePresence>

      {/* Mouse Follow Effect */}
      <MouseFollowEffect />

      {/* Halaman utama tetap di tempatnya */}
      <div>
        <Nav />
        <main className="flex flex-col items-center">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}