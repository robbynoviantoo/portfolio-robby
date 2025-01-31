import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const MouseFollowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMove, setMouseMove] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity
      velocityRef.current = {
        x: e.clientX - prevPositionRef.current.x,
        y: e.clientY - prevPositionRef.current.y
      };

      // Update previous position
      prevPositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };

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
    if (mouseMove && followerRef.current) {
      // Calculate the movement angle
      const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x);
      
      // Calculate deformation based on velocity
      const speed = Math.sqrt(
        velocityRef.current.x ** 2 + velocityRef.current.y ** 2
      );
      const stretch = Math.min(speed * 0.05, 0.5); // Limit maximum stretch

      // Move the follower
      gsap.to(followerRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.5,
        ease: "power2.out",
      });

      // Apply stretching effect
      gsap.to(followerRef.current, {
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.5,
        rotation: (angle * 180) / Math.PI,
        duration: 0.3,
        onComplete: () => {
          // Return to original shape
          gsap.to(followerRef.current, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    }
  }, [mousePosition, mouseMove]);

  return (
    <div
      ref={followerRef}
      className="mouse-follower fixed top-0 left-0 w-10 h-10 rounded-full mix-blend-difference bg-white pointer-events-none"
      style={{
        zIndex: 11000,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default MouseFollowEffect;