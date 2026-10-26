import React, { useState } from 'react';
import { Swords, Flame, Calendar, Play, Bell, Zap, Moon } from 'lucide-react';
import { useTokyoAnimeQuery, useSimulcastScheduleQuery } from '../hooks/useStreamingQueries';
import { MediaTitle } from '../types/streaming';
import { MOCK_TITLES } from '../api/streamingApi';

interface AnimeUniverseSectionProps {
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
}

export const AnimeUniverseSection: React.FC<AnimeUniverseSectionProps> = ({
  onPlayTitle,
  onOpenDetails,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedDay, setSelectedDay] = useState('FRI');

  // React Query hooks
  const { data: animeTitles, isLoading: isAnimeLoading } = useTokyoAnimeQuery(selectedGenre);
  const { data: scheduleItems } = useSimulcastScheduleQuery(selectedDay);

  // Voting Arena State
  const [raidenVotes, setRaidenVotes] = useState(63);
  const [hasVoted, setHasVoted] = useState(false);

  const castVote = (candidate: 'raiden' | 'malakor') => {
    if (candidate === 'raiden') {
      setRaidenVotes(prev => Math.min(95, prev + 1));
    } else {
      setRaidenVotes(prev => Math.max(5, prev - 1));
    }
    setHasVoted(true);
  };

  const malakorVotes = 100 - raidenVotes;

  const days = [
    { code: 'MON', date: '24', count: '4 Premieres' },
    { code: 'TUE', date: '25', count: '2 Premieres' },
    { code: 'WED', date: '26', count: '5 Premieres' },
    { code: 'THU', date: '27', count: '3 Premieres' },
    { code: 'FRI', date: '28', count: '7 Premieres', isLive: true },
    { code: 'SAT', date: '29', count: '8 Premieres' },
    { code: 'SUN', date: '30', count: '6 Premieres' },
  ];

  const animeGenres = ['ALL', 'SHONEN', 'DARK FANTASY', 'CYBERPUNK', 'ACTION'];

  return (
    <section className="w-full bg-surface-container-lowest py-12" id="anime-universe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-highest/60 pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-[0_0_15px_rgba(104,7,186,0.6)] font-bold">
                <Swords className="w-4 h-4" />
                <span className="font-label-caps text-xs uppercase tracking-widest">SPBR ANIME ECOSYSTEM</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 border border-secondary/40 text-secondary font-badge-spec text-[11px] font-bold">
                Tokyo Same-Day Simulcasts • 60 FPS Sakuga
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-emerald-400 font-badge-spec text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ZERO BROADCAST DELAY
              </span>
            </div>

            <h2 className="font-display-hero text-2xl sm:text-4xl text-on-surface tracking-tight font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-secondary to-secondary-container">
                Day-and-Date Tokyo Simulcasts
              </span>{' '}
              &amp; Sakuga Masterpieces
            </h2>

            <p className="font-body-md text-sm text-on-surface-variant max-w-2xl">
              Direct feed from Akihabara &amp; Shinjuku studios. Zero translation delays, lossless subtitle styling, and 60FPS uncensored transfers.
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {animeGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-1.5 rounded-full font-label-caps text-xs font-bold transition-all ${
                  selectedGenre === genre
                    ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_15px_rgba(104,7,186,0.5)]'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-secondary'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Tokyo Heatmap Row */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              <h3 className="font-headline-lg text-lg sm:text-xl text-on-surface font-bold tracking-tight">
                Top Trending Anime in Tokyo Today
              </h3>
            </div>
            <span className="text-xs text-on-surface-variant font-mono">Live Akihabara Heatmap</span>
          </div>

          {isAnimeLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-[2/3] bg-surface-container-low rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {!isAnimeLoading && animeTitles && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {animeTitles.map((anime, idx) => (
                <div
                  key={anime.id}
                  onClick={() => onOpenDetails(anime)}
                  className="group relative rounded-xl overflow-hidden bg-surface-container-low flex flex-col hover:scale-105 transition-all shadow-xl border border-secondary-container/20 hover:border-secondary hover:shadow-[0_0_35px_rgba(104,7,186,0.5)] cursor-pointer"
                >
                  <div
                    className="relative w-full aspect-[2/3] bg-cover bg-center"
                    style={{ backgroundImage: `url('${anime.posterUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent" />

                    <span className="absolute -bottom-4 -left-2 font-display-hero text-6xl sm:text-7xl lg:text-[80px] font-black text-transparent bg-clip-text bg-gradient-to-b from-secondary via-secondary-fixed-dim to-surface-container-highest select-none leading-none opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)]">
                      {idx + 1}
                    </span>

                    <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                      <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[9px] shadow-[0_0_10px_#6807ba] font-bold">
                        {anime.studio || 'UFOTABLE'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-badge-spec text-[10px]">
                        ★ {anime.rating} MAL
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayTitle(anime);
                      }}
                      className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-[0_0_15px_#6807ba]"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>

                  <div className="p-3 pl-12 flex flex-col gap-0.5">
                    <h4 className="font-title-card text-xs sm:text-sm font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                      {anime.title}
                    </h4>
                    <p className="font-body-sm text-xs text-secondary font-semibold">
                      {anime.simulcastEpisode || 'Simulcast'}
                    </p>
                    <p className="font-badge-spec text-[10px] text-on-surface-variant/80 truncate">
                      4K Sakuga • 60FPS • Atmos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Tokyo Simulcast Broadcast Schedule Deck */}
        <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-4 shadow-2xl border border-surface-container-highest/60">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">
                Weekly Tokyo Simulcast Broadcast Schedule (JST)
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high font-badge-spec text-[11px] text-on-surface-variant flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYNCHRONIZED WITH TOKYO MX &amp; TV TOKYO
            </span>
          </div>

          {/* Day Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {days.map((d) => (
              <button
                key={d.code}
                onClick={() => setSelectedDay(d.code)}
                className={`p-3 rounded-xl flex flex-col gap-0.5 text-center transition-all cursor-pointer ${
                  selectedDay === d.code
                    ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_20px_rgba(104,7,186,0.5)] font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {d.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  <span className="font-label-caps text-xs">{d.code} {d.isLive ? '(LIVE)' : ''}</span>
                </div>
                <span className="font-headline-md text-lg text-on-surface">{d.date}</span>
                <span className="font-badge-spec text-[10px] opacity-80">{d.count}</span>
              </button>
            ))}
          </div>

          {/* Schedule Detail Lineup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {scheduleItems &&
              scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-surface-container flex items-center justify-between gap-3 border border-surface-container-highest/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-sm">
                      <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                      {item.isLive && (
                        <span className="absolute bottom-0 inset-x-0 bg-primary-container text-[8px] text-center font-bold font-label-caps text-white py-0.5">
                          NOW
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[9px] text-secondary font-bold">
                        {item.timeJST} • {item.network}
                      </span>
                      <h5 className="font-title-card text-xs font-bold text-on-surface truncate">{item.title}</h5>
                      <p className="font-body-sm text-[11px] text-on-surface-variant truncate">{item.episode}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const match = MOCK_TITLES.find(t => t.title.toLowerCase().includes(item.title.toLowerCase())) || MOCK_TITLES[1];
                      onPlayTitle(match);
                    }}
                    className="p-2 rounded-full bg-secondary-container text-on-secondary-container hover:scale-110 transition-transform shadow-md shrink-0"
                    title="Watch Simulcast"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Titan Battle Vote Arena */}
        <div className="bg-gradient-to-r from-surface-container via-surface-container to-surface-container-low rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl border border-surface-container-highest/60">
          <div className="flex flex-col gap-2 max-w-xl w-full">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-primary" />
              <span className="font-label-caps text-xs text-primary tracking-widest uppercase font-bold">
                SPBR ANIME ARENA • WEEKLY TITAN CLASH
              </span>
            </div>
            <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">
              Who Wins in a Dimension-Ending Duel?
            </h3>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
              Cast your vote in real-time. SPBR will stream a bespoke 4K animated comparison reel rendered by the community studio this Saturday!
            </p>

            {/* Voting Bar */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between font-label-caps text-xs">
                <span className="text-primary font-bold">RAIDEN (CELESTIAL STANCE) • {raidenVotes}%</span>
                <span className="text-secondary font-bold">ARCHON MALAKOR • {malakorVotes}%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden flex cursor-pointer">
                <div
                  className="bg-gradient-to-r from-primary to-primary-container h-full transition-all duration-500 shadow-[0_0_10px_#e50914]"
                  style={{ width: `${raidenVotes}%` }}
                />
                <div
                  className="bg-gradient-to-r from-secondary to-secondary-container h-full transition-all duration-500 shadow-[0_0_10px_#6807ba]"
                  style={{ width: `${malakorVotes}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-badge-spec text-on-surface-variant/70">
                <span>18,493 Votes Logged {hasVoted && '• Your vote was counted!'}</span>
                <span>Founder Curation: "Malakor's spatial distortion is underrated" — Rishav Krishn Sharma</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => castVote('raiden')}
              className="px-4 py-2.5 rounded-xl bg-primary-container/20 hover:bg-primary-container/40 text-primary font-badge-spec text-xs font-bold flex items-center gap-2 transition-all border border-primary/30"
            >
              <Zap className="w-4 h-4" />
              <span>VOTE RAIDEN</span>
            </button>
            <button
              onClick={() => castVote('malakor')}
              className="px-4 py-2.5 rounded-xl bg-secondary-container/20 hover:bg-secondary-container/40 text-secondary font-badge-spec text-xs font-bold flex items-center gap-2 transition-all border border-secondary/30"
            >
              <Moon className="w-4 h-4" />
              <span>VOTE MALAKOR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
