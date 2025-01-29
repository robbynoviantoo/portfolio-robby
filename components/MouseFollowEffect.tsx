import { useState, useEffect } from "react";
import gsap from "gsap";

const MouseFollowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMove, setMouseMove] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setMouseMove(true);
    };

    const handleMouseLeave = () => {
      setMouseMove(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (mouseMove) {
      gsap.to(".mouse-follower", {
        x: mousePosition.x - 20, // Penyesuaian untuk menghindari elemen terlalu dekat dengan kursor
        y: mousePosition.y - 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePosition, mouseMove]);

  return (
    <div
      className="mouse-follower fixed top-0 left-0 w-20 h-20 rounded-full mix-blend-difference bg-white pointer-events-none"
      style={{
        zIndex: 11000,
        transform: "translate(-50%, -50%)", // Agar posisi tepat di tengah kursor
      }}
    />
  );
};

export default MouseFollowEffect;
