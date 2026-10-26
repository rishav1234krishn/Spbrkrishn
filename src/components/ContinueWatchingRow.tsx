import React from 'react';
import { Play, MoreVertical, RefreshCw } from 'lucide-react';
import { useContinueWatchingQuery } from '../hooks/useStreamingQueries';
import { ContinueWatchingItem, MediaTitle } from '../types/streaming';
import { MOCK_TITLES } from '../api/streamingApi';

interface ContinueWatchingRowProps {
  onPlayItem: (title: MediaTitle) => void;
  onOpenWatchlist: () => void;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({
  onPlayItem,
  onOpenWatchlist,
}) => {
  const { data: items, isLoading, isError, error, refetch } = useContinueWatchingQuery();

  const handleCardClick = (item: ContinueWatchingItem) => {
    const fullTitle = MOCK_TITLES.find(t => t.id === item.titleId) || {
      id: item.titleId,
      title: item.title,
      category: item.category,
      genre: ['Action', 'Thriller'],
      rating: 9.5,
      matchPercentage: 98,
      specs: [item.badge, '4K UHD', 'ATMOS'],
      posterUrl: item.thumbnailUrl,
      backdropUrl: item.thumbnailUrl,
      videoUrl: item.videoUrl,
      synopsis: item.subtitle,
      contentRating: 'PG-13',
      releaseYear: 2025,
    };
    onPlayItem(fullTitle);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary-container rounded-full" />
          <h3 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
            Continue Watching for Alex
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-badge-spec text-[11px] text-on-surface-variant hidden sm:inline-block">
            {items ? `${items.length} Incomplete Masters` : 'Loading queue...'}
          </span>
        </div>
        <button
          onClick={onOpenWatchlist}
          className="font-title-card text-sm text-primary hover:text-on-primary-container flex items-center gap-1 transition-colors"
        >
          <span>Manage Queue</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface-container-low p-2 animate-pulse">
              <div className="w-full aspect-video bg-surface-container-high rounded-lg mb-3" />
              <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2" />
              <div className="h-3 bg-surface-container-high rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State with Retry Button */}
      {isError && (
        <div className="p-4 rounded-xl bg-surface-container-low border border-red-900/50 flex items-center justify-between">
          <div className="text-sm text-red-300">
            Failed to load continue watching list ({error instanceof Error ? error.message : 'Network error'})
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-xs text-on-surface flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Successful Cards Grid */}
      {!isLoading && !isError && items && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative rounded-xl overflow-hidden bg-surface-container-low hover:bg-surface-container transition-all hover:scale-[1.02] shadow-lg border border-surface-container-highest/40 cursor-pointer"
            >
              {/* Media Thumbnail Container */}
              <div
                className="relative w-full aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url('${item.thumbnailUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />

                {/* Floating Play Button */}
                <button
                  className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all ${
                    item.category === 'anime'
                      ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_20px_#6807ba]'
                      : 'bg-primary-container text-on-primary-container shadow-[0_0_20px_#e50914]'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>

                {/* Badges */}
                <span
                  className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md font-badge-spec text-[10px] font-bold ${
                    item.category === 'anime' ? 'text-secondary' : 'text-on-surface'
                  }`}
                >
                  {item.badge}
                </span>

                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md font-badge-spec text-[10px] text-primary font-bold">
                  {item.remainingTime}
                </span>
              </div>

              {/* Progress & Title Info */}
              <div className="p-3 flex flex-col gap-1.5">
                {/* Progress bar */}
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.category === 'anime'
                        ? 'bg-secondary-container shadow-[0_0_8px_#6807ba]'
                        : 'bg-primary-container shadow-[0_0_8px_#e50914]'
                    }`}
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h4 className="font-title-card text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">{item.subtitle}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item);
                    }}
                    className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
