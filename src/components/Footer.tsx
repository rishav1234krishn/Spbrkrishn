import React from 'react';
import { Film, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant border-t border-surface-container-highest/60 mt-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-surface-container-highest/40">
          {/* Brand & Leadership Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-display-hero text-xl font-extrabold text-on-surface">SPBR</span>
            </div>

            <p className="font-body-sm text-xs text-on-surface-variant/80 leading-relaxed">
              Pioneering high-octane cinematic streaming &amp; next-generation anime culture. Experience flawless 4K UHD masters, spatial immersion, and zero compromise.
            </p>

            <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-low border border-surface-container-highest/40">
              <span className="font-label-caps text-[10px] text-primary font-bold">LEADERSHIP &amp; ARCHITECTURE</span>
              <span className="font-body-sm text-xs text-on-surface font-semibold">
                Founded by Rishav Krishn Sharma &amp; Balmukund Sharma
              </span>
              <span className="font-badge-spec text-[10px] text-on-surface-variant/70">
                SPBR Media Networks Global Ops
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-caps text-xs text-on-surface tracking-wider uppercase font-bold">
              Navigation
            </span>
            <a href="#hero-feature" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Home Feed
            </a>
            <a href="#spbr-cinema" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Feature Films
            </a>
            <a href="#anime-universe" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Anime Vault &amp; Simulcasts
            </a>
            <a href="#sensory-engine" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Moods &amp; Sensory Curation
            </a>
            <a href="#hero-feature" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Trending Releases
            </a>
          </div>

          {/* Specifications & Lab */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-caps text-xs text-on-surface tracking-wider uppercase font-bold">
              Specifications &amp; Lab
            </span>
            <a href="#stream-diagnostics" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              4K HDR Playback Testing
            </a>
            <a href="#stream-diagnostics" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Supported Ecosystems &amp; TV OS
            </a>
            <a href="#stream-diagnostics" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Audio Tracks &amp; Subtitle Settings
            </a>
            <a href="#founder-desk" className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors">
              Help Center &amp; Diagnostics
            </a>
          </div>

          {/* Connect & Support */}
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-xs text-on-surface tracking-wider uppercase font-bold">
              Connect &amp; Support
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-body-sm text-xs text-on-surface-variant">Direct Executive Desk:</span>
              <a
                href="mailto:b43698051@gmail.com"
                className="inline-flex items-center gap-1.5 font-title-card text-xs text-primary hover:text-on-primary-container transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>b43698051@gmail.com</span>
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative inline-block w-full">
              <select className="w-full bg-surface-container-low text-on-surface text-xs py-2 px-3 rounded-lg border border-surface-container-highest/60 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary">
                <option>English (Global)</option>
                <option>Japanese (日本語)</option>
                <option>Hindi (हिन्दी)</option>
                <option>Spanish (Español)</option>
                <option>French (Français)</option>
                <option>Portuguese (Português)</option>
              </select>
              <Globe className="w-3.5 h-3.5 absolute right-3 top-2.5 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-on-surface-variant/70 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-on-surface transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-on-surface transition-colors">Legal &amp; Compliance</a>
            <a href="#" className="hover:text-on-surface transition-colors">Cookie Preferences</a>
          </div>
          <p className="font-badge-spec text-[11px] text-on-surface-variant/60 text-center md:text-right">
            © 2025 SPBR Entertainment Inc. Founded by Rishav Krishn Sharma &amp; Balmukund Sharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
