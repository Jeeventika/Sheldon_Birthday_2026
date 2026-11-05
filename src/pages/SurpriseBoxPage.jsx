import React, { useState } from 'react';
import SurpriseBox from '../components/surprise/SurpriseBox';
import BirthdayCake from '../components/surprise/BirthdayCake';
import FinalLetterView from '../components/letters/FinalLetterView';
import { useProgression } from '../context/ProgressionContext';

/**
 * Surprise Box Page Container
 * Manages Stage 1 (Gift Box), Stage 2 (Birthday Cake), and Stage 3 (Final Birthday Letter).
 * Allows reopening the final letter directly after completion without repeating animations,
 * while still offering a way to replay the ceremonial animations anytime.
 */
export default function SurpriseBoxPage({ onBackToHub, onNavigateDestination }) {
  const { progression } = useProgression();

  // If already completed in this visit or previously, default to 'final' so Sheldon can read his letter directly
  const [stage, setStage] = useState(() => (progression.candlesBlown ? 'final' : 'box'));

  if (stage === 'final') {
    return (
      <div className="flex flex-col items-center">
        {/* Quick Replay Option Bar */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setStage('box')}
            className="px-4 py-1.5 rounded-full bg-[#25152f] hover:bg-[#34233e] text-[#ffd8eb] border border-[#fcafdb]/40 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#9BD9D0]">
              restart_alt
            </span>
            <span>Replay Gift &amp; Candle Ceremony ↺</span>
          </button>
        </div>

        <FinalLetterView
          onBackToHub={onBackToHub}
          onNavigateDestination={onNavigateDestination}
        />
      </div>
    );
  }

  if (stage === 'cake') {
    return (
      <BirthdayCake
        onOpenFinalLetter={() => setStage('final')}
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      {progression.candlesBlown && (
        <div className="w-full max-w-5xl mx-auto px-4 pt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setStage('final')}
            className="px-4 py-1.5 rounded-full bg-[#25152f] hover:bg-[#34233e] text-[#ffd8eb] border border-[#B99BEF]/40 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Skip to Final Birthday Letter ✉️</span>
            <span className="material-symbols-outlined text-[15px] text-[#F3A7D2]">
              arrow_forward
            </span>
          </button>
        </div>
      )}
      <SurpriseBox
        onProceedToCake={() => setStage('cake')}
      />
    </div>
  );
}
