import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const HeartMessageSection: React.FC = () => {
  const [hugCount, setHugCount] = useState(1);
  const [showHeartsAnim, setShowHeartsAnim] = useState(false);

  const handleSendHug = () => {
    soundManager.playMagicalChime();
    setHugCount(prev => prev + 1);
    setShowHeartsAnim(true);
    setTimeout(() => setShowHeartsAnim(false), 2000);
  };

  return (
    <section id="mensaje" className="relative py-20 px-4 max-w-4xl mx-auto scroll-mt-16">
      {/* Delicate floating countryside elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <span className="absolute top-10 left-6 text-xl opacity-75 animate-float-slow">🌻</span>
        <span className="absolute top-20 right-8 text-xl opacity-75 animate-float-reverse">🐓</span>
        <span className="absolute bottom-16 left-12 text-xl opacity-75 animate-float-reverse">⭐</span>
        <span className="absolute bottom-10 right-16 text-xl opacity-75 animate-float-slow">🐄</span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 text-center mb-8">
        <p className="text-xs sm:text-sm font-semibold text-red-700 tracking-wide mb-2">
          Un mensaje desde mi corazón
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight [text-wrap:balance]">
          Con Todo Mi Amor
        </h2>
      </div>

      {/* Tender Card with warm barn & hay border */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-xl shadow-amber-950/5 border-2 border-amber-200/90 text-slate-700 max-w-3xl mx-auto">
        {/* Soft quote decorative mark */}
        <div className="text-center mb-6">
          <span className="inline-block text-4xl text-red-300 font-serif leading-none select-none">“</span>
        </div>

        {/* Exact Verbatim Message Stanzas */}
        <div className="space-y-6 text-base sm:text-xl leading-relaxed sm:leading-loose text-slate-700 font-medium text-center">
          <p className="transition-all duration-700">
            Hoy celebro mi primer añito, y aunque todavía soy pequeño, ya sé que estoy rodeado de un amor inmenso.
          </p>

          <p className="transition-all duration-700">
            Gracias, Dios, por regalarme la vida y poner en mi camino a unos papás que me cuidan, me protegen y llenan mis días de ternura.
          </p>

          <p className="transition-all duration-700">
            Gracias, mamá y papá, por ser mi hogar, mis brazos seguros y mi mayor bendición.
          </p>

          <p className="text-xl sm:text-2xl font-bold text-red-600 font-display pt-2">
            Los amo con todo mi corazón.
          </p>
        </div>

        {/* Signature lockup */}
        <div className="mt-8 pt-6 border-t border-amber-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-red-500 mb-1">
            <Heart size={16} className="fill-current" />
            <span className="font-display font-bold text-lg text-slate-800">Hugo Emilio</span>
            <Heart size={16} className="fill-current" />
          </div>
          <span className="text-xs text-slate-500">28 de enero de 2027</span>

          {/* Interactive Hug Sender Button */}
          <button
            onClick={handleSendHug}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-md shadow-red-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Heart size={16} className="fill-current animate-bounce" />
            <span>Enviar un abrazo a Hugo ({hugCount})</span>
          </button>
        </div>
      </div>

      {/* Floating hearts animation when hug sent */}
      {showHeartsAnim && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center" aria-hidden="true">
          <div className="text-4xl animate-bounce">💖 🌻 🐄 👶 💖</div>
        </div>
      )}
    </section>
  );
};
