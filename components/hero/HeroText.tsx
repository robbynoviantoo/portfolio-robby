"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0);
  const textRef = React.useRef(null);
  const imageRef = React.useRef(null);

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

    // Animasi Teks
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
        objectFit="contain" // Memastikan gambar tidak terpotong
        priority
        alt="Robby"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`, // Efek parallax gambar (lebih lambat)
        }}
        className="absolute left-0 top-0"
      />

      {/* Teks Parallax */}
      <h1
        ref={textRef}
        style={{
          transform: `translateY(-${offsetY * 0.8}px)`, // Gerakan ke atas (minus)
        }}
        className="absolute top-[33%] left-[28%] text-4xl font-normal text-white"
      >
        Freelance
      </h1>
      <h1
        ref={textRef}
        style={{
          transform: `translateY(-${offsetY * 0.4}px)`, // Gerakan ke atas (minus)
        }}
        className="absolute right-[17%] text-4xl font-normal text-white"
      >
        Front-end Developer
      </h1>
    </div>
  );
}
