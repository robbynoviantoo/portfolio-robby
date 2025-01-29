import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect";
import gsap from "gsap";

interface PreloadProps {
  endedLoading: boolean;
}

export default function Preload({ endedLoading }: PreloadProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const progress = progressRef.current;
    const container = containerRef.current;

    if (progress && container) {
      // GSAP animation to update the progress percentage
      gsap.to(progress, {
        innerHTML: 100,
        duration: 2,
        ease: "power1.out",
        onUpdate: () => {
          progress.innerHTML = `${Math.floor(parseInt(progress.innerHTML))}%`;
        },
      });

      // GSAP animation to move and transform the container to an oval shape
      gsap.to(container, {
        y: "-100vh", // Move the container up
        scaleY: 0.3, // Reduce height to make it oval-shaped
        scaleX: 1.5, // Optional: Widen it horizontally for a more prominent oval effect
        duration: 2, // Smooth transition duration
        delay: 2.5, // Delay until progress reaches 100%
        ease: "power3.inOut",
      });
    }
  }, [endedLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50"
    >
      <div className="text-white text-3xl font-bold" ref={progressRef}>
        0%
      </div>
    </div>
  );
}
