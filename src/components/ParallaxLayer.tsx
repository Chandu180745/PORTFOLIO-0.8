import { useParallax } from "@/hooks/useParallax";
import { ReactNode } from "react";

interface ParallaxLayerProps {
  speed?: number;
  className?: string;
  children?: ReactNode;
}

/** Decorative parallax layer that moves at a different scroll speed */
const ParallaxLayer = ({ speed = 0.3, className = "", children }: ParallaxLayerProps) => {
  const ref = useParallax(speed);

  return (
    <div ref={ref} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxLayer;
