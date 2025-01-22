"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimateWords } from "./AnimateWords"

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0); // State untuk parallax
  const [isAnimating, setIsAnimating] = useState(true); // State untuk memeriksa apakah animasi selesai
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Fungsi untuk mengupdate posisi gambar berdasarkan scroll
  const handleScroll = () => {
    if (!isAnimating) {
      setOffsetY(window.scrollY); // Update posisi scroll
    }
  };

  // Jalankan animasi GSAP saat komponen dimount
  useEffect(() => {
    // Disable scroll selama animasi
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false); // Set animasi selesai
        document.body.style.overflow = "auto"; // Enable scroll setelah animasi selesai
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
      <Image
        ref={imageRef}
        src={"/images/hero.png"}
        layout="fill"
        alt="Robby"
        priority
        style={{
          transform: `translateY(${offsetY * 0.5}px)`, // Efek parallax
        }}
        className="absolute left-0 top-0 md:top-[50px] object-cover sm:object-contain opacity-0"
      />

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
