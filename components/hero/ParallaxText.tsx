"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  motion,
} from "framer-motion";
import { useRef } from "react";
import { wrap } from "@motionone/utils";

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
  direction: number;
  className?: string;
}

export default function ParallaxText({
  children,
  baseVelocity = 200,
  direction,
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
  });

  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-30, 30]
  );
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 500);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      initial={{ x: direction, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          delay: 2,
          duration: 1,
          easings: "ease",
        },
      }}
      className="m-0 flex flex-nowrap overflow-hidden whitespace-nowrap leading-[1.1] tracking-normal ${className}"
    >
      <motion.div
        style={{ x }}
        className="flex flex-nowrap whitespace-nowrap text-[10rem] font-bold  md:text-[12rem] lg:text-[14rem]" // Warna diubah ke biru
      >
        <motion.span
          style={{ skew: skewVelocityFactor }}
          className="mr-10 block"
        >
          {children}{" "}
        </motion.span>
        <motion.span
          style={{ skew: skewVelocityFactor }}
          className="mr-10 block"
        >
          {children}{" "}
        </motion.span>
        <motion.span
          style={{ skew: skewVelocityFactor }}
          className="mr-10 block"
        >
          {children}{" "}
        </motion.span>
        <motion.span
          style={{ skew: skewVelocityFactor }}
          className="mr-10 block"
        >
          {children}{" "}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
