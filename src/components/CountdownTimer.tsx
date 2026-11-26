import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper } from 'lucide-react';
import { FarmBirthdayCake } from './FarmCharacters';
import { soundManager } from '../utils/soundEffects';

interface CountdownTimerProps {
  targetDateIso: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateIso }) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isCompleted: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const handleCelebrateClick = () => {
    soundManager.playFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#DC2626', '#F59E0B', '#16A34A', '#0EA5E9', '#FACC15']
    });
  };

  return (
    <section id="contador" className="py-16 px-4 max-w-4xl mx-auto scroll-mt-16 text-center">
      <div className="mb-8">
        <p className="text-xs sm:text-sm font-semibold text-red-700 tracking-wide mb-2">
          Cuenta regresiva · La Granja de Zenón
        </p>

        {/* Exact Requested Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight [text-wrap:balance]">
          {timeLeft.isCompleted ? '¡HOY ES MI CUMPLEAÑOS!' : '¡FALTAN PARA MI PRIMER AÑITO!'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Jueves 28 de enero de 2027 · Cada segundo cuenta para la fiesta en la granja
        </p>
      </div>

      {timeLeft.isCompleted ? (
        /* Event Day Celebration Mode */
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4 max-w-2xl mx-auto animate-pulse-gentle">
          <FarmBirthdayCake size={105} className="mx-auto" />
          <h3 className="text-4xl sm:text-5xl font-extrabold font-display">
            ¡HOY ES MI CUMPLEAÑOS!
          </h3>
          <p className="text-lg text-white/95">
            ¡Celebremos el 1er añito de Hugo Emilio en La Granja de Zenón con alegría y abrazos!
          </p>
          <button
            onClick={handleCelebrateClick}
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            🎉 ¡Lanzar Confeti de la Granja!
          </button>
        </div>
      ) : (
        /* Dynamic 4-Unit Farm Countdown Cards */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {/* DÍAS - Bartolito */}
          <div
            onClick={handleCelebrateClick}
            className="group bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-red-950/5 border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🐓</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-red-600 font-mono tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 block font-display">
              Días
            </span>
          </div>

          {/* HORAS - La Vaca Lola */}
          <div
            onClick={handleCelebrateClick}
            className="group bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-amber-950/5 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🐄</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-600 font-mono tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 block font-display">
              Horas
            </span>
          </div>

          {/* MINUTOS - Percherón */}
          <div
            onClick={handleCelebrateClick}
            className="group bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-sky-950/5 border-2 border-sky-200 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🐎</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-sky-600 font-mono tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 block font-display">
              Minutos
            </span>
          </div>

          {/* SEGUNDOS - Pollito Pío */}
          <div
            onClick={handleCelebrateClick}
            className="group bg-white rounded-3xl p-4 sm:p-6 shadow-lg shadow-emerald-950/5 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🐥</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 font-mono tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 block font-display">
              Segundos
            </span>
          </div>
        </div>
      )}

      {/* Interactive celebratory note */}
      <div className="mt-8">
        <button
          onClick={handleCelebrateClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 hover:bg-white text-slate-700 text-xs sm:text-sm font-semibold rounded-full border border-amber-200 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <PartyPopper size={16} className="text-red-600" />
          <span>¡Toca el contador para lanzar confeti de la granja!</span>
        </button>
      </div>
    </section>
  );
};
