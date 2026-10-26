import React, { useState, useEffect } from 'react';
import { Search, Bell, Bookmark, Film, X, Check, ExternalLink, User, Settings, ShieldCheck } from 'lucide-react';
import { MediaTitle } from '../types/streaming';
import { MOCK_TITLES } from '../api/streamingApi';

const SIMULCAST_DISMISS_KEY = 'spbr_simulcast_alerts_dismissed';

interface HeaderProps {
  activeCategory: 'all' | 'movie' | 'anime';
  onCategoryChange: (cat: 'all' | 'movie' | 'anime') => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  onSelectTitle?: (title: MediaTitle) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onCategoryChange,
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  onSelectTitle,
}) => {
  // Priority 1: Visible by default on initial open unless user previously dismissed it in localStorage
  const [showNotifications, setShowNotifications] = useState<boolean>(() => {
    try {
      const isDismissed = localStorage.getItem(SIMULCAST_DISMISS_KEY);
      return isDismissed !== 'true';
    } catch {
      return true;
    }
  });

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [readAlerts, setReadAlerts] = useState<string[]>([]);

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
      if (e.key === 'Escape') {
        if (showNotifications) {
          handleCloseNotifications();
        }
        if (showProfileMenu) {
          setShowProfileMenu(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch, showNotifications, showProfileMenu]);

  // Priority 1: Tap X closes immediately and persists dismissal preference
  const handleCloseNotifications = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowNotifications(false);
    try {
      localStorage.setItem(SIMULCAST_DISMISS_KEY, 'true');
    } catch (err) {
      console.warn('Unable to persist simulcast dismissal:', err);
    }
  };

  // Priority 1: Notification bell reopens/toggles the panel
  const handleToggleNotifications = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfileMenu(false);
    setShowNotifications((prev) => {
      const next = !prev;
      if (next) {
        // Reopening via bell clears dismissal preference so it stays open until user explicitly closes it
        try {
          localStorage.removeItem(SIMULCAST_DISMISS_KEY);
        } catch {}
      }
      return next;
    });
  };

  // Priority 1: Clicking an alert reads it without unexpectedly closing the panel
  const handleAlertClick = (e: React.MouseEvent, titleId: string) => {
    e.stopPropagation();
    if (!readAlerts.includes(titleId)) {
      setReadAlerts((prev) => [...prev, titleId]);
    }
    if (onSelectTitle) {
      const match = MOCK_TITLES.find((t) => t.id === titleId);
      if (match) {
        onSelectTitle(match);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
          : 'bg-surface-container-lowest/80 backdrop-blur-xl'
      }`}
    >
      <div className="h-20 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Left Section: Brand & Universe Switcher */}
        <div className="flex items-center gap-4 sm:gap-6 xl:gap-8">
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
              type="button"
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
              type="button"
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
              type="button"
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
            type="button"
            onClick={onOpenSearch}
            className="flex items-center bg-surface-container-low hover:bg-surface-container px-3 py-2 rounded-full border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary transition-all group"
            title="Search movies and anime (Cmd+K)"
            aria-label="Search titles, anime, stars"
          >
            <Search className="w-4 h-4 text-on-surface-variant mr-1.5 sm:mr-2 group-hover:text-primary transition-colors" />
            <span className="text-xs text-on-surface-variant/80 hidden md:inline-block w-28 xl:w-40 text-left truncate">
              Search titles, anime...
            </span>
            <kbd className="hidden sm:inline-block font-label-caps text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant ml-2 border border-surface-container-highest">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist Quick Button */}
          <button
            type="button"
            onClick={onOpenWatchlist}
            className="relative p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-container-highest/60 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            title="My List"
            aria-label={`View watchlist with ${watchlistCount} items`}
          >
            <Bookmark className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#e50914]">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Priority 1: Notifications Bell & Simulcast Alerts Panel */}
          <div className="relative">
            <button
              type="button"
              onClick={handleToggleNotifications}
              className={`relative p-2 rounded-full border transition-colors focus:outline-none focus:ring-1 focus:ring-secondary ${
                showNotifications
                  ? 'bg-surface-container-high text-on-surface border-secondary/50 shadow-[0_0_12px_rgba(104,7,186,0.3)]'
                  : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-surface-container-highest/60'
              }`}
              title="Tokyo Simulcast Alerts"
              aria-label="Toggle simulcast alerts"
              aria-expanded={showNotifications}
            >
              <Bell className="w-4 h-4" />
              {/* Keep notification badge accurate: active dot indicator */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_#6807ba]" />
            </button>

            {/* Simulcast Alerts Dropdown Panel */}
            {showNotifications && (
              <div
                onClick={(e) => e.stopPropagation()}
                role="region"
                aria-label="Simulcast Alerts"
                className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-surface-container-low border border-surface-container-highest shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Panel Header with clearly visible X close button opposite the title */}
                <div className="flex items-center justify-between pb-2.5 border-b border-surface-container-highest">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-md text-sm font-bold text-on-surface">
                      Simulcast Alerts
                    </span>
                    <span className="font-label-caps text-[10px] text-secondary font-bold px-1.5 py-0.5 rounded bg-secondary-container/30">
                      LIVE JST
                    </span>
                  </div>

                  {/* Accessible Close Button */}
                  <button
                    type="button"
                    onClick={handleCloseNotifications}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCloseNotifications(e);
                      }
                    }}
                    aria-label="Close simulcast alerts"
                    className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                    title="Close simulcast alerts"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Alert List for Mobile & Desktop */}
                <div className="flex flex-col gap-2.5 text-xs overflow-y-auto max-h-[60vh] pr-0.5">
                  {/* Alert 1 */}
                  <div
                    onClick={(e) => handleAlertClick(e, 'blade-celestial-gods')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-highest/40 group/alert"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-on-surface text-xs group-hover/alert:text-secondary transition-colors">
                        Blade of Celestial Gods
                      </p>
                      {readAlerts.includes('blade-celestial-gods') && (
                        <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-on-surface-variant text-[11px] mt-0.5">
                      Episode 14 Simulcast is now LIVE in 4K 60FPS.
                    </p>
                    <span className="text-[10px] text-secondary mt-1 block font-mono">
                      14m ago
                    </span>
                  </div>

                  {/* Alert 2 */}
                  <div
                    onClick={(e) => handleAlertClick(e, 'aether-event-horizon')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-highest/40 group/alert"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-on-surface text-xs group-hover/alert:text-primary transition-colors">
                        Aether: Beyond Event Horizon
                      </p>
                      {readAlerts.includes('aether-event-horizon') && (
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-on-surface-variant text-[11px] mt-0.5">
                      65 Mbps Studio Master added to SPBR Cinema Vault.
                    </p>
                    <span className="text-[10px] text-primary mt-1 block font-mono">
                      2h ago
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Priority 2: Working Profile Control with Popover Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
              }}
              className="flex items-center gap-1.5 pl-1 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary rounded-full"
              aria-label="User Profile & Settings"
              aria-expanded={showProfileMenu}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center font-bold text-xs text-white shadow-md group-hover:scale-105 transition-transform">
                  AK
                </div>
                <span className="absolute -bottom-1 -right-1 px-1 rounded-full font-label-caps text-[8px] bg-secondary-container text-on-secondary-container font-bold tracking-tight shadow-[0_0_8px_rgba(104,7,186,0.6)]">
                  PRO
                </span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                role="menu"
                className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-surface-container-low border border-surface-container-highest shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                      AK
                    </div>
                    <div>
                      <span className="font-title-card text-xs font-bold text-on-surface block">
                        Alex Kramer
                      </span>
                      <span className="text-[10px] text-secondary font-mono">
                        b43698051@gmail.com
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(false)}
                    aria-label="Close profile menu"
                    className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-surface-container flex items-center justify-between">
                    <span className="text-on-surface-variant text-[11px]">Subscription</span>
                    <span className="font-bold text-primary font-badge-spec text-[11px]">
                      SPBR STUDIO PRO
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container flex items-center justify-between">
                    <span className="text-on-surface-variant text-[11px]">Audio Engine</span>
                    <span className="font-bold text-secondary font-mono text-[11px]">
                      Dolby Atmos 9.1
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container flex items-center justify-between">
                    <span className="text-on-surface-variant text-[11px]">Watchlist Queue</span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenWatchlist();
                      }}
                      className="text-primary hover:underline font-bold text-[11px]"
                    >
                      {watchlistCount} items saved
                    </button>
                  </div>
                </div>

                <div className="pt-1 border-t border-surface-container-highest flex items-center justify-between">
                  <a
                    href="#stream-diagnostics"
                    onClick={() => setShowProfileMenu(false)}
                    className="text-[11px] font-title-card text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Playback Lab</span>
                  </a>
                  <span className="text-[10px] text-emerald-400 font-mono">AV1 L1 Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
