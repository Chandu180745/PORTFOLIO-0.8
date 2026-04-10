import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  const elements = useMemo(() => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span
          key={i}
          className="split-word"
          style={{ display: 'inline-block', willChange: 'transform, opacity', marginRight: '0.25em' }}
        >
          {word}
        </span>
      ));
    } else {
      return [
        <span
          key={0}
          className="split-line"
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {text}
        </span>
      ];
    }
  }, [text, splitType]);

  useEffect(() => {
    if (!containerRef.current || !fontsLoaded || animatedRef.current) return;

    const el = containerRef.current;
    const scroller = document.getElementById('main-scroll') || undefined;
    const targets = el.querySelectorAll(
      splitType === 'chars' ? '.split-char' : splitType === 'words' ? '.split-word' : '.split-line'
    );

    if (!targets.length) return;

    gsap.set(targets, { ...from });

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        scroller,
        start,
        once: true,
        fastScrollEnd: true,
      },
      onComplete: () => {
        animatedRef.current = true;
        onLetterAnimationComplete?.();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [fontsLoaded, text, delay, duration, ease, splitType, from, to, threshold, rootMargin]);

  const Tag = (tag || 'p') as React.ElementType;

  return (
    <Tag
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word' as const,
      }}
    >
      {elements}
    </Tag>
  );
};

export default SplitText;
