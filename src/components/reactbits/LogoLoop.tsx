import React from 'react';

export type LogoItem = {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
};

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // duration of animation in seconds
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean; // included to match user snippet
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 40,
  direction = 'left',
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = '#000000', // unused as we use mask-image instead
  ariaLabel = 'Logos',
  useCustomRender = false,
}) => {
  return (
    <div
      className="relative flex overflow-hidden w-full group py-8"
      aria-label={ariaLabel}
      style={{
        maskImage: fadeOut
          ? `linear-gradient(to right, transparent, black 15%, black 85%, transparent)`
          : 'none',
        WebkitMaskImage: fadeOut
          ? `linear-gradient(to right, transparent, black 15%, black 85%, transparent)`
          : 'none',
      }}
    >
      <style>{`
        @keyframes scroll-${direction} {
          from { transform: translateX(${direction === 'left' ? '0' : '-100%'}); }
          to { transform: translateX(${direction === 'left' ? '-100%' : '0'}); }
        }
        .animate-scroll {
          animation: scroll-${direction} ${speed}s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: ${hoverSpeed === 0 ? 'paused' : 'running'};
        }
      `}</style>

      {/* Duplicate array contents to ensure seamless looping */}
      {[0, 1].map((set) => (
        <div
          key={set}
          className="flex whitespace-nowrap animate-scroll items-center"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden={set === 1 ? 'true' : 'false'}
        >
          {logos.map((logo, index) => {
            const content = (
              <div
                className={`flex flex-col items-center justify-center transition-transform duration-300 ${scaleOnHover ? 'hover:scale-110' : ''}`}
              >
                {logo.node ? (
                  <div className="flex items-center justify-center drop-shadow-md" style={{ fontSize: `${logoHeight}px` }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || logo.title || 'Logo'}
                    style={{ height: `${logoHeight}px`, width: 'auto', objectFit: 'contain' }}
                  />
                ) : null}
                
                {logo.title && (
                  <span className="mt-4 font-display text-sm sm:text-base font-semibold text-foreground/90 tracking-wide uppercase">
                    {logo.title}
                  </span>
                )}
              </div>
            );

            return logo.href ? (
              <a key={index} href={logo.href} target="_blank" rel="noopener noreferrer" className="no-underline">
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LogoLoop;
