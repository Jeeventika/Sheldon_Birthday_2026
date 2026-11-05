import React from 'react';

/**
 * Reusable Folio Envelope Card
 * Displays sealed vs ready state dynamically based on sequential progression.
 */
export default function EnvelopeCard({ letter, isUnlocked, isRead, onOpen, prevLetterNumber }) {
  const { number, folio, title, preview, sealType } = letter;

  if (isUnlocked) {
    return (
      <article
        className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-300 min-h-[390px] overflow-hidden border border-[#F3CCE2]"
        style={{
          background: 'linear-gradient(145deg, #FFF0F7 0%, #FAEAFA 55%, #F4E4FD 100%)'
        }}
      >
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#F8D7E8]/50 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-4 -left-10 w-32 h-32 bg-[#94d2c9]/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#45245F] text-white font-body text-[11px] font-semibold tracking-wider uppercase shadow-xs">
              <span className={`w-1.5 h-1.5 rounded-full ${isRead ? 'bg-[#94d2c9]' : 'bg-[#94d2c9] animate-ping'}`}></span>
              Letter {number} • {isRead ? 'Read ✓' : 'Ready to Open'}
            </span>
            <span className="font-body text-[12px] text-[#a2437b] mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#1e8a7b]">
                verified
              </span>
              {sealType}
            </span>
          </div>

          <div className="w-11 h-13 rounded-sm bg-white/90 border border-[#F8D7E8] flex flex-col items-center justify-center shadow-xs p-1">
            <span className="material-symbols-outlined text-[#a2437b] text-[20px]">
              flutter_dash
            </span>
            <span className="font-body text-[8px] text-[#45245F] font-bold">CLOVE</span>
          </div>
        </div>

        {/* Central Wax Seal */}
        <div className="py-5 text-center flex flex-col items-center relative z-10">
          <button
            type="button"
            onClick={() => onOpen(letter)}
            className="relative group/seal w-16 h-16 rounded-full bg-gradient-to-br from-[#45245F] to-[#270830] text-[#F8D7E8] flex items-center justify-center shadow-lg transform group-hover/seal:scale-110 transition-transform duration-300 mb-3 cursor-pointer border-2 border-[#E79FC6]/60"
            title="Break Butterfly Seal"
          >
            <span className="material-symbols-outlined text-[30px] text-[#FBD7ED] drop-shadow">
              flutter_dash
            </span>
            <div className="absolute inset-0 rounded-full shadow-[0_0_24px_rgba(162,67,123,0.45)] animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1e8a7b] text-white flex items-center justify-center text-[10px] ring-2 ring-white font-bold">
              ✦
            </div>
          </button>
          <span className="font-body text-[11px] text-[#a2437b] font-semibold tracking-widest uppercase mb-1">
            {folio} • For Sheldon
          </span>
          <h3 className="font-display italic text-[22px] sm:text-[24px] text-[#341348] tracking-tight font-semibold">
            {title}
          </h3>
          <p className="font-body text-[13px] text-[#63526a] mt-2 px-2 leading-relaxed">
            {preview}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 flex items-center justify-between relative z-10 border-t border-[#F0D5E7]/70">
          <span className="font-body text-[11px] text-[#a2437b] font-medium tracking-wide flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#1e8a7b]">
              touch_app
            </span>
            {isRead ? 'Tap to re-read' : 'Tap to break wax'}
          </span>
          <button
            type="button"
            onClick={() => onOpen(letter)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#341348] text-white font-body text-[12px] font-semibold hover:bg-gradient-to-r hover:from-[#341348] hover:to-[#a2437b] shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>{isRead ? 'Re-read Letter' : 'Unfold & Read'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </article>
    );
  }

  // Locked State
  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 shadow-xs min-h-[390px] overflow-hidden opacity-85 hover:opacity-100 transition-all border border-[#EADBF0]"
      style={{
        background: 'linear-gradient(145deg, #FAF4FC 0%, #F5ECFA 100%)'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-body text-[11px] text-[#a2437b] uppercase tracking-widest font-semibold">
            {folio} • Sealed
          </span>
          <span className="font-body text-[12px] text-[#8e7c97] mt-0.5">
            {prevLetterNumber ? `Unlocks After Letter ${prevLetterNumber}` : 'Locked in sequence'}
          </span>
        </div>
        <div className="w-9 h-11 rounded-sm bg-white/70 border border-[#E7D6EC] flex flex-col items-center justify-center text-[#8e7c97]">
          <span className="material-symbols-outlined text-[18px] text-[#a2437b]">
            flutter_dash
          </span>
        </div>
      </div>

      <div className="py-5 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-white/80 border border-[#E5D2EB] text-[#a2437b] flex items-center justify-center shadow-xs mb-3 relative">
          <span className="material-symbols-outlined text-[24px]">flutter_dash</span>
          <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[13px] bg-[#FAF4FC] text-[#8e7c97] rounded-full p-0.5 shadow-xs">
            lock
          </span>
        </div>
        <span className="font-body text-[11px] text-[#8e7c97] tracking-widest uppercase mb-1">
          {folio}
        </span>
        <h3 className="font-display italic text-[22px] sm:text-[24px] text-[#341348] tracking-tight">
          {title}
        </h3>
        <p className="font-body text-[13px] text-[#63526a] mt-2 px-2 leading-relaxed">
          {preview}
        </p>
      </div>

      <div className="pt-3 flex items-center justify-between border-t border-[#EDE1F1]">
        <span className="inline-flex items-center gap-1 font-body text-[11px] text-[#8e7c97]">
          <span className="material-symbols-outlined text-[14px] text-[#a2437b]">
            lock_clock
          </span>
          Sequenced
        </span>
        <div className="px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E4D1EB] text-[#63526a]/80 font-body text-[12px] cursor-not-allowed">
          Sealed Butterfly Folio
        </div>
      </div>
    </article>
  );
}
