import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    const update = (time: number) => instance.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();

    instance.on("scroll", syncScrollTrigger);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    ScrollTrigger.refresh();

    return () => {
      instance.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
};
