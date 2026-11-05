import React from 'react';
import { useProgression } from '../../context/ProgressionContext';
import { destinationsConfig } from '../../data/destinationsConfig';

/**
 * Sequential Stepper Trail
 * Dynamically reflects actual destination unlock states from progression context.
 */
export default function VoyageTimeline({ currentDestination = 'quizzes' }) {
  const { derivedStatus } = useProgression();

  // Count how many destinations are unlocked/accessible
  const unlockedCount = destinationsConfig.filter(
    (d) => derivedStatus[d.id]?.unlocked
  ).length;

  return (
    <section className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#E4D3E0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left: Milestone Status */}
      <div className="flex items-center gap-3.5 self-start md:self-auto">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F3A7D2]/40 to-[#B99BEF]/40 border border-[#F3A7D2] flex items-center justify-center text-[#25152F] shadow-xs">
          <span className="material-symbols-outlined text-[20px] text-[#8050A8]">
            explore
          </span>
        </div>
        <div>
          <h2 className="font-body text-[15px] sm:text-[16px] font-semibold text-[#25152F]">
            Your Voyage Timeline
          </h2>
          <p className="font-body text-[13px] text-[#5E4369] font-normal">
            Destination {unlockedCount} of {destinationsConfig.length} currently accessible
          </p>
        </div>
      </div>

      {/* Sequential Stepper Trail */}
      <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-1.5 sm:gap-2.5">
        {destinationsConfig.map((dest, idx) => {
          const isUnlocked = derivedStatus[dest.id]?.unlocked ?? false;
          const isCompleted = derivedStatus[dest.id]?.completed ?? false;
          const isActive = currentDestination === dest.id;

          return (
            <React.Fragment key={dest.id}>
              <div className={`flex items-center gap-2 ${isUnlocked ? '' : 'opacity-70'}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shadow-xs transition-all ${
                    isActive
                      ? 'bg-[#25152F] text-[#F3A7D2] ring-4 ring-[#B99BEF]/30 border border-[#B99BEF]'
                      : isCompleted
                      ? 'bg-[#6d3257] text-[#fcafdb] border border-[#B99BEF]'
                      : isUnlocked
                      ? 'bg-[#B99BEF] text-[#25152F] border border-[#25152F]'
                      : 'bg-[#F5E9F1] text-[#5E4369] border border-[#D8C7D8]'
                  }`}
                >
                  {isCompleted && !isActive ? '✓' : dest.number}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-body text-[13px] hidden sm:inline leading-tight ${
                      isActive ? 'text-[#25152F] font-semibold' : 'text-[#5E4369] font-medium'
                    }`}
                  >
                    {dest.title}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-[#8050A8] font-bold hidden sm:inline uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
              </div>

              {idx < destinationsConfig.length - 1 && (
                <div
                  className={`h-[2px] flex-1 min-w-[14px] sm:w-8 md:w-10 rounded-full ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-[#8050A8] to-[#B99BEF]'
                      : 'bg-[#E4D3E0]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
