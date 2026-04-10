import React, { useRef, useState, useMemo } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/(\d+)\s+(\d+)%?\s+(\d+)%?/);
  if (!match) return { h: 0, s: 0, l: 0 };
  return { h: parseInt(match[1], 10), s: parseInt(match[2], 10), l: parseInt(match[3], 10) };
}

const GRADIENT_KEYS = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
  '--gradient-eight',
  '--gradient-nine'
];

const buildGradientVars = (colors: string[]) => {
  return colors.reduce((acc, color, i) => {
    if (i < GRADIENT_KEYS.length) {
      acc[GRADIENT_KEYS[i]] = color;
    }
    return acc;
  }, {} as Record<string, string>);
};

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  glowColor = "0 0 100",
  backgroundColor = "#000",
  borderRadius = 16,
  glowRadius = 100,
  glowIntensity = 1,
  edgeSensitivity = 1,
  coneSpread = 45,
  animated = true,
  colors = ["#38bdf8", "#c084fc", "#f472b6"],
  fillOpacity = 0.05
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const glowVars = useMemo(() => {
    const { h, s, l } = parseHSL(glowColor);
    return {
      '--glow-x': `${position.x}px`,
      '--glow-y': `${position.y}px`,
      '--glow-h': h,
      '--glow-s': `${s}%`,
      '--glow-l': `${l}%`,
      '--glow-intensity': glowIntensity,
      '--is-hovered': isHovered ? 1 : 0,
      '--is-animated': animated ? 1 : 0
    };
  }, [position, glowColor, glowIntensity, isHovered, animated]);

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
