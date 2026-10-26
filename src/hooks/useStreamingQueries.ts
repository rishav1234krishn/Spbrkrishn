import { useQuery } from '@tanstack/react-query';
import { streamingApi, REAL_ALL_TITLES } from '../api/streamingApi';
import type { MediaTitle } from '../types/streaming';
import { useState, useEffect } from 'react';

export const queryKeys = {
  allTitles: ['titles', 'all'] as const,
  continueWatching: ['stream', 'continue-watching'] as const,
  top10Global: ['titles', 'top10-global'] as const,
  topAnime: (genre?: string) => ['titles', 'top-anime', genre || 'ALL'] as const,
  cinemaVault: (genre?: string) => ['titles', 'cinema-vault', genre || 'ALL'] as const,
  popularTv: ['titles', 'popular-tv'] as const,
  schedule: (day: string) => ['schedule', day] as const,
  sensoryMoods: ['sensory', 'moods'] as const,
  titleDetails: (id: string) => ['titles', 'detail', id] as const,
  search: (query: string, type?: string) => ['titles', 'search', query, type || 'all'] as const,
  tmdbStatus: ['tmdb', 'status'] as const,
};

// Hook for Top 10 Global Trending Streams (TMDB Movies + Jikan Anime)
export function useTop10GlobalQuery() {
  return useQuery({
    queryKey: queryKeys.top10Global,
    queryFn: () => streamingApi.getTop10Global(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

// Hook for Continue Watching
export function useContinueWatchingQuery() {
  return useQuery({
    queryKey: queryKeys.continueWatching,
    queryFn: () => streamingApi.getContinueWatching(),
    staleTime: 1000 * 60 * 2,
  });
}

// Hook for Tokyo Anime Heatmap / Airing with Genre Filter (Jikan API)
export function useTokyoAnimeQuery(genre: string = 'ALL') {
  return useQuery({
    queryKey: queryKeys.topAnime(genre),
    queryFn: () => streamingApi.getTokyoTrendingAnime(genre),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook for Cinema Vault with Genre Filter (TMDB API)
export function useCinemaVaultQuery(genre: string = 'ALL CINEMA') {
  return useQuery({
    queryKey: queryKeys.cinemaVault(genre),
    queryFn: () => streamingApi.getCinemaVault(genre),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook for Weekly Tokyo Simulcast Schedule (Jikan API)
export function useSimulcastScheduleQuery(day: string = 'FRI') {
  return useQuery({
    queryKey: queryKeys.schedule(day),
    queryFn: () => streamingApi.getSimulcastSchedule(day),
    staleTime: 1000 * 60 * 10,
  });
}

// Hook for Sensory Moods
export function useSensoryMoodsQuery() {
  return useQuery({
    queryKey: queryKeys.sensoryMoods,
    queryFn: () => streamingApi.getSensoryMoods(),
    staleTime: 1000 * 60 * 15,
  });
}

// Hook for Search Titles with Debounced Query & Category
export function useSearchTitlesQuery(query: string, type: 'all' | 'movie' | 'tv' | 'anime' = 'all') {
  return useQuery({
    queryKey: queryKeys.search(query, type),
    queryFn: () => streamingApi.searchTitles(query, type),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 3,
  });
}

// Hook for Title Details by ID
export function useTitleDetailQuery(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.titleDetails(id) : ['titles', 'detail', 'none'],
    queryFn: () => (id ? streamingApi.getTitleById(id) : Promise.reject('No ID provided')),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

// Hook for TMDB provider status
export function useTmdbStatusQuery() {
  return useQuery({
    queryKey: queryKeys.tmdbStatus,
    queryFn: () => streamingApi.getTmdbStatus(),
    staleTime: 1000 * 60 * 30,
  });
}

// Persistent Watchlist Hook backed by localStorage & React State
const WATCHLIST_STORAGE_KEY = 'spbr_user_watchlist';

// Migration map from old fictional IDs to real TMDB / MAL IDs
const LEGACY_ID_MIGRATIONS: Record<string, string> = {
  'chrono-dynasty': 'tmdb-693134',
  'blade-celestial-gods': 'mal-52991',
  'vortex-protocol': 'tmdb-335984',
  'shadow-sovereign': 'mal-52299',
  'neo-shinjuku-2099': 'mal-42249',
  'whispers-in-the-void': 'tmdb-872585',
  'the-geneva-cipher': 'tmdb-155',
  'aether-event-horizon': 'tmdb-157336',
  'apex-dragon-rebirth': 'mal-16498',
  'arcana-grimoire-zero': 'mal-5114',
};

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        // Cleanse any legacy fictional IDs to real IDs
        const migrated = parsed.map(id => LEGACY_ID_MIGRATIONS[id] || id);
        return Array.from(new Set(migrated));
      }
      return ['tmdb-693134', 'mal-52991']; // Dune: Part Two & Frieren: Beyond Journey's End
    } catch {
      return ['tmdb-693134', 'mal-52991'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlistIds));
    } catch (e) {
      console.warn('Unable to persist watchlist to localStorage', e);
    }
  }, [watchlistIds]);

  const toggleWatchlist = (id: string) => {
    setWatchlistIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  const isInWatchlist = (id: string) => watchlistIds.includes(id);

  const watchlistItems: MediaTitle[] = REAL_ALL_TITLES.filter(title => watchlistIds.includes(title.id));

  return {
    watchlistIds,
    watchlistItems,
    toggleWatchlist,
    isInWatchlist,
  };
}
