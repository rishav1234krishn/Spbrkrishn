import React, { useState } from 'react';
import { X, Bookmark, Trash2, Play, Info } from 'lucide-react';
import { MediaTitle } from '../types/streaming';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaTitle[];
  onRemoveItem: (id: string) => void;
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onPlayTitle,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  const [filter, setFilter] = useState<'all' | 'movie' | 'anime'>('all');

  const filteredItems = items.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container h-full p-6 flex flex-col justify-between shadow-2xl border-l border-surface-container-highest/60 overflow-y-auto animate-in slide-in-from-right duration-250">
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-primary" />
              <h3 className="font-headline-md text-lg font-bold text-on-surface">My Watchlist</h3>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-xs font-badge-spec text-on-surface-variant font-bold">
                {items.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-full border border-surface-container-highest/60 w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                filter === 'all'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ALL ({items.length})
            </button>
            <button
              onClick={() => setFilter('movie')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                filter === 'movie'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              MOVIES
            </button>
            <button
              onClick={() => setFilter('anime')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                filter === 'anime'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ANIME
            </button>
          </div>

          {/* Items List */}
          <div className="flex flex-col gap-3">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                <Bookmark className="w-8 h-8 text-on-surface-variant/40" />
                <p className="text-sm font-semibold">Your watchlist is currently empty</p>
                <p className="text-xs text-on-surface-variant/70">
                  Tap the + button on any movie or anime to save it here for instant streaming.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-3 border border-surface-container-highest/40 group"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer truncate"
                    onClick={() => {
                      onOpenDetails(item);
                      onClose();
                    }}
                  >
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-12 h-16 rounded-lg object-cover shrink-0 shadow-sm"
                    />
                    <div className="flex flex-col truncate">
                      <span
                        className={`text-[9px] font-label-caps font-bold ${
                          item.category === 'anime' ? 'text-secondary' : 'text-primary'
                        }`}
                      >
                        {item.category.toUpperCase()} • {item.rating}★
                      </span>
                      <h4 className="font-title-card text-xs sm:text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant font-mono truncate">
                        {item.specs[0] || '4K UHD'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onPlayTitle(item);
                        onClose();
                      }}
                      className="p-2 rounded-full bg-primary-container text-white hover:scale-110 transition-transform shadow-md"
                      title="Stream Now"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-full text-on-surface-variant hover:text-red-400 hover:bg-surface-container transition-colors"
                      title="Remove from list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-surface-container-highest/60 text-[11px] text-on-surface-variant/70 text-center font-mono">
          Synced across SPBR mobile, web &amp; Apple TV profiles
        </div>
      </div>
    </div>
  );
};
