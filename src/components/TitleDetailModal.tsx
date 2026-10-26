import React, { useState } from 'react';
import { X, Play, Plus, Check, Star, Film, Swords, Calendar, Clock, Volume2 } from 'lucide-react';
import { MediaTitle, Episode } from '../types/streaming';

interface TitleDetailModalProps {
  title: MediaTitle | null;
  onClose: () => void;
  onPlayTitle: (title: MediaTitle) => void;
  onToggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

export const TitleDetailModal: React.FC<TitleDetailModalProps> = ({
  title,
  onClose,
  onPlayTitle,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  if (!title) return null;

  const inWatchlist = isInWatchlist(title.id);
  const [activeTab, setActiveTab] = useState<'episodes' | 'specs'>('episodes');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest/80 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header with Backdrop */}
        <div
          className="relative w-full aspect-[21/9] sm:aspect-[24/9] bg-cover bg-center flex items-end p-6"
          style={{ backgroundImage: `url('${title.backdropUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/40 to-transparent" />

          <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
            <span
              className={`font-label-caps text-xs tracking-wider uppercase font-bold ${
                title.category === 'anime' ? 'text-secondary' : 'text-primary'
              }`}
            >
              {title.kicker || (title.category === 'anime' ? 'SIMULCAST EXCLUSIVE' : 'SPBR PRESTIGE CINEMA')}
            </span>
            <h2 className="font-display-hero text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
              {title.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => {
                  onPlayTitle(title);
                  onClose();
                }}
                className={`px-5 py-2.5 rounded-full font-headline-md text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all ${
                  title.category === 'anime'
                    ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_20px_#6807ba]'
                    : 'bg-primary-container text-on-primary-container shadow-[0_0_20px_#e50914]'
                }`}
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>{title.category === 'anime' ? 'PLAY SIMULCAST' : 'STREAM MASTER'}</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(title.id)}
                className={`px-4 py-2.5 rounded-full font-badge-spec text-xs font-bold flex items-center gap-1.5 transition-all border border-surface-container-highest ${
                  inWatchlist
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-container-high/80 text-on-surface hover:bg-surface-container-highest hover:text-primary'
                }`}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{inWatchlist ? 'IN MY LIST' : 'ADD TO LIST'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Details & Specs Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Metadata Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-highest/60 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{title.rating} {title.category === 'anime' ? 'MAL' : 'Rating'}</span>
              </span>
              <span className="bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-badge-spec">
                {title.contentRating}
              </span>
              <span className="bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-badge-spec">
                {title.duration || 'Feature'}
              </span>
              <span className="bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-badge-spec">
                {title.releaseYear}
              </span>
              {title.studio && (
                <span className="text-on-surface-variant font-medium">Studio: {title.studio}</span>
              )}
            </div>

            {/* Spec tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {title.specs.map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-badge-spec text-[10px]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div className="flex flex-col gap-1.5">
            <h4 className="font-headline-md text-sm font-bold text-on-surface">Synopsis</h4>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              {title.synopsis}
            </p>
          </div>

          {/* Tabs for Episodes or Technical Specs */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-surface-container-highest/60 pb-2">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`font-label-caps text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'episodes'
                    ? 'bg-surface-container-high text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {title.category === 'anime' ? 'EPISODES & SIMULCASTS' : 'CHAPTERS & BONUS CUTS'}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`font-label-caps text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'specs'
                    ? 'bg-surface-container-high text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                AUDIO-VISUAL MASTER SPECS
              </button>
            </div>

            {/* Episodes List */}
            {activeTab === 'episodes' && (
              <div className="flex flex-col gap-3">
                {title.episodes && title.episodes.length > 0 ? (
                  title.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      onClick={() => {
                        onPlayTitle(title);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between gap-4 cursor-pointer group border border-surface-container-highest/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={ep.thumbnailUrl} alt={ep.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-badge-spec text-[10px] text-primary font-bold">
                            EPISODE {ep.episodeNumber} • {ep.duration}
                          </span>
                          <h5 className="font-title-card text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                            {ep.title}
                          </h5>
                          <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1">
                            {ep.synopsis}
                          </p>
                        </div>
                      </div>

                      <button className="px-3 py-1 rounded-md bg-surface-container-highest text-xs font-bold text-on-surface group-hover:bg-primary-container group-hover:text-white transition-colors shrink-0">
                        Play
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-surface-container text-xs text-on-surface-variant flex items-center justify-between">
                    <span>Feature Film Full Length Stream (No separate episodes).</span>
                    <button
                      onClick={() => {
                        onPlayTitle(title);
                        onClose();
                      }}
                      className="px-3 py-1 rounded bg-primary-container text-white font-bold"
                    >
                      Play Master Feature
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Technical Specs Tab */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-container border border-surface-container-highest/40 flex flex-col gap-1">
                  <span className="font-label-caps text-[10px] text-primary font-bold">VIDEO ENCODE</span>
                  <p className="text-on-surface font-semibold">AV1 10-bit HDR (BT.2020 Color Space)</p>
                  <p className="text-on-surface-variant text-[11px]">Direct 65mm camera negative scan • Lossless DCI-P3 timing</p>
                </div>

                <div className="p-3 rounded-xl bg-surface-container border border-surface-container-highest/40 flex flex-col gap-1">
                  <span className="font-label-caps text-[10px] text-secondary font-bold">SPATIAL AUDIO</span>
                  <p className="text-on-surface font-semibold">Dolby Atmos 9.1.4 (24-bit / 48kHz)</p>
                  <p className="text-on-surface-variant text-[11px]">Object-based height channels calibrated for reference home theaters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
