import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  animation: "fadeUp" | "fadeIn" | "slideLeft" | "scaleIn" = "fadeUp",
  delay = 0
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = document.getElementById("main-scroll") || undefined;

    const configs: Record<string, Record<string, number | string>> = {
      fadeUp: { y: 60, opacity: 0, scale: 0.97, filter: "blur(4px)" },
      fadeIn: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
      slideLeft: { x: -80, opacity: 0, filter: "blur(4px)" },
      scaleIn: { scale: 0.85, opacity: 0, filter: "blur(6px)" },
    };

    const from = configs[animation];

    // Set initial state
    gsap.set(el, from);

    const to: Record<string, number | string> = { opacity: 1, filter: "blur(0px)" };
    if ("y" in from) to.y = 0;
    if ("x" in from) to.x = 0;
    if ("scale" in from) to.scale = 1;

    gsap.to(el, {
      ...to,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay]);

  return ref;
}
