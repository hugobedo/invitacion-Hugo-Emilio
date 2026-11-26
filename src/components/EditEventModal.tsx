import React, { useState } from 'react';
import { X, Save, Edit3, MapPin, Clock, Home, Phone } from 'lucide-react';
import { EventDetails } from '../types/invitation';
import { soundManager } from '../utils/soundEffects';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
  onSave: (updated: EventDetails) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave
}) => {
  const [formData, setFormData] = useState<EventDetails>({ ...event });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg font-display">Personalizar Datos del Festejo</h3>
              <p className="text-xs text-slate-500">Modifica lugar, hora, dirección y WhatsApp</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          {/* Hora */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <Clock size={14} className="text-amber-500" />
              <span>Hora del evento</span>
            </label>
            <input
              type="text"
              value={formData.timeText}
              onChange={(e) => setFormData({ ...formData, timeText: e.target.value })}
              placeholder="Ej. 4:00 PM"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-medium"
              required
            />
          </div>

          {/* Salón / Lugar */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <Home size={14} className="text-red-600" />
              <span>Nombre del salón o lugar</span>
            </label>
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              placeholder="Ej. Salón Campestre La Granja"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
              required
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <MapPin size={14} className="text-emerald-600" />
              <span>Dirección del festejo</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Ej. Av. Las Palmas #240, Camino del Campo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
              required
            />
          </div>

          {/* WhatsApp RSVP */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <Phone size={14} className="text-emerald-600" />
              <span>Número de WhatsApp para Confirmación (con código de país)</span>
            </label>
            <input
              type="tel"
              value={formData.whatsappPhone}
              onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
              placeholder="Ej. 5215512345678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Save size={15} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
