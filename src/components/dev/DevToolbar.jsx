import React, { useState } from 'react';
import { useProgression } from '../../context/ProgressionContext';
import { quizzesData } from '../../data/quizzesData';
import { lettersData } from '../../data/lettersData';
import { playlistData } from '../../data/playlistData';
import { ACTIVE_STORAGE_KEY, IS_DEV } from '../../services/progressionStorage';

/**
 * Developer Testing Toolbar
 * Enabled strictly in development mode (`import.meta.env.DEV`).
 * Completely stripped / returns null in production builds.
 */
export default function DevToolbar({ onNavigate }) {
  if (!IS_DEV) return null;

  const {
    progression,
    derivedStatus,
    previewDestination,
    isPreviewMode,
    setPreview,
    clearPreview,
    devSimulateCompleteQuiz,
    devSimulateCompleteAllQuizzes,
    devSimulateMarkLetterRead,
    devSimulateMarkAllLettersRead,
    devSimulatePlayTrack,
    devSimulatePlayAllTracks,
    devReplaySurpriseBox,
    devResetDestination,
    devResetAllProgress
  } = useProgression();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('simulate'); // 'simulate' | 'preview' | 'reset'

  const handlePreviewJump = (destId) => {
    setPreview(destId);
    onNavigate(destId);
  };

  const handleExitPreview = () => {
    clearPreview();
    onNavigate('dashboard');
  };

  return (
    <aside
      aria-label="Developer Testing Controls"
      className="fixed bottom-4 right-4 z-50 font-body text-xs"
    >
      {/* Floating Toggle Button */}
      <div className="flex items-center gap-2 justify-end">
        {isPreviewMode && (
          <div className="bg-[#45245F]/95 text-[#9BD9D0] border border-[#9BD9D0] px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 font-bold animate-pulse">
            <span className="material-symbols-outlined text-[14px]">visibility</span>
            <span>PREVIEW MODE (SAFE)</span>
            <button
              type="button"
              onClick={handleExitPreview}
              className="ml-1 bg-[#25152F] text-[#F3A7D2] hover:text-white px-2 py-0.5 rounded-full text-[10px] cursor-pointer"
            >
              Exit
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full shadow-xl border backdrop-blur-md transition-all cursor-pointer ${
            isOpen
              ? 'bg-[#25152F] text-[#F3A7D2] border-[#F3A7D2]'
              : 'bg-[#25152F]/90 hover:bg-[#34233e] text-[#d4bbff] hover:text-white border-[#B99BEF]/50'
          }`}
          title="Toggle Developer Testing Controls"
        >
          <span className="material-symbols-outlined text-[16px] text-[#9BD9D0]">
            build
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px]">
            Dev Controls
          </span>
          <span className="w-2 h-2 rounded-full bg-[#9BD9D0] animate-ping"></span>
        </button>
      </div>

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="mt-2 w-[340px] sm:w-[420px] max-h-[80vh] overflow-y-auto bg-[#1c0c26]/95 border-2 border-[#B99BEF]/40 backdrop-blur-2xl text-[#f3dafe] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 animate-float-slow">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#3f2e4a] pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#F3A7D2]">
                terminal
              </span>
              <div>
                <h4 className="font-bold text-[13px] text-[#ffffff]">
                  Dev Testing Suite
                </h4>
                <p className="text-[10px] text-[#cbc4d1]">
                  Storage: <span className="font-mono text-[#9BD9D0]">{ACTIVE_STORAGE_KEY}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#cbc4d1] hover:text-white p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#25152f] p-1 rounded-full border border-[#3f2e4a]">
            <button
              type="button"
              onClick={() => setActiveTab('simulate')}
              className={`py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === 'simulate'
                  ? 'bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-xs'
                  : 'text-[#cbc4d1] hover:text-white'
              }`}
            >
              Simulations
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-xs'
                  : 'text-[#cbc4d1] hover:text-white'
              }`}
            >
              Preview Hub
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reset')}
              className={`py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === 'reset'
                  ? 'bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-xs'
                  : 'text-[#cbc4d1] hover:text-white'
              }`}
            >
              Resets
            </button>
          </div>

          {/* TAB 1: Simulations */}
          {activeTab === 'simulate' && (
            <div className="flex flex-col gap-3">
              {/* Quizzes Simulation */}
              <div className="bg-[#25152f]/80 p-3 rounded-2xl border border-[#3f2e4a] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#d4bbff] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#9BD9D0]">quiz</span>
                    Quizzes ({progression.completedQuizIds.length} / {quizzesData.length} Done)
                  </span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.quizzes.completed ? '✓ Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quizzesData.map((quiz) => {
                    const isDone = progression.completedQuizIds.includes(quiz.id);
                    return (
                      <button
                        key={quiz.id}
                        type="button"
                        onClick={() => devSimulateCompleteQuiz(quiz.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                          isDone
                            ? 'bg-[#1e8a7b]/30 text-[#9BD9D0] border-[#1e8a7b]'
                            : 'bg-[#34233e] text-[#f3dafe] border-[#45245F] hover:border-[#B99BEF]'
                        }`}
                      >
                        {isDone ? '✓ ' : '+ '}Complete {quiz.title.split('?')[0]}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={devSimulateCompleteAllQuizzes}
                  className="w-full mt-1 py-1.5 rounded-xl bg-gradient-to-r from-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-bold tracking-wide hover:shadow-md cursor-pointer"
                >
                  ⚡ Complete All Quizzes (Unlocks Letters)
                </button>
              </div>

              {/* Letters Simulation */}
              <div className="bg-[#25152f]/80 p-3 rounded-2xl border border-[#3f2e4a] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#d4bbff] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#9BD9D0]">mail</span>
                    Letters ({progression.readLetterIds.length} / {lettersData.length} Read)
                  </span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.letters.completed ? '✓ All Read' : 'Sequencing'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lettersData.map((letter) => {
                    const isRead = progression.readLetterIds.includes(letter.id);
                    return (
                      <button
                        key={letter.id}
                        type="button"
                        onClick={() => devSimulateMarkLetterRead(letter.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                          isRead
                            ? 'bg-[#1e8a7b]/30 text-[#9BD9D0] border-[#1e8a7b]'
                            : 'bg-[#34233e] text-[#f3dafe] border-[#45245F] hover:border-[#B99BEF]'
                        }`}
                      >
                        {isRead ? '✓ ' : '+ '}Letter {letter.number}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={devSimulateMarkAllLettersRead}
                  className="w-full mt-1 py-1.5 rounded-xl bg-gradient-to-r from-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-bold tracking-wide hover:shadow-md cursor-pointer"
                >
                  ⚡ Mark All Letters Read (Unlocks Playlist)
                </button>
              </div>

              {/* Playlist Simulation */}
              <div className="bg-[#25152f]/80 p-3 rounded-2xl border border-[#3f2e4a] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#d4bbff] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#9BD9D0]">album</span>
                    Playlist ({progression.playedTrackIds.length} / {playlistData.length} Heard)
                  </span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.playlist.completed ? '✓ All Heard' : 'Listening'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={devSimulatePlayAllTracks}
                  className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-bold tracking-wide hover:shadow-md cursor-pointer"
                >
                  ⚡ Simulate All Songs Played (Unlocks Surprise Box)
                </button>
              </div>

              {/* Surprise Box & Cake Replay */}
              <div className="bg-[#25152f]/80 p-3 rounded-2xl border border-[#3f2e4a] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#d4bbff] block">
                    Surprise Box &amp; Cake
                  </span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    Box: {progression.boxUnwrapped ? 'Unwrapped' : 'Wrapped'} • Cake: {progression.candlesBlown ? 'Blown' : 'Lit'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={devReplaySurpriseBox}
                  className="px-3 py-1.5 rounded-xl bg-[#6d3257] hover:bg-[#8050A8] text-[#ffd8eb] font-bold cursor-pointer border border-[#fcafdb]/50"
                >
                  ↺ Replay Animations
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Preview Hub */}
          {activeTab === 'preview' && (
            <div className="flex flex-col gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#25152f] text-[11px] text-[#cbc4d1] border border-[#3f2e4a]">
                💡 <strong>Preview Rule:</strong> Viewing locked destinations in preview mode does <em>not</em> mark them as completed or mutate your visitor progress.
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handlePreviewJump('dashboard')}
                  className="p-2.5 rounded-xl bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] text-left cursor-pointer"
                >
                  <span className="block font-bold text-[#d4bbff]">00. Prelude</span>
                  <span className="text-[10px] text-[#cbc4d1]">Dashboard Hub</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewJump('quizzes')}
                  className="p-2.5 rounded-xl bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] text-left cursor-pointer"
                >
                  <span className="block font-bold text-[#fcafdb]">01. Quizzes</span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.quizzes.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewJump('letters')}
                  className="p-2.5 rounded-xl bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] text-left cursor-pointer"
                >
                  <span className="block font-bold text-[#d4bbff]">02. Letters</span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.letters.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewJump('playlist')}
                  className="p-2.5 rounded-xl bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] text-left cursor-pointer"
                >
                  <span className="block font-bold text-[#9BD9D0]">03. Playlist</span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus.playlist.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewJump('surprise-box')}
                  className="col-span-2 p-2.5 rounded-xl bg-[#25152f] hover:bg-[#34233e] border border-[#45245F] text-left cursor-pointer"
                >
                  <span className="block font-bold text-[#F28CA9]">04. Surprise Box &amp; Cake</span>
                  <span className="text-[10px] text-[#cbc4d1]">
                    {derivedStatus['surprise-box'].unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </button>
              </div>

              {isPreviewMode && (
                <button
                  type="button"
                  onClick={handleExitPreview}
                  className="w-full py-2 rounded-xl bg-[#45245F] text-[#F3A7D2] font-bold border border-[#F3A7D2] cursor-pointer"
                >
                  Exit Preview Mode
                </button>
              )}
            </div>
          )}

          {/* TAB 3: Granular & Global Resets */}
          {activeTab === 'reset' && (
            <div className="flex flex-col gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#25152f] text-[11px] text-[#cbc4d1] border border-[#3f2e4a]">
                🛡️ <strong>Safety Guarantee:</strong> Resetting progress only clears progression in your dev storage key. It <em>never</em> deletes personal content, photos, or songs.
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-[#cbc4d1] uppercase tracking-wider">
                  Reset Individual Destinations:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => devResetDestination('quizzes')}
                    className="p-2 rounded-lg bg-[#34233e] hover:bg-[#45245F] text-left font-semibold text-[#f3dafe] border border-[#45245F] cursor-pointer"
                  >
                    ↺ Reset Quizzes
                  </button>
                  <button
                    type="button"
                    onClick={() => devResetDestination('letters')}
                    className="p-2 rounded-lg bg-[#34233e] hover:bg-[#45245F] text-left font-semibold text-[#f3dafe] border border-[#45245F] cursor-pointer"
                  >
                    ↺ Reset Letters
                  </button>
                  <button
                    type="button"
                    onClick={() => devResetDestination('playlist')}
                    className="p-2 rounded-lg bg-[#34233e] hover:bg-[#45245F] text-left font-semibold text-[#f3dafe] border border-[#45245F] cursor-pointer"
                  >
                    ↺ Reset Playlist
                  </button>
                  <button
                    type="button"
                    onClick={() => devResetDestination('surprise-box')}
                    className="p-2 rounded-lg bg-[#34233e] hover:bg-[#45245F] text-left font-semibold text-[#f3dafe] border border-[#45245F] cursor-pointer"
                  >
                    ↺ Reset Surprise
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#3f2e4a]">
                <button
                  type="button"
                  onClick={devResetAllProgress}
                  className="w-full py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-bold border border-red-500/50 transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Reset All Progress (Clean First Visit)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
