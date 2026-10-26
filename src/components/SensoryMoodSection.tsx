import React from 'react';
import { Brain, Zap, Eye, Terminal, Heart, Sparkles, Globe } from 'lucide-react';
import { useSensoryMoodsQuery } from '../hooks/useStreamingQueries';
import { MediaTitle } from '../types/streaming';
import { REAL_ALL_TITLES } from '../api/streamingApi';

interface SensoryMoodSectionProps {
  onSelectMoodTitle: (title: MediaTitle) => void;
}

export const SensoryMoodSection: React.FC<SensoryMoodSectionProps> = ({
  onSelectMoodTitle,
}) => {
  const { data: moods, isLoading } = useSensoryMoodsQuery();

  const getIcon = (name: string) => {
    switch (name) {
      case 'bolt': return Zap;
      case 'visibility': return Eye;
      case 'terminal': return Terminal;
      case 'favorite': return Heart;
      case 'spa': return Sparkles;
      case 'public': return Globe;
      default: return Brain;
    }
  };

  const handleCardClick = (moodName: string) => {
    // Find matching title or pick first relevant title
    const match = REAL_ALL_TITLES.find(t => 
      (t.moodTag && moodName.toLowerCase().includes(t.moodTag.toLowerCase())) ||
      t.genre.some(g => moodName.toLowerCase().includes(g.toLowerCase()))
    ) || REAL_ALL_TITLES[0];
    onSelectMoodTitle(match);
  };

  return (
    <section className="w-full bg-surface-container-low/40 py-12" id="sensory-engine">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-bold">
              SENSORY CURATION ENGINE
            </span>
          </div>
          <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface tracking-tight font-bold">
            Stream by Emotional &amp; Physiological Frequency
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant max-w-2xl">
            Move beyond static genres. Our cognitive audio-visual tagger categorizes experiences according to heart rate intensity, ambient luminescence, and emotional resonance.
          </p>
        </div>

        {/* 6 Mood Cards Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-60 rounded-2xl bg-surface-container animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && moods && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moods.map((mood) => {
              const IconComponent = getIcon(mood.iconName);
              return (
                <div
                  key={mood.id}
                  onClick={() => handleCardClick(mood.name)}
                  className="group relative rounded-2xl overflow-hidden bg-surface-container p-6 flex flex-col justify-between min-h-[240px] hover:scale-[1.02] transition-all shadow-xl cursor-pointer border border-surface-container-highest/60 hover:border-primary/50"
                >
                  {/* Background Image Scrim */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-500"
                    style={{ backgroundImage: `url('${mood.bgImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/70 to-transparent" />

                  {/* Top Bar: Badge & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-on-primary-container font-label-caps text-xs font-bold tracking-wider shadow-md flex items-center gap-1.5"
                      style={{ backgroundColor: mood.accentColor }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {mood.badge}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-surface-container-high/90 flex items-center justify-center text-on-surface shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 flex flex-col gap-1 pt-6">
                    <h4 className="font-headline-md text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors font-bold">
                      {mood.name}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                      {mood.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-[11px] font-badge-spec text-on-surface-variant">
                      <span className="text-primary font-bold">{mood.titleCount} Titles Available</span>
                      <span>•</span>
                      <span className="bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                        {mood.soundCalib}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
