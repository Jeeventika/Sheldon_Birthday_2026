import React from 'react';

/**
 * Universal Keepsake Navigation Header
 * Adapts to dark/light theme depending on the destination.
 */
export default function Header({
  activeDestination = 'dashboard',
  onNavigate,
  isDark = false,
  isAmbiencePlaying = true,
  onToggleAmbience
}) {
  const navItems = [
    { id: 'dashboard', label: 'Prelude' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'letters', label: 'Letters' },
    { id: 'playlist', label: 'Playlist' },
    { id: 'surprise-box', label: 'Surprise Box' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDark
          ? 'bg-[#1c0c26]/90 border-[#3f2e4a]/60 shadow-[0_4px_24px_rgba(25,9,36,0.6)] text-[#f3dafe]'
          : 'bg-[#FFF8F8]/85 border-[#E4D3E0]/70 shadow-[0_4px_24px_rgba(74,21,75,0.04)] text-[#25152F]'
      }`}
    >
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 group text-left cursor-pointer"
            title="Return to Prelude"
          >
            {activeDestination !== 'dashboard' && (
              <span
                className={`material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-0.5 ${
                  isDark ? 'text-[#d4bbff]' : 'text-[#8050A8]'
                }`}
              >
                chevron_left
              </span>
            )}
            <span
              className={`font-display italic text-[18px] sm:text-[21px] tracking-tight font-medium truncate ${
                isDark ? 'text-[#f3dafe]' : 'text-[#25152F]'
              }`}
            >
              A World Made For Sheldon
            </span>
          </button>

          <div
            className={`hidden md:flex items-center gap-2 pl-3 border-l ${
              isDark ? 'border-[#4a4550]/60' : 'border-[#D8C7D8]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F28CA9] shadow-[0_0_8px_#F28CA9] animate-pulse"></span>
            <span
              className={`font-body text-[11px] tracking-widest uppercase font-bold ${
                isDark ? 'text-[#d4bbff]' : 'text-[#8050A8]'
              }`}
            >
              FOR SHELDON
            </span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-full border backdrop-blur-md ${
            isDark
              ? 'bg-[#25152f]/90 border-[#3f2e4a]'
              : 'bg-[#F5E9F1]/80 border-white/80 shadow-xs'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeDestination === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1 rounded-full text-[12px] font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#b99bef] to-[#d4bbff] text-[#25152F] shadow-md shadow-[#b99bef]/20'
                      : 'bg-white text-[#25152F] shadow-xs'
                    : isDark
                    ? 'text-[#cbc4d1] hover:text-[#fcafdb]'
                    : 'text-[#5E4369] hover:text-[#25152F]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Audio Ambience & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleAmbience}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border transition-all text-xs cursor-pointer shadow-xs ${
              isDark
                ? 'bg-[#25152f] hover:bg-[#34233e] text-[#cbc4d1] hover:text-[#9BD9D0] border-[#3f2e4a]'
                : 'bg-white/80 hover:bg-[#F3A7D2]/25 text-[#5E4369] hover:text-[#25152F] border-[#E4D3E0]'
            }`}
            title={isAmbiencePlaying ? 'Ambience active (click to mute)' : 'Ambience muted (click to play)'}
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isAmbiencePlaying ? 'text-[#9BD9D0] animate-pulse' : 'text-[#958e9b]'
              }`}
            >
              {isAmbiencePlaying ? 'graphic_eq' : 'volume_off'}
            </span>
            <span className="font-medium hidden sm:inline text-[12px]">
              {isAmbiencePlaying ? 'Ambience' : 'Muted'}
            </span>
          </button>

          <div
            className="flex items-center gap-2 pl-1 group cursor-default"
            title="Sheldon Birthday Edition"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ring-2 ${
                isDark
                  ? 'bg-gradient-to-tr from-[#6d3257] to-[#B99BEF] text-[#25152F] ring-[#B99BEF]/30'
                  : 'bg-gradient-to-tr from-[#25152F] via-[#45245F] to-[#8050A8] text-white ring-[#B99BEF]/60'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#F3A7D2]">
                favorite
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-right">
              <span
                className={`block text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-[#f3dafe]' : 'text-[#8050A8]'
                }`}
              >
                Sheldon
              </span>
              <span className="block text-[10px] text-[#F3A7D2] font-semibold leading-none">
                Birthday Edition
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
