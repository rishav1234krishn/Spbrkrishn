import React, { useState } from 'react';
import { Play, Film, Swords, Plus, Check, SlidersHorizontal, Info } from 'lucide-react';
import { MediaTitle } from '../types/streaming';
import { MOCK_TITLES } from '../api/streamingApi';

interface HeroBillboardProps {
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
  onToggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  onPlayTitle,
  onOpenDetails,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  const [universe, setUniverse] = useState<'cinema' | 'anime'>('cinema');
  const [bitrateMode, setBitrateMode] = useState<'65' | 'hdr'>('65');

  const cinemaTitle = MOCK_TITLES.find(t => t.id === 'chrono-dynasty') || MOCK_TITLES[0];
  const animeTitle = MOCK_TITLES.find(t => t.id === 'blade-celestial-gods') || MOCK_TITLES[1];

  const currentTitle = universe === 'cinema' ? cinemaTitle : animeTitle;
  const inWatchlist = isInWatchlist(currentTitle.id);

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest" id="hero-feature">
      {/* Background Media with Cinema & Anime layers */}
      <div className="relative w-full min-h-[640px] lg:min-h-[760px] flex items-end">
        {/* Cinema Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            universe === 'cinema' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${cinemaTitle.backdropUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />
        </div>

        {/* Anime Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            universe === 'anime' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${animeTitle.backdropUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pb-14 pt-12 max-w-7xl mx-auto flex flex-col gap-4">
          {/* Dual Universe Switcher Pill */}
          <div className="flex items-center gap-1 bg-surface-container-low/80 backdrop-blur-md p-1.5 rounded-full w-fit shadow-xl border border-surface-container-highest/60">
            <button
              onClick={() => setUniverse('cinema')}
              className={`px-4 py-1.5 rounded-full font-label-caps text-xs flex items-center gap-2 transition-all ${
                universe === 'cinema'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.6)] font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>CINEMA MASTER: SOLARIS ODYSSEY</span>
            </button>
            <button
              onClick={() => setUniverse('anime')}
              className={`px-4 py-1.5 rounded-full font-label-caps text-xs flex items-center gap-2 transition-all ${
                universe === 'anime'
                  ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_15px_rgba(104,7,186,0.6)] font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>ANIME APEX: CELESTIAL BLADE</span>
            </button>
          </div>

          {/* Specs Badges Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md font-badge-spec text-[11px] font-bold tracking-wider ${
                universe === 'cinema'
                  ? 'bg-primary-container/20 text-primary border border-primary/30'
                  : 'bg-secondary-container/30 text-secondary border border-secondary/30'
              }`}
            >
              {universe === 'cinema' ? '99% MATCH' : 'MAL 9.48 • TOP RANKED'}
            </span>
            {currentTitle.specs.map((spec, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-surface-container-high/90 text-on-surface font-badge-spec text-[11px] border border-surface-container-highest/60"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Master Title & Kicker */}
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <span
              className={`font-label-caps text-xs tracking-widest uppercase font-bold ${
                universe === 'cinema' ? 'text-primary' : 'text-secondary'
              }`}
            >
              {currentTitle.kicker}
            </span>

            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              {universe === 'cinema' ? (
                <>
                  CHRONO DYNASTY:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-on-primary-container to-secondary">
                    INFINITE VEIL
                  </span>
                </>
              ) : (
                <>
                  BLADE OF THE{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary-fixed-dim to-primary">
                    CELESTIAL GODS
                  </span>
                </>
              )}
            </h1>

            <p className="font-body-md text-sm sm:text-base text-on-surface-variant/90 max-w-2xl line-clamp-3 mt-1">
              {currentTitle.synopsis}
            </p>
          </div>

          {/* CTA & Bitrate Controls Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Main Stream Button */}
            <button
              onClick={() => onPlayTitle(currentTitle)}
              className={`px-6 py-3 rounded-full font-headline-md text-sm sm:text-base flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all font-bold ${
                universe === 'cinema'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(229,9,20,0.7)] hover:bg-primary-container/90'
                  : 'bg-secondary-container text-on-secondary-container shadow-[0_0_30px_rgba(104,7,186,0.7)] hover:bg-secondary-container/90'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{universe === 'cinema' ? 'STREAM MASTER' : 'PLAY EPISODE 14 (SIMULCAST)'}</span>
            </button>

            {/* Trailer / Details Button */}
            <button
              onClick={() => onOpenDetails(currentTitle)}
              className="px-5 py-3 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface font-title-card text-sm flex items-center gap-2 hover:bg-surface-container-highest hover:text-primary transition-all border border-surface-container-highest/60"
            >
              <Info className="w-4 h-4" />
              <span>{universe === 'cinema' ? 'TRAILER 4K' : 'EPISODES & DETAILS'}</span>
            </button>

            {/* Watchlist Toggle Checkmark Control */}
            <button
              type="button"
              onClick={() => onToggleWatchlist(currentTitle.id)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary ${
                inWatchlist
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                  : 'bg-surface-container-low/90 backdrop-blur-md text-on-surface hover:text-primary hover:bg-surface-container-high'
              }`}
              title={inWatchlist ? 'Remove from My List' : 'Add to My List'}
              aria-label={inWatchlist ? 'Remove from My List' : 'Add to My List'}
            >
              {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>

            {/* Studio Master Bitrate Selector */}
            <div className="hidden md:flex items-center gap-1.5 p-1 bg-surface-container-low/90 backdrop-blur-md rounded-full shadow-lg border border-surface-container-highest/60">
              <SlidersHorizontal className="w-4 h-4 text-primary ml-2" />
              <button
                onClick={() => setBitrateMode('65')}
                className={`px-3 py-1 rounded-full font-badge-spec text-[11px] font-bold transition-all ${
                  bitrateMode === '65'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                65 Mbps STUDIO MASTER
              </button>
              <button
                onClick={() => setBitrateMode('hdr')}
                className={`px-3 py-1 rounded-full font-badge-spec text-[11px] font-bold transition-all ${
                  bitrateMode === 'hdr'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                4K HDR ECO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
