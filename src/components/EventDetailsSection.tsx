import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  Navigation,
  Edit3
} from 'lucide-react';
import { EventDetails } from '../types/invitation';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { soundManager } from '../utils/soundEffects';
import { EditEventModal } from './EditEventModal';

interface EventDetailsSectionProps {
  event: EventDetails;
  onUpdateEvent: (updated: EventDetails) => void;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  event,
  onUpdateEvent
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  const handleOpenMaps = () => {
    soundManager.playPop();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${event.venueName}, ${event.address}`
    )}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="detalles" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-16">
      <div className="text-center mb-10">
        <p className="text-xs sm:text-sm font-semibold text-amber-800 tracking-wide mb-2">
          Información del evento · La Granja de Zenón
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight [text-wrap:balance]">
          ¡Acompáñanos a Festejar!
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Guarda la fecha y celebra con nosotros este día inolvidable en la granja.
        </p>
      </div>

      {/* Main Event Card */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-amber-950/5 border-2 border-amber-200">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-amber-100 gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display flex items-center justify-center sm:justify-start gap-2">
              <span>🏡</span>
              <span>CELEBREMOS MI PRIMER AÑITO</span>
            </h3>
            <p className="text-red-600 font-bold text-lg sm:text-xl font-display mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span>🚜</span>
              <span>Festejado: {event.childName}</span>
            </p>
          </div>

          {/* Quick Edit Details Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors cursor-pointer whitespace-nowrap"
            title="Editar horario, lugar o número de WhatsApp"
          >
            <Edit3 size={14} />
            <span>Editar datos</span>
          </button>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {/* Fecha */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-red-50/60 border border-red-100">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Calendar size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
                Fecha
              </span>
              <p className="font-bold text-slate-800 text-base mt-0.5">
                {event.dateText}
              </p>
              <span className="text-xs text-red-600 font-medium">¡Día de granja!</span>
            </div>
          </div>

          {/* Hora */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Clock size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Hora
              </span>
              <p className="font-bold text-slate-800 text-base mt-0.5">
                {event.timeText}
              </p>
              <span className="text-xs text-amber-700 font-medium">Puntualidad apreciada</span>
            </div>
          </div>

          {/* Lugar & Salón */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Lugar del Festejo
              </span>
              <p className="font-bold text-slate-800 text-base mt-0.5 line-clamp-1">
                {event.venueName}
              </p>
              <span className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                {event.address}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row - Required Interactive Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-100">
          {/* 📍 VER UBICACIÓN */}
          <button
            onClick={handleOpenMaps}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-2xl shadow-md shadow-emerald-600/20 hover:scale-102 active:scale-98 transition-all cursor-pointer"
          >
            <Navigation size={18} />
            <span>📍 VER UBICACIÓN</span>
          </button>

          {/* 📅 AGREGAR A MI CALENDARIO */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playPop();
                setShowCalendarOptions(!showCalendarOptions);
              }}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base font-bold rounded-2xl shadow-md shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <CalendarPlus size={18} />
              <span>📅 AGREGAR A CALENDARIO</span>
            </button>

            {/* Calendar Popover Options */}
            {showCalendarOptions && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-amber-200 p-2 z-30 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    soundManager.playPop();
                    window.open(createGoogleCalendarUrl(event), '_blank');
                    setShowCalendarOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-amber-50 rounded-xl flex items-center justify-between"
                >
                  <span>Google Calendar</span>
                  <span className="text-amber-500 text-[10px]">Abrir web</span>
                </button>
                <button
                  onClick={() => {
                    soundManager.playPop();
                    downloadIcsFile(event);
                    setShowCalendarOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-amber-50 rounded-xl flex items-center justify-between"
                >
                  <span>Apple / Outlook (.ics)</span>
                  <span className="text-rose-500 text-[10px]">Descargar</span>
                </button>
              </div>
            )}
          </div>

          {/* 💚 CONFIRMAR MI ASISTENCIA */}
          <a
            href="https://chat.whatsapp.com/CjSweqBIan9Er5ZIGqBe7e"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playPop()}
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm sm:text-base font-bold rounded-2xl shadow-md shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer text-center"
          >
            <span>💚 CONFIRMAR MI ASISTENCIA</span>
          </a>
        </div>
      </div>

      {/* Edit Event Details Modal */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onSave={(updated) => {
          onUpdateEvent(updated);
        }}
      />
    </section>
  );
};
