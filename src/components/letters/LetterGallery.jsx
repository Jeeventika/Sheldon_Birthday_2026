import React from 'react';
import EnvelopeCard from './EnvelopeCard';
import { lettersData } from '../../data/lettersData';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Letters Collection / Envelope Gallery
 * 100% Data-Driven:
 * - Dynamically adapts to any number of regular letters (including zero).
 * - Enforces sequential unlocking rules dynamically.
 * - Displays unlock progress and next milestone gateway.
 */
export default function LetterGallery({ onSelectLetter, onNavigateToPlaylist }) {
  const { progression, derivedStatus, checkLetterUnlocked } = useProgression();

  const totalLetters = lettersData.length;
  const readLettersCount = lettersData.filter((l) =>
    progression.readLetterIds.includes(l.id)
  ).length;

  const progressPercent = totalLetters > 0
    ? Math.round((readLettersCount / totalLetters) * 100)
    : 100;

  const isPlaylistUnlocked = derivedStatus.playlist?.unlocked ?? false;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex flex-col gap-8">
      {/* Editorial Header & Curator Note */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E9D1EE] text-[#45245F] shadow-xs">
          <span className="material-symbols-outlined text-[16px] text-[#1e8a7b]">
            flutter_dash
          </span>
          <span className="font-body text-[11px] tracking-widest uppercase font-semibold">
            Destination 02 • Archive of Notes
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1e8a7b]"></span>
          <span className="font-body text-[11px] text-[#a2437b]">Clove Keepsakes</span>
        </div>

        <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#341348] tracking-tight leading-tight">
          A Few Things I Want You To Know
        </h1>
        <p className="font-editorial italic text-xl sm:text-2xl text-[#a2437b] font-normal max-w-xl">
          “Some words are easier to write than to say.”
        </p>
        <p className="font-body text-[14px] sm:text-[15px] text-[#63526a] max-w-2xl leading-relaxed pt-1">
          Take your time, Sheldon. Every envelope holds a quiet piece of immortal light, sealed in gentle sequence amidst blooming butterflies and soft lilac mist. Unravel each memory when your heart is ready.
        </p>
      </section>

      {/* Sequential Unlock Progress Ribbon (if letters configured) */}
      {totalLetters > 0 && (
        <section className="w-full bg-white/85 border border-[#EEDBF2] backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(74,21,75,0.05)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e8a7b] animate-pulse"></span>
              <span className="font-body text-[16px] text-[#341348] font-semibold">
                Letter {readLettersCount} of {totalLetters} Read
              </span>
              <span className="text-[#8e7c97] text-xs">•</span>
              <span className="font-body text-[12px] text-[#63526a] uppercase tracking-wider">
                Sequential Keepsake Archive
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#a2437b] font-medium text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#1e8a7b]">
                flutter_dash
              </span>
              <span>
                {readLettersCount >= totalLetters
                  ? 'All regular letters read • Playlist unlocked!'
                  : 'Next letter unfolds after reading current letter'}
              </span>
            </div>
          </div>

          {/* Progress Bar & Dynamic Step Indicators */}
          <div className="relative py-2">
            <div className="w-full h-2 bg-[#F0E2F4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#45245F] via-[#a2437b] to-[#1e8a7b] rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div
              className="grid gap-2 pt-3 text-center"
              style={{
                gridTemplateColumns: `repeat(${totalLetters}, minmax(0, 1fr))`
              }}
            >
              {lettersData.map((letter) => {
                const isUnlocked = checkLetterUnlocked(letter.id);
                const isRead = progression.readLetterIds.includes(letter.id);

                return (
                  <div key={letter.id} className="flex flex-col items-center space-y-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[12px] ${
                        isRead
                          ? 'bg-[#1e8a7b] text-white shadow-md font-bold'
                          : isUnlocked
                          ? 'bg-[#341348] text-white shadow-md ring-2 ring-[#1e8a7b]/40 font-bold'
                          : 'bg-[#F4E9F7] text-[#8e7c97] border border-[#E7D6EB]'
                      }`}
                    >
                      {isRead ? (
                        '✓'
                      ) : isUnlocked ? (
                        <span className="material-symbols-outlined text-[14px]">drafts</span>
                      ) : (
                        letter.number
                      )}
                    </div>
                    <span
                      className={`font-body text-[10px] sm:text-[11px] truncate max-w-full ${
                        isRead
                          ? 'text-[#1e8a7b] font-bold'
                          : isUnlocked
                          ? 'text-[#341348] font-bold'
                          : 'text-[#63526a]'
                      }`}
                    >
                      {letter.number} • {isRead ? 'Read' : isUnlocked ? 'Ready' : 'Locked'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gentle Curator Notice */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#FCEAF4] to-[#F1E5FB] border border-[#ECD4F1] shadow-xs">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1e8a7b] shadow-xs shrink-0">
          <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
        </div>
        <p className="font-body text-[13px] text-[#63526a]">
          <strong className="font-semibold text-[#341348]">Gentle Reminder for Sheldon:</strong>{' '}
          Letters open strictly in sequence. Letter 01 is ready to be unfolded. Completing each letter releases the butterfly seal for the next envelope.
        </p>
      </div>

      {/* Desk of Keepsakes Gallery Grid */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-body text-[11px] text-[#a2437b] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#1e8a7b]">
                auto_awesome
              </span>
              Tactile Correspondence
            </span>
            <h2 className="font-display italic text-2xl sm:text-3xl text-[#341348]">
              The Desk of Keepsakes
            </h2>
          </div>
          <span className="hidden sm:inline-block font-body text-[12px] text-[#63526a] tracking-wider bg-white/80 px-3.5 py-1 rounded-full border border-[#EBD4F0]">
            {totalLetters} HAND-WRITTEN FOLIOS
          </span>
        </div>

        {/* Dynamic Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lettersData.map((letter, idx) => {
            const isUnlocked = checkLetterUnlocked(letter.id);
            const isRead = progression.readLetterIds.includes(letter.id);
            const prevLetter = idx > 0 ? lettersData[idx - 1] : null;

            return (
              <EnvelopeCard
                key={letter.id}
                letter={letter}
                isUnlocked={isUnlocked}
                isRead={isRead}
                prevLetterNumber={prevLetter ? prevLetter.number : null}
                onOpen={onSelectLetter}
              />
            );
          })}
        </div>
      </section>

      {/* Upcoming Milestone Gateway: Destination 03 • Playlist */}
      <section className="w-full rounded-2xl bg-gradient-to-r from-white/90 via-[#FAF4FD] to-white/90 border border-[#E9D5EE] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#341348] to-[#a2437b] flex items-center justify-center text-white shadow-md shrink-0 ring-4 ring-[#F8D7E8]/50">
            <span className="material-symbols-outlined text-[26px] text-[#1e8a7b]">
              album
            </span>
          </div>
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-[#a2437b] font-body text-[11px] uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#1e8a7b]">
                flutter_dash
              </span>
              <span>Next Horizon</span>
            </div>
            <h3 className="font-display italic text-xl sm:text-2xl text-[#341348] tracking-tight mt-0.5">
              Destination 03 • Playlist {isPlaylistUnlocked ? '(Unlocked!)' : '(Locked)'}
            </h3>
            <p className="font-body text-[13px] text-[#63526a] mt-1 max-w-xl">
              A bespoke soundscape reflecting every memory and chapter recorded here for Sheldon. Unlocks automatically once all regular letters are read.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {isPlaylistUnlocked ? (
            <button
              type="button"
              onClick={onNavigateToPlaylist}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B99BEF] to-[#9BD9D0] text-[#25152F] font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Enter Music Room →
            </button>
          ) : (
            <div className="px-4 py-2 rounded-full bg-white/90 border border-[#E0CEE6] text-[#8e7c97] font-body text-[12px] flex items-center gap-2 cursor-not-allowed shadow-xs">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Locked Destination</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
