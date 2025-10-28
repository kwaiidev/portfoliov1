'use client';

interface CSSWavesProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CSSWaves({ children, className = "" }: CSSWavesProps) {
  return (
    <div className={`relative min-h-screen bg-[#778da9] overflow-hidden ${className}`}>
      {/* Animated waves */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave 1 - Back layer */}
        <svg
          className="absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '500%', left: '-100%' }}
        >
          <path
            fill="#415a77"
            fillOpacity="0.7"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,138.7C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 60 0; 0 0"
              dur="20s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Wave 2 - Middle layer */}
        <svg
          className="absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '500%', left: '-100%' }}
        >
          <path
            fill="#1b263b"
            fillOpacity="0.8"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,160C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; -40 0; 0 0"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Wave 3 - Front layer (touches footer) */}
        <svg
          className="absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '500%', left: '-100%' }}
        >
          <path
            fill="#0d1b2a"
            fillOpacity="0.9"
            d="M0,288L48,277.3C96,267,192,245,288,245.3C384,245,480,267,576,256C672,245,768,203,864,181.3C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 80 0; 0 0"
              dur="25s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
