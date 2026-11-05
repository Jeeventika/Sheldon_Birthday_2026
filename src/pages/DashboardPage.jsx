import React from 'react';
import HeroBanner from '../components/dashboard/HeroBanner';
import VoyageTimeline from '../components/dashboard/VoyageTimeline';
import DestinationCard from '../components/dashboard/DestinationCard';
import { destinationsConfig } from '../data/destinationsConfig';

export default function DashboardPage({ onSelectDestination }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col gap-10 py-6 sm:py-8">
      {/* Hero Welcome Banner */}
      <HeroBanner />

      {/* Voyage Timeline */}
      <VoyageTimeline currentDestination="quizzes" />

      {/* Four Expansive Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {destinationsConfig.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={onSelectDestination}
          />
        ))}
      </div>

      {/* Intimate Closing Note */}
      <div className="text-center py-4 flex flex-col items-center justify-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F3A7D2]/40 to-[#B99BEF]/40 border border-[#F3A7D2]/60 flex items-center justify-center text-[#8050A8] shadow-xs">
          <span className="material-symbols-outlined text-[17px]">favorite</span>
        </div>
        <p className="font-editorial italic text-[20px] sm:text-[22px] text-[#8050A8] max-w-lg leading-relaxed">
          Take your time, Sheldon. Every chapter is ready whenever your heart is.
        </p>
      </div>
    </div>
  );
}
