import React from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Heart } from 'lucide-react';
import {
  BartolitoRooster,
  VacaLolaChar,
  PercheronHorse,
  LoritoPepeChar,
  PollitoPioChar,
  AutoBochincheroChar
} from './FarmCharacters';
import { soundManager } from '../utils/soundEffects';

interface CoverScreenProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ isOpen, onOpen }) => {
  const handleOpenClick = () => {
    soundManager.playFanfare();

    const defaults = {
      origin: { y: 0.7 },
      colors: ['#DC2626', '#F59E0B', '#16A34A', '#0EA5E9', '#FACC15', '#EA580C']
    };

    confetti({
      ...defaults,
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.65 }
    });
    confetti({
      ...defaults,
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.65 }
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.4 }
      });
    }, 250);

    onOpen();
  };

  return (
    <section
      id="portada"
      className={`relative ${
        isOpen ? 'min-h-[92vh] sm:min-h-screen' : 'min-h-screen'
      } flex flex-col items-center justify-center px-4 py-8 sm:py-12 overflow-hidden bg-gradient-to-b from-sky-100/80 via-amber-50/70 to-emerald-100/60`}
    >
      {/* Decorative Sunny Sky & Meadow Ambient Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70" aria-hidden="true">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-80 bg-emerald-200/50 rounded-full blur-3xl" />
      </div>

      {/* Floating Farm Characters in the corners */}
      <div className="absolute top-6 left-3 sm:left-8 z-10 pointer-events-auto">
        <BartolitoRooster size={78} className="transform -rotate-6" />
      </div>
      <div className="absolute top-6 right-3 sm:right-8 z-10 pointer-events-auto">
        <VacaLolaChar size={74} className="transform rotate-6" />
      </div>
      <div className="absolute bottom-16 left-3 sm:left-12 z-10 pointer-events-auto hidden sm:block">
        <LoritoPepeChar size={80} className="transform rotate-6" />
      </div>
      <div className="absolute bottom-16 right-3 sm:right-12 z-10 pointer-events-auto hidden sm:block">
        <AutoBochincheroChar size={82} className="transform -rotate-3" />
      </div>

      {/* Clean Unboxed Kicker Header */}
      <div className="w-full max-w-xl mx-auto mb-5 flex items-center justify-center gap-3 select-none">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/70 to-red-400/70" />
        <p className="text-xs sm:text-sm font-semibold text-amber-900 tracking-wide whitespace-nowrap">
          La Granja de Zenón <span aria-hidden="true">·</span> 1er Añito
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-400/70 to-amber-400/70" />
      </div>

      {/* Central Invitation Card */}
      <div className="relative z-20 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-amber-950/10 border-2 border-amber-200/80 text-center transition-all duration-300">
        {/* Official Cover Photo of La Granja de Zenón */}
        <div className="relative mx-auto mb-6 w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-emerald-100 border border-amber-200/70">
          <img
            src="/assets/aistudio/zenon_2a5f8b0b.jpg"
            alt="La Granja de Zenón - Portada Primer Añito de Hugo Emilio"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-0 right-0 text-center text-white text-xs sm:text-sm font-semibold drop-shadow-md px-3">
            ¡Bienvenidos a La Granja de Zenón!
          </div>
        </div>

        {/* Exact Header Text Requested */}
        <div className="space-y-2 mb-6">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-emerald-700">
            ¡ESTÁS INVITADO!
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 tracking-tight font-display [text-wrap:balance]">
            HUGO EMILIO
          </h1>

          <p className="text-lg sm:text-xl font-bold text-red-700 font-display pt-1">
            ¡MI PRIMER AÑITO!
          </p>
        </div>

        {/* Date Highlight */}
        <div className="flex items-center justify-center gap-2 text-slate-700 mb-8 font-medium">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200/80">
            <Calendar size={18} className="text-red-600 shrink-0" />
            <span className="text-sm sm:text-base font-bold tracking-wide text-slate-800 whitespace-nowrap">
              28 DE ENERO DE 2027
            </span>
          </div>
        </div>

        {/* Animated Main CTA Button */}
        <div className="space-y-3">
          <button
            onClick={handleOpenClick}
            className="relative group w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 hover:from-red-700 hover:via-amber-600 hover:to-emerald-700 text-white font-bold text-lg sm:text-xl rounded-full shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white flex items-center justify-center gap-3 mx-auto cursor-pointer animate-pulse-gentle whitespace-nowrap"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-200">🚜</span>
            <span className="font-display tracking-wide drop-shadow-sm">¡ABRIR MI INVITACIÓN!</span>
          </button>

          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <span>Toca para entrar a la granja con música y sorpresas</span>
            <Heart size={12} className="text-red-500 fill-current shrink-0" />
          </p>
        </div>

        {/* Cute dancing farm animals row below button */}
        <div className="mt-8 pt-6 border-t border-amber-100 flex items-center justify-center gap-3 sm:gap-5">
          <BartolitoRooster size={48} />
          <VacaLolaChar size={46} />
          <PercheronHorse size={46} />
          <LoritoPepeChar size={46} />
          <PollitoPioChar size={44} />
        </div>
      </div>
    </section>
  );
};
