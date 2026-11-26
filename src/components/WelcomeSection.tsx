import React, { useState } from 'react';
import { PartyPopper } from 'lucide-react';
import {
  BartolitoRooster,
  VacaLolaChar,
  PercheronHorse,
  LoritoPepeChar,
  PollitoPioChar,
  ZenonBarnChar,
  AutoBochincheroChar,
  FarmBirthdayCake
} from './FarmCharacters';
import { soundManager } from '../utils/soundEffects';

export const WelcomeSection: React.FC = () => {
  const [activePhrase, setActivePhrase] = useState<string | null>(null);

  const handleAnimalTouch = (phrase: string) => {
    soundManager.playPop();
    setActivePhrase(phrase);
    setTimeout(() => setActivePhrase(null), 2800);
  };

  return (
    <section id="bienvenida" className="relative py-16 px-4 max-w-4xl mx-auto text-center scroll-mt-16">
      {/* Decorative Countryside Meadow Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-center opacity-40 overflow-hidden" aria-hidden="true">
        <div className="w-36 h-36 bg-emerald-200/60 rounded-full blur-2xl transform -translate-x-12" />
        <div className="w-36 h-36 bg-amber-200/60 rounded-full blur-2xl transform translate-x-12" />
      </div>

      {/* Floating active farm speech bubble if tapped */}
      {activePhrase && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 px-5 py-2.5 rounded-full shadow-2xl border-2 border-red-400 text-red-700 font-bold text-sm flex items-center gap-2 animate-bounce">
          <PartyPopper size={18} className="text-amber-500 shrink-0" />
          <span>{activePhrase}</span>
        </div>
      )}

      {/* Clean Unboxed Kicker */}
      <p className="text-xs sm:text-sm font-semibold text-emerald-700 tracking-wide mb-3">
        Aventura en el campo · La Granja de Zenón
      </p>

      {/* Welcome Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display mb-6 tracking-tight [text-wrap:balance]">
        ¡Un día muy especial está por llegar!
      </h2>

      {/* Central Welcome Card */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-amber-950/5 border border-amber-200/80 text-slate-700 space-y-6">
        <div className="max-w-2xl mx-auto space-y-4 text-base sm:text-lg leading-relaxed">
          <p className="font-medium text-slate-700">
            Nuestra pequeña estrella,{' '}
            <strong className="text-red-600 font-extrabold font-display text-xl sm:text-2xl">
              HUGO EMILIO
            </strong>
            , cumple su primer añito y queremos compartir contigo este momento tan especial en La Granja de Zenón.
          </p>

          <p className="text-slate-600 font-normal">
            ¡Prepárate para disfrutar de una celebración llena de alegría, amor, animalitos y mucha diversión!
          </p>
        </div>

        {/* Farm Birthday Cake Centerpiece */}
        <div className="py-2 flex flex-col items-center justify-center">
          <FarmBirthdayCake size={115} className="animate-pulse-gentle hover:scale-110 transition-transform cursor-pointer" />
          <p className="text-xs font-semibold text-amber-800 mt-2">
            1 Año Lleno de Bendición · Pastel de la Granja
          </p>
        </div>

        {/* Dancing Farm Characters Row - Interactive */}
        <div className="pt-2 border-t border-amber-100">
          <p className="text-xs font-semibold text-slate-500 mb-4 tracking-wide">
            Toca a los amigos de La Granja de Zenón para saludarlos:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <div onClick={() => handleAnimalTouch('🐓 ¡Bartolito dice: ¡Kikirikí! Bienvenido a la fiesta de Hugo!')}>
              <BartolitoRooster size={68} />
            </div>
            <div onClick={() => handleAnimalTouch('🐄 ¡La Vaca Lola dice: ¡Muuu! Hugo Emilio te manda un abrazo!')}>
              <VacaLolaChar size={66} />
            </div>
            <div onClick={() => handleAnimalTouch('🐎 ¡Percherón dice: Habrá juegos, risas y pastel!')}>
              <PercheronHorse size={66} />
            </div>
            <div onClick={() => handleAnimalTouch('🦜 ¡Lorito Pepe dice: ¡Hola, hola! ¡A cantar y bailar!')}>
              <LoritoPepeChar size={66} />
            </div>
            <div onClick={() => handleAnimalTouch('🐥 ¡Pollito Pío dice: ¡Pío, pío! Qué alegría verte!')}>
              <PollitoPioChar size={64} />
            </div>
            <div onClick={() => handleAnimalTouch('🏡 ¡En el Granero Rojo te espera una gran fiesta familiar!')}>
              <ZenonBarnChar size={66} />
            </div>
            <div onClick={() => handleAnimalTouch('🚜 ¡El Auto Bochinchero dice: ¡Bip, bip! ¡A celebrar!')}>
              <AutoBochincheroChar size={68} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
