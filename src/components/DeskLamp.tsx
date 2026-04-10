interface DeskLampProps {
  lampOn: boolean;
  onToggle: () => void;
}

/** Ultra-realistic articulated desk lamp easter egg */
const DeskLamp = ({ lampOn, onToggle }: DeskLampProps) => {
  return (
    <div
      className="absolute bottom-[4%] right-[4%] sm:right-[6%] md:right-[10%] z-20 cursor-pointer select-none group"
      onClick={onToggle}
      title="Click the lamp!"
    >
      {/* Light cone — warm triangular beam */}
      <div
        className="absolute pointer-events-none transition-all duration-[1200ms]"
        style={{
          opacity: lampOn ? 1 : 0,
          bottom: "90px",
          left: "50%",
          transform: "translateX(-45%)",
          width: "0",
          height: "0",
          borderLeft: "100px solid transparent",
          borderRight: "100px solid transparent",
          borderBottom: "200px solid hsla(42, 90%, 65%, 0.06)",
          filter: "blur(16px)",
        }}
      />
      {/* Secondary inner cone */}
      <div
        className="absolute pointer-events-none transition-all duration-[1200ms]"
        style={{
          opacity: lampOn ? 0.8 : 0,
          bottom: "90px",
          left: "50%",
          transform: "translateX(-45%)",
          width: "0",
          height: "0",
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "160px solid hsla(42, 95%, 70%, 0.08)",
          filter: "blur(10px)",
        }}
      />
      {/* Floor glow */}
      <div
        className="absolute pointer-events-none transition-all duration-[1200ms] rounded-full"
        style={{
          opacity: lampOn ? 0.7 : 0,
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "280px",
          height: "50px",
          background: "radial-gradient(ellipse, hsla(42, 90%, 65%, 0.3), transparent 70%)",
        }}
      />

      {/* Lamp SVG — ultra-realistic articulated desk lamp */}
      <svg
        width="80"
        height="140"
        viewBox="0 0 80 140"
        fill="none"
        className="transition-transform duration-300 group-hover:scale-105 drop-shadow-2xl w-16 h-24 sm:w-20 sm:h-[140px]"
      >
        {/* === BASE — heavy weighted disc === */}
        <ellipse cx="40" cy="134" rx="28" ry="5.5"
          fill="url(#lampBase1)" stroke="hsl(220, 8%, 18%)" strokeWidth="0.5"
        />
        <ellipse cx="40" cy="133" rx="25" ry="4.5" fill="url(#lampBase2)" />
        {/* Base rim highlight */}
        <ellipse cx="40" cy="131.5" rx="22" ry="2" fill="hsla(0, 0%, 100%, 0.04)" />
        {/* Anti-slip pads */}
        <circle cx="22" cy="135" r="1.5" fill="hsl(220, 5%, 12%)" />
        <circle cx="58" cy="135" r="1.5" fill="hsl(220, 5%, 12%)" />

        {/* === LOWER ARM — from base to elbow === */}
        <rect x="38" y="72" width="4" height="62" rx="2" fill="url(#lowerArm)" />
        {/* Arm highlight */}
        <rect x="39" y="72" width="1" height="62" rx="0.5" fill="hsla(0, 0%, 100%, 0.06)" />

        {/* === ELBOW JOINT — mechanical pivot === */}
        <circle cx="40" cy="72" r="5.5" fill="url(#elbowJoint)" stroke="hsl(220, 8%, 20%)" strokeWidth="0.8" />
        <circle cx="40" cy="72" r="3" fill="hsl(220, 8%, 30%)" />
        <circle cx="40" cy="72" r="1.5" fill="hsl(220, 8%, 38%)" />
        {/* Bolt detail */}
        <circle cx="40" cy="72" r="0.8" fill="hsl(220, 5%, 50%)" />

        {/* === UPPER ARM — angled toward shade === */}
        <line x1="40" y1="72" x2="36" y2="40" stroke="url(#upperArm)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Arm highlight */}
        <line x1="39.5" y1="72" x2="35.5" y2="40" stroke="hsla(0, 0%, 100%, 0.05)" strokeWidth="0.8" />

        {/* === HEAD JOINT === */}
        <circle cx="36" cy="40" r="4" fill="url(#headJoint)" stroke="hsl(220, 8%, 22%)" strokeWidth="0.6" />
        <circle cx="36" cy="40" r="2" fill="hsl(220, 8%, 35%)" />

        {/* === LAMP SHADE — conical reflector === */}
        <path d="M18 44 L54 44 L48 22 L24 22 Z" fill="url(#shadeOuter)" stroke="hsl(220, 8%, 18%)" strokeWidth="0.8" />
        {/* Shade inner surface — reflective */}
        <path d="M20 43 L52 43 L47 24 L25 24 Z" fill="url(#shadeInner)" />
        {/* Shade rim — chrome edge */}
        <path d="M18 44 L54 44" stroke="hsl(220, 8%, 45%)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Shade rivet dots */}
        <circle cx="22" cy="43.5" r="0.6" fill="hsl(220, 8%, 50%)" />
        <circle cx="50" cy="43.5" r="0.6" fill="hsl(220, 8%, 50%)" />
        {/* Ventilation slots */}
        <rect x="30" y="24" width="4" height="1" rx="0.5" fill="hsl(220, 8%, 22%)" opacity="0.5" />
        <rect x="36" y="24" width="4" height="1" rx="0.5" fill="hsl(220, 8%, 22%)" opacity="0.5" />

        {/* === BULB === */}
        <ellipse cx="36" cy="42" rx="7" ry="4"
          className={`transition-all duration-700 ${lampOn ? "fill-[hsla(42,95%,72%,0.95)]" : "fill-[hsla(220,10%,35%,0.3)]"}`}
        />
        {/* Bulb filament */}
        {!lampOn && (
          <path d="M33 42 Q 36 39 39 42" stroke="hsl(220, 8%, 45%)" strokeWidth="0.4" fill="none" />
        )}
        {/* Bulb glow layers when on */}
        {lampOn && (
          <>
            <ellipse cx="36" cy="42" rx="12" ry="7" fill="hsla(42, 90%, 65%, 0.25)" className="animate-pulse" />
            <ellipse cx="36" cy="42" rx="18" ry="10" fill="hsla(42, 90%, 65%, 0.1)" />
            <ellipse cx="36" cy="42" rx="25" ry="14" fill="hsla(42, 90%, 65%, 0.04)" />
          </>
        )}

        {/* === POWER CORD — from base trailing off === */}
        <path d="M48 134 Q 58 138, 68 136 Q 74 134, 78 136" stroke="hsl(220, 8%, 25%)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* === SWITCH on cord === */}
        <rect x="60" y="134" width="6" height="3" rx="1.5" fill="hsl(220, 8%, 30%)" stroke="hsl(220, 8%, 22%)" strokeWidth="0.4" />

        <defs>
          <linearGradient id="lampBase1" x1="12" y1="130" x2="68" y2="138">
            <stop offset="0%" stopColor="hsl(220, 8%, 22%)" />
            <stop offset="50%" stopColor="hsl(220, 8%, 30%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 20%)" />
          </linearGradient>
          <linearGradient id="lampBase2" x1="15" y1="130" x2="65" y2="136">
            <stop offset="0%" stopColor="hsl(220, 8%, 28%)" />
            <stop offset="40%" stopColor="hsl(220, 8%, 38%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 24%)" />
          </linearGradient>
          <linearGradient id="lowerArm" x1="38" y1="72" x2="42" y2="134">
            <stop offset="0%" stopColor="hsl(220, 8%, 42%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 28%)" />
          </linearGradient>
          <linearGradient id="upperArm" x1="40" y1="72" x2="36" y2="40">
            <stop offset="0%" stopColor="hsl(220, 8%, 40%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 32%)" />
          </linearGradient>
          <radialGradient id="elbowJoint">
            <stop offset="0%" stopColor="hsl(220, 8%, 45%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 25%)" />
          </radialGradient>
          <radialGradient id="headJoint">
            <stop offset="0%" stopColor="hsl(220, 8%, 42%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 25%)" />
          </radialGradient>
          <linearGradient id="shadeOuter" x1="18" y1="22" x2="54" y2="44">
            <stop offset="0%" stopColor="hsl(220, 10%, 25%)" />
            <stop offset="100%" stopColor="hsl(220, 10%, 18%)" />
          </linearGradient>
          <linearGradient id="shadeInner" x1="20" y1="24" x2="52" y2="43">
            <stop offset="0%" stopColor="hsl(220, 8%, 35%)" />
            <stop offset="100%" stopColor="hsl(220, 8%, 28%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DeskLamp;
