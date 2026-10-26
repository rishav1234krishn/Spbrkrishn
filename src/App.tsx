/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { SubNavBar } from './components/SubNavBar';
import { HeroBillboard } from './components/HeroBillboard';
import { ContinueWatchingRow } from './components/ContinueWatchingRow';
import { Top10Section } from './components/Top10Section';
import { CinemaVaultSection } from './components/CinemaVaultSection';
import { AnimeUniverseSection } from './components/AnimeUniverseSection';
import { SensoryMoodSection } from './components/SensoryMoodSection';
import { StreamDiagnostics } from './components/StreamDiagnostics';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { TitleDetailModal } from './components/TitleDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { Footer } from './components/Footer';
import { useWatchlist } from './hooks/useStreamingQueries';
import { MediaTitle } from './types/streaming';

// Initialize TanStack React Query Client with robust caching and retry settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes fresh
      gcTime: 1000 * 60 * 30, // 30 minutes cache retention
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function StreamingApp() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'movie' | 'anime'>('all');
  const [playingTitle, setPlayingTitle] = useState<MediaTitle | null>(null);
  const [detailTitle, setDetailTitle] = useState<MediaTitle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Watchlist custom hook
  const { watchlistItems, toggleWatchlist, isInWatchlist } = useWatchlist();

  const handlePlayTitle = (title: MediaTitle) => {
    setPlayingTitle(title);
  };

  const handleOpenDetails = (title: MediaTitle) => {
    setDetailTitle(title);
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Fixed Header */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistItems.length}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full">
          {/* Sticky Anchor Quick Subnav */}
          <SubNavBar />

          {/* Hero Master Billboard */}
          <HeroBillboard
            onPlayTitle={handlePlayTitle}
            onOpenDetails={handleOpenDetails}
            onToggleWatchlist={toggleWatchlist}
            isInWatchlist={isInWatchlist}
          />

          {/* Continue Streaming & Live Top 10 Today Section */}
          <section className="w-full px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto flex flex-col gap-10">
            <ContinueWatchingRow
              onPlayItem={handlePlayTitle}
              onOpenWatchlist={() => setIsWatchlistOpen(true)}
            />

            <Top10Section
              onPlayTitle={handlePlayTitle}
              onOpenDetails={handleOpenDetails}
            />
          </section>

          {/* Dedicated Cinema Vault Section (Show on 'all' or 'movie') */}
          {(activeCategory === 'all' || activeCategory === 'movie') && (
            <CinemaVaultSection
              onPlayTitle={handlePlayTitle}
              onOpenDetails={handleOpenDetails}
            />
          )}

          {/* Dedicated Anime Universe Section (Show on 'all' or 'anime') */}
          {(activeCategory === 'all' || activeCategory === 'anime') && (
            <AnimeUniverseSection
              onPlayTitle={handlePlayTitle}
              onOpenDetails={handleOpenDetails}
            />
          )}

          {/* Sensory Curation Engine (Moods & Frequency) */}
          <SensoryMoodSection
            onSelectMoodTitle={handleOpenDetails}
          />

          {/* Stream Diagnostics, 4K Lab & Founders Accountability Desk */}
          <StreamDiagnostics />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Player Modal */}
      {playingTitle && (
        <VideoPlayerModal
          title={playingTitle}
          onClose={() => setPlayingTitle(null)}
        />
      )}

      {/* Title Details Modal */}
      {detailTitle && (
        <TitleDetailModal
          title={detailTitle}
          onClose={() => setDetailTitle(null)}
          onPlayTitle={handlePlayTitle}
          onToggleWatchlist={toggleWatchlist}
          isInWatchlist={isInWatchlist}
        />
      )}

      {/* Global Search Modal with React Query Caching */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPlayTitle={handlePlayTitle}
        onOpenDetails={handleOpenDetails}
      />

      {/* Watchlist Slide-out Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        items={watchlistItems}
        onRemoveItem={toggleWatchlist}
        onPlayTitle={handlePlayTitle}
        onOpenDetails={handleOpenDetails}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StreamingApp />
    </QueryClientProvider>
  );
}
