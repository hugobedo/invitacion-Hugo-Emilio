import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Upload, Plus, Sparkles, Image as ImageIcon, Trash2 } from 'lucide-react';
import { PhotoItem } from '../types/invitation';
import { soundManager } from '../utils/soundEffects';
import hugoPortrait from '../assets/images/baby_hugo_portrait_1794321061240.jpg';
import granjaBanner from '../assets/images/granja_zenon_banner_1795651790333.jpg';
import celestialBlessing from '../assets/images/celestial_light_blessing_1794321061500.jpg';

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: hugoPortrait,
    title: '¡Mi Primer Añito!',
    age: '12 Meses',
    caption: 'Celebrando con alegría mi primer año de vida rodeado de amor.'
  },
  {
    id: 'photo-2',
    url: granjaBanner,
    title: 'Mi Fiesta en la Granja',
    age: '1er Añito',
    caption: 'Un mundo mágico de La Granja de Zenón preparado con todo el cariño de mamá y papá.'
  },
  {
    id: 'photo-3',
    url: celestialBlessing,
    title: 'Bendición de Dios',
    age: 'Desde el corazón',
    caption: '“Antes de formarte en el vientre, ya te había elegido.”'
  }
];

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('hugo_emilio_photos_granja');
      if (saved) {
        const parsed = JSON.parse(saved) as PhotoItem[];
        if (parsed && parsed.length > 0) {
          return parsed;
        }
      }
      // Preserve any custom photos uploaded previously under the old key
      const legacySaved = localStorage.getItem('hugo_emilio_photos');
      if (legacySaved) {
        const legacyParsed = JSON.parse(legacySaved) as PhotoItem[];
        const customOnly = legacyParsed.filter((p) => p.isCustom);
        if (customOnly.length > 0) {
          return [...customOnly, ...INITIAL_PHOTOS];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PHOTOS;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save custom photos in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hugo_emilio_photos_granja', JSON.stringify(photos));
    } catch {
      // localStorage quota
    }
  }, [photos]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    soundManager.playPop();
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.75;
    carouselRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleOpenLightbox = (index: number) => {
    soundManager.playPop();
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    soundManager.playPop();
    setActiveLightboxIndex(null);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playPop();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playPop();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, photos.length]);

  // Handle uploading real photos without modifying face or features
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    soundManager.playPop();

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        if (resultUrl) {
          const newPhoto: PhotoItem = {
            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            url: resultUrl,
            title: `Recuerdo de Hugo Emilio`,
            age: '1er Añito',
            caption: file.name.replace(/\.[^/.]+$/, ''),
            isCustom: true
          };
          setPhotos((prev) => [newPhoto, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="recuerdos" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-16">
      <div className="text-center mb-10">
        <p className="text-xs sm:text-sm font-semibold text-red-700 tracking-wide mb-2">
          Álbum digital interactivo · La Granja de Zenón
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight [text-wrap:balance]">
          📸 MIS PRIMEROS RECUERDOS
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Cada sonrisa, cada mirada y cada momento especial de Hugo Emilio en su primer añito de vida.
        </p>

        {/* View mode toggle + Upload button */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="inline-flex bg-white rounded-xl p-1 border border-amber-200 shadow-xs">
            <button
              onClick={() => {
                soundManager.playPop();
                setViewMode('carousel');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'carousel' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Álbum Deslizante
            </button>
            <button
              onClick={() => {
                soundManager.playPop();
                setViewMode('grid');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'grid' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ver en Cuadrícula
            </button>
          </div>

          {/* Upload Real Photo Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer"
            title="Cargar fotografías reales del cumpleañero"
          >
            <Upload size={16} />
            <span>Cargar Fotos de Hugo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* CAROUSEL VIEW */}
      {viewMode === 'carousel' ? (
        <div className="relative group">
          {/* Arrow Left */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-700 shadow-xl border border-rose-100 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Arrow Right */}
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-slate-700 shadow-xl border border-rose-100 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
            aria-label="Siguiente foto"
          >
            <ChevronRight size={24} />
          </button>

          {/* Horizontal Scroller Container */}
          <div
            ref={carouselRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {photos.length > 0 ? (
              photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(idx)}
                  className="flex-none w-[270px] sm:w-[320px] snap-center bg-white rounded-3xl p-3 pb-5 shadow-lg shadow-rose-950/5 border-2 border-amber-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group/card"
                >
                  {/* Washi tape aesthetic at top */}
                  <div className="w-16 h-3 bg-rose-200/60 rounded-xs mx-auto -mt-4 mb-2 rotate-1 shadow-xs" />

                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-md">
                        <Maximize2 size={18} />
                      </span>
                    </div>
                    {/* Age badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-full text-[11px] font-bold text-rose-700 shadow-xs">
                      {photo.age}
                    </div>

                    {photo.isCustom && (
                      <button
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-sm"
                        title="Eliminar foto personalizada"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <div className="px-2 text-center">
                    <h3 className="font-bold text-slate-800 text-base font-display">{photo.title}</h3>
                    {photo.caption && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{photo.caption}</p>}
                  </div>
                </div>
              ))
            ) : (
              /* Prepared Empty Frames for Hugo Emilio's Real Photos */
              [1, 2, 3].map((slotNum) => (
                <div
                  key={`empty-slot-${slotNum}`}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-none w-[270px] sm:w-[320px] snap-center bg-white rounded-3xl p-3 pb-5 shadow-lg shadow-rose-950/5 border-2 border-amber-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group/card"
                >
                  {/* Washi tape aesthetic at top */}
                  <div className="w-16 h-3 bg-rose-200/60 rounded-xs mx-auto -mt-4 mb-2 rotate-1 shadow-xs" />

                  {/* Empty photo frame */}
                  <div className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-rose-200/80 bg-rose-50/30 flex flex-col items-center justify-center p-6 text-center group-hover/card:bg-rose-50/60 transition-colors mb-3">
                    <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-2 group-hover/card:scale-110 transition-transform">
                      <Plus size={22} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 font-display">
                      Espacio para Fotografía
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      Preparado para foto de Hugo Emilio
                    </span>
                  </div>

                  <div className="px-2 text-center">
                    <h3 className="font-bold text-slate-600 text-base font-display">
                      Recuerdo #{slotNum}
                    </h3>
                    <p className="text-xs text-rose-500/80 mt-1 font-medium">
                      Toca para agregar foto real
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Quick Upload Slot at the end of carousel */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-none w-[220px] sm:w-[250px] snap-center aspect-square bg-rose-50/60 rounded-3xl border-2 border-dashed border-rose-300 flex flex-col items-center justify-center p-6 text-center hover:bg-rose-100/50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center mb-3">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm text-rose-800 font-display">Agregar Fotografía</span>
              <span className="text-xs text-slate-500 mt-1">Sube fotos reales de Hugo</span>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.length > 0 ? (
            photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => handleOpenLightbox(idx)}
                className="bg-white rounded-3xl p-3 pb-5 shadow-md border border-amber-100 hover:shadow-xl transition-all cursor-pointer group/gridcard"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/gridcard:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/90 rounded-full text-[11px] font-bold text-rose-700 shadow-xs">
                    {photo.age}
                  </div>
                  {photo.isCustom && (
                    <button
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-red-600 text-white"
                      title="Eliminar foto"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <div className="text-center px-2">
                  <h3 className="font-bold text-slate-800 font-display">{photo.title}</h3>
                  {photo.caption && <p className="text-xs text-slate-500 mt-1">{photo.caption}</p>}
                </div>
              </div>
            ))
          ) : (
            /* Prepared Empty Frames for Grid View */
            [1, 2, 3].map((slotNum) => (
              <div
                key={`empty-grid-slot-${slotNum}`}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white rounded-3xl p-3 pb-5 shadow-md border-2 border-amber-100 hover:border-rose-300 hover:shadow-xl transition-all cursor-pointer group/gridcard"
              >
                <div className="w-16 h-3 bg-rose-200/60 rounded-xs mx-auto -mt-4 mb-2 rotate-1 shadow-xs" />
                <div className="relative aspect-square rounded-2xl border-2 border-dashed border-rose-200/80 bg-rose-50/30 flex flex-col items-center justify-center p-6 text-center group-hover/gridcard:bg-rose-50/60 transition-colors mb-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-2 group-hover/gridcard:scale-110 transition-transform">
                    <Plus size={22} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 font-display">
                    Espacio para Fotografía
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Preparado para foto de Hugo Emilio
                  </span>
                </div>
                <div className="text-center px-2">
                  <h3 className="font-bold text-slate-600 font-display">Recuerdo #{slotNum}</h3>
                  <p className="text-xs text-rose-500/80 mt-1 font-medium">Toca para agregar foto real</p>
                </div>
              </div>
            ))
          )}

          {/* Upload card in grid */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[260px] bg-amber-50/60 rounded-3xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center p-6 text-center hover:bg-amber-100/50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center mb-3">
              <Plus size={24} />
            </div>
            <span className="font-bold text-sm text-amber-900 font-display">Añadir más fotos</span>
            <span className="text-xs text-slate-500 mt-1">Haz clic para cargar imágenes</span>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && photos[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Cerrar vista completa"
          >
            <X size={24} />
          </button>

          {/* Arrow Prev */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Arrow Next */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            aria-label="Siguiente foto"
          >
            <ChevronRight size={30} />
          </button>

          {/* Main Modal Image & Caption */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activeLightboxIndex].url}
              alt={photos[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border-4 border-white/20"
            />
            <div className="mt-4 text-center text-white px-4">
              <div className="inline-block px-3 py-1 bg-rose-500/80 rounded-full text-xs font-semibold mb-1">
                {photos[activeLightboxIndex].age} · {activeLightboxIndex + 1} de {photos.length}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                {photos[activeLightboxIndex].title}
              </h3>
              {photos[activeLightboxIndex].caption && (
                <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  {photos[activeLightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
