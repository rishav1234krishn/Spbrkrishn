import React from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTop10GlobalQuery } from '../hooks/useStreamingQueries';
import { MediaTitle } from '../types/streaming';

interface Top10SectionProps {
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
}

export const Top10Section: React.FC<Top10SectionProps> = ({
  onPlayTitle,
  onOpenDetails,
}) => {
  const { data: topTitles, isLoading, isError, refetch } = useTop10GlobalQuery();

  const rankBadges = ['#1 GLOBAL', 'ANIME #1', 'TRENDING', 'IMAX 4K', 'HOT RE-RUN'];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-secondary rounded-full" />
          <h3 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
            Top 10 Global Streams Today
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/40 font-badge-spec text-[11px] text-secondary hidden sm:inline-block">
            Real-time Verified Streams
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-surface-container-highest/60 transition-colors"
            title="Refresh stream rankings"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-surface-container-highest/60 transition-colors"
            title="Next rankings"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface-container-low aspect-[2/3] animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-xl bg-surface-container-low text-sm text-red-300">
          Failed to load stream rankings. Please try again.
        </div>
      )}

      {!isLoading && !isError && topTitles && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {topTitles.map((title, idx) => {
            const rank = idx + 1;
            const badge = rankBadges[idx] || `#${rank} RANKED`;
            return (
              <div
                key={title.id}
                onClick={() => onOpenDetails(title)}
                className="group relative rounded-xl overflow-hidden bg-surface-container-low flex flex-col hover:scale-105 transition-all shadow-xl border border-surface-container-highest/40 cursor-pointer"
              >
                {/* Poster container */}
                <div
                  className="relative w-full aspect-[2/3] bg-cover bg-center"
                  style={{ backgroundImage: `url('${title.posterUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTitle(title);
                    }}
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-[0_0_15px_#e50914] z-10"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>

                  {/* Large Metallic Rank Digit */}
                  <span
                    className={`absolute -bottom-4 -left-2 font-display-hero text-6xl sm:text-7xl lg:text-[80px] font-black text-transparent bg-clip-text select-none leading-none opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] ${
                      rank === 1
                        ? 'bg-gradient-to-b from-primary via-on-surface to-surface-container-highest'
                        : rank === 2
                        ? 'bg-gradient-to-b from-secondary via-on-surface to-surface-container-highest'
                        : 'bg-gradient-to-b from-on-surface via-on-surface-variant to-surface-container-highest'
                    }`}
                  >
                    {rank}
                  </span>

                  {/* Rank tag */}
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                      rank === 1
                        ? 'bg-primary-container text-on-primary-container shadow-[0_0_8px_#e50914]'
                        : rank === 2
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {badge}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 pl-12 flex flex-col gap-0.5">
                  <h4 className="font-title-card text-xs sm:text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {title.title}
                  </h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant/80 truncate">
                    {title.genre[0]} • {title.specs[1] || '4K HDR'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
