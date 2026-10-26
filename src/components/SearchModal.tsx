import React, { useState, useEffect } from 'react';
import { Search, X, Play, Info, Sparkles, Film, Swords } from 'lucide-react';
import { useSearchTitlesQuery } from '../hooks/useStreamingQueries';
import { MediaTitle } from '../types/streaming';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onPlayTitle,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'movie' | 'anime'>('all');

  // Debounce search query by 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // TanStack React Query cached search
  const { data: results, isLoading } = useSearchTitlesQuery(debouncedQuery, category);

  const quickPicks = [
    'Dune: Part Two',
    'Frieren',
    'Oppenheimer',
    'Demon Slayer',
    'Blade Runner 2049',
    'Solo Leveling',
    'Attack on Titan',
    'Shōgun'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-surface-container rounded-2xl p-6 shadow-2xl border border-surface-container-highest/80 flex flex-col gap-5 mt-10">
        {/* Header & Search Input */}
        <div className="flex items-center justify-between gap-3 border-b border-surface-container-highest pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, anime, genre, studio, or mood..."
              className="w-full bg-transparent text-on-surface text-base sm:text-lg focus:outline-none placeholder:text-on-surface-variant/50"
            />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-on-surface-variant hover:text-on-surface px-2 py-1"
            >
              Clear
            </button>
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-full border border-surface-container-highest/60">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                category === 'all'
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setCategory('movie')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                category === 'movie'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              MOVIES
            </button>
            <button
              onClick={() => setCategory('anime')}
              className={`px-3 py-1 rounded-full text-xs font-label-caps font-bold transition-all ${
                category === 'anime'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ANIME
            </button>
          </div>

          {/* Quick Tag Recommendations */}
          <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-label-caps text-on-surface-variant">TRENDING:</span>
            {quickPicks.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-[11px] text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex flex-col gap-3 min-h-[200px] max-h-[60vh] overflow-y-auto pr-1">
          {isLoading && (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-surface-container-low animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && debouncedQuery && results && results.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center text-on-surface-variant gap-2">
              <Sparkles className="w-8 h-8 text-on-surface-variant/40" />
              <p className="text-sm font-semibold">No titles found matching "{debouncedQuery}"</p>
              <p className="text-xs text-on-surface-variant/80">
                Try searching for "Chrono Dynasty", "Anime", "Cyberpunk", or "IMAX".
              </p>
            </div>
          )}

          {!debouncedQuery && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-label-caps text-on-surface-variant font-bold">FREQUENTLY SEARCHED</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPicks.map((pick) => (
                  <button
                    key={pick}
                    onClick={() => setSearchQuery(pick)}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high flex items-center justify-between text-left transition-colors text-xs font-semibold text-on-surface group"
                  >
                    <span>{pick}</span>
                    <Search className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLoading && results && results.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-label-caps text-on-surface-variant font-bold">
                {results.length} RESULTS FOUND
              </span>
              {results.map((title) => (
                <div
                  key={title.id}
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high flex items-center justify-between gap-4 transition-colors group cursor-pointer border border-surface-container-highest/40"
                  onClick={() => {
                    onOpenDetails(title);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3 truncate">
                    <img
                      src={title.posterUrl}
                      alt={title.title}
                      className="w-12 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex flex-col truncate">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-label-caps text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            title.category === 'anime'
                              ? 'bg-secondary-container/40 text-secondary'
                              : 'bg-primary-container/20 text-primary'
                          }`}
                        >
                          {title.category.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-badge-spec text-on-surface-variant">
                          ★ {title.rating}
                        </span>
                      </div>
                      <h4 className="font-title-card text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                        {title.title}
                      </h4>
                      <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                        {title.genre.join(' • ')} • {title.specs[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayTitle(title);
                        onClose();
                      }}
                      className="p-2 rounded-full bg-primary-container text-white hover:scale-105 transition-transform"
                      title="Play"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
