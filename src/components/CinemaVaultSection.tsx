import React, { useState } from 'react';
import { Film, Sparkles, RefreshCw, Play, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useCinemaVaultQuery } from '../hooks/useStreamingQueries';
import { MediaTitle } from '../types/streaming';
import { MOCK_TITLES } from '../api/streamingApi';

interface CinemaVaultSectionProps {
  onPlayTitle: (title: MediaTitle) => void;
  onOpenDetails: (title: MediaTitle) => void;
}

export const CinemaVaultSection: React.FC<CinemaVaultSectionProps> = ({
  onPlayTitle,
  onOpenDetails,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('ALL CINEMA');
  const { data: movies, isLoading } = useCinemaVaultQuery(selectedGenre);

  // Reel roulette state
  const roulettePicks = [
    {
      id: 'chrono-dynasty',
      title: 'Chrono Dynasty: Infinite Veil',
      desc: '168 mins • 4K Dolby Atmos • 99% Match',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV2w7btT5gZOHsgbOQUfT7Oq9CyFpflAISkvoJptztjo9JiL96gY2x0XTwujESuMwuO5IPP-BOSSvN8yr6bYTqZybK8bU0Q5gljMXi1Z39Ls6PDd_-DinnoLiz_N6N8QimTpa7DJNK4OTvOahMjKH3MDwOoCeCq55Arjs8F8AAeERb5R2KXiTz2neTK2i9iR4AdVZmDqeSrb4bxy0xQ8FMFdbp8YhFmXF5vOSDhaaDoYQq8yoOrsHZ'
    },
    {
      id: 'aether-event-horizon',
      title: 'Aether: Beyond Event Horizon',
      desc: '151 mins • Native IMAX 65mm • 99% Match',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSGcs8gnqBJ7OCY-o_lgz-Ln8ycVc7uHfwdR8ARnV9fCajzX-8hHTGrMRxrht_7FfFfLssKc5RKLvOWgfHg7Vke1VhbNm_l34c6JanT-JPNhB43Jb0C-MLF3r4NPh_rhvsICTC6GhfIbgiuKmptcZE2f28PZjSpzGcBG_C9BQr4xRWlW9Xr47K2HAEfjo1NAOOHSNPIpivXDsPhnZTU9my_2cF6I9SB5aFLSn9EpDLiMW2d_efjMk3'
    },
    {
      id: 'the-geneva-cipher',
      title: 'The Geneva Cipher (Master Cut)',
      desc: '134 mins • Dolby Vision • 97% Match',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJivZaV-eJSw-ZBbeoBV0_rz76OWnLcCN3-HOweb613BZcP5JQLkrrIXQ2FIiPEht_N41BlsrdPRHPXF5VWRR1C2WwvKNejQjllBhuiSGVMJ_aCS8LNn5VVmE2YdBxbJCv7bo2nIm1zYQlMo4oP5Hgpsn3TMdq7UhXXeH-_INrn0FqDxC7ZLYxzxiH__BCS4kC5ecPY0f641B6DcbzFXpMiEEkW9H7ERE9fBnHra_V-t_sryMI9Ax_'
    },
    {
      id: 'the-prague-syndicate',
      title: 'The Prague Syndicate',
      desc: '114 mins • 65 Mbps Master • 95% Match',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyn-HznAwwCGHxxpdof-trzY4DBwm4HZeuComoUM2b-tsUK0GD0r8wAoH654ER4zkUTBtDakQq0TNI56lvMR5x8fIw-8yd_9pj2uthnmCKUCt4T6Ehhh60waNAWhZREM3wvQbG3a2h2IlIrsEZBsWKHaX5JS9Yp-5X5amRyKoLjHOYpDwtnZXpJr8_AhgZJTKWro15ZUFie37O_a_m7ZSAH_M7RjGbk8RHOi45fnkq2rMMVyaD0SC'
    },
    {
      id: 'the-iron-ronin',
      title: 'The Iron Ronin',
      desc: '142 mins • SPBR Exclusive Cut • 98% Match',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXlKjVkzr1zCs0cBmflHIg330kGxfBHHf6ItR8wbDphIYxEhc0Zflr5BHg6xufbj-V8X1Tkq-7BJmm1XPDQmdXYCsTB3sM9a98wK0C2vhKrfVC_8hcRL_TDM0sBbo9FDMOcMlGm8ro6f5JQdP-GG1_osrM6SfqQAka7XLAoVmeLFS6Tivg0UGa8ZUtC3ty9G_Yw3R2N9CROG5_VMML1Y_y2y40vc8S8LgbtTiWQ5UDIcZsz8mjUs0'
    }
  ];

  const [rouletteIdx, setRouletteIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMood, setSelectedMood] = useState('Mind-Bending • High IQ');
  const [selectedPacing, setSelectedPacing] = useState('Slow-Burn Cinematic');
  const [selectedRuntime, setSelectedRuntime] = useState('Standard (110-130 Mins)');

  const spinRoulette = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setRouletteIdx((prev) => (prev + 1) % roulettePicks.length);
      setIsSpinning(false);
    }, 350);
  };

  const currentPick = roulettePicks[rouletteIdx];

  const genres = [
    'ALL CINEMA',
    'SCI-FI',
    'PSYCHOLOGICAL NOIR',
    'ACTION',
    'EPIC DRAMA'
  ];

  return (
    <section className="w-full bg-surface-container-low/50 py-12" id="spbr-cinema">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-highest/60 pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.6)] font-bold">
                <Film className="w-4 h-4" />
                <span className="font-label-caps text-xs uppercase tracking-widest">SPBR CINEMA VAULT</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary-container/40 text-primary font-badge-spec text-[11px] font-bold">
                65 Mbps Master Quality
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-badge-spec text-[11px]">
                Native 65mm IMAX
              </span>
            </div>

            <h2 className="font-display-hero text-2xl sm:text-4xl text-on-surface tracking-tight font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-primary-container">
                Blockbusters, Masters
              </span>{' '}
              &amp; Hollywood Originals
            </h2>

            <p className="font-body-md text-sm text-on-surface-variant max-w-2xl">
              Curated 4K UHD uncompressed masters, native spatial DCI-P3 color timing, and award-winning director cuts calibrated for reference displays.
            </p>
          </div>

          {/* Interactive Genre Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-full font-label-caps text-xs font-bold transition-all ${
                  selectedGenre === g
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid: Spin the Reel Roulette + Founders Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reel Roulette (7 columns) */}
          <div className="lg:col-span-7 bg-surface-container rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-surface-container-highest/60">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-headline-md text-lg font-bold text-on-surface">Spin the SPBR Reel</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 font-badge-spec text-[11px] text-primary font-bold">
                  INSTANT STREAM MATCH
                </span>
              </div>

              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                Can't decide? Calibrate your vibe, pacing, and time threshold, then spin for an instant reference 4K film recommendation.
              </p>

              {/* Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">MOOD TONE</label>
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs py-2 px-2.5 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option>Mind-Bending • High IQ</option>
                    <option>Adrenaline • Relentless</option>
                    <option>Melancholy • Deep Atmosphere</option>
                    <option>Edge of Seat Suspense</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">PACING</label>
                  <select
                    value={selectedPacing}
                    onChange={(e) => setSelectedPacing(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs py-2 px-2.5 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option>Breakneck Kinetic</option>
                    <option>Slow-Burn Cinematic</option>
                    <option>Episodic Chaptered</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant font-bold">RUNTIME</label>
                  <select
                    value={selectedRuntime}
                    onChange={(e) => setSelectedRuntime(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs py-2 px-2.5 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option>Under 100 Mins</option>
                    <option>Standard (110-130 Mins)</option>
                    <option>Epic (140+ Mins)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Pick Display */}
              <div className="p-4 rounded-xl bg-surface-container-lowest/90 border border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={currentPick.img}
                    alt={currentPick.title}
                    className="w-14 h-18 rounded-lg object-cover shrink-0 shadow-md"
                  />
                  <div className="flex flex-col truncate">
                    <span className="font-label-caps text-[9px] text-primary uppercase font-bold">CURRENT ROULETTE HIT</span>
                    <h4 className="font-title-card text-sm font-bold text-on-surface truncate">{currentPick.title}</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">{currentPick.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const full = MOCK_TITLES.find(t => t.id === currentPick.id) || MOCK_TITLES[0];
                      onPlayTitle(full);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-primary" />
                    <span>Watch</span>
                  </button>

                  <button
                    onClick={spinRoulette}
                    disabled={isSpinning}
                    className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline-md text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:scale-105 active:scale-95 transition-all shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                    <span>SPIN REEL</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Founders Private Screenings (5 columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-surface-container via-surface-container to-surface-container-high rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-surface-container-highest/60">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-xs text-primary tracking-widest uppercase font-bold">
                  EXECUTIVE SELECTION
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-badge-spec text-[10px]">
                  CURATION NOTES
                </span>
              </div>

              <h3 className="font-headline-md text-lg font-bold text-on-surface">Founders' Private Screenings</h3>
              <p className="font-body-sm text-xs text-on-surface-variant/90 italic">
                "We built SPBR so cinematic works aren't crushed by aggressive compression algorithms. These films showcase the full spectrum of our uncompressed Dolby Atmos master tracks."
              </p>

              <div className="flex items-center gap-2 pt-1">
                <div className="w-7 h-7 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/40">
                  RK
                </div>
                <div className="w-7 h-7 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center font-bold text-xs -ml-2 border border-secondary/40">
                  BS
                </div>
                <span className="font-badge-spec text-xs text-on-surface font-semibold">
                  Rishav Krishn Sharma &amp; Balmukund Sharma
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <div
                onClick={() => {
                  const m = MOCK_TITLES.find(t => t.id === 'aether-event-horizon') || MOCK_TITLES[0];
                  onPlayTitle(m);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-highest transition-colors cursor-pointer group border border-surface-container-highest/40"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <h5 className="font-title-card text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                      Quantum Solitude (4K IMAX)
                    </h5>
                    <p className="font-body-sm text-[11px] text-on-surface-variant">Recommended by Rishav • Reference HDR</p>
                  </div>
                </div>
                <PlayCircle className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>

              <div
                onClick={() => {
                  const m = MOCK_TITLES.find(t => t.id === 'the-geneva-cipher') || MOCK_TITLES[0];
                  onPlayTitle(m);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-highest transition-colors cursor-pointer group border border-surface-container-highest/40"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <div>
                    <h5 className="font-title-card text-xs font-bold text-on-surface group-hover:text-secondary transition-colors">
                      The Geneva Cipher (Uncut)
                    </h5>
                    <p className="font-body-sm text-[11px] text-on-surface-variant">Recommended by Balmukund • 9.1.4 Atmos</p>
                  </div>
                </div>
                <PlayCircle className="w-5 h-5 text-on-surface-variant group-hover:text-secondary transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {movies &&
            movies.slice(0, 4).map((movie) => (
              <div
                key={movie.id}
                onClick={() => onOpenDetails(movie)}
                className="group relative rounded-xl overflow-hidden bg-surface-container hover:bg-surface-container-high transition-all hover:scale-[1.02] shadow-xl border border-surface-container-highest/40 cursor-pointer flex flex-col justify-between"
              >
                <div
                  className="relative w-full aspect-[16/10] bg-cover bg-center"
                  style={{ backgroundImage: `url('${movie.backdropUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-badge-spec text-[10px] font-bold">
                    {movie.specs[0] || 'IMAX MASTER'}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md font-badge-spec text-[10px] text-on-surface">
                    {movie.duration || '2h 15m'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTitle(movie);
                    }}
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-[0_0_15px_#e50914]"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-label-caps text-primary font-bold">{movie.genre[0]}</span>
                    <span className="font-badge-spec text-on-surface-variant font-bold">{movie.criticScore || 96}% CRITIC</span>
                  </div>
                  <h4 className="font-title-card text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                    {movie.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                    {movie.synopsis}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
