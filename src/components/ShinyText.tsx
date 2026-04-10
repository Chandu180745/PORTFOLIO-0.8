import React from 'react';

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
  animationTimingFunction?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 100,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
  animationTimingFunction = "linear",
}) => {
  return (
    <span
      className={`inline-block ${className} ${disabled ? '' : 'animate-shine'} ${pauseOnHover ? 'hover:![animation-play-state:paused]' : ''}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} calc(50% - ${spread/2}%), ${shineColor} 50%, ${color} calc(50% + ${spread/2}%))`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        animationDirection: yoyo ? "alternate" : (direction === "left" ? "reverse" : "normal"),
        animationIterationCount: 'infinite',
        animationTimingFunction: animationTimingFunction,
      }}
    >
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        .animate-shine {
          animation-name: shine;
        }
      `}</style>
      {text}
    </span>
  );
};

export default ShinyText;
