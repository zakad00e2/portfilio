import { useEffect, useRef } from "react";
import gsap from "gsap";

export const MouseFollower = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      return;
    }

    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });

    const setX = gsap.quickTo(glow, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const setY = gsap.quickTo(glow, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    let isActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) {
        isActive = true;
        gsap.set(glow, { x: e.clientX, y: e.clientY, opacity: 1 });
      }

      setX(e.clientX);
      setY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[1000px] w-[1000px] opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.15), transparent 75%)",
        }}
      />
    </div>
  );
};
