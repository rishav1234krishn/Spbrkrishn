import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { streamingApi, MOCK_TITLES } from '../api/streamingApi';
import { MediaTitle } from '../types/streaming';
import { useState, useEffect } from 'react';

export const queryKeys = {
  allTitles: ['titles', 'all'] as const,
  continueWatching: ['stream', 'continue-watching'] as const,
  top10Global: ['titles', 'top10-global'] as const,
  top10Anime: (genre?: string) => ['titles', 'top10-anime', genre || 'ALL'] as const,
  cinemaVault: (genre?: string) => ['titles', 'cinema-vault', genre || 'ALL'] as const,
  schedule: (day: string) => ['schedule', day] as const,
  sensoryMoods: ['sensory', 'moods'] as const,
  titleDetails: (id: string) => ['titles', 'detail', id] as const,
  search: (query: string, category?: string) => ['titles', 'search', query, category || 'all'] as const,
};

// Hook for Top 10 Global Streams
export function useTop10GlobalQuery() {
  return useQuery({
    queryKey: queryKeys.top10Global,
    queryFn: () => streamingApi.getTop10Global(),
    staleTime: 1000 * 60 * 5, // 5 minutes
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

// Hook for Tokyo Anime Heatmap with Genre Filter
export function useTokyoAnimeQuery(genre: string = 'ALL') {
  return useQuery({
    queryKey: queryKeys.top10Anime(genre),
    queryFn: () => streamingApi.getTokyoTop10Anime(genre),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook for Cinema Vault with Genre Filter
export function useCinemaVaultQuery(genre: string = 'ALL CINEMA') {
  return useQuery({
    queryKey: queryKeys.cinemaVault(genre),
    queryFn: () => streamingApi.getCinemaVault(genre),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook for Weekly Tokyo Simulcast Schedule
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
export function useSearchTitlesQuery(query: string, category: string = 'all') {
  return useQuery({
    queryKey: queryKeys.search(query, category),
    queryFn: () => streamingApi.searchTitles(query, category),
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

// Persistent Watchlist Hook backed by localStorage & React State
const WATCHLIST_STORAGE_KEY = 'spbr_user_watchlist';

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['chrono-dynasty', 'blade-celestial-gods'];
    } catch {
      return ['chrono-dynasty', 'blade-celestial-gods'];
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

  const watchlistItems: MediaTitle[] = MOCK_TITLES.filter(title => watchlistIds.includes(title.id));

  return {
    watchlistIds,
    watchlistItems,
    toggleWatchlist,
    isInWatchlist,
  };
}
