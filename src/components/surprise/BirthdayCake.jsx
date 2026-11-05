import React, { useState, useRef, useEffect } from 'react';
import { useProgression } from '../../context/ProgressionContext';
import { birthdayWishData } from '../../data/finalWishData';

/**
 * Birthday Cake & Candle Interaction Component
 * Recreates the ceremonial cake experience with:
 * - 3 lit candles with flickering flames
 * - "Blow Out the Candles! 🎂✨" button
 * - Extinguished flames, rising delicate smoke wisps
 * - Interactive confetti & star butterfly particles canvas
 * - Heartfelt wish message card revealed
 * - Link to final letter
 */
export default function BirthdayCake({ onOpenFinalLetter }) {
  const { progression, setCandlesBlown } = useProgression();
  const [candlesBlown, setCandlesBlownLocal] = useState(Boolean(progression?.candlesBlown));
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  // Sync with progression (e.g. if reset or replayed from dev toolbar)
  useEffect(() => {
    setCandlesBlownLocal(Boolean(progression?.candlesBlown));
  }, [progression?.candlesBlown]);

  const handleBlowOut = () => {
    setCandlesBlownLocal(true);
    setCandlesBlown(true);
  };

  // Confetti particles generator
  useEffect(() => {
    if (!candlesBlown) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#fcafdb', // vibrant pastel pink
      '#ffd8eb', // soft petal pink
      '#d4bbff', // electric lavender
      '#b99bef', // medium lavender
      '#94d2c9', // mint teal
      '#b0eee5', // bright mint
      '#ffffff', // starlight white
      '#f3dafe'  // pale lilac
    ];

    const particles = [];
    const total = 160;
    for (let i = 0; i < total; i++) {
      const randType = Math.random();
      const isStar = randType > 0.65;
      const isButterfly = randType <= 0.65 && randType > 0.45;

      particles.push({
        x: canvas.width / 2 + (Math.random() * 320 - 160),
        y: canvas.height * 0.42,
        size: Math.random() * 9 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -14 - 6,
        gravity: 0.22,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        isStar,
        isButterfly,
        opacity: 1
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.0055;

        if (p.opacity > 0 && p.y < canvas.height + 25) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(p.opacity, 0);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.isStar) {
            // 4-point sparkle
            const s = p.size;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(0, 0, s, 0);
            ctx.quadraticCurveTo(0, 0, 0, s);
            ctx.quadraticCurveTo(0, 0, -s, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s);
            ctx.fill();
          } else if (p.isButterfly) {
            // Dual-wing butterfly
            const s = p.size * 0.8;
            ctx.beginPath();
            ctx.ellipse(-s * 0.6, -s * 0.3, s * 0.6, s * 0.4, -0.3, 0, Math.PI * 2);
            ctx.ellipse(s * 0.6, -s * 0.3, s * 0.6, s * 0.4, 0.3, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          }
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animFrameId.current = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [candlesBlown]);

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 py-8 flex flex-col items-center">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-50 w-full h-full transition-opacity duration-500 ${
          candlesBlown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Header & Intro */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#25152f] border border-[#3f2e4a] shadow-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#94d2c9]"></span>
          <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-semibold">
            DESTINATION 04 • THE GRAND CELEBRATION • CHAPTER 02 OF 03
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4bbff]"></span>
        </div>

        <h1 className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-[#d4bbff] tracking-tight leading-tight drop-shadow-md">
          Happy Birthday, Sheldon!
        </h1>
        <p className="font-editorial italic text-xl sm:text-3xl text-[#fcafdb] mt-2 max-w-2xl">
          Make a wish. This little moment is all yours.
        </p>
      </div>

      {/* Centerpiece Cake Stage */}
      <div className="max-w-4xl w-full mx-auto mt-8 flex flex-col items-center relative">
        {/* Ambient Halo Behind Candles */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-84 h-52 bg-gradient-to-r from-[#6d3257] via-[#d4bbff]/40 to-[#94d2c9]/40 rounded-full blur-3xl transition-opacity duration-1000 ${
            candlesBlown ? 'opacity-0' : 'opacity-90'
          }`}
        ></div>

        {/* 3 Candles */}
        <div className="relative z-20 flex justify-center items-end gap-10 sm:gap-14 mb-[-10px]">
          {/* Candle 1 (Left) */}
          <div className="flex flex-col items-center relative">
            <div className="relative h-14 w-10 flex items-center justify-center">
              <div
                className={`flame-anim-1 w-5 h-10 rounded-full bg-gradient-to-t from-[#fcafdb] via-[#ffd8eb] to-[#ffffff] shadow-[0_0_32px_rgba(252,175,219,1)] transition-all duration-700 ${
                  candlesBlown ? 'scale-0 opacity-0 -translate-y-4' : 'opacity-100'
                }`}
              ></div>
              {candlesBlown && (
                <div className="absolute bottom-2 w-2 h-14 bg-[#d4bbff]/60 rounded-full blur-[2px] animate-pulse"></div>
              )}
            </div>
            <div className="w-1 h-3 bg-[#3f2e4a] rounded-t-sm"></div>
            <div className="w-5 h-24 sm:h-28 rounded-t-md bg-gradient-to-b from-[#ffd8eb] via-[#6d3257] to-[#fcafdb] shadow-md border-t border-white/60"></div>
          </div>

          {/* Candle 2 (Center - Tallest) */}
          <div className="flex flex-col items-center relative -translate-y-2">
            <div className="relative h-16 w-12 flex items-center justify-center">
              <div
                className={`flame-anim-2 w-6 h-12 rounded-full bg-gradient-to-t from-[#d4bbff] via-[#ebdcff] to-[#ffffff] shadow-[0_0_38px_rgba(212,187,255,1)] transition-all duration-700 ${
                  candlesBlown ? 'scale-0 opacity-0 -translate-y-4' : 'opacity-100'
                }`}
              ></div>
              {candlesBlown && (
                <div className="absolute bottom-2 w-2.5 h-16 bg-[#d4bbff]/60 rounded-full blur-[2px] animate-pulse"></div>
              )}
            </div>
            <div className="w-1 h-4 bg-[#3f2e4a] rounded-t-sm"></div>
            <div className="w-5 h-32 sm:h-36 rounded-t-md bg-gradient-to-b from-[#ebdcff] via-[#4a2e7a] to-[#b99bef] shadow-md border-t border-white/70"></div>
          </div>

          {/* Candle 3 (Right) */}
          <div className="flex flex-col items-center relative">
            <div className="relative h-14 w-10 flex items-center justify-center">
              <div
                className={`flame-anim-3 w-5 h-10 rounded-full bg-gradient-to-t from-[#fcafdb] via-[#ffd8eb] to-[#ffffff] shadow-[0_0_32px_rgba(252,175,219,1)] transition-all duration-700 ${
                  candlesBlown ? 'scale-0 opacity-0 -translate-y-4' : 'opacity-100'
                }`}
              ></div>
              {candlesBlown && (
                <div className="absolute bottom-2 w-2 h-14 bg-[#94d2c9]/60 rounded-full blur-[2px] animate-pulse"></div>
              )}
            </div>
            <div className="w-1 h-3 bg-[#3f2e4a] rounded-t-sm"></div>
            <div className="w-5 h-24 sm:h-28 rounded-t-md bg-gradient-to-b from-[#fcafdb] via-[#6d3257] to-[#b99bef] shadow-md border-t border-white/60"></div>
          </div>
        </div>

        {/* 2-Tier Cake */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center cake-float">
          {/* Top Tier */}
          <div className="relative w-64 sm:w-80 h-28 sm:h-32 rounded-t-3xl bg-gradient-to-b from-[#352042] via-[#2d1b37] to-[#25152f] shadow-2xl flex flex-col items-center justify-between p-3 border-t border-[#d4bbff]/40 border-x border-[#d4bbff]/20">
            {/* Piped Icing Dots */}
            <div className="w-full flex justify-around px-2 pt-1">
              <span className="w-3 h-3 rounded-full bg-[#fcafdb] shadow-[0_0_8px_#fcafdb]"></span>
              <span className="w-3 h-3 rounded-full bg-[#94d2c9] shadow-[0_0_8px_#94d2c9]"></span>
              <span className="w-3 h-3 rounded-full bg-[#d4bbff] shadow-[0_0_8px_#d4bbff]"></span>
              <span className="w-3 h-3 rounded-full bg-[#94d2c9] shadow-[0_0_8px_#94d2c9]"></span>
              <span className="w-3 h-3 rounded-full bg-[#fcafdb] shadow-[0_0_8px_#fcafdb]"></span>
            </div>

            {/* Cake Filigree */}
            <div className="flex items-center gap-4 my-auto text-[#94d2c9]">
              <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
              <span className="material-symbols-outlined text-[20px] text-[#fcafdb]">star</span>
              <span className="material-symbols-outlined text-[22px] text-[#d4bbff]">auto_awesome</span>
              <span className="material-symbols-outlined text-[20px] text-[#fcafdb]">star</span>
              <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
            </div>

            {/* Scalloped Rim */}
            <div className="w-full flex items-center justify-around px-2 border-b border-[#3f2e4a]/60 pb-1">
              <span className="w-2 h-2 rounded-full bg-[#ffd8eb]"></span>
              <span className="w-2 h-2 rounded-full bg-[#94d2c9]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ebdcff]"></span>
              <span className="w-2 h-2 rounded-full bg-[#94d2c9]"></span>
              <span className="w-2 h-2 rounded-full bg-[#ffd8eb]"></span>
            </div>
          </div>

          {/* Base Tier */}
          <div className="relative -mt-2 w-76 sm:w-96 md:w-[440px] h-36 sm:h-40 rounded-t-3xl bg-gradient-to-b from-[#3a2548] via-[#2e1939] to-[#200f2b] shadow-2xl flex flex-col items-center justify-between p-4 border-t border-[#fcafdb]/40 border-x border-[#fcafdb]/20">
            {/* Plaque Inscribed with "Sheldon" */}
            <div className="flex flex-col items-center text-center my-auto px-8 py-2 rounded-2xl bg-[#170721]/90 border border-[#d4bbff]/30 backdrop-blur-sm shadow-md">
              <span className="font-display italic text-3xl sm:text-4xl text-[#d4bbff] tracking-wider font-medium leading-none drop-shadow-md">
                {birthdayWishData.plaqueTitle}
              </span>
              <span className="font-body text-[10px] text-[#fcafdb] tracking-[0.25em] uppercase font-semibold mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[12px] text-[#94d2c9]">flutter_dash</span>
                <span>{birthdayWishData.plaqueSubtitle}</span>
                <span className="material-symbols-outlined text-[12px] text-[#94d2c9]">flutter_dash</span>
              </span>
            </div>
          </div>

          {/* Pedestal Stand */}
          <div className="w-80 sm:w-96 md:w-[460px] flex flex-col items-center">
            <div className="w-full h-5 rounded-full bg-[#34233e] shadow-lg border-t border-[#d4bbff]/30"></div>
            <div className="w-16 h-8 bg-gradient-to-b from-[#34233e] to-[#170721]"></div>
            <div className="w-56 h-4 rounded-full bg-[#34233e] shadow-2xl"></div>
          </div>
        </div>

        {/* Primary Interaction Button or Post-Extinguish Block */}
        {!candlesBlown ? (
          <div className="mt-8 flex flex-col items-center text-center max-w-md w-full">
            <button
              type="button"
              onClick={handleBlowOut}
              className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-[0_0_30px_rgba(252,175,219,0.5)] hover:shadow-[0_0_45px_rgba(148,210,201,0.7)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto font-body text-[14px] font-bold tracking-wider uppercase cursor-pointer"
            >
              <span className="text-xl">🎂</span>
              <span>Blow Out the Candles! 🎂✨</span>
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                flutter_dash
              </span>
            </button>
            <p className="font-body text-[12px] text-[#cbc4d1] mt-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#94d2c9]">touch_app</span>
              <span>Click the button to blow out your candles. No microphone required.</span>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl mt-6 flex flex-col items-center text-center animate-float-slow">
            <div className="w-full rounded-2xl p-6 sm:p-7 bg-[#25152f]/95 shadow-2xl backdrop-blur-md text-center flex flex-col items-center gap-2.5 border border-[#fcafdb]/40">
              <div className="flex items-center gap-2 text-[#94d2c9]">
                <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
                <span className="font-body text-[11px] uppercase tracking-widest font-bold text-[#fcafdb]">
                  {birthdayWishData.badgeText}
                </span>
                <span className="material-symbols-outlined text-[18px]">flutter_dash</span>
              </div>
              <p className="font-editorial italic text-2xl sm:text-3xl text-[#d4bbff] leading-snug">
                {birthdayWishData.quote}
              </p>
              <span className="font-body text-[12px] text-[#cbc4d1] flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-[14px] text-[#94d2c9]">auto_awesome</span>
                <span>{birthdayWishData.subtext}</span>
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center w-full">
              <button
                type="button"
                onClick={onOpenFinalLetter}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#fcafdb] via-[#B99BEF] to-[#94d2c9] text-[#25152F] font-body text-[14px] font-bold tracking-wide shadow-lg hover:shadow-[0_0_35px_rgba(252,175,219,0.7)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
              >
                <span>There's One More Thing... ✉️</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
