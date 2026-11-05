import React from 'react';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Reusable Destination Card
 * Derives locked/unlocked state dynamically from ProgressionContext.
 */
export default function DestinationCard({ destination, onSelect }) {
  const { derivedStatus } = useProgression();
  const status = derivedStatus[destination.id] || { unlocked: false, completed: false };
  const isUnlocked = status.unlocked;
  const isCompleted = status.completed;

  const {
    id,
    number,
    title,
    subtitle,
    icon,
    gradient,
    borderColor,
    note
  } = destination;

  const dynamicStatusText = isCompleted
    ? 'Completed ✓'
    : isUnlocked
    ? 'Unlocked'
    : destination.statusText;

  return (
    <article
      className={`group relative rounded-[32px] p-8 md:p-10 min-h-[340px] bg-gradient-to-br ${gradient} border ${borderColor} ${
        isUnlocked
          ? 'shadow-[0_14px_40px_rgba(243,167,210,0.3)] hover:-translate-y-1.5'
          : 'shadow-[0_10px_30px_rgba(94,67,105,0.06)] hover:-translate-y-1 opacity-90'
      } transform transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Background glow orb */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F3A7D2]/30 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

      <div className="flex flex-col relative z-10">
        {/* Header Row: Chapter Number + Large Icon + Status Pill */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span
              className={`font-display italic text-[38px] sm:text-[44px] select-none leading-none ${
                isUnlocked ? 'text-[#8050A8]/60' : 'text-[#5E4369]/40'
              }`}
            >
              {number}
            </span>

            {/* Distinct Icon Badge */}
            <div
              className={`w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md border ${borderColor} flex items-center justify-center shadow-sm group-hover:border-[#8050A8] transition-colors`}
            >
              <span className="material-symbols-outlined text-[28px] text-[#8050A8]">
                {icon}
              </span>
            </div>
          </div>

          {/* Status Pill */}
          {isUnlocked ? (
            <div className="shimmer-active inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#25152F] border border-[#F3A7D2] shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#1e8a7b]' : 'bg-[#F28CA9] animate-pulse'}`}></span>
              <span className="font-body text-[12px] font-bold tracking-wider uppercase text-[#8050A8]">
                {dynamicStatusText}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D8C7D8] text-[#5E4369] backdrop-blur-sm shadow-xs">
              <span className="material-symbols-outlined text-[15px] text-[#897193]">lock</span>
              <span className="font-body text-[12px] font-semibold text-[#25152F]">
                {dynamicStatusText}
              </span>
            </div>
          )}
        </div>

        {/* Chapter Title & Elevated Text */}
        <h2 className="font-display italic text-[32px] sm:text-[36px] text-[#25152F] mb-3 font-medium tracking-tight">
          {title}
        </h2>
        <p className="font-editorial italic text-[22px] sm:text-[23px] text-[#8050A8] font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Bottom Area */}
      {isUnlocked ? (
        <div className="relative z-10 pt-6 mt-auto">
          <button
            type="button"
            onClick={() => onSelect(id)}
            className="inline-flex items-center justify-between w-full px-7 py-4 rounded-full bg-[#25152F] text-[#FFF8F8] font-body text-[14px] font-semibold tracking-wide uppercase hover:bg-[#45245F] shadow-md hover:shadow-xl transition-all duration-200 group-hover:scale-[1.01] border border-[#B99BEF]/30 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{isCompleted ? 'Revisit Chapter' : 'Begin Journey'}</span>
              <span className="material-symbols-outlined text-[#9BD9D0] text-[18px]">flare</span>
            </span>
            <span className="material-symbols-outlined text-[20px] text-[#F3A7D2] transition-transform group-hover:translate-x-1.5">
              arrow_forward
            </span>
          </button>
        </div>
      ) : (
        <div className="relative z-10 pt-6 mt-auto flex items-center gap-2.5 text-[#5E4369]/90 border-t border-[#D8C7D8]/80">
          <span className="material-symbols-outlined text-[18px] text-[#8050A8]/70">
            lock_clock
          </span>
          <span className="font-editorial italic text-[16px] sm:text-[17px] text-[#5E4369]">
            {note || 'Waiting patiently for its turn'}
          </span>
        </div>
      )}
    </article>
  );
}
