import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false, light = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm tracking-widest',
    lg: 'text-lg tracking-[0.2em]'
  };

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Signature Spiral Ribbon SVG */}
      <div className={`relative ${iconSizes[size]} text-[#6b4cc6] flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="44" stroke="#e9e0f6" strokeWidth="6" />
          <path
            d="M 50 12 C 72 12, 88 28, 88 50 C 88 72, 70 88, 50 88 C 25 88, 16 65, 30 42 C 40 25, 68 25, 78 40 C 88 55, 75 75, 50 75"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif font-bold ${light ? 'text-white' : 'text-[#1c1c2b]'} uppercase leading-tight ${textSizes[size]}`}>
          Core Balance
        </span>
        <span className={`text-[10px] font-sans uppercase tracking-[0.25em] ${light ? 'text-white/60' : 'text-[#6b7280]'} font-medium leading-tight`}>
          Studio
        </span>
        {showTagline && (
          <span className="text-[11px] font-sans text-[#6b7280] font-normal italic mt-0.5">
            Movement with intention
          </span>
        )}
      </div>
    </div>
  );
};
