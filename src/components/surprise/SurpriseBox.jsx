import React, { useState, useEffect } from 'react';
import { useProgression } from '../../context/ProgressionContext';
import { playlistData } from '../../data/playlistData';

/**
 * The Surprise Box Component
 * Recreates the Stitch Wrapped Gift Box with Clove butterfly bow,
 * satin ribbons, untying animation, and transition to the birthday cake.
 */
export default function SurpriseBox({ onProceedToCake }) {
  const { progression, setBoxUnwrapped } = useProgression();
  const [isUnwrapped, setIsUnwrapped] = useState(Boolean(progression?.boxUnwrapped));
  const [showOverlay, setShowOverlay] = useState(false);

  // Sync with progression (e.g. if reset or replayed from dev toolbar)
  useEffect(() => {
    const unwrapped = Boolean(progression?.boxUnwrapped);
    setIsUnwrapped(unwrapped);
    if (!unwrapped) {
      setShowOverlay(false);
    }
  }, [progression?.boxUnwrapped]);

  const handleTriggerUnwrap = () => {
    setIsUnwrapped(true);
    setBoxUnwrapped(true);
    setTimeout(() => {
      setShowOverlay(true);
    }, 950);
  };

  const handleReset = () => {
    setIsUnwrapped(false);
    setShowOverlay(false);
    if (!progression?.candlesBlown) {
      setBoxUnwrapped(false);
    }
  };

  const totalMelodies = playlistData.length;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-20 flex flex-col items-center text-center">
      {/* Chapter Metadata & Status Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 shadow-sm border border-[#B99BEF]/30">
          <span className="w-2 h-2 rounded-full bg-[#F3A7D2] animate-ping"></span>
          <span className="font-body text-[11px] text-[#45245F] tracking-widest uppercase font-semibold">
            Destination 04 • The Grand Celebration • Chapter 01 of 03
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F3A7D2]/20 to-[#B99BEF]/25 text-[#45245F] border border-[#B99BEF]/30">
          <span className="material-symbols-outlined text-[16px] text-[#45245F]">stars</span>
          <span className="font-body text-[11px] font-semibold tracking-wide">
            All {totalMelodies} Constellation melodies heard • Unsealed with love
          </span>
        </div>
      </div>

      {/* Editorial Title */}
      <div className="max-w-3xl flex flex-col items-center">
        <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#3b1852] tracking-tight mb-4">
          One Last Little Surprise<span className="text-[#F3A7D2] italic">...</span>
        </h1>
        <p className="font-body text-[16px] sm:text-[18px] text-[#614b6e] max-w-xl leading-relaxed">
          You’ve made it through every chapter. Now there’s something waiting just for you beneath the quiet stars.
        </p>
      </div>

      {/* Central Stage: The 3D Gift Box */}
      <div className="relative w-full max-w-3xl py-10 sm:py-14 flex flex-col items-center justify-center select-none">
        {/* Celestial Orbit Graphic */}
        <svg
          className="absolute w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] text-[#B99BEF]/35 pointer-events-none animate-[spin_70s_linear_infinite]"
          fill="none"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1.2"></circle>
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeDasharray="2 6" strokeWidth="0.8"></circle>
          <circle className="text-[#F3A7D2]" cx="200" cy="10" fill="currentColor" r="4.5"></circle>
          <circle className="text-[#45245F]" cx="390" cy="200" fill="currentColor" r="3"></circle>
          <circle className="text-[#B99BEF]" cx="70" cy="310" fill="currentColor" r="4"></circle>
        </svg>

        {/* Ambient Sparkles */}
        <div className="absolute top-4 left-12 text-[#F3A7D2] animate-bounce pointer-events-none">
          <span className="material-symbols-outlined text-[28px]">auto_awesome</span>
        </div>
        <div className="absolute top-1/4 -right-2 text-[#B99BEF] animate-pulse pointer-events-none">
          <span className="material-symbols-outlined text-[28px]">star</span>
        </div>

        {/* The Gift Box Unit */}
        <div
          onClick={handleTriggerUnwrap}
          className="relative group cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2.5 mt-6 mb-4"
        >
          {/* Base Glow Shadows */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-16 bg-[#B99BEF]/30 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[300px] sm:w-[340px] h-12 bg-[#F3A7D2]/40 blur-md rounded-full"></div>

          {/* 3D Box Structure */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex flex-col items-center justify-end">
            {/* LID */}
            <div
              className="absolute top-6 sm:top-5 z-30 w-[310px] sm:w-[380px] h-24 transition-all duration-700 ease-in-out origin-bottom"
              style={{
                transform: isUnwrapped ? 'translateY(-120px) rotate(-10deg) scale(1.06)' : undefined,
                opacity: isUnwrapped ? 0.9 : 1
              }}
            >
              {/* Lid Cap */}
              <div className="w-full h-18 sm:h-20 rounded-2xl bg-gradient-to-r from-[#F3A7D2] via-[#E8B2E5] to-[#B99BEF] shadow-[0_18px_40px_rgba(69,36,95,0.25)] relative overflow-hidden flex items-center justify-center border border-white/60">
                {/* Vertical Deep Plum Ribbon */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#45245F] shadow-[inset_0_0_8px_rgba(0,0,0,0.4)] flex items-center justify-between px-1.5">
                  <div className="w-0.5 h-full bg-[#B99BEF]/50"></div>
                  <div className="w-0.5 h-full bg-[#B99BEF]/50"></div>
                </div>
              </div>

              {/* Lower Lip of Lid */}
              <div className="w-full h-3 bg-[#45245F]/20 rounded-b-xl shadow-inner"></div>

              {/* Butterfly Bow Crown */}
              <div
                className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-500 origin-center"
                style={{
                  transform: isUnwrapped ? 'translate(-50%, -70px) scale(1.2) rotate(16deg)' : undefined,
                  opacity: isUnwrapped ? 0.2 : 1
                }}
              >
                {/* Left wing */}
                <div className="w-14 h-18 sm:w-18 sm:h-22 bg-[#45245F] rounded-tl-full rounded-tr-3xl rounded-bl-full -rotate-45 shadow-lg relative -mr-3 border-t border-l border-[#B99BEF]/40">
                  <div className="absolute inset-1.5 rounded-tl-full bg-gradient-to-br from-[#6d3257] to-[#45245F] opacity-90"></div>
                </div>

                {/* Center Medallion */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#45245F] shadow-lg z-10 flex items-center justify-center relative border border-[#B99BEF]/50 ring-2 ring-[#F3A7D2]/40">
                  <span className="text-base select-none">🦋</span>
                </div>

                {/* Right wing */}
                <div className="w-14 h-18 sm:w-18 sm:h-22 bg-[#45245F] rounded-tr-full rounded-tl-3xl rounded-br-full rotate-45 shadow-lg relative -ml-3 border-t border-r border-[#B99BEF]/40">
                  <div className="absolute inset-1.5 rounded-tr-full bg-gradient-to-bl from-[#6d3257] to-[#45245F] opacity-90"></div>
                </div>
              </div>

              {/* Keepsake Tag for Sheldon */}
              <div
                className="absolute -right-4 sm:-right-8 top-6 z-40 rotate-[12deg] transition-all duration-300"
                style={{
                  transform: isUnwrapped ? 'translate(45px, -30px) rotate(40deg)' : undefined,
                  opacity: isUnwrapped ? 0 : 1
                }}
              >
                <div className="bg-white/95 border border-[#B99BEF]/50 shadow-md px-3.5 py-2.5 rounded-xl flex flex-col items-center">
                  <span className="font-body text-[10px] text-[#45245F] uppercase tracking-widest font-bold">
                    Keepsake #04 ✨
                  </span>
                  <span className="font-display italic text-[14px] text-[#45245F] font-semibold mt-0.5">
                    For Sheldon ♡
                  </span>
                  <span className="font-body text-[10px] text-[#614b6e] italic">
                    on your special day
                  </span>
                </div>
              </div>
            </div>

            {/* BOX BODY */}
            <div className="w-64 sm:w-80 h-56 sm:h-64 rounded-b-3xl bg-gradient-to-b from-[#F3A7D2] via-[#E5B5E5] to-[#B99BEF] relative overflow-hidden shadow-[0_28px_60px_rgba(69,36,95,0.22)] z-10 flex items-center justify-center border-x border-b border-white/60">
              {/* Vertical Satin Ribbon */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#45245F] shadow-[inset_0_0_10px_rgba(0,0,0,0.35)] flex items-center justify-between px-1.5">
                <div className="w-0.5 h-full bg-[#B99BEF]/45"></div>
                <div className="w-0.5 h-full bg-[#B99BEF]/45"></div>
              </div>

              {/* Horizontal Satin Ribbon */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 sm:h-14 bg-[#45245F] shadow-[inset_0_0_10px_rgba(0,0,0,0.35)] flex flex-col justify-between py-1.5">
                <div className="h-0.5 w-full bg-[#B99BEF]/45"></div>
                <div className="h-0.5 w-full bg-[#B99BEF]/45"></div>
              </div>

              {/* Central Heart Medallion */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#45245F] z-20 flex items-center justify-center shadow-xl border-2 border-[#B99BEF] ring-4 ring-[#F3A7D2]/40">
                <span className="material-symbols-outlined text-[#F3A7D2] text-[24px]">
                  favorite
                </span>
              </div>

              {/* Internal Glow Burst */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-[#F3A7D2] via-[#B99BEF] to-white rounded-b-3xl flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_70px_rgba(243,167,210,0.95)] ${
                  isUnwrapped ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="material-symbols-outlined text-[#45245F] text-[64px] animate-spin">
                  auto_awesome
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-[#45245F] mt-2">
                  Unsealing Joy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col items-center gap-3 z-30">
          <button
            type="button"
            onClick={handleTriggerUnwrap}
            className="group relative px-9 py-4 rounded-full bg-[#45245F] text-white font-body text-[15px] shadow-[0_14px_36px_rgba(69,36,95,0.45)] hover:shadow-[0_18px_50px_rgba(185,155,239,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer border border-[#B99BEF]/40"
          >
            <span className="text-[#F3A7D2] text-lg">✨</span>
            <span className="tracking-wide font-semibold text-white">Open Your Surprise</span>
            <span className="material-symbols-outlined text-[20px] text-[#B99BEF] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <div className="flex items-center gap-2 text-[#614b6e] text-[11px] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px] text-[#F3A7D2]">volume_up</span>
            <span>Take your time • Best experienced with sound on</span>
          </div>
        </div>
      </div>

      {/* Transition Overlay to Birthday Cake */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 bg-[#251235]/85 backdrop-blur-xl flex items-center justify-center p-6 animate-float-slow">
          <div className="max-w-md w-full bg-[#faf7fb] rounded-3xl p-8 sm:p-10 text-center shadow-2xl flex flex-col items-center relative overflow-hidden border border-[#B99BEF]/40">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F3A7D2]/30 to-[#B99BEF]/30 flex items-center justify-center text-[#45245F] mb-5 shadow-sm ring-2 ring-[#B99BEF]/40 animate-bounce">
              <span className="material-symbols-outlined text-[38px]">cake</span>
            </div>
            <span className="font-body text-[11px] text-[#a2437b] uppercase tracking-widest font-bold">
              Ribbon Untied • For Sheldon
            </span>
            <h2 className="font-display italic text-2xl sm:text-3xl text-[#45245F] mt-1 mb-3">
              The Candle Awaits Your Breath
            </h2>
            <p className="font-body text-[14px] text-[#614b6e] mb-6 leading-relaxed">
              The box yields its inner warmth. Enter the birthday sanctuary where Sheldon’s ceremonial cake glows in soft candlelight.
            </p>
            <button
              type="button"
              onClick={onProceedToCake}
              className="w-full py-4 px-6 rounded-full bg-[#45245F] text-white font-body text-[14px] font-semibold shadow-md hover:bg-[#34164b] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#B99BEF]/40"
            >
              <span>Proceed to the Birthday Cake</span>
              <span className="material-symbols-outlined text-[20px] text-[#F3A7D2]">
                arrow_forward
              </span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-[12px] text-[#614b6e] hover:text-[#45245F] transition-colors underline cursor-pointer"
            >
              Re-tie and inspect the box again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
