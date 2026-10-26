import type {
  MediaTitle,
  SimulcastScheduleItem,
  ContinueWatchingItem,
  SensoryMood,
} from '../types/streaming.ts';
import { VERIFIED_REAL_TMDB_TITLES } from '../../server/tmdb.ts';
import { VERIFIED_REAL_ANIME_TITLES, VERIFIED_REAL_SCHEDULE } from '../../server/jikan.ts';

// Comprehensive real verified catalog for instant initial render
export const REAL_ALL_TITLES: MediaTitle[] = [
  ...VERIFIED_REAL_TMDB_TITLES,
  ...VERIFIED_REAL_ANIME_TITLES,
];
export const MOCK_TITLES: MediaTitle[] = REAL_ALL_TITLES;

// Continue Watching using real acclaimed titles
export const REAL_CONTINUE_WATCHING: ContinueWatchingItem[] = [
  {
    id: 'cw-1',
    titleId: 'tmdb-693134',
    title: 'Dune: Part Two',
    subtitle: 'Feature Film • Denis Villeneuve Master',
    progressPercent: 68,
    remainingTime: '52m left',
    badge: '4K IMAX',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    trailerEmbedUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    category: 'movie',
  },
  {
    id: 'cw-2',
    titleId: 'mal-52991',
    title: 'Frieren: Beyond Journey\'s End',
    subtitle: 'Ep 28 • The Journey Continues',
    progressPercent: 82,
    remainingTime: '5m left',
    badge: '9.29 MAL #1',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1015/138062.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=qgQunxD0qMo',
    trailerEmbedUrl: 'https://www.youtube.com/embed/qgQunxD0qMo',
    category: 'anime',
  },
  {
    id: 'cw-3',
    titleId: 'tmdb-tv-126308',
    title: 'Shōgun',
    subtitle: 'S1 : E8 • The Abyss of Life',
    progressPercent: 45,
    remainingTime: '32m left',
    badge: 'EMMY WINNER',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w1280/5zmiBoMw9OP0iN95G4b2v8m4tE4.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=yAN5uspNet8',
    trailerEmbedUrl: 'https://www.youtube.com/embed/yAN5uspNet8',
    category: 'tv',
  },
];

export const REAL_SENSORY_MOODS: SensoryMood[] = [
  {
    id: 'mood-adrenaline',
    name: 'Adrenaline Overload / Sakuga Battles',
    badge: '140+ BPM KINETIC',
    iconName: 'bolt',
    description: 'Relentless combat choreography, high-stakes orbital skirmishes, and peak sakuga showdowns.',
    titleCount: 184,
    soundCalib: '9.1.4 Surround Calibrated',
    accentColor: '#e50914',
    bgImage: 'https://image.tmdb.org/t/p/w1280/g6Rk3iUqN2Wk2qJ4c5V7W8X9Z0.jpg',
    sampleTitles: ['Mad Max: Fury Road', 'Attack on Titan', 'Jujutsu Kaisen', 'Solo Leveling'],
  },
  {
    id: 'mood-thriller',
    name: 'Late Night Heart Racers & Psychological Suspense',
    badge: 'TENSION PULSE',
    iconName: 'visibility',
    description: 'Claustrophobic cat-and-mouse thrillers and moral enigmas designed for dark rooms.',
    titleCount: 112,
    soundCalib: 'OLED True Black Master',
    accentColor: '#6807ba',
    bgImage: 'https://image.tmdb.org/t/p/w1280/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
    sampleTitles: ['The Dark Knight', 'Oppenheimer', 'The Last of Us', 'Steins;Gate'],
  },
  {
    id: 'mood-cyberpunk',
    name: 'Neon Dystopia / Cyberpunk & Speculative Noir',
    badge: 'CYBER SYNTH',
    iconName: 'terminal',
    description: 'Corporate syndicates, neural augmentations, analog synth scores, and wet obsidian streets.',
    titleCount: 95,
    soundCalib: 'Lossless 24-bit Audio',
    accentColor: '#dbb8ff',
    bgImage: 'https://image.tmdb.org/t/p/w1280/ilRyAZwNYSLo57g9asNAvXhQENb.jpg',
    sampleTitles: ['Blade Runner 2049', 'Cyberpunk: Edgerunners', 'Arcane'],
  },
  {
    id: 'mood-melancholy',
    name: 'Emotional Resonance & Cinematic Poignancy',
    badge: 'CATHARTIC PEAK',
    iconName: 'favorite',
    description: 'Heart-stirring human narratives, orchestral crescendo moments, and unforgettable parting memories.',
    titleCount: 88,
    soundCalib: 'Acoustic Orchestral',
    accentColor: '#e30744',
    bgImage: 'https://image.tmdb.org/t/p/w1280/rAiYTnrLEhkp9z25AvJJXT7Ubpp.jpg',
    sampleTitles: ['Interstellar', 'Frieren: Beyond Journey\'s End', 'Oshi no Ko'],
  },
  {
    id: 'mood-chill',
    name: 'Wholesome Warmth / Slice-of-Life & Wonder',
    badge: 'REST & RECHARGE',
    iconName: 'spa',
    description: 'Gentle spirits, heartwarming family bonds, comforting humor, and therapeutic pacing.',
    titleCount: 146,
    soundCalib: 'Cozy Lo-Fi Master',
    accentColor: '#ffb4aa',
    bgImage: 'https://image.tmdb.org/t/p/w1280/mSDmvRmCPg9gR0m9XQk9W51Kx0.jpg',
    sampleTitles: ['Spirited Away', 'Spy x Family', 'Bocchi the Rock!'],
  },
  {
    id: 'mood-lore',
    name: 'Epic Worldbuilders & Vast Fictional Mythologies',
    badge: 'DEEP LORE',
    iconName: 'public',
    description: 'Immense fictional mythologies, galactic diplomacy, generational struggles, and legendary empires.',
    titleCount: 130,
    soundCalib: '4K IMAX Immersion',
    accentColor: '#6807ba',
    bgImage: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    sampleTitles: ['Dune: Part Two', 'Shōgun', 'Fullmetal Alchemist: Brotherhood'],
  },
];

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch (err) {
    return fallback;
  }
}

export const streamingApi = {
  // Get all real titles
  async getAllTitles(): Promise<MediaTitle[]> {
    return REAL_ALL_TITLES;
  },

  // Continue Watching
  async getContinueWatching(): Promise<ContinueWatchingItem[]> {
    return REAL_CONTINUE_WATCHING;
  },

  // Top 10 Global Trending (Combines real TMDB movies and Jikan anime)
  async getTop10Global(): Promise<MediaTitle[]> {
    const movies = await safeFetch<MediaTitle[]>('/api/movies/trending', VERIFIED_REAL_TMDB_TITLES.filter(t => t.category === 'movie'));
    const anime = await safeFetch<MediaTitle[]>('/api/anime/trending', VERIFIED_REAL_ANIME_TITLES);

    // Interleave top verified movies & anime
    const combined: MediaTitle[] = [];
    const maxLen = Math.max(movies.length, anime.length);
    for (let i = 0; i < maxLen; i++) {
      if (movies[i]) combined.push(movies[i]);
      if (anime[i]) combined.push(anime[i]);
    }
    return combined.slice(0, 10);
  },

  // Tokyo Trending Anime from Jikan
  async getTokyoTrendingAnime(genre?: string): Promise<MediaTitle[]> {
    const url = genre && genre !== 'ALL' ? `/api/anime/airing?genre=${encodeURIComponent(genre)}` : '/api/anime/trending';
    return safeFetch<MediaTitle[]>(url, VERIFIED_REAL_ANIME_TITLES);
  },

  // Cinema Vault Movies & Series from TMDB
  async getCinemaVault(genre?: string): Promise<MediaTitle[]> {
    const url = genre && genre !== 'ALL' && genre !== 'ALL CINEMA'
      ? `/api/movies/popular?genre=${encodeURIComponent(genre)}`
      : '/api/movies/popular';
    return safeFetch<MediaTitle[]>(url, VERIFIED_REAL_TMDB_TITLES.filter(t => t.category === 'movie' || t.category === 'tv'));
  },

  // Weekly Tokyo Simulcast Broadcast Schedule from Jikan
  async getSimulcastSchedule(day: string = 'FRI'): Promise<SimulcastScheduleItem[]> {
    return safeFetch<SimulcastScheduleItem[]>(
      `/api/anime/schedule?day=${encodeURIComponent(day)}`,
      VERIFIED_REAL_SCHEDULE.filter(s => s.day === day || day === 'ALL')
    );
  },

  // Sensory moods
  async getSensoryMoods(): Promise<SensoryMood[]> {
    return REAL_SENSORY_MOODS;
  },

  // Search across TMDB & Jikan
  async searchTitles(query: string, type: 'all' | 'movie' | 'tv' | 'anime' = 'all'): Promise<MediaTitle[]> {
    const cleanQ = query.trim();
    if (!cleanQ) return [];

    return safeFetch<MediaTitle[]>(
      `/api/search?q=${encodeURIComponent(cleanQ)}&type=${encodeURIComponent(type)}`,
      REAL_ALL_TITLES.filter(t =>
        t.title.toLowerCase().includes(cleanQ.toLowerCase()) ||
        (t.japaneseTitle && t.japaneseTitle.toLowerCase().includes(cleanQ.toLowerCase())) ||
        t.genre.some(g => g.toLowerCase().includes(cleanQ.toLowerCase()))
      )
    );
  },

  // Get single title details by ID
  async getTitleById(id: string): Promise<MediaTitle> {
    const category = id.startsWith('mal-') ? 'anime' : id.startsWith('tv-') ? 'tv' : 'movie';
    const fallback = REAL_ALL_TITLES.find(t => t.id === id) || REAL_ALL_TITLES[0];

    return safeFetch<MediaTitle>(
      `/api/details/${category}/${encodeURIComponent(id)}`,
      fallback
    );
  },

  // Provider status check
  async getTmdbStatus(): Promise<{ configured: boolean; message: string; attribution: string }> {
    return safeFetch('/api/tmdb/status', {
      configured: false,
      message: 'TMDB credential status unavailable',
      attribution: 'This product uses the TMDB API but is not endorsed or certified by TMDB.',
    });
  }
};
