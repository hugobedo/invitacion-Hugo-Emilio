import React from 'react';
import { soundManager } from '../utils/soundEffects';

interface FarmCharProps {
  className?: string;
  size?: number;
  animate?: boolean;
  interactive?: boolean;
}

// 🐓 Bartolito Rooster Character
export const BartolitoRooster: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-float-slow' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Gallo Bartolito"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Colorful Tail Feathers */}
        <path d="M 28 58 C 10 46, 12 24, 28 32 C 22 40, 26 48, 34 52 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
        <path d="M 32 62 C 12 58, 10 38, 26 44 C 22 50, 26 56, 35 58 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
        <path d="M 34 65 C 16 68, 16 52, 30 55 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />

        {/* Rooster Legs */}
        <line x1="48" y1="78" x2="46" y2="89" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="78" x2="60" y2="89" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        <path d="M 42 89 L 50 89 M 56 89 L 64 89" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Red Comb (Cresta) */}
        <path d="M 54 22 C 52 12, 62 12, 62 20 C 66 12, 74 16, 70 25 C 76 22, 78 30, 68 32 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />

        {/* Round Plump Body */}
        <ellipse cx="54" cy="60" rx="22" ry="20" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        {/* Head */}
        <circle cx="62" cy="38" r="15" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />

        {/* Colorful Wing */}
        <path d="M 40 54 C 38 66, 52 72, 60 64 C 62 56, 50 50, 40 54 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.8" />
        <path d="M 44 58 C 46 63, 52 65, 56 62" fill="none" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />

        {/* Beak */}
        <polygon points="75,36 86,40 75,44" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
        {/* Red Wattle */}
        <ellipse cx="73" cy="48" rx="3.5" ry="5" fill="#DC2626" />

        {/* Friendly Eyes */}
        <circle cx="65" cy="35" r="3.4" fill="#1E293B" />
        <circle cx="66.2" cy="33.8" r="1.2" fill="#FFFFFF" />
        {/* Rosy Cheek */}
        <ellipse cx="60" cy="42" rx="3.2" ry="2" fill="#FB7185" opacity="0.75" />
      </svg>
    </div>
  );
};

// 🐄 La Vaca Lola Character
export const VacaLolaChar: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-float-reverse' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="La Vaca Lola"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Cute Ears */}
        <ellipse cx="22" cy="40" rx="11" ry="6" fill="#FFFFFF" stroke="#334155" strokeWidth="2" transform="rotate(-20 22 40)" />
        <ellipse cx="22" cy="40" rx="6" ry="3" fill="#FDA4AF" transform="rotate(-20 22 40)" />
        <ellipse cx="78" cy="40" rx="11" ry="6" fill="#1E293B" stroke="#334155" strokeWidth="2" transform="rotate(20 78 40)" />
        <ellipse cx="78" cy="40" rx="6" ry="3" fill="#FDA4AF" transform="rotate(20 78 40)" />

        {/* Little Cream Horns */}
        <path d="M 33 28 Q 28 16 36 18 Q 39 22 39 28 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
        <path d="M 67 28 Q 72 16 64 18 Q 61 22 61 28 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />

        {/* Head Base */}
        <rect x="24" y="24" width="52" height="52" rx="24" fill="#FFFFFF" stroke="#334155" strokeWidth="2.2" />

        {/* Black Cow Spots */}
        <path d="M 52 24 C 68 24, 76 34, 75 48 C 66 50, 56 44, 52 34 Z" fill="#1E293B" />
        <circle cx="32" cy="48" r="6" fill="#1E293B" />

        {/* Pink Snout */}
        <ellipse cx="50" cy="64" rx="22" ry="14" fill="#FECDD3" stroke="#FB7185" strokeWidth="1.8" />
        {/* Nostrils */}
        <ellipse cx="42" cy="61" rx="2.5" ry="3.2" fill="#9F1239" />
        <ellipse cx="58" cy="61" rx="2.5" ry="3.2" fill="#9F1239" />
        {/* Happy Smile */}
        <path d="M 43 69 Q 50 75 57 69" fill="none" stroke="#881337" strokeWidth="2.2" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="39" cy="44" r="3.6" fill="#1E293B" />
        <circle cx="61" cy="44" r="3.6" fill="#1E293B" />
        <circle cx="40" cy="42.8" r="1.3" fill="#FFFFFF" />
        <circle cx="62" cy="42.8" r="1.3" fill="#FFFFFF" />

        {/* Flower Crown Accent */}
        <circle cx="44" cy="24" r="4" fill="#F43F5E" />
        <circle cx="44" cy="24" r="1.6" fill="#FDE047" />
        <circle cx="52" cy="22" r="4.5" fill="#FACC15" />
        <circle cx="52" cy="22" r="1.8" fill="#EA580C" />
        <circle cx="60" cy="24" r="3.8" fill="#38BDF8" />
        <circle cx="60" cy="24" r="1.5" fill="#FFFFFF" />

        {/* Little Golden Bell */}
        <circle cx="50" cy="84" r="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1.6" />
        <circle cx="50" cy="87" r="2" fill="#92400E" />
      </svg>
    </div>
  );
};

// 🐎 Caballo Percherón Character
export const PercheronHorse: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-farm-dance' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Caballo Percherón"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Ears */}
        <polygon points="32,32 28,14 42,24" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <polygon points="68,32 72,14 58,24" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <polygon points="33,28 31,19 39,25" fill="#FDE68A" />
        <polygon points="67,28 69,19 61,25" fill="#FDE68A" />

        {/* Fluffy Golden Mane */}
        <path d="M 38 22 Q 50 10 62 22 Q 56 32 48 28 Q 42 32 38 22 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

        {/* Horse Head */}
        <rect x="27" y="24" width="46" height="54" rx="22" fill="#D97706" stroke="#92400E" strokeWidth="2.2" />

        {/* Cream Blaze on Forehead */}
        <path d="M 46 28 Q 50 26 54 28 L 52 50 Q 50 52 48 50 Z" fill="#FEF3C7" />

        {/* Snout */}
        <ellipse cx="50" cy="66" rx="21" ry="15" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
        <circle cx="43" cy="63" r="2.2" fill="#78350F" />
        <circle cx="57" cy="63" r="2.2" fill="#78350F" />
        <path d="M 44 71 Q 50 76 56 71" fill="none" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="38" cy="46" r="3.5" fill="#1E293B" />
        <circle cx="62" cy="46" r="3.5" fill="#1E293B" />
        <circle cx="39" cy="44.8" r="1.2" fill="#FFFFFF" />
        <circle cx="63" cy="44.8" r="1.2" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="33" cy="54" rx="3.5" ry="2" fill="#FB7185" opacity="0.65" />
        <ellipse cx="67" cy="54" rx="3.5" ry="2" fill="#FB7185" opacity="0.65" />

        {/* Red Bandana */}
        <polygon points="34,78 66,78 50,91" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
        <circle cx="50" cy="83" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

// 🦜 Lorito Pepe Character
export const LoritoPepeChar: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-float-slow' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Lorito Pepe"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Tail Feathers */}
        <path d="M 38 78 L 32 94 L 44 86 Z" fill="#0284C7" />
        <path d="M 46 80 L 44 96 L 54 86 Z" fill="#16A34A" />

        {/* Top Tuft */}
        <path d="M 46 22 Q 48 10 55 16 Q 60 12 60 22" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />

        {/* Green Body */}
        <ellipse cx="50" cy="56" rx="24" ry="29" fill="#22C55E" stroke="#15803D" strokeWidth="2.2" />
        {/* Light Green Belly */}
        <ellipse cx="52" cy="63" rx="15" ry="18" fill="#86EFAC" />

        {/* Colorful Wings */}
        <path d="M 27 50 C 20 62, 28 74, 38 70 C 40 60, 34 52, 27 50 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
        <path d="M 27 58 C 25 65, 31 69, 35 66" fill="none" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 73 50 C 80 62, 72 74, 62 70 C 60 60, 66 52, 73 50 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
        <path d="M 73 58 C 75 65, 69 69, 65 66" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />

        {/* White Eye Rings */}
        <circle cx="42" cy="40" r="6" fill="#FFFFFF" />
        <circle cx="58" cy="40" r="6" fill="#FFFFFF" />
        <circle cx="43" cy="40" r="3" fill="#1E293B" />
        <circle cx="57" cy="40" r="3" fill="#1E293B" />
        <circle cx="44" cy="39" r="1" fill="#FFFFFF" />
        <circle cx="58" cy="39" r="1" fill="#FFFFFF" />

        {/* Curved Parrot Beak */}
        <path d="M 44 46 Q 50 41 56 46 Q 55 56 50 58 Q 45 56 44 46 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.8" />
        <path d="M 46 50 Q 50 53 54 50" fill="none" stroke="#92400E" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// 🐥 Pollito Pío Character
export const PollitoPioChar: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-farm-dance' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Pollito Pío"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Little Feet */}
        <path d="M 42 78 L 40 88 M 36 88 L 44 88" stroke="#EA580C" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 58 78 L 60 88 M 56 88 L 64 88" stroke="#EA580C" strokeWidth="2.8" strokeLinecap="round" />

        {/* Cute Head Tuft */}
        <path d="M 46 25 Q 48 13 53 22 Q 58 15 57 25" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" strokeLinecap="round" />

        {/* Little Wings */}
        <ellipse cx="24" cy="56" rx="8" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" transform="rotate(20 24 56)" />
        <ellipse cx="76" cy="56" rx="8" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" transform="rotate(-20 76 56)" />

        {/* Plump Yellow Body */}
        <circle cx="50" cy="54" r="27" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.2" />

        {/* Big Cute Eyes */}
        <circle cx="40" cy="48" r="3.8" fill="#1E293B" />
        <circle cx="60" cy="48" r="3.8" fill="#1E293B" />
        <circle cx="41.2" cy="46.8" r="1.4" fill="#FFFFFF" />
        <circle cx="61.2" cy="46.8" r="1.4" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="33" cy="55" rx="4" ry="2.4" fill="#FB7185" opacity="0.7" />
        <ellipse cx="67" cy="55" rx="4" ry="2.4" fill="#FB7185" opacity="0.7" />

        {/* Tiny Diamond Beak */}
        <polygon points="50,51 56,56 50,61 44,56" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// 🏡 Granero Rojo de Zenón
export const ZenonBarnChar: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-float-reverse' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Granero de la Granja"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Meadow Base */}
        <ellipse cx="50" cy="86" rx="40" ry="7" fill="#4ADE80" />

        {/* Barn Roof */}
        <polygon points="50,16 18,38 14,52 86,52 82,38" fill="#991B1B" stroke="#7F1D1D" strokeWidth="2.2" />
        <polyline points="15,50 20,38 50,18 80,38 85,50" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Barn Body */}
        <rect x="22" y="48" width="56" height="36" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

        {/* Hayloft Window */}
        <rect x="43" y="34" width="14" height="11" rx="2" fill="#451A03" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M 45 43 Q 50 38 55 43" fill="#FACC15" />

        {/* Barn Double Cross Doors */}
        <rect x="34" y="55" width="32" height="29" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="50" y1="55" x2="50" y2="84" stroke="#FFFFFF" strokeWidth="2.2" />
        <line x1="34" y1="55" x2="50" y2="84" stroke="#FFFFFF" strokeWidth="1.8" />
        <line x1="50" y1="55" x2="34" y2="84" stroke="#FFFFFF" strokeWidth="1.8" />
        <line x1="50" y1="55" x2="66" y2="84" stroke="#FFFFFF" strokeWidth="1.8" />
        <line x1="66" y1="55" x2="50" y2="84" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
    </div>
  );
};

// 🚜 Auto Bochinchero / Tractor de la Granja
export const AutoBochincheroChar: React.FC<FarmCharProps> = ({
  className = '',
  size = 80,
  animate = true,
  interactive = true
}) => {
  const handleClick = () => {
    if (interactive) soundManager.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block select-none ${
        interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : ''
      } ${animate ? 'animate-float-slow' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Tractor de la Granja"
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-md">
        {/* Exhaust Chimney & Puff */}
        <rect x="66" y="28" width="5" height="16" rx="2" fill="#475569" />
        <circle cx="71" cy="22" r="4" fill="#E2E8F0" />
        <circle cx="77" cy="18" r="3" fill="#F1F5F9" />

        {/* Tractor Cabin Roof */}
        <rect x="22" y="28" width="32" height="6" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <rect x="25" y="34" width="26" height="20" fill="#BAE6FD" stroke="#991B1B" strokeWidth="2.5" />

        {/* Tractor Body */}
        <rect x="20" y="50" width="60" height="22" rx="6" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
        {/* Yellow Stripe */}
        <line x1="52" y1="57" x2="77" y2="57" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
        {/* Headlight */}
        <circle cx="80" cy="58" r="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />

        {/* Big Back Wheel */}
        <circle cx="34" cy="72" r="15" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        <circle cx="34" cy="72" r="7" fill="#FACC15" />
        <circle cx="34" cy="72" r="2.5" fill="#92400E" />

        {/* Front Wheel */}
        <circle cx="70" cy="76" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        <circle cx="70" cy="76" r="4.5" fill="#FACC15" />
        <circle cx="70" cy="76" r="1.8" fill="#92400E" />
      </svg>
    </div>
  );
};

// 🎂 Farm Birthday Cake with "1" Candle
export const FarmBirthdayCake: React.FC<{ size?: number; className?: string }> = ({
  size = 95,
  className = ''
}) => {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-lg">
        {/* Rustic Wooden Cake Stand */}
        <ellipse cx="50" cy="88" rx="36" ry="6" fill="#B45309" />
        <rect x="45" y="86" width="10" height="6" fill="#92400E" />
        <ellipse cx="50" cy="92" rx="20" ry="3" fill="#78350F" />

        {/* Bottom Tier (Cow-spot & Pasture Theme) */}
        <rect x="21" y="60" width="58" height="24" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="31" cy="73" r="4" fill="#1E293B" />
        <ellipse cx="48" cy="76" rx="5" ry="3.5" fill="#1E293B" />
        <circle cx="66" cy="72" r="4.5" fill="#1E293B" />

        {/* Meadow Green Frosting Drips */}
        <path
          d="M 21 66 Q 25 72 29 66 Q 33 73 37 66 Q 41 72 45 66 Q 49 73 53 66 Q 57 72 61 66 Q 65 73 69 66 Q 73 72 79 66 L 79 60 L 21 60 Z"
          fill="#22C55E"
        />

        {/* Top Tier (Barn Red & Golden Sunflowers) */}
        <rect x="30" y="42" width="40" height="20" rx="5" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
        <path
          d="M 30 48 Q 34 53 38 48 Q 42 54 46 48 Q 50 53 54 48 Q 58 54 62 48 Q 66 53 70 48 L 70 42 L 30 42 Z"
          fill="#DC2626"
        />

        {/* Mini Sunflowers & Berries on Cake */}
        <circle cx="36" cy="40" r="3.5" fill="#FACC15" />
        <circle cx="36" cy="40" r="1.4" fill="#78350F" />
        <circle cx="64" cy="40" r="3.5" fill="#FACC15" />
        <circle cx="64" cy="40" r="1.4" fill="#78350F" />
        <circle cx="50" cy="54" r="2.2" fill="#F59E0B" />

        {/* Candle #1 */}
        <rect x="47" y="23" width="6" height="16" rx="2" fill="#0284C7" />
        <line x1="47" y1="29" x2="53" y2="27" stroke="#FFFFFF" strokeWidth="1.4" />
        <line x1="47" y1="34" x2="53" y2="32" stroke="#FFFFFF" strokeWidth="1.4" />
        {/* Wick */}
        <line x1="50" y1="23" x2="50" y2="19" stroke="#334155" strokeWidth="1.5" />
        {/* Flame */}
        <path
          d="M 50 9 C 46 13, 46 17, 50 19 C 54 17, 54 13, 50 9 Z"
          fill="#FACC15"
          className="animate-pulse"
        />
        <circle cx="50" cy="15" r="2" fill="#EA580C" />
      </svg>
    </div>
  );
};
