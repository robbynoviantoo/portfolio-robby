"use client";

import { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null as LocomotiveScroll | null,
});

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: any;
}

export const SmoothScrollProvider = ({
  children,
  options,
}: SmoothScrollProviderProps) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    let scrollInstance: LocomotiveScroll | null = null;

    const initializeScroll = async () => {
      const container = document.querySelector("[data-scroll-container]");
      if (!container) {
        console.error(
          "[SmoothScrollProvider]: No element found with the attribute [data-scroll-container]."
        );
        return;
      }

      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        scrollInstance = new LocomotiveScroll({
          el: container,
          ...options,
        });

        setScroll(scrollInstance);
      } catch (error) {
        console.error(`[SmoothScrollProvider]: ${error}`);
      }
    };

    initializeScroll();

    return () => {
      scrollInstance?.destroy();
      scrollInstance = null;
    };
  }, [options]);

  return (
    <SmoothScrollContext.Provider
      value={{
        scroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
