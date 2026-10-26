import React, { useState, useEffect } from 'react';
import { Flame, Film, Swords, Brain, Gauge, ShieldCheck, Radio } from 'lucide-react';

export const SubNavBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero-feature');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-feature', 'spbr-cinema', 'anime-universe', 'sensory-engine', 'stream-diagnostics', 'founder-desk'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero-feature', label: 'ALL & SPOTLIGHT', icon: Flame },
    { id: 'spbr-cinema', label: 'BLOCKBUSTER CINEMA', icon: Film },
    { id: 'anime-universe', label: 'ANIME & SIMULCASTS', icon: Swords },
    { id: 'sensory-engine', label: 'MOODS & SENSORY', icon: Brain },
    { id: 'stream-diagnostics', label: '4K DIAGNOSTICS & LAB', icon: Gauge },
    { id: 'founder-desk', label: 'FOUNDERS DESK', icon: ShieldCheck },
  ];

  return (
    <div className="sticky top-20 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container-highest/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-4 sm:px-6 lg:px-12 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-full font-label-caps text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(229,9,20,0.5)] font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Live link status telemetry */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-on-surface-variant/80 font-badge-spec text-[11px]">
            TOKYO • HOLLYWOOD LINK ACTIVE (API: /api/health)
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold font-badge-spec text-[10px]">
            MASTER AV1
          </span>
        </div>
      </div>
    </div>
  );
};
