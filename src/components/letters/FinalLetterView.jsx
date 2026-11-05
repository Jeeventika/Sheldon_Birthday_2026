import React, { useEffect } from 'react';
import { finalLetterData } from '../../data/finalWishData';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Final Birthday Letter Finale Screen (Screen 5: The Final Birthday Letter)
 * Recreates the Capstone Letter for Sheldon with wax monogram 'S',
 * polaroids with washi tape, dedicatory card, and chapter pill links.
 */
export default function FinalLetterView({ onBackToHub, onNavigateDestination }) {
  const data = finalLetterData;
  const { markFinalLetterRead } = useProgression();

  useEffect(() => {
    if (markFinalLetterRead) {
      markFinalLetterRead();
    }
  }, [markFinalLetterRead]);

  const smoothScrollToLetter = () => {
    const sheet = document.getElementById('parchment-sheet');
    if (sheet) {
      sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd8eb]/80 border border-[#fcafdb] shadow-xs">
          <span className="material-symbols-outlined text-[15px] text-[#6d3257]">
            flutter_dash
          </span>
          <span className="font-body text-[11px] tracking-widest text-[#6d3257] uppercase font-semibold">
            DESTINATION 04 • THE IMMORTAL CELEBRATION • FINAL KEEPSAKE
          </span>
        </div>

        <h1 className="font-display italic text-3xl sm:text-5xl text-[#361b47] tracking-tight">
          {data.title}
        </h1>
        <p className="font-editorial italic text-xl sm:text-2xl text-[#a24c80] max-w-xl">
          {data.subtitle}
        </p>

        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="h-px w-12 bg-[#a24c80]/30"></span>
          <span className="material-symbols-outlined text-[15px] text-[#1d7b70]">
            flutter_dash
          </span>
          <span className="font-body text-[11px] text-[#5d4b68] uppercase tracking-widest">
            {data.registryRef}
          </span>
          <span className="material-symbols-outlined text-[15px] text-[#a24c80]">
            star_rate
          </span>
          <span className="h-px w-12 bg-[#a24c80]/30"></span>
        </div>
      </div>

      {/* Central Keepsake Parchment Sheet */}
      <div
        id="parchment-sheet"
        className="relative bg-[#FAF6FD] shadow-[0_24px_60px_-12px_rgba(54,27,71,0.14),0_0_40px_rgba(252,175,219,0.3)] rounded-3xl p-6 sm:p-12 md:p-16 border-2 border-[#b99bef]/40 overflow-hidden"
      >
        {/* Borders */}
        <div className="absolute inset-2 sm:inset-4 rounded-2xl border border-[#a24c80]/30 pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#dccfdf]/50">
          <div className="flex flex-col">
            <span className="font-body text-[11px] text-[#a24c80] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#1d7b70]">spa</span>
              Sanctuary Delivery Post • Clove's Haven
            </span>
            <span className="font-body text-[13px] text-[#361b47] font-semibold tracking-wide">
              ETERNAL ARCHIVE • COMPLETED VOYAGE
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-xl shadow-xs border border-[#ffd8eb]">
            <div className="w-9 h-9 rounded-full bg-[#a24c80] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
            </div>
            <div className="text-left flex flex-col">
              <span className="font-body text-[10px] text-[#361b47] font-bold tracking-widest uppercase">
                BIRTHDAY EDITION
              </span>
              <span className="font-body text-[9px] text-[#5d4b68] tracking-wider uppercase">
                {data.dispatchBadge}
              </span>
              <span className="font-editorial italic text-[11px] text-[#a24c80]">
                {data.dispatchSubtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Salutation */}
        <div className="relative z-10 pt-6 pb-4">
          <h2 className="font-display italic text-3xl text-[#361b47]">
            {data.salutation}
          </h2>
        </div>

        {/* Letter Body with Prominent Central Memory Photograph */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-5">
          {/* Opening Paragraph */}
          <p className="text-[#2a1538] font-body text-[16px] sm:text-[17px] leading-relaxed">
            {data.paragraphs[0]}
          </p>

          {/* Central Memory Photograph (Positioned prominently below opening paragraph) */}
          <div className="my-6 w-full">
            <div className="relative bg-gradient-to-b from-[#FAF8FC] via-white to-[#FCEAF4]/70 p-5 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(162,76,128,0.22),0_0_40px_rgba(252,175,219,0.35)] border-2 border-[#fcafdb]/80 text-center relative overflow-hidden group">
              {/* Archival Keepsake Top Ribbon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#fcafdb] via-[#B99BEF] to-[#ffd8eb] text-[#361b47] font-body text-[11px] font-bold uppercase tracking-widest shadow-md border border-white">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span>{data.centralPhoto?.tapeLabel || 'IMMORTAL KEEPSAKE ✦'}</span>
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              </div>

              {/* Main Photo Frame - preserving both people completely without aggressive cropping */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#241236]/5 p-1.5 sm:p-2 border border-[#ffd8eb] shadow-sm flex items-center justify-center">
                <img
                  src={data.centralPhoto?.image || '/images/final_letter.jpeg'}
                  alt={data.centralPhoto?.alt || 'Sheldon and Claret - Central Keepsake'}
                  className="w-full h-auto max-h-[540px] object-contain rounded-xl shadow-xs"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#361b47]/85 backdrop-blur-sm text-[#ffd8eb] text-[10px] font-bold px-3 py-1 rounded-full border border-[#fcafdb]/50 tracking-wider">
                  {data.centralPhoto?.badge || 'CENTRAL MEMORY'}
                </div>
              </div>

              {/* Emotional Caption */}
              <div className="pt-4 pb-1 px-3 flex flex-col gap-1.5">
                <p className="font-editorial italic text-xl sm:text-2xl text-[#361b47] leading-snug">
                  “{data.centralPhoto?.caption || 'Somewhere between December 13 and forever, you became my favourite human. Happy Birthday, Sheldon. ❤️'}”
                </p>
                <span className="font-body text-[11px] text-[#a24c80] uppercase tracking-widest font-bold">
                  {data.centralPhoto?.subtext || 'The Central Keepsake • Eternal Archive'}
                </span>
              </div>
            </div>
          </div>

          {/* Remaining Body Paragraphs */}
          <div className="space-y-4 text-[#2a1538] font-body text-[16px] sm:text-[17px] leading-relaxed">
            {data.paragraphs.slice(1).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="py-2 flex items-center gap-3 text-[#a24c80] select-none">
            <span className="material-symbols-outlined text-[18px] text-[#1d7b70]">
              flutter_dash
            </span>
            <span className="h-px w-20 bg-[#ffd8eb]"></span>
            <span className="font-body text-[11px] tracking-widest uppercase text-[#a24c80] font-semibold">
              {data.dividerTag}
            </span>
          </div>

          <div className="pt-4 space-y-2">
            <p className="font-editorial italic text-2xl text-[#361b47]">
              {data.signoffLead}
            </p>
            <div className="flex items-center gap-6 pt-2">
              <span className="font-display italic text-2xl sm:text-3xl text-[#361b47] whitespace-pre-wrap">
                {data.signoffSignature}
              </span>

              {/* Tactile Wax Stamp Graphic with 'S' */}
              <div className="relative group cursor-pointer" title={data.sealTooltip}>
                <div className="w-14 h-14 rounded-full bg-[#361b47] flex items-center justify-center shadow-lg border border-[#b99bef]/50">
                  <div className="w-11 h-11 rounded-full bg-[#a24c80]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#ffd8eb] text-[22px]">
                      favorite
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#a24c80] flex items-center justify-center shadow-sm border border-white text-white font-bold text-[11px]">
                  {data.monogramInitial}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 5: Final Screen Closing Message Card */}
      {data.closingScreen && (
        <div className="w-full bg-gradient-to-br from-[#25152F] via-[#351b42] to-[#200f2b] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-[#fcafdb]/50 flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#fcafdb] via-[#B99BEF] to-[#9BD9D0] text-[#25152F] flex items-center justify-center shadow-lg ring-4 ring-white/20">
            <span className="material-symbols-outlined text-[28px]">favorite</span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#fcafdb] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>A World Made For Sheldon</span>
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
          </span>

          <h3 className="font-display italic text-3xl sm:text-5xl text-[#ffffff] tracking-tight leading-tight mt-1">
            {data.closingScreen.line1}
          </h3>

          <p className="font-editorial italic text-2xl sm:text-4xl text-[#fcafdb] mt-1">
            {data.closingScreen.line2}
          </p>

          <span className="font-display italic text-2xl sm:text-3xl text-[#9BD9D0] mt-3">
            {data.closingScreen.signature}
          </span>
        </div>
      )}

      {/* Dedication Card */}
      <div className="w-full bg-gradient-to-r from-[#ffd8eb]/50 via-[#f3e7f8]/60 to-[#c4f2ea]/40 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-sm border border-[#ffd8eb]">
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <span className="text-[#a24c80] text-2xl mb-1">♡</span>
          <h3 className="font-display italic text-2xl sm:text-3xl text-[#361b47] mb-2">
            {data.dedicationCard.title}
          </h3>
          <p className="font-body text-[14px] text-[#5d4b68] leading-relaxed">
            {data.dedicationCard.message}
          </p>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 p-5 rounded-2xl border border-[#dccfdf] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3f2e4a] flex items-center justify-center text-[#d4bbff] shrink-0">
            <span className="material-symbols-outlined text-[20px]">lock_open</span>
          </div>
          <div className="flex flex-col">
            <span className="font-body text-[13px] text-[#361b47] font-semibold">
              Permanent Keepsake Registry
            </span>
            <span className="font-body text-[12px] text-[#5d4b68]">
              This keepsake remains permanently unlocked for Sheldon. Revisit anytime.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={smoothScrollToLetter}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#361b47] border border-[#dccfdf] font-body text-xs font-semibold cursor-pointer"
          >
            ↺ Read Again
          </button>
          <button
            type="button"
            onClick={onBackToHub}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#361b47] hover:bg-[#25152F] text-white font-body text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Destination Hub</span>
            <span className="material-symbols-outlined text-[15px] text-[#ffd8eb]">
              auto_awesome
            </span>
          </button>
        </div>
      </div>

      {/* Revisit Chapters Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-center pt-2">
        <span className="font-body text-[11px] text-[#a24c80] uppercase tracking-widest mr-2 font-semibold">
          Revisit Chapters:
        </span>
        <button
          type="button"
          onClick={() => onNavigateDestination('quizzes')}
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#ffd8eb] text-xs font-medium text-[#5d4b68] border border-[#dccfdf] cursor-pointer"
        >
          01. Memory Quizzes
        </button>
        <button
          type="button"
          onClick={() => onNavigateDestination('letters')}
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#ffd8eb] text-xs font-medium text-[#5d4b68] border border-[#dccfdf] cursor-pointer"
        >
          02. Curated Letters
        </button>
        <button
          type="button"
          onClick={() => onNavigateDestination('playlist')}
          className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#ffd8eb] text-xs font-medium text-[#5d4b68] border border-[#dccfdf] cursor-pointer"
        >
          03. Celestial Playlist
        </button>
        <button
          type="button"
          onClick={() => onNavigateDestination('surprise-box')}
          className="px-3.5 py-1.5 rounded-full bg-[#361b47] text-white text-xs font-semibold cursor-pointer"
        >
          04. Surprise Box (Final)
        </button>
      </div>
    </div>
  );
}
