"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0);
  const textRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const freelanceRef = React.useRef(null);

  // Fungsi untuk mengupdate posisi gambar dan teks berdasarkan scroll
  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    // Menambahkan event listener untuk scroll
    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // GSAP Timeline untuk animasi teks dan gambar
    const tl = gsap.timeline();

    // Animasi Gambar
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 }, // Awal (transparan dan kecil)
      {
        opacity: 1,
        scale: 1, // Akhir (penuh dan ukuran asli)
        duration: 2,
        ease: "bounce.out",
      }
    );

    // Animasi Teks Freelance
    tl.fromTo(
      freelanceRef.current,
      { opacity: 0, y: 50 }, // Awal (opacity 0 dan naik 50px)
      {
        opacity: 1,
        y: 0, // Akhir (opacity 1 dan posisi asli)
        duration: 1,
        ease: "bounce.out",
      },
      "-=1.0" // Overlap dengan animasi gambar
    );

    // Animasi Teks Front-end Developer
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 }, // Awal (opacity 0 dan turun 50px)
      {
        opacity: 1,
        y: 0, // Akhir (opacity 1 dan posisi asli)
        duration: 1,
        ease: "bounce.out",
      },
      "-=0.5" // Overlap dengan animasi gambar
    );
  }, []);

  return (
    <div
      className="relative flex h-[103vh] w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#999d9e" }} // Warna latar belakang
    >
      {/* Gambar Hero */}
      <Image
        ref={imageRef} // Tambahkan referensi untuk GSAP
        src={"/images/hero.png"}
        layout="fill" // Gambar memenuhi area container
        alt="Robby"
        priority
        style={{
          transform: `translateY(${offsetY * 0.5}px)`, // Efek parallax gambar (lebih lambat)
        }}
        className="absolute left-0 top-0 opacity-0 object-cover sm:object-contain" // Responsif
      />

      {/* Teks Freelance */}
      <h1
        ref={freelanceRef}
        className="absolute left-[3%] bottom-[26%] text-2xl sm:left-[30%] sm:bottom-[53%] sm:text-4xl opacity-0" // Responsif untuk mobile
      >
        Freelance
      </h1>

      {/* Teks Front-end Developer */}
      <h1
        ref={textRef}
        className="absolute left-[3%] bottom-[22%] text-2xl sm:left-[56%] sm:bottom-[63%] sm:text-4xl opacity-0" // Responsif untuk mobile
      >
        Front-end Developer
      </h1>
    </div>
  );
}
