import React, { useState, useEffect } from 'react';
import { Search, Bell, Bookmark, Tv, Film } from 'lucide-react';

interface HeaderProps {
  activeCategory: 'all' | 'movie' | 'anime';
  onCategoryChange: (cat: 'all' | 'movie' | 'anime') => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onCategoryChange,
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
          : 'bg-surface-container-lowest/80 backdrop-blur-xl'
      }`}
    >
      <div className="h-20 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Left Section: Brand & Nav */}
        <div className="flex items-center gap-6 xl:gap-8">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onCategoryChange('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-on-primary-container" />
            </div>
            <span className="font-display-hero text-2xl font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">
              SPBR
            </span>
          </a>

          {/* Segmented Universe Switcher */}
          <div className="hidden sm:flex items-center bg-surface-container-lowest p-1 rounded-full border border-surface-container-highest/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-3 py-1 rounded-full font-label-caps text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => onCategoryChange('movie')}
              className={`px-3.5 py-1 rounded-full font-label-caps text-xs font-bold transition-all ${
                activeCategory === 'movie'
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              MOVIES
            </button>
            <button
              onClick={() => onCategoryChange('anime')}
              className={`px-3.5 py-1 rounded-full font-label-caps text-xs font-bold transition-all ${
                activeCategory === 'anime'
                  ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_15px_rgba(104,7,186,0.6)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ANIME
            </button>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a
              href="#hero-feature"
              className="text-on-surface-variant hover:text-on-surface transition-colors py-2 whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#spbr-cinema"
              className="text-on-surface-variant hover:text-on-surface transition-colors py-2 whitespace-nowrap"
            >
              Movies
            </a>
            <a
              href="#anime-universe"
              className="text-on-surface-variant hover:text-on-surface transition-colors py-2 whitespace-nowrap"
            >
              Anime Simulcasts
            </a>
            <a
              href="#sensory-engine"
              className="text-on-surface-variant hover:text-on-surface transition-colors py-2 whitespace-nowrap"
            >
              Sensory Moods
            </a>
            <a
              href="#stream-diagnostics"
              className="text-on-surface-variant hover:text-on-surface transition-colors py-2 whitespace-nowrap"
            >
              4K Lab
            </a>
          </nav>
        </div>

        {/* Right Section: Search, Watchlist, Alerts, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center bg-surface-container-low hover:bg-surface-container px-3 py-2 rounded-full border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary transition-all group"
            title="Search movies and anime (Cmd+K)"
          >
            <Search className="w-4 h-4 text-on-surface-variant mr-2 group-hover:text-primary transition-colors" />
            <span className="text-xs text-on-surface-variant/80 hidden md:inline-block w-28 xl:w-40 text-left truncate">
              Search titles, anime...
            </span>
            <kbd className="hidden sm:inline-block font-label-caps text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant ml-2 border border-surface-container-highest">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-container-highest/60 transition-colors focus:outline-none"
            title="My List"
          >
            <Bookmark className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#e50914]">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-container-highest/60 transition-colors focus:outline-none"
              title="Tokyo Simulcast Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_#6807ba]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 p-4 rounded-xl bg-surface-container-low border border-surface-container-highest shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest">
                  <span className="font-headline-md text-sm font-bold text-on-surface">Simulcast Alerts</span>
                  <span className="font-label-caps text-[10px] text-secondary">LIVE JST</span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
                    <p className="font-bold text-on-surface text-xs">Blade of Celestial Gods</p>
                    <p className="text-on-surface-variant text-[11px]">Episode 14 Simulcast is now LIVE in 4K 60FPS.</p>
                    <span className="text-[10px] text-secondary mt-1 block font-mono">14m ago</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
                    <p className="font-bold text-on-surface text-xs">Aether: Beyond Event Horizon</p>
                    <p className="text-on-surface-variant text-[11px]">65 Mbps Studio Master added to SPBR Cinema Vault.</p>
                    <span className="text-[10px] text-primary mt-1 block font-mono">2h ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge */}
          <div className="flex items-center gap-1.5 pl-1 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center font-bold text-xs text-white shadow-md">
                AK
              </div>
              <span className="absolute -bottom-1 -right-1 px-1 rounded-full font-label-caps text-[8px] bg-secondary-container text-on-secondary-container font-bold tracking-tight shadow-[0_0_8px_rgba(104,7,186,0.6)]">
                PRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
