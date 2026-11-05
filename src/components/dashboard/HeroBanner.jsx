import React from 'react';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Hero Welcome Banner
 * Features Valorant Clove Ethereal Aurora, twinkling starlight particles, and butterfly motifs.
 * Provides dynamic welcoming message for returning visitors who have completed the journey.
 */
export default function HeroBanner() {
  const { derivedStatus } = useProgression();
  const isEntireJourneyComplete = Boolean(derivedStatus?.['surprise-box']?.completed);

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#25152F] via-[#3B1C4E] to-[#1C0D26] text-white p-8 sm:p-14 lg:p-20 text-center shadow-[0_25px_60px_-15px_rgba(37,21,47,0.55)] border border-[#B99BEF]/30 flex flex-col items-center justify-center">
      {/* Radiant Ethereal Overlays */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-r from-[#F3A7D2]/35 via-[#B99BEF]/30 to-[#9BD9D0]/25 rounded-full blur-3xl pointer-events-none pulse-glow"></div>
      <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#F28CA9]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-[#9BD9D0]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Fluttering Butterflies within Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="butterfly-float absolute top-[18%] left-[12%] text-[#F3A7D2] opacity-80 drop-shadow-[0_0_8px_#F3A7D2]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
          </svg>
        </div>
        <div className="butterfly-float-delayed absolute top-[68%] right-[14%] text-[#B99BEF] opacity-75 drop-shadow-[0_0_10px_#B99BEF]">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
          </svg>
        </div>
        <div className="butterfly-float absolute top-[28%] right-[22%] text-[#9BD9D0] opacity-65 drop-shadow-[0_0_8px_#9BD9D0]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
          </svg>
        </div>
      </div>

      {/* Crest Icon */}
      <div className="relative z-10 flex items-center justify-center mb-4 sm:mb-5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#45245F] to-[#8050A8] backdrop-blur-md border border-[#B99BEF]/50 flex items-center justify-center shadow-[0_0_25px_rgba(185,155,239,0.45)] group">
          <span className="material-symbols-outlined text-[#F3A7D2] text-[26px]">
            auto_awesome
          </span>
        </div>
      </div>

      {/* Sub-tag */}
      <span className="relative z-10 font-body text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#F3A7D2] font-semibold mb-3 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9BD9D0]"></span>
        {isEntireJourneyComplete ? 'WELCOME BACK • ALL DESTINATIONS UNLOCKED' : 'A special birthday experience'}
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9BD9D0]"></span>
      </span>

      {/* Title */}
      <h1 className="relative z-10 font-display italic text-[36px] sm:text-[54px] lg:text-[66px] leading-[1.1] text-[#FFF8F8] mb-3 font-normal tracking-[-0.01em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
        A World Made For Sheldon
      </h1>

      {/* Tagline */}
      <p className="font-editorial italic text-[22px] sm:text-[26px] text-[#F3A7D2] mb-1 font-medium tracking-wide">
        {isEntireJourneyComplete ? 'Welcome back to your little world.' : 'A little world created just for you.'}
      </p>
      <p className="font-body text-[14px] sm:text-[16px] text-[#E4D3E0]/90 max-w-lg mx-auto font-light tracking-wide leading-relaxed">
        {isEntireJourneyComplete
          ? 'Every chapter, letter, melody, and memory remains permanently preserved for you. Revisit anytime.'
          : 'Four destinations. One special journey.'}
      </p>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-7 opacity-85">
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#F3A7D2] to-transparent"></div>
        <span className="material-symbols-outlined text-[#9BD9D0] text-[15px]">
          all_inclusive
        </span>
        <div className="w-16 h-[1.5px] bg-gradient-to-l from-transparent via-[#B99BEF] to-transparent"></div>
      </div>
    </section>
  );
}
