import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for parallax depth layers.
 * Moves elements at different speeds relative to scroll.
 * Works with scroll-snap containers.
 */
export function useParallax(speed = 0.3, direction: "y" | "x" = "y") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = document.getElementById("main-scroll") || undefined;

    const tween = gsap.to(el, {
      [direction]: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement || el,
        scroller,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction]);

  return ref;
}
