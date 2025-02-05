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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute w-screen z-[100] hidden lg:block lg:p-5 max-w-7xl"
      >
        <div className="flex pb-[15vh] mx-auto justify-end order-2">
          <div className="flex flex-col">
            <h4 className="lg:text-[45px] xl:text-[54px] font-medium">Freelance</h4>
            <h4 className="lg:text-[45px] xl:text-[54px] font-medium">Front-End Dev</h4>
          </div>
        </div>
      </motion.div>

      {/* Mobile Version */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-28 w-screen z-[100] p-4 md:hidden max-w-7xl"
      >
        <div className="flex mx-auto justify-start">
          <div className="flex flex-col">
            <h4 className="text-[30px] font-medium">Freelance</h4>
            <h4 className="text-[30px] font-medium">Front-End Dev</h4>
          </div>
        </div>
      </motion.div>
      {/* Container Relatif untuk Posisi Absolut */}
      <div className="relative h-[110vh] w-full">
        {/* ParallaxText di atas Gambar */}
        <div className="absolute w-full top-[80px] right-[140px] z-30">
          <HeroGraphic />
          </div>
        <div className="absolute bottom-[110px] z-20 w-full">
          <ParallaxText direction={500} baseVelocity={-1} className="scrollbar-hide">
            Robby Novianto <span>—</span>
          </ParallaxText>
        </div>

        {/* HeroText dengan Gambar */}
        <HeroText />
      </div>
<div>
      <motion.div
  initial={{ opacity: 0, x: -500 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: 1 }}
  className="absolute left-0 top-[40%] hidden h-[121px] w-[310px] flex-col items-start justify-center lg:flex px-5" // Pertahankan px-5 di sini
>
  {/* Elemen latar belakang dengan clipPath */}
  <div
    className="absolute inset-0 rounded-br-full rounded-tr-full bg-zinc-800 dark:bg-zinc-100"
    style={{
      clipPath:
        "path('M 0 0 H 350 V 121 H 0 V 0 Z M 250 60 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0')",
    }}
  ></div>

  {/* Konten tetap memiliki padding */}
  <div className="relative z-10">
    <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
      Locate
    </p>
    <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
      in Kudus
    </p>
    <p className="text-md font-medium text-zinc-200 dark:text-zinc-600">
      Central Java, Indonesia
    </p>
  </div>

  {/* DigitalGlobe */}
  <DigitalGlobe className="absolute right-3 top-[10%] z-10" />
</motion.div>
  </div>


    </motion.section>
  );
}
