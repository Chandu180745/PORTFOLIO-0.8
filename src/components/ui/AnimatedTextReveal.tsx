import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextRevealProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}

const AnimatedTextReveal: React.FC<AnimatedTextRevealProps> = ({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  // Split words first, then characters to maintain word spacing properly
  const words = text.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".reveal-char");

    gsap.fromTo(
      chars,
      {
        y: "100%",
        opacity: 0,
        rotateX: -45,
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.03,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Triggers when the top of the element hits 85% of viewport
          toggleActions: "play none none reverse", // play on enter, reverse on leave back
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, delay]);

  return (
    <Tag ref={containerRef as any} className={`flex flex-wrap ${className}`} style={{ perspective: "1000px" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden pb-1" style={{ marginRight: '0.3em' }}>
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="reveal-char inline-block will-change-transform"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedTextReveal;
