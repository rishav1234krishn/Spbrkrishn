export type MediaCategory = 'movie' | 'tv' | 'anime';

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration?: string;
  thumbnailUrl?: string;
  airDate?: string;
  synopsis?: string;
}

export interface MediaTitle {
  id: string;
  title: string;
  originalTitle?: string;
  japaneseTitle?: string;
  kicker?: string;
  category: MediaCategory;
  mediaType?: 'movie' | 'tv' | 'anime';
  genre: string[];
  rating: number; // e.g. 8.6 TMDB or 9.29 MAL
  criticScore?: number; // e.g. 94%
  voteCount?: number;
  popularity?: number;
  matchPercentage: number;
  specs: string[]; // e.g. ["4K UHD", "IMAX ENHANCED", "DOLBY VISION", "ATMOS 9.1"]
  posterUrl: string;
  backdropUrl: string;
  videoUrl?: string;
  trailerUrl?: string;
  trailerEmbedUrl?: string;
  synopsis: string;
  duration?: string;
  contentRating: string; // PG-13, TV-MA, PG, R, etc.
  studio?: string;
  network?: string;
  releaseYear: number;
  releaseDate?: string;
  isSimulcast?: boolean;
  simulcastEpisode?: string;
  broadcastTime?: string;
  episodes?: Episode[];
  moodTag?: string;
  tmdbId?: number;
  malId?: number;
  status?: string;
  sourceProvider: 'tmdb' | 'jikan' | 'curated';
}

export interface SimulcastScheduleItem {
  id: string;
  malId?: number;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  timeJST: string;
  network: string;
  title: string;
  episode: string;
  specs: string;
  thumbnailUrl: string;
  score?: number;
  isLive?: boolean;
}

export interface ContinueWatchingItem {
  id: string;
  titleId: string;
  title: string;
  subtitle: string;
  progressPercent: number;
  remainingTime: string;
  badge: string;
  thumbnailUrl: string;
  videoUrl?: string;
  trailerEmbedUrl?: string;
  category: MediaCategory;
}

export interface SensoryMood {
  id: string;
  name: string;
  badge: string;
  iconName: string;
  description: string;
  titleCount: number;
  soundCalib: string;
  accentColor: string;
  bgImage: string;
  sampleTitles?: string[];
}

export interface ApiResponse<T> {
  status: 'ok' | 'error';
  source: 'tmdb' | 'jikan' | 'verified_cache';
  authenticated?: boolean;
  message?: string;
  data: T;
  total?: number;
  page?: number;
}
