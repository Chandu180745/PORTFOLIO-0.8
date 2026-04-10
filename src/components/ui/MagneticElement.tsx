import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticElementProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

const MagneticElement: React.FC<MagneticElementProps> = ({ 
  children, 
  range = 40,
  strength = 1 
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use GSAP's quickTo for high-performance updates
    const xTo = gsap.quickTo(container, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(container, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = container.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance to check if within range
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  // Clone element to carefully append ref and handle ref forwarding
  return React.cloneElement(children, {
    ref: (node: any) => {
      // Handle cases where the child already has a ref attached
      const originalRef = (children as any).ref;
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (originalRef) {
        originalRef.current = node;
      }
      containerRef.current = node;
    },
  });
};

export default MagneticElement;
