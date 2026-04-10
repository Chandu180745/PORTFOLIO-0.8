import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

export interface PillNavProps {
  logo?: string;
  logoText?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  onNavigate?: (href: string) => void;
}

const CIRCLE_SIZE = 44;
const GAP = 6;
const PADDING = 6;

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoText,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#000',
  pillColor = '#fff',
  hoveredPillTextColor = '#000',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  onNavigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (!w || !h) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});

    // Init mobile menu hidden
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { visibility: 'hidden', opacity: 0 });
    }

    // Load animation
    if (initialLoadAnimation && navRef.current) {
      gsap.set(navRef.current, { scaleX: 0, opacity: 0 });
      gsap.to(navRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease });
    }

    return () => window.removeEventListener('resize', layout);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease });
      } else {
        gsap.to(menu, {
          opacity: 0, y: 8, duration: 0.2, ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' })
        });
      }
    }

    onMobileMenuClick?.();
  };

  return (
    <div className="fixed top-[14px] left-[14px] z-[1000] w-auto">
      {/* ── Desktop pill ── */}
      <nav
        ref={navRef}
        aria-label="Primary"
        className={`hidden md:flex items-center box-border ${className}`}
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: 'none',
          borderRadius: '9999px',
          padding: `${PADDING}px`,
          gap: `${GAP}px`,
          boxShadow: '0 4px 28px rgba(0,0,0,0.3)',
        }}
      >
        {items.map((item, i) => {
          const isActive = activeHref === item.href;

          return (
            <a
              key={item.href}
              role="menuitem"
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              title={item.label}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative overflow-hidden inline-flex items-center justify-center rounded-full no-underline cursor-pointer flex-shrink-0"
              style={{
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
                background: pillColor,
                boxShadow: isActive
                  ? '0 0 0 2.5px rgba(255,255,255,0.6), 0 0 12px rgba(255,255,255,0.2)'
                  : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* GSAP animated fill bubble */}
              <span
                className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{ background: baseColor, willChange: 'transform' }}
                aria-hidden="true"
                ref={el => { circleRefs.current[i] = el; }}
              />

              {/* Icon stack */}
              <span className="label-stack relative z-[2] flex items-center justify-center w-full h-full">
                <span
                  className="pill-label flex items-center justify-center"
                  style={{
                    willChange: 'transform',
                    color: isActive ? baseColor : (pillTextColor || (pillColor === '#ffffff' ? '#111' : '#fff'))
                  }}
                >
                  {item.icon || item.label}
                </span>
                <span
                  className="pill-label-hover absolute inset-0 flex items-center justify-center"
                  style={{ color: hoveredPillTextColor, willChange: 'transform, opacity' }}
                  aria-hidden="true"
                >
                  {item.icon || item.label}
                </span>
              </span>

              {/* Active dot */}
              {isActive && (
                <span
                  className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full z-[4]"
                  style={{ background: baseColor }}
                  aria-hidden="true"
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* ── Mobile hamburger ── */}
      <div className="flex md:hidden items-center"
        style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: 'none',
          borderRadius: '9999px',
          padding: `${PADDING}px`,
          boxShadow: '0 4px 28px rgba(0,0,0,0.3)',
        }}
      >
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="rounded-full border-0 inline-flex flex-col items-center justify-center gap-1 cursor-pointer p-0 flex-shrink-0"
          style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE, background: pillColor }}
        >
          <span className="hamburger-line w-4 h-0.5 rounded origin-center" style={{ background: baseColor }} />
          <span className="hamburger-line w-4 h-0.5 rounded origin-center" style={{ background: baseColor }} />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3.5em] left-0 right-0 rounded-[24px] z-[998] origin-top overflow-hidden"
        style={{
          background: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)'
        }}
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {items.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-3 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10 text-white/80 hover:text-white no-underline"
                onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, item.href); }}
              >
                <span className="w-5 h-5 flex items-center justify-center opacity-70 shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
