import React from 'react';
import { Sparkles } from 'lucide-react';
import celestialBlessing from '../assets/images/celestial_light_blessing_1794321061500.jpg';

export const BlessingSection: React.FC = () => {
  return (
    <section id="bendicion" className="relative py-20 px-4 max-w-4xl mx-auto scroll-mt-16 text-center">
      {/* Soft celestial aura background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" aria-hidden="true">
        <div className="w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mb-6">
        <p className="text-xs sm:text-sm font-semibold text-amber-800 tracking-wide">
          Una bendición de Dios
        </p>
      </div>

      {/* Celestial Card with Subtle Golden Glow */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-xl shadow-amber-950/5 border-2 border-amber-200/90 max-w-3xl mx-auto overflow-hidden">
        {/* Subtle celestial watercolor background banner */}
        <div className="absolute -top-12 -left-12 -right-12 h-44 opacity-25 pointer-events-none overflow-hidden">
          <img
            src={celestialBlessing}
            alt="Luz Celestial"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gentle pulsing celestial light ring */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100 mx-auto flex items-center justify-center shadow-lg shadow-amber-300/40 animate-glow-celestial mb-6 border border-amber-300">
          <Sparkles size={28} className="text-amber-600" />
        </div>

        {/* Sacred Verse text - exact wording */}
        <blockquote className="space-y-4 my-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 font-script italic leading-relaxed sm:leading-snug max-w-2xl mx-auto [text-wrap:balance]">
            “Antes de formarte en el vientre, ya te había elegido.”
          </p>

          <footer className="pt-3">
            <span className="text-amber-800 font-bold text-sm sm:text-base font-display tracking-widest uppercase">
              Jeremías 1:5
            </span>
          </footer>
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-500 mt-6 max-w-md mx-auto leading-relaxed">
          Damos infinitas gracias a Dios por concedernos la alegría de celebrar el primer año de vida de nuestro amado Hugo Emilio.
        </p>

        {/* Delicate Countryside Sunflower & Leaf Accent */}
        <div className="mt-8 flex items-center justify-center gap-3 text-emerald-700 select-none" aria-hidden="true">
          <span>🌻</span>
          <span className="text-xs text-amber-700 font-semibold">Bendecido Hoy y Siempre</span>
          <span>🌻</span>
        </div>
      </div>
    </section>
  );
};
