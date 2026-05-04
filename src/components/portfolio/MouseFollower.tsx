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
    const setX = gsap.quickTo(glow, "--mouse-x", {
      duration: reduceMotionQuery.matches ? 0 : 0.45,
      ease: "power3.out",
    });
    const setY = gsap.quickTo(glow, "--mouse-y", {
      duration: reduceMotionQuery.matches ? 0 : 0.45,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      setX(`${e.clientX}px`);
      setY(`${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          "radial-gradient(600px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(29, 78, 216, 0.15), transparent 80%)",
      }}
    />
  );
};
