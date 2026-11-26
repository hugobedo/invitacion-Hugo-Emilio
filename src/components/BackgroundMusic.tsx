import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import { Volume2, VolumeX, Play, Pause, Music, SkipForward } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

const PLAYLIST = [
  { id: '4nKcnfw9ggc', title: 'Canción 1' },
  { id: 'KFJl6ofQ8XQ', title: 'Canción 2' }
];

export interface BackgroundMusicHandle {
  startPlayback: () => void;
}

interface BackgroundMusicProps {
  isPlaying: boolean;
  isVisible?: boolean;
  onTogglePlay: (playing: boolean) => void;
}

// Global declaration for YouTube iframe API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: unknown) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  setVolume: (vol: number) => void;
  mute: () => void;
  unMute: () => void;
  getPlayerState: () => number;
}

export const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(
  ({ isPlaying, isVisible = true, onTogglePlay }, ref) => {
    const [playerReady, setPlayerReady] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [useFallbackMelody, setUseFallbackMelody] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [volume, setVolume] = useState(85);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
    const currentTrackIndexRef = useRef(0);
    const isPlayingRef = useRef(isPlaying);
    const failedTracksRef = useRef<Set<number>>(new Set());
    const synthLoopRef = useRef<number | null>(null);
    const synthAudioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
      isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Friendly nursery fallback synthesizer if YouTube is unavailable
    const playKidMelodyNote = useCallback(
      (freq: number, start: number, duration: number) => {
        if (!synthAudioCtxRef.current || isMuted) return;
        try {
          const ctx = synthAudioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);

          const baseVol = (volume / 100) * 0.12;
          gain.gain.setValueAtTime(baseVol, start);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + duration + 0.05);
        } catch {
          // ignore
        }
      },
      [isMuted, volume]
    );

    const stopFallbackSynthesizer = useCallback(() => {
      if (synthLoopRef.current) {
        clearInterval(synthLoopRef.current);
        synthLoopRef.current = null;
      }
    }, []);

    const startFallbackSynthesizer = useCallback(() => {
      if (synthLoopRef.current) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!synthAudioCtxRef.current && AudioCtx) {
          synthAudioCtxRef.current = new AudioCtx();
        }
        if (synthAudioCtxRef.current?.state === 'suspended') {
          synthAudioCtxRef.current.resume();
        }

        const melody = [
          { f: 523.25, d: 0.28 },
          { f: 659.25, d: 0.28 },
          { f: 783.99, d: 0.28 },
          { f: 880.0, d: 0.4 },
          { f: 783.99, d: 0.4 },
          { f: 659.25, d: 0.28 },
          { f: 698.46, d: 0.28 },
          { f: 587.33, d: 0.35 },
          { f: 523.25, d: 0.5 },
          { f: 0, d: 0.3 },
          { f: 659.25, d: 0.28 },
          { f: 698.46, d: 0.28 },
          { f: 783.99, d: 0.4 },
          { f: 880.0, d: 0.4 },
          { f: 1046.5, d: 0.6 }
        ];

        const playSequence = () => {
          if (!synthAudioCtxRef.current) return;
          let t = synthAudioCtxRef.current.currentTime + 0.05;
          melody.forEach((n) => {
            if (n.f > 0) {
              playKidMelodyNote(n.f, t, n.d);
            }
            t += n.d;
          });
        };

        playSequence();
        synthLoopRef.current = window.setInterval(playSequence, 4600);
      } catch {
        // fallback
      }
    }, [playKidMelodyNote]);

    const playTrackAtIndex = useCallback((nextIndex: number) => {
      const safeIndex = nextIndex % PLAYLIST.length;
      currentTrackIndexRef.current = safeIndex;
      setCurrentTrackIndex(safeIndex);

      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.loadVideoById(PLAYLIST[safeIndex].id);
        } catch {
          setUseFallbackMelody(true);
        }
      }
    }, []);

    // Expose synchronous playback starter to honor browser user-click autoplay policies
    useImperativeHandle(
      ref,
      () => ({
        startPlayback: () => {
          isPlayingRef.current = true;
          currentTrackIndexRef.current = 0;
          setCurrentTrackIndex(0);

          if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
            try {
              stopFallbackSynthesizer();
              ytPlayerRef.current.unMute();
              ytPlayerRef.current.setVolume(volume);
              ytPlayerRef.current.playVideo();
            } catch {
              setUseFallbackMelody(true);
              startFallbackSynthesizer();
            }
          }
        }
      }),
      [volume, startFallbackSynthesizer, stopFallbackSynthesizer]
    );

    // Initialize YouTube Player with Song 1, then advance to Song 2 automatically on end
    useEffect(() => {
      const loadYT = () => {
        if (window.YT && window.YT.Player) {
          initPlayer();
        } else {
          if (!document.getElementById('yt-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'yt-iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
          }

          window.onYouTubeIframeAPIReady = () => {
            initPlayer();
          };
        }
      };

      const initPlayer = () => {
        try {
          const container = document.getElementById('yt-player-container');
          if (!container || ytPlayerRef.current) return;

          ytPlayerRef.current = new window.YT.Player('yt-player-container', {
            videoId: PLAYLIST[0].id,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0
            },
            events: {
              onReady: (event) => {
                setPlayerReady(true);
                event.target.setVolume(volume);
                if (isPlayingRef.current) {
                  try {
                    stopFallbackSynthesizer();
                    event.target.unMute();
                    event.target.playVideo();
                  } catch {
                    // Autoplay block
                  }
                }
              },
              onError: () => {
                failedTracksRef.current.add(currentTrackIndexRef.current);
                if (failedTracksRef.current.size < PLAYLIST.length) {
                  // Try the other song in the playlist
                  playTrackAtIndex(currentTrackIndexRef.current + 1);
                } else {
                  setUseFallbackMelody(true);
                }
              },
              onStateChange: (event) => {
                if (event.data === 0) {
                  // Song ended -> automatically play the next song (1 -> 2 -> 1)
                  playTrackAtIndex(currentTrackIndexRef.current + 1);
                } else if (event.data === 1) {
                  stopFallbackSynthesizer();
                  onTogglePlay(true);
                } else if (event.data === 2) {
                  onTogglePlay(false);
                }
              }
            }
          });
        } catch {
          setUseFallbackMelody(true);
        }
      };

      loadYT();

      return () => {
        stopFallbackSynthesizer();
      };
    }, [playTrackAtIndex, stopFallbackSynthesizer]);

    // Sync isPlaying with YouTube Player or Fallback Synth
    useEffect(() => {
      if (useFallbackMelody) {
        if (isPlaying) {
          startFallbackSynthesizer();
        } else {
          stopFallbackSynthesizer();
        }
        return;
      }

      if (playerReady && ytPlayerRef.current) {
        try {
          if (isPlaying) {
            stopFallbackSynthesizer();
            ytPlayerRef.current.playVideo();
          } else {
            ytPlayerRef.current.pauseVideo();
          }
        } catch {
          setUseFallbackMelody(true);
          if (isPlaying) startFallbackSynthesizer();
        }
      }
    }, [
      isPlaying,
      playerReady,
      useFallbackMelody,
      startFallbackSynthesizer,
      stopFallbackSynthesizer
    ]);

    // Handle Mute & Volume
    useEffect(() => {
      if (ytPlayerRef.current && playerReady) {
        try {
          if (isMuted) {
            ytPlayerRef.current.mute();
          } else {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(volume);
          }
        } catch {
          // ignore
        }
      }
      soundManager.setMuted(isMuted);
    }, [isMuted, volume, playerReady]);

    const handleToggle = () => {
      soundManager.playPop();
      const nextState = !isPlaying;
      onTogglePlay(nextState);
    };

    const handleNextTrack = (e: React.MouseEvent) => {
      e.stopPropagation();
      soundManager.playPop();
      onTogglePlay(true);
      playTrackAtIndex(currentTrackIndexRef.current + 1);
    };

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      soundManager.playPop();
      setIsMuted(!isMuted);
    };

    return (
      <>
        {/* Persistent YouTube Player Frame (pre-mounted so audio starts instantly on cover click) */}
        <div
          className="fixed bottom-0 right-0 w-48 h-28 pointer-events-none opacity-0 overflow-hidden -z-10"
          aria-hidden="true"
        >
          <div id="yt-player-container" />
        </div>

        {/* Persistent Floating Music Controller Widget (shown once invitation is opened) */}
        {isVisible && (
          <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2 group">
            {/* Expandable volume popover */}
            {showVolumeSlider && (
              <div
                className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="text-red-600 hover:text-red-700 transition-colors p-1 cursor-pointer"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    if (val > 0 && isMuted) setIsMuted(false);
                  }}
                  className="w-16 sm:w-20 accent-red-600 cursor-pointer h-1.5 bg-amber-100 rounded-lg"
                  title="Volumen"
                />
              </div>
            )}

            {/* Next Track Quick Button */}
            <button
              onClick={handleNextTrack}
              className="w-9 h-9 rounded-full bg-white/95 text-red-600 shadow-md border border-amber-200 hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title={`Cambiar a ${PLAYLIST[(currentTrackIndex + 1) % PLAYLIST.length].title}`}
              aria-label="Siguiente canción"
            >
              <SkipForward size={15} />
            </button>

            {/* Main Floating Button */}
            <div className="relative">
              <button
                onClick={handleToggle}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowVolumeSlider(!showVolumeSlider);
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 text-white rounded-full shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/80 cursor-pointer"
                title={isPlaying ? 'Pausar música de la granja' : 'Reproducir música de la granja'}
                aria-label="Control de música"
              >
                {/* Spinning Farm Barn & Sunflower Disc Record */}
                <div
                  className={`relative w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center border-2 border-white overflow-hidden ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '3s' }}
                >
                  <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-100" />
                  </div>
                </div>

                {/* Play/Pause icon + Track number + Equalizer wave */}
                <div className="flex items-center gap-1.5">
                  {isPlaying ? (
                    <>
                      <Pause size={15} className="fill-current" />
                      <span className="text-xs font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
                        {PLAYLIST[currentTrackIndex].title} / 2
                      </span>
                      <div className="flex items-end gap-0.5 h-3.5 ml-0.5" aria-hidden="true">
                        <span
                          className="w-1 bg-white rounded-full animate-pulse h-2"
                          style={{ animationDuration: '0.4s' }}
                        />
                        <span
                          className="w-1 bg-white rounded-full animate-pulse h-3.5"
                          style={{ animationDuration: '0.6s' }}
                        />
                        <span
                          className="w-1 bg-white rounded-full animate-pulse h-2.5"
                          style={{ animationDuration: '0.5s' }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Play size={15} className="fill-current ml-0.5" />
                      <span className="text-xs font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
                        Reanudar
                      </span>
                      <Music size={14} className="opacity-80" />
                    </>
                  )}
                </div>
              </button>

              {/* Quick Mute button pin */}
              <button
                onClick={toggleMute}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-red-600 shadow-md flex items-center justify-center hover:scale-110 transition-transform border border-amber-200 cursor-pointer"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
);

BackgroundMusic.displayName = 'BackgroundMusic';
