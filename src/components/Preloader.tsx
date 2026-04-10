import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/** Lottie-based preloader with dynamic color adjustment */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Wait for fade out
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1; // More organic progress
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background transition-opacity duration-700"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden">
        {/*
          Removing the duplicate "LOADING" text by cropping the bottom 30% of the Lottie container.
          This ensures only the hand animation is visible.
        */}
        <div className="w-full h-full" style={{ clipPath: 'inset(0 0 25% 0)' }}>
          <DotLottieReact
            src="https://lottie.host/2acb52b4-56bb-48aa-9923-c11016df656b/Aavmmm7EtF.lottie"
            loop
            autoplay
            className="w-full h-full opacity-90 transition-all duration-300 transform scale-110"
            style={{ 
              /* 
                Applying a complex filter to turn the hand animation to the brand's blue color.
                This filter converts the original color to a vibrant blue (H: 217).
              */
              filter: 'invert(44%) sepia(93%) saturate(1471%) hue-rotate(192deg) brightness(96%) contrast(101%)'
            }}
          />
        </div>
      </div>

      {/* Thin, pill-shaped elastic progress bar */}
      <div className="mt-8 w-48 sm:w-64">
        <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{ 
              width: `${progress}%`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}
          />
        </div>
        
        {/* Progress Text below the bar */}
        <div className="flex justify-between mt-3 text-[10px] font-body text-muted-foreground/60 tracking-widest uppercase font-medium">
          <span>Processing Assets</span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
