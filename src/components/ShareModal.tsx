import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = '🚜🐄 ¡Estás invitado al 1er cumpleaños de HUGO EMILIO! Fiesta de La Granja de Zenón el 28 de enero de 2027. Abre tu invitación interactiva aquí: ';

  const handleCopy = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(`${shareText}${currentUrl}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShareWhatsApp = () => {
    soundManager.playPop();
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-amber-200 text-center">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Compartir Invitación</span>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="text-4xl">🚜 🐄 🐓</div>
          <h3 className="font-extrabold text-slate-800 text-lg font-display">
            ¡Comparte con Familiares y Amigos!
          </h3>
          <p className="text-xs text-slate-500">
            Envía esta invitación interactiva de La Granja de Zenón a través de WhatsApp o copia el enlace directo.
          </p>

          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>Compartir en WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="text-emerald-700 font-bold">¡Enlace copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copiar texto y enlace</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
