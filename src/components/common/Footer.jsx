import React from 'react';

export default function Footer({ isDark = false, destinationNum = null, destinationName = null }) {
  return (
    <footer
      className={`w-full border-t transition-colors duration-300 relative z-10 ${
        isDark
          ? 'bg-[#170721] border-[#34233e] text-[#cbc4d1] shadow-[0_-4px_24px_rgba(25,9,36,0.5)]'
          : 'bg-[#FFF8F8]/90 border-[#E4D3E0]/80 text-[#5E4369]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left note */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <span className="material-symbols-outlined text-[18px] text-[#9BD9D0] animate-pulse">
            auto_awesome
          </span>
          <p
            className={`font-editorial italic text-[15px] sm:text-[17px] ${
              isDark ? 'text-[#f3dafe]' : 'text-[#8050A8]'
            }`}
          >
            Curated with infinite warmth, under the quiet stars • Happy Birthday, Sheldon
          </p>
        </div>

        {/* Center / Destination badge if supplied */}
        {destinationNum && (
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase ${
              isDark
                ? 'bg-[#25152f] border-[#45245F] text-[#f3dafe]'
                : 'bg-white/80 border-[#E9D5EE] text-[#8050A8]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#9BD9D0] animate-ping"></span>
            <span>
              Destination {destinationNum} of 04 {destinationName ? `• ${destinationName}` : ''}
            </span>
          </div>
        )}

        {/* Right copyright/tag */}
        <div className="text-center md:text-right text-[12px] opacity-80">
          <span className="font-medium tracking-wide">
            © A World Made For Sheldon • Private Keepsake
          </span>
        </div>
      </div>
    </footer>
  );
}
