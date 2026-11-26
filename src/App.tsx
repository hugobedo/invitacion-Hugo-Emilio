import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  PartyPopper,
  Share2,
  Menu,
  X
} from 'lucide-react';
import { EventDetails } from './types/invitation';
import { soundManager } from './utils/soundEffects';
import { CoverScreen } from './components/CoverScreen';
import { WelcomeSection } from './components/WelcomeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { HeartMessageSection } from './components/HeartMessageSection';
import { BlessingSection } from './components/BlessingSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { CountdownTimer } from './components/CountdownTimer';
import { GuestbookSection } from './components/GuestbookSection';
import { BackgroundMusic, BackgroundMusicHandle } from './components/BackgroundMusic';
import { ShareModal } from './components/ShareModal';

const DEFAULT_EVENT_DETAILS: EventDetails = {
  childName: 'HUGO EMILIO',
  celebrationTitle: '¡MI PRIMER AÑITO!',
  dateText: 'Jueves 28 de enero de 2027',
  targetDateIso: '2027-01-28T16:00:00',
  timeText: '4:00 PM',
  venueName: 'Salón Campestre La Granja',
  address: 'Av. Las Palmas 240, Camino del Campo',
  googleMapsUrl: '',
  whatsappPhone: '5215512345678',
  notes: 'Ven con tu mejor outfit de granjerito para divertirte con los animalitos, juegos y pastel.'
};

export default function App() {
  const [eventDetails, setEventDetails] = useState<EventDetails>(() => {
    try {
      const saved = localStorage.getItem('hugo_emilio_event_details_granja');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_EVENT_DETAILS;
  });

  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  // Persist customized event details
  const handleUpdateEvent = (updated: EventDetails) => {
    setEventDetails(updated);
    try {
      localStorage.setItem('hugo_emilio_event_details_granja', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenInvitation = () => {
    // Synchronously initiate Song 1 -> Song 2 playback on the user's click gesture
    musicRef.current?.startPlayback();
    setIsOpened(true);
    setIsPlayingMusic(true);

    // Wait briefly for the revealed content to mount, then smoothly scroll to Welcome Section
    setTimeout(() => {
      const welcomeEl = document.getElementById('bienvenida');
      if (welcomeEl) {
        welcomeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  const handleTriggerConfetti = () => {
    soundManager.playPop();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.85, x: 0.1 },
      colors: ['#DC2626', '#F59E0B', '#16A34A', '#0EA5E9', '#FACC15']
    });
  };

  const navLinks = [
    { label: 'Bienvenida', href: '#bienvenida' },
    { label: 'Recuerdos', href: '#recuerdos' },
    { label: 'Mi Corazón', href: '#mensaje' },
    { label: 'Detalles', href: '#detalles' },
    { label: 'Deseos', href: '#deseos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/70 via-amber-50/40 to-emerald-50/60 text-slate-800 font-sans selection:bg-amber-200">
      {/* Top Bar Navigation (revealed only after opening the invitation) */}
      {isOpened && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs animate-in fade-in duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
            {/* Zone 1: Single Wordmark */}
            <a
              href="#portada"
              onClick={() => soundManager.playPop()}
              className="text-base sm:text-lg font-extrabold tracking-tight text-red-600 font-display flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
            >
              <span>🚜</span>
              <span>HUGO EMILIO</span>
            </a>

            {/* Zone 2: 5 concise single-line navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => soundManager.playPop()}
                  className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action + Share + Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setIsShareModalOpen(true);
                }}
                className="p-2 text-amber-800 hover:bg-amber-50 rounded-full transition-colors cursor-pointer"
                title="Compartir invitación"
                aria-label="Compartir invitación"
              >
                <Share2 size={17} />
              </button>

              <a
                href="#detalles"
                onClick={() => soundManager.playPop()}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full shadow-xs transition-transform active:scale-95 whitespace-nowrap shrink-0"
              >
                Confirmar
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white/95 border-b border-amber-200 p-4 shadow-lg animate-in slide-in-from-top duration-150">
              <div className="grid grid-cols-2 gap-2 text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      soundManager.playPop();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-amber-50/60 hover:bg-red-50 hover:text-red-600 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="relative">
        {/* 1 & 2: Portada Principal (always shown first) */}
        <CoverScreen isOpen={isOpened} onOpen={handleOpenInvitation} />

        {/* Everything else deploys ONLY after pressing "¡ABRIR MI INVITACIÓN!" */}
        {isOpened && (
          <div className="animate-in fade-in duration-500">
            {/* 4: Sección de Bienvenida */}
            <WelcomeSection />

            {/* 5: Sección de Fotografías (📸 MIS PRIMEROS RECUERDOS) */}
            <PhotoGallery />

            {/* 6: Sección Especial: Un Mensaje Desde Mi Corazón */}
            <HeartMessageSection />

            {/* 7: Sección: Una Bendición de Dios (Jeremías 1:5) */}
            <BlessingSection />

            {/* 8: Sección de Información del Evento */}
            <EventDetailsSection
              event={eventDetails}
              onUpdateEvent={handleUpdateEvent}
            />

            {/* 9: Cuenta Regresiva (¡FALTAN PARA MI PRIMER AÑITO!) */}
            <CountdownTimer targetDateIso={eventDetails.targetDateIso} />

            {/* 10: Guestbook / Libro de Deseos */}
            <GuestbookSection />
          </div>
        )}
      </main>

      {/* Floating Confetti Popper Button (shown once invitation is opened) */}
      {isOpened && (
        <button
          onClick={handleTriggerConfetti}
          className="fixed bottom-5 left-4 z-40 w-12 h-12 rounded-full bg-white/95 text-amber-600 shadow-lg border-2 border-amber-300 hover:border-red-400 hover:scale-110 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
          title="¡Tirar confeti de la granja!"
          aria-label="Tirar confeti"
        >
          <PartyPopper size={22} />
        </button>
      )}

      {/* Persistent Background Music Controller (pre-mounted, visible once opened) */}
      <BackgroundMusic
        ref={musicRef}
        isPlaying={isPlayingMusic}
        isVisible={isOpened}
        onTogglePlay={(playing) => setIsPlayingMusic(playing)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Footer (shown once invitation is opened) */}
      {isOpened && (
        <footer className="mt-20 py-10 bg-white/85 border-t border-amber-200/70 text-center text-slate-500 text-xs space-y-2 animate-in fade-in duration-500">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <span>🐄</span>
            <span className="font-bold text-slate-700 font-display text-sm">
              HUGO EMILIO · 1ER AÑITO · LA GRANJA DE ZENÓN
            </span>
            <span>🐓</span>
          </div>
          <p className="text-slate-500">
            Hecho con amor y alegría familiar para celebrar una bendición de Dios.
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Jueves 28 de enero de 2027
          </p>
        </footer>
      )}
    </div>
  );
}
