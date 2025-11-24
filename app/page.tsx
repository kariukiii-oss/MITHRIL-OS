'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import FeedSidebar from '@/components/FeedSidebar';
import WatchlistSidebar from '@/components/WatchlistSidebar';
import { useRealtimeData } from '@/hooks/useRealtimeData';

import DetailHUD from '@/components/DetailHUD';
import { Report } from '@/types';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm text-slate-400 font-data tracking-wider mb-2">INITIALIZING MAP SYSTEMS...</div>
        <div className="w-40 h-1 bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="h-full w-1/3 bg-[#0A84FF] animate-pulse" style={{ boxShadow: '0 0 8px #0A84FF' }} />
        </div>
      </div>
    </div>
  )
});

export default function Home() {
  const [showFeed, setShowFeed] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const { reports, locations } = useRealtimeData();

  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col bg-slate-950">
      {/* Top Header */}
      <Header
        showFeed={showFeed}
        setShowFeed={setShowFeed}
        showWatchlist={showWatchlist}
        setShowWatchlist={setShowWatchlist}
      />

      {/* Full-Screen Map with Floating Overlays */}
      <div className="flex-1 relative w-full" style={{ height: 'calc(100vh - 2.25rem)' }}>

        {/* Background: Full-Screen Map */}
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-0">
          <Map
            reports={reports}
            locations={locations}
            onReportSelect={setSelectedReport}
          />
        </div>

        {/* Ranger HUD Overlay (Z-50 to be on top of everything) */}
        {selectedReport && (
          <div className="absolute top-20 right-[400px] z-50">
            <DetailHUD report={selectedReport} onClose={() => setSelectedReport(null)} />
          </div>
        )}

        {/* Left Overlay: Watchlist */}
        <div
          className={`absolute top-0 left-0 h-full z-20 transition-transform duration-300 ease-in-out ${showWatchlist ? 'translate-x-0' : '-translate-x-full'
            }`}
          style={{ width: '300px' }}
        >
          <WatchlistSidebar locations={locations} />
        </div>

        {/* Right Overlay: Feed */}
        <div
          className={`absolute top-0 right-0 h-full z-20 transition-transform duration-300 ease-in-out ${showFeed ? 'translate-x-0' : 'translate-x-full'
            }`}
          style={{ width: '350px' }}
        >
          <FeedSidebar reports={reports} />
        </div>
      </div>
    </main>
  );
}
