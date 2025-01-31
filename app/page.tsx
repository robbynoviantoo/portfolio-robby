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

  return (
    <div className="relative w-full min-h-screen font-neueMontreal">
      <div>
        <Nav />
        <main className="flex flex-col items-center">
          <Hero />
          {/* <About /> */}
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}