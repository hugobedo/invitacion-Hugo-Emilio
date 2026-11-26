import React, { useState, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';
import { GuestWish } from '../types/invitation';
import { soundManager } from '../utils/soundEffects';

const INITIAL_WISHES: GuestWish[] = [];

export const GuestbookSection: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('hugo_emilio_wishes');
      if (saved) {
        const parsed = JSON.parse(saved) as GuestWish[];
        return parsed.filter(w => !['wish-1', 'wish-2', 'wish-3'].includes(w.id));
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('🐓');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('hugo_emilio_wishes', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    soundManager.playMagicalChime();
    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      guestName: name.trim(),
      message: message.trim(),
      fruitEmoji: selectedAnimal,
      timestamp: 'Ahora mismo'
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  const farmAnimalOptions = ['🐓', '🐄', '🐎', '🦜', '🐥', '🚜', '🐷'];

  return (
    <section id="deseos" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-16">
      <div className="text-center mb-10">
        <p className="text-xs sm:text-sm font-semibold text-red-700 tracking-wide mb-2">
          Libro de deseos y bendiciones
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight [text-wrap:balance]">
          Dedícale un Mensaje a Hugo Emilio
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Tus palabras de amor serán guardadas en este álbum de recuerdos para siempre.
        </p>
      </div>

      {/* Write a Wish Form Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200 mb-10 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Tu Nombre o Familia:
            </label>
            <input
              type="text"
              placeholder="Ej. Tía Andrea y Familia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Elige tu Animalito de la Granja para Hugo:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {farmAnimalOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    soundManager.playPop();
                    setSelectedAnimal(emoji);
                  }}
                  className={`text-2xl p-2 rounded-xl transition-transform cursor-pointer ${
                    selectedAnimal === emoji
                      ? 'bg-amber-100 scale-110 ring-2 ring-red-500'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Tu Mensaje de Felicitación:
            </label>
            <textarea
              rows={3}
              placeholder="Escribe aquí tus mejores deseos para el cumpleañero..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <Send size={16} />
            <span>Publicar Mensaje de Amor</span>
          </button>
        </form>
      </div>

      {/* List of Wishes */}
      {wishes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-amber-200/80 hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{wish.fruitEmoji}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm font-display">
                      {wish.guestName}
                    </h4>
                    <span className="text-[11px] text-slate-400">{wish.timestamp}</span>
                  </div>
                </div>
                <Heart size={14} className="text-red-500 fill-red-100" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                “{wish.message}”
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4 rounded-3xl bg-white/70 border border-dashed border-amber-300/80 max-w-lg mx-auto">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Espacio preparado para los mensajes de los invitados.
          </p>
        </div>
      )}
    </section>
  );
};
