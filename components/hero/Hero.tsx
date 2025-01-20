"use client";

import { motion } from "framer-motion";
import HeroText from "./HeroText";
import ParallaxText from "./ParallaxText";
import HeroGraphic from "./HeroGraphic";
import DigitalGlobe from "../DigitalGlobe";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center"
      initial="initial"
      animate="animate"
    >
      {/* Container Relatif untuk Posisi Absolut */}
      <div className="relative h-[110vh] w-full">
        {/* ParallaxText di atas Gambar */}
        <div className="absolute w-full top-[80px] right-[140px] z-30">
          <HeroGraphic />
          </div>
        <div className="absolute bottom-[110px] z-20 w-full">
          <ParallaxText direction={500} baseVelocity={-1} className="scrollbar-hide">
            Robby Novianto
          </ParallaxText>
        </div>

        {/* HeroText dengan Gambar */}
        <HeroText />
      </div>

      {/* DigitalGlobe */}
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-0 top-[50%] hidden h-[121px] w-[350px] flex-col items-start justify-center rounded-br-full rounded-tr-full bg-zinc-800 px-5 dark:bg-zinc-100 lg:flex"
      >
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">Locate</p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">in Kudus</p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
          Central Java, Indonesia
        </p>
        <DigitalGlobe className="absolute right-3 top-[10%]" />
      </motion.div>
    </motion.section>
  );
}
