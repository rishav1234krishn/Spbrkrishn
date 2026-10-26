import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  Languages,
  Subtitles,
  FastForward,
  SkipForward,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MediaTitle, Episode } from '../types/streaming';

interface VideoPlayerModalProps {
  title: MediaTitle | null;
  onClose: () => void;
  onSelectNextEpisode?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  title,
  onClose,
  onSelectNextEpisode,
}) => {
  if (!title) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('65 Mbps Studio Master');
  const [audioTrack, setAudioTrack] = useState(
    title.category === 'anime' ? 'Japanese (Original 24-bit PCM)' : 'English (Dolby Atmos 9.1.4)'
  );
  const [subtitleTrack, setSubtitleTrack] = useState('English (Styled Fansub)');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showToast, setShowToast] = useState('');

  // Hide controls after inactivity
  const controlsTimeoutRef = useRef<number | null>(null);
  const resetControlsTimeout = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 120);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 85);
      showNotice('Skipped Intro (+85s)');
    }
  };

  const showNotice = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(''), 2500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* Official Studio Trailer Embed or HTML5 Video element */}
      {title.trailerEmbedUrl ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
          <iframe
            src={`${title.trailerEmbedUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={`${title.title} Official Studio Trailer`}
            className="w-full h-full max-h-[85vh] aspect-video border-0 shadow-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* Honest Licensing & Preview Notice */}
          <div className="absolute bottom-3 inset-x-4 max-w-2xl mx-auto px-4 py-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-highest/60 text-[11px] text-center text-on-surface-variant flex items-center justify-center gap-2 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Official Studio Trailer &amp; Cinema Preview • Full features streamable through authorized regional partners</span>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={title.videoUrl}
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface-container-high/90 text-on-surface font-badge-spec text-xs shadow-2xl border border-primary/40 backdrop-blur-md flex items-center gap-2 z-50 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Top Bar Overlay */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 z-40 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`px-2.5 py-0.5 rounded font-label-caps text-xs font-bold ${
              title.category === 'anime'
                ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_10px_#6807ba]'
                : 'bg-primary-container text-on-primary-container shadow-[0_0_10px_#e50914]'
            }`}
          >
            {title.category.toUpperCase()} MASTER
          </span>
          <div>
            <h3 className="font-headline-md text-base sm:text-xl font-bold text-white drop-shadow-md truncate">
              {title.title}
            </h3>
            <span className="text-xs text-white/70 font-mono">
              AV1 Native • Widevine L1 • {quality}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
          title="Exit Player (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Skip Intro Pill (Anime & Cinema) */}
      <div
        className={`absolute bottom-28 right-6 z-40 transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={skipIntro}
          className="px-4 py-2 rounded-full bg-surface-container-highest/90 hover:bg-surface-container text-white font-label-caps text-xs font-bold backdrop-blur-md shadow-2xl border border-white/30 flex items-center gap-2 hover:scale-105 transition-all"
        >
          <FastForward className="w-4 h-4 text-primary" />
          <span>SKIP INTRO</span>
        </button>
      </div>

      {/* Bottom Controls Overlay */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-3 transition-opacity duration-300 z-40 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Timeline Slider */}
        <div className="w-full flex items-center gap-3">
          <span className="text-xs font-mono text-white/80 w-12 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-primary-container"
          />
          <span className="text-xs font-mono text-white/80 w-12">{formatTime(duration)}</span>
        </div>

        {/* Buttons Control Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Left Controls: Play, 10s Rewind, Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
              }}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          {/* Right Controls: Quality, Audio, Subtitles, Next Ep, Fullscreen */}
          <div className="flex items-center gap-2 relative">
            {/* Bitrate / Quality Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowQualityMenu(!showQualityMenu);
                  setShowAudioMenu(false);
                  setShowSubMenu(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-badge-spec text-xs flex items-center gap-1.5 transition-colors border border-white/20"
              >
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">{quality}</span>
                <span className="sm:hidden">4K</span>
              </button>

              {showQualityMenu && (
                <div className="absolute bottom-12 right-0 w-56 p-2 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl flex flex-col gap-1 z-50">
                  <span className="text-[10px] font-label-caps text-on-surface-variant px-2 py-1">STREAM QUALITY</span>
                  {['65 Mbps Studio Master', '4K HDR Eco (30 Mbps)', '1080p Pure Sakuga (60 FPS)', '720p Mobile'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q);
                        setShowQualityMenu(false);
                        showNotice(`Switched to ${q}`);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-colors ${
                        quality === q ? 'bg-primary-container text-white' : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Audio Track Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAudioMenu(!showAudioMenu);
                  setShowQualityMenu(false);
                  setShowSubMenu(false);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                title="Audio Tracks"
              >
                <Languages className="w-4 h-4 text-secondary" />
              </button>

              {showAudioMenu && (
                <div className="absolute bottom-12 right-0 w-64 p-2 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl flex flex-col gap-1 z-50">
                  <span className="text-[10px] font-label-caps text-on-surface-variant px-2 py-1">AUDIO TRACK</span>
                  {[
                    'Japanese (Original 24-bit PCM)',
                    'English (Dolby Atmos 9.1.4)',
                    'Spanish (Surround 5.1)',
                    'Directors Commentary (Founders RK & BS)'
                  ].map((track) => (
                    <button
                      key={track}
                      onClick={() => {
                        setAudioTrack(track);
                        setShowAudioMenu(false);
                        showNotice(`Audio: ${track}`);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-colors truncate ${
                        audioTrack === track ? 'bg-secondary-container text-white' : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtitles Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubMenu(!showSubMenu);
                  setShowQualityMenu(false);
                  setShowAudioMenu(false);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                title="Subtitles"
              >
                <Subtitles className="w-4 h-4 text-primary" />
              </button>

              {showSubMenu && (
                <div className="absolute bottom-12 right-0 w-52 p-2 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl flex flex-col gap-1 z-50">
                  <span className="text-[10px] font-label-caps text-on-surface-variant px-2 py-1">SUBTITLES</span>
                  {['Off', 'English (Styled Fansub)', 'Japanese (CC)', 'Spanish', 'French'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSubtitleTrack(sub);
                        setShowSubMenu(false);
                        showNotice(`Subtitles: ${sub}`);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-colors ${
                        subtitleTrack === sub ? 'bg-primary-container text-white' : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
