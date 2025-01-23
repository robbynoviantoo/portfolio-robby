"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimateWords } from "./AnimateWords";

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0); // State untuk parallax
  const [isAnimating, setIsAnimating] = useState(true); // State untuk memeriksa apakah animasi selesai
  const [isLoaded, setIsLoaded] = useState(false); // State untuk memeriksa apakah gambar selesai dimuat
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Fungsi untuk mengupdate posisi gambar berdasarkan scroll
  const handleScroll = () => {
    setOffsetY(window.scrollY); // Update posisi scroll
  };

  // Tambahkan event listener untuk scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Jalankan animasi GSAP saat komponen dimount
  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false); // Set animasi selesai
        },
      });

      // Animasi gambar (blur ke tajam)
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
        }
      );
    }
  }, [isLoaded]); // Animasi dijalankan hanya setelah gambar dimuat

  return (
    <div
      className="relative flex h-[103vh] w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#999d9e" }} // Warna latar belakang
    >
      {/* Gambar Hero */}
      <div
        className="absolute left-0 top-0 w-full h-full"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`, // Efek parallax
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          ref={imageRef}
          src={"/images/hero.png"}
          layout="fill"
          alt="Robby"
          priority
          className="object-cover lg:object-contain opacity-0" // Default: opacity 0
          onLoadingComplete={() => setIsLoaded(true)} // Set isLoaded ke true setelah gambar selesai dimuat
        />
      </div>

      {/* Teks Freelance */}
      <div className="absolute left-[3%] bottom-[31%] lg:left-[20%] lg:bottom-[53%] xl:left-[30%] xl:bottom-[53%]">
        <AnimateWords title="Freelance" style="text-2xl xl:text-4xl font-bold" />
      </div>

      {/* Teks Front-end Developer */}
      <div className="absolute left-[3%] bottom-[24%] lg:left-[60%] lg:bottom-[63%] xl:left-[56%] xl:bottom-[63%]">
        <AnimateWords
          title="Front-End Developer"
          style="text-2xl xl:text-4xl font-bold"
        />
      </div>
    </div>
  );
}
