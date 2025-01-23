"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimateWords } from "./AnimateWords";

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0); // State untuk parallax
  const [isAnimating, setIsAnimating] = useState(true); // State untuk memeriksa apakah animasi selesai
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
  }, []); // Animasi hanya dijalankan sekali saat komponen dimount

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
          className="object-cover sm:object-contain"
        />
      </div>

      {/* Teks Freelance */}
      <div className="absolute left-[3%] bottom-[30%] sm:left-[30%] sm:bottom-[53%]">
        <AnimateWords title="Freelance" style="text-2xl sm:text-4xl font-bold" />
      </div>

      {/* Teks Front-end Developer */}
      <div className="absolute left-[3%] bottom-[22%] sm:left-[56%] sm:bottom-[63%]">
        <AnimateWords
          title="Front-End Developer"
          style="text-2xl sm:text-4xl font-bold"
        />
      </div>
    </div>
  );
}
