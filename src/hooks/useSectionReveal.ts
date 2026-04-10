import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced section reveal animation — scrub-linked parallax reveal
 * with play/reverse on scroll entry/exit for responsive feel.
 */
export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const content = el.querySelector(".section-content");
    if (!content) return;

    // Initial state
    gsap.set(content, { y: 60, opacity: 0, scale: 0.97, filter: "blur(6px)" });

    // Smooth entry/exit — plays forward on enter, reverses on leave
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "top 30%",
        toggleActions: "play reverse play reverse",
        // Optional scrub for butter-smooth feel:
        // scrub: 0.8,
      },
    });

    tl.to(content, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
