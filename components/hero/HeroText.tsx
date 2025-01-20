"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroText() {
  const [offsetY, setOffsetY] = useState(0);

  // Fungsi untuk mengupdate posisi gambar berdasarkan scroll
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

  return (
    <div
      className="relative flex items-center justify-center h-[110vh] w-full overflow-hidden"
      style={{ backgroundColor: "#999d9e" }} // Warna latar belakang
    >
      {/* Gambar Hero */}
      <Image
        src={"/images/hero.png"}
        layout="fill" // Gambar memenuhi area container
        objectFit="contain" // Memastikan gambar tidak terpotong
        priority
        alt="Robby"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`, // Efek parallax (scroll lebih lambat)
        }}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
