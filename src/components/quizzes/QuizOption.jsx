import React from 'react';

/**
 * Clove Vibrant Theme Option Card
 * Soft pink, electric lavender, mint teal, warm blush themes.
 * Displays immediate feedback when answered.
 */
export default function QuizOption({
  letter,
  text,
  theme,
  isSelected,
  isAnswered,
  isCorrect,
  onSelect
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? isCorrect
            ? 'bg-gradient-to-r from-[#175B51]/40 via-[#1c3a35]/60 to-[#25152f] border-2 border-[#9BD9D0] shadow-[0_0_24px_rgba(155,217,208,0.4)]'
            : isAnswered
            ? 'bg-gradient-to-r from-[#7a2a46]/40 via-[#3a1d29]/60 to-[#25152f] border-2 border-[#F28CA9] shadow-[0_0_20px_rgba(242,140,169,0.35)]'
            : 'bg-gradient-to-r from-[#6d3257]/40 via-[#45245F]/40 to-[#25152f] border-2 border-[#fcafdb] shadow-[0_0_20px_rgba(252,175,219,0.35)]'
          : isAnswered && isCorrect
          ? 'bg-[#175B51]/20 border-2 border-[#9BD9D0]/60 opacity-90'
          : 'bg-[#291933]/90 hover:bg-[#34233e] border border-[#45245F] hover:border-[#B99BEF]/70 shadow-sm hover:shadow-md'
      } transform hover:-translate-y-0.5`}
    >
      {/* Option Letter Indicator */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-[13px] shadow-sm transition-transform group-hover:scale-105 ${
          isSelected
            ? isCorrect
              ? 'bg-[#9BD9D0] text-[#122824]'
              : isAnswered
              ? 'bg-[#F28CA9] text-[#25152F]'
              : 'bg-[#fcafdb] text-[#25152F]'
            : isAnswered && isCorrect
            ? 'bg-[#9BD9D0]/80 text-[#122824]'
            : 'bg-[#34233e] text-[#f3dafe] border border-[#6d3257]'
        }`}
      >
        {isSelected && isAnswered ? (
          <span className="material-symbols-outlined text-[18px]">
            {isCorrect ? 'check' : 'close'}
          </span>
        ) : isAnswered && isCorrect ? (
          <span className="material-symbols-outlined text-[18px]">
            check
          </span>
        ) : (
          letter
        )}
      </div>

      {/* Option Content & Feedback Badge */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-body text-[11px] uppercase tracking-wider font-extrabold text-[#cbc4d1]">
            Option {letter}
          </span>
          {isSelected && isAnswered && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isCorrect
                  ? 'bg-[#9BD9D0]/20 text-[#9BD9D0] border border-[#9BD9D0]/40'
                  : 'bg-[#F28CA9]/20 text-[#F28CA9] border border-[#F28CA9]/40'
              }`}
            >
              <span className="material-symbols-outlined text-[12px]">
                {isCorrect ? 'verified' : 'info'}
              </span>
              <span>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </span>
          )}
          {!isSelected && isAnswered && isCorrect && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9BD9D0]/20 text-[#9BD9D0] border border-[#9BD9D0]/40 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">check</span>
              <span>Correct Answer</span>
            </span>
          )}
        </div>

        <p
          className={`font-body text-[15px] sm:text-[16px] leading-snug ${
            isSelected
              ? 'font-semibold text-[#f3dafe]'
              : 'font-medium text-[#f3dafe]/90 group-hover:text-[#ffffff]'
          }`}
        >
          {text}
        </p>
      </div>
    </button>
  );
}
