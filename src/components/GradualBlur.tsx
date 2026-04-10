// Component added by Ansh - github.com/ansh-dhanani
// Ported to TypeScript, self-contained (no mathjs dependency)

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';
type CurveType = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
type TargetType = 'parent' | 'page';
type AnimatedType = boolean | 'scroll' | 'fade';

interface GradualBlurProps {
  position?: Position;
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: AnimatedType;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: CurveType;
  responsive?: boolean;
  target?: TargetType;
  className?: string;
  style?: React.CSSProperties;
  preset?: string;
  hoverIntensity?: number | null;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  width?: string;
  onAnimationComplete?: () => void;
}

const DEFAULT_CONFIG: Required<
  Pick<
    GradualBlurProps,
    | 'position' | 'strength' | 'height' | 'divCount' | 'exponential'
    | 'zIndex' | 'animated' | 'duration' | 'easing' | 'opacity'
    | 'curve' | 'responsive' | 'target' | 'className' | 'style'
  >
> = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: true,
  zIndex: 40,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'bezier',
  responsive: false,
  target: 'page',
  className: '',
  style: {},
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 },
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p) =>
    p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
};

const getGradientDirection = (position: Position): string => {
  const directions: Record<Position, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  };
  return directions[position] || 'to bottom';
};

const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Hooks ------------------------------------------------------------------

const useResponsiveDimension = (
  responsive: boolean,
  dimension: string | undefined,
  mobileDim?: string,
  tabletDim?: string,
  desktopDim?: string
): string | undefined => {
  const [value, setValue] = useState(dimension);

  const update = useCallback(
    debounce(() => {
      if (!responsive) return;
      const w = window.innerWidth;
      let next = dimension;
      if (w <= 480 && mobileDim) next = mobileDim;
      else if (w <= 768 && tabletDim) next = tabletDim;
      else if (w <= 1024 && desktopDim) next = desktopDim;
      setValue(next);
    }, 100),
    [responsive, dimension, mobileDim, tabletDim, desktopDim]
  );

  useEffect(() => {
    if (!responsive) return;
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [responsive, update]);

  return responsive ? value : dimension;
};

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  shouldObserve = false
): boolean => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

// Component ---------------------------------------------------------------

const GradualBlur: React.FC<GradualBlurProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig =
      props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return { ...DEFAULT_CONFIG, ...presetConfig, ...props } as Required<
      Pick<
        GradualBlurProps,
        | 'position' | 'strength' | 'height' | 'divCount' | 'exponential'
        | 'zIndex' | 'animated' | 'duration' | 'easing' | 'opacity'
        | 'curve' | 'responsive' | 'target' | 'className' | 'style'
      >
    > &
      GradualBlurProps;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(
    config.responsive,
    config.height,
    config.mobileHeight,
    config.tabletHeight,
    config.desktopHeight
  );

  const responsiveWidth = useResponsiveDimension(
    config.responsive,
    config.width,
    config.mobileWidth,
    config.tabletWidth,
    config.desktopWidth
  );

  const isVisible = useIntersectionObserver(
    containerRef,
    config.animated === 'scroll'
  );

  // Build blur layers
  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity
        ? config.strength * config.hoverIntensity
        : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue =
          0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      const divStyle: React.CSSProperties = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined,
      };

      divs.push(<div key={i} style={divStyle} />);
    }
    return divs;
  }, [config, isHovered]);

  // Container positioning
  const containerStyle = useMemo((): React.CSSProperties => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const base: React.CSSProperties = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated
        ? `opacity ${config.duration} ${config.easing}`
        : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style,
    };

    if (isVertical) {
      base.height = responsiveHeight;
      base.width = responsiveWidth || '100%';
      base[config.position] = 0;
      base.left = 0;
      base.right = 0;
    } else if (isHorizontal) {
      base.width = responsiveWidth || responsiveHeight;
      base.height = '100%';
      base[config.position] = 0;
      base.top = 0;
      base.bottom = 0;
    }

    return base;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const handleMouseEnter = useCallback(() => {
    if (config.hoverIntensity) setIsHovered(true);
  }, [config.hoverIntensity]);

  const handleMouseLeave = useCallback(() => {
    if (config.hoverIntensity) setIsHovered(false);
  }, [config.hoverIntensity]);

  useEffect(() => {
    if (isVisible && config.animated === 'scroll' && config.onAnimationComplete) {
      const timer = setTimeout(
        () => config.onAnimationComplete!(),
        parseFloat(config.duration) * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [isVisible, config.animated, config.duration, config.onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${
        config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'
      } ${config.className}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="gradual-blur-inner"
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {blurDivs}
      </div>
    </div>
  );
};

export default React.memo(GradualBlur);
