export type MediaCategory = 'movie' | 'anime';

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  thumbnailUrl: string;
  airDate: string;
  synopsis: string;
}

export interface MediaTitle {
  id: string;
  title: string;
  kicker?: string;
  category: MediaCategory;
  genre: string[];
  rating: number; // e.g. 9.48
  criticScore?: number; // e.g. 99%
  matchPercentage: number;
  specs: string[]; // e.g. ["4K UHD", "IMAX ENHANCED", "DOLBY VISION", "ATMOS 9.1.4"]
  posterUrl: string;
  backdropUrl: string;
  videoUrl?: string;
  synopsis: string;
  duration?: string;
  contentRating: string; // PG-13, TV-MA, etc.
  studio?: string;
  releaseYear: number;
  isSimulcast?: boolean;
  simulcastEpisode?: string;
  broadcastTime?: string;
  episodes?: Episode[];
  moodTag?: string;
}

export interface SimulcastScheduleItem {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  timeJST: string;
  network: string;
  title: string;
  episode: string;
  specs: string;
  thumbnailUrl: string;
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
}
