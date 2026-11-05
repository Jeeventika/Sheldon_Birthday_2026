import React, { useState } from 'react';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Individual Letter Reader Component
 * Marks letters read by stable unique letter ID.
 */
export default function LetterReader({
  letter,
  onBackToGallery,
  onUnlockNext
}) {
  const { markLetterAsRead, progression } = useProgression();
  const [showModal, setShowModal] = useState(false);

  if (!letter) return null;

  const isAlreadyRead = progression.readLetterIds.includes(letter.id);

  const handleConfirmRead = () => {
    markLetterAsRead(letter.id);
    setShowModal(false);
    if (onUnlockNext) onUnlockNext();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      {/* Top Action Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-sm border border-[#E4D3E0]">
        <button
          type="button"
          onClick={onBackToGallery}
          className="inline-flex items-center gap-2 text-[#25152F] hover:text-[#8050A8] transition-all py-1.5 px-4 rounded-full bg-[#FAF5FC] hover:bg-[#F3E7F8] border border-[#E9D6F0] text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#8050A8]">
            arrow_back
          </span>
          <span>Back to Envelope Collection</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FC] text-[#5E4369] text-[11px] font-semibold border border-[#E9D6F0]">
            <span className="material-symbols-outlined text-[14px] text-[#1e8a7b]">
              mark_email_read
            </span>
            <span>Archived Keepsake</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCEAF4] border border-[#F3A7D2]/40 text-[#a2437b] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28CA9] animate-pulse"></span>
            <span className="tracking-widest uppercase">
              Letter {letter.number} {isAlreadyRead ? '• Completed' : '• Unfolded'}
            </span>
          </div>
        </div>
      </div>

      {/* Chapter Metadata Banner */}
      <div className="w-full bg-[#FAF5FC] border border-[#E9D6F0] p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-full bg-[#F8D7E8] border border-[#F3A7D2] text-[#45245F] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">flutter_dash</span>
          </div>
          <div className="flex flex-col">
            <span className="font-body text-[11px] tracking-widest uppercase text-[#8050A8] font-bold">
              {letter.folio} • Personal Correspondence
            </span>
            <span className="font-display italic text-lg sm:text-xl text-[#25152F] font-semibold">
              Keepsake {letter.number} • {letter.dateNote}
            </span>
            <span className="font-body text-[12px] text-[#5E4369]">
              Estimated reading time • 3 quiet minutes
            </span>
          </div>
        </div>

        {/* Dispatch Stamp Badge */}
        <div className="z-10 flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-[#E9D6F0] shadow-sm rotate-1 text-center">
          <div className="flex items-center gap-1 text-[#8050A8] text-[10px] tracking-widest font-bold uppercase">
            <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
            <span>AIRMAIL DISPATCH</span>
            <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
          </div>
          <div className="font-display italic text-[13px] text-[#25152F] tracking-tight mt-0.5">
            Keepsake {letter.number} • Special Delivery
          </div>
          <div className="text-[9px] text-[#a2437b] tracking-wider uppercase font-semibold">
            POSTED TO SHELDON
          </div>
        </div>
      </div>

      {/* Central Parchment Sheet */}
      <div className="relative w-full bg-[#FAF6FD] text-[#241734] p-6 sm:p-12 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(20,8,30,0.1),0_0_0_1px_rgba(212,187,255,0.4)] overflow-hidden border-2 border-[#fcafdb]/50">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#d4bbff]/30 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#fcafdb]/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-[#ebdcf8]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#933979]">
                flutter_dash
              </span>
              <span className="font-body text-[11px] tracking-widest uppercase text-[#883572] font-semibold">
                {letter.folio} • Personal Correspondence
              </span>
            </div>
            <span className="font-body text-[12px] text-[#665476] italic">
              {letter.writtenLocation}
            </span>
          </div>

          {/* Letter Title */}
          <div className="flex flex-col gap-1">
            <h1 className="font-display italic text-3xl sm:text-4xl text-[#2a133d] tracking-tight font-normal">
              Letter {letter.number}: {letter.title}
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-[#883572]">
              {letter.subtitle}
            </p>
          </div>

          {/* Salutation */}
          <div className="pt-2">
            <p className="font-display italic text-2xl text-[#2a133d]">
              {letter.salutation}
            </p>
          </div>

          {/* Body Paragraphs with Inline Photo Section */}
          <div className="flex flex-col gap-4 text-[#362747] leading-relaxed font-body text-[16px] sm:text-[17px]">
            {letter.paragraphs.map((p, idx) => {
              const insertPhotoHere =
                letter.photoSection &&
                letter.photoSection.insertAfterParagraphIndex === idx;

              return (
                <React.Fragment key={idx}>
                  <p>{p}</p>

                  {insertPhotoHere && (
                    <div className="py-2">
                      {/* Letter 01: Vintage Polaroid-style frame */}
                      {letter.photoSection.type === 'polaroid' && (
                        <div className="my-6 mx-auto max-w-xl w-full">
                          <div className="relative bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl shadow-[0_12px_35px_rgba(128,80,168,0.18)] border border-[#fcafdb]/60 transition-transform duration-300 hover:rotate-0 -rotate-0.5 group">
                            {/* Top Washi Tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1 rounded-sm bg-gradient-to-r from-[#fcafdb] via-[#d4bbff] to-[#c4f2ea] text-[#301642] font-body text-[11px] uppercase tracking-widest font-semibold shadow-xs border border-white/80">
                              <span className="material-symbols-outlined text-[13px]">flutter_dash</span>
                              <span>{letter.photoSection.tapeLabel || 'MINT WASHI • DEC 13'}</span>
                            </div>

                            {/* Polaroid Image Slot - preserve complete photo without cutting out either person */}
                            <div className="relative w-full rounded-xl overflow-hidden bg-[#241236]/5 p-1 border border-[#ebdcf8]/80 flex items-center justify-center">
                              <img
                                src={letter.photoSection.image}
                                alt={letter.photoSection.alt || letter.photoSection.caption}
                                className="w-full h-auto max-h-[480px] object-contain rounded-lg shadow-xs"
                                loading="lazy"
                              />
                              <div className="absolute top-3 right-3 bg-[#241236]/80 backdrop-blur-sm text-[#ffd8eb] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#fcafdb]/40">
                                {letter.photoSection.badge || 'DEC 13, 2025'}
                              </div>
                            </div>

                            {/* Polaroid Caption Area */}
                            <div className="pt-3 pb-1 px-2 flex flex-col gap-1 text-center">
                              <p className="font-editorial italic text-[17px] sm:text-[18px] text-[#2a133d] leading-snug">
                                “{letter.photoSection.caption}”
                              </p>
                              {letter.photoSection.location && (
                                <span className="font-body text-[11px] text-[#6c557c] tracking-widest uppercase font-semibold mt-0.5">
                                  {letter.photoSection.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Letter 02: Subtle gaming-inspired frame with dark purple accents and neon-lavender glow */}
                      {letter.photoSection.type === 'gaming' && (
                        <div className="my-6 mx-auto max-w-2xl w-full">
                          <div className="relative bg-gradient-to-b from-[#1c102a] via-[#221334] to-[#170c22] p-4 sm:p-5 rounded-2xl shadow-[0_0_35px_rgba(185,155,239,0.3),0_12px_30px_rgba(0,0,0,0.5)] border-2 border-[#b99bef]/70 transition-transform duration-300 hover:scale-[1.01] group">
                            {/* Gamer Header Bar */}
                            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#b99bef]/30 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
                                <span className="font-mono text-[11px] text-[#d4bbff] tracking-wider uppercase font-bold">
                                  VALORANT MATCH ARCHIVE // PROTOCOL
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f43f5e]/20 text-[#fda4af] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#f43f5e]/40">
                                <span className="material-symbols-outlined text-[12px]">military_tech</span>
                                <span>{letter.photoSection.badge || 'VICTORY // TEAM MVP'}</span>
                              </div>
                            </div>

                            {/* Screenshot container - preserve full Valorant victory screenshot including MVP details */}
                            <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-[#b99bef]/40 flex items-center justify-center">
                              <img
                                src={letter.photoSection.image}
                                alt={letter.photoSection.alt || letter.photoSection.caption}
                                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                                loading="lazy"
                              />
                            </div>

                            {/* Caption */}
                            <div className="pt-3 pb-1 px-2 flex flex-col gap-1 text-center">
                              <p className="font-editorial italic text-[17px] sm:text-[18px] text-[#ffd8eb] leading-snug">
                                “{letter.photoSection.caption}”
                              </p>
                              {letter.photoSection.subtext && (
                                <span className="font-mono text-[11px] text-[#b99bef] tracking-widest uppercase font-semibold mt-0.5">
                                  {letter.photoSection.subtext}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Letter 03: Two side-by-side matching vintage photo frames (Sheldon & Claret) */}
                      {letter.photoSection.type === 'duo_portrait' && (
                        <div className="my-6 w-full">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                            {/* Sheldon - The Knight */}
                            <div className="relative bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl shadow-[0_12px_35px_rgba(252,175,219,0.2),0_0_25px_rgba(212,187,255,0.25)] border border-[#fcafdb]/60 flex flex-col justify-between -rotate-0.5 hover:rotate-0 transition-transform">
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-sm bg-gradient-to-r from-[#fed7aa] to-[#fbcfe8] text-[#301642] font-body text-[10px] uppercase tracking-widest font-bold shadow-xs border border-white">
                                <span className="material-symbols-outlined text-[12px]">shield</span>
                                <span>{letter.photoSection.leftPhoto.tapeLabel || 'GOLD WASHI'}</span>
                              </div>

                              <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#241236]/5 p-1 border border-[#ebdcf8]/80 flex items-center justify-center">
                                <img
                                  src={letter.photoSection.leftPhoto.image}
                                  alt={letter.photoSection.leftPhoto.alt || letter.photoSection.leftPhoto.label}
                                  className="max-h-full max-w-full object-contain rounded-lg shadow-xs"
                                  loading="lazy"
                                />
                                <div className="absolute top-2.5 right-2.5 bg-[#241236]/80 backdrop-blur-sm text-[#ffd8eb] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#fcafdb]/40">
                                  {letter.photoSection.leftPhoto.badge}
                                </div>
                              </div>

                              <div className="pt-3 text-center">
                                <span className="font-display italic text-lg text-[#2a133d] font-semibold">
                                  {letter.photoSection.leftPhoto.label}
                                </span>
                              </div>
                            </div>

                            {/* Claret - The Princess */}
                            <div className="relative bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl shadow-[0_12px_35px_rgba(252,175,219,0.2),0_0_25px_rgba(212,187,255,0.25)] border border-[#fcafdb]/60 flex flex-col justify-between rotate-0.5 hover:rotate-0 transition-transform">
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-sm bg-gradient-to-r from-[#fbcfe8] to-[#d4bbff] text-[#301642] font-body text-[10px] uppercase tracking-widest font-bold shadow-xs border border-white">
                                <span className="material-symbols-outlined text-[12px]">crown</span>
                                <span>{letter.photoSection.rightPhoto.tapeLabel || 'ROSE WASHI'}</span>
                              </div>

                              <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#241236]/5 p-1 border border-[#ebdcf8]/80 flex items-center justify-center">
                                <img
                                  src={letter.photoSection.rightPhoto.image}
                                  alt={letter.photoSection.rightPhoto.alt || letter.photoSection.rightPhoto.label}
                                  className="max-h-full max-w-full object-contain rounded-lg shadow-xs"
                                  loading="lazy"
                                />
                                <div className="absolute top-2.5 right-2.5 bg-[#241236]/80 backdrop-blur-sm text-[#ffd8eb] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#fcafdb]/40">
                                  {letter.photoSection.rightPhoto.badge}
                                </div>
                              </div>

                              <div className="pt-3 text-center">
                                <span className="font-display italic text-lg text-[#2a133d] font-semibold">
                                  {letter.photoSection.rightPhoto.label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Shared Caption */}
                          <div className="pt-4 text-center max-w-xl mx-auto">
                            <p className="font-editorial italic text-[17px] sm:text-[18px] text-[#2a133d] leading-snug">
                              “{letter.photoSection.caption}”
                            </p>
                            {letter.photoSection.subtext && (
                              <span className="font-body text-[11px] text-[#883572] tracking-widest uppercase font-semibold mt-1 block">
                                {letter.photoSection.subtext}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Fallback Polaroids if no custom photoSection present */}
          {!letter.photoSection && letter.polaroids && letter.polaroids.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 my-2">
              {letter.polaroids.map((polaroid, idx) => (
                <div
                  key={polaroid.id || idx}
                  className={`relative bg-white/95 p-3 rounded-xl shadow-[0_8px_25px_rgba(42,19,61,0.12)] transition-transform duration-300 flex flex-col gap-2 border border-[#fcafdb]/50 ${
                    idx === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0 md:mt-4'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-3 py-0.5 rounded-sm bg-gradient-to-r from-[#fcafdb]/90 to-[#d4bbff]/90 text-[#301642] font-body text-[10px] uppercase tracking-widest shadow-xs border border-white/60">
                    <span className="material-symbols-outlined text-[11px]">flutter_dash</span>
                    <span>{polaroid.tapeLabel}</span>
                  </div>

                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={polaroid.image}
                      alt={polaroid.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#241236]/80 backdrop-blur-sm text-[#ffd8eb] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#fcafdb]/40">
                      {polaroid.badge}
                    </div>
                  </div>

                  <div className="pt-1 pb-1 px-1 flex flex-col gap-1 text-center">
                    <span className="font-editorial italic text-[16px] text-[#2a133d]">
                      {polaroid.caption}
                    </span>
                    <span className="font-body text-[11px] text-[#6c557c] tracking-wider uppercase">
                      {polaroid.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Signoff */}
          <div className="pt-4 flex flex-col gap-1">
            <p className="font-editorial italic text-2xl text-[#2a133d]">
              {letter.closing}
            </p>
            <span className="font-body text-[12px] text-[#883572] tracking-widest uppercase font-semibold">
              Chapter I • Unspoken Correspondence
            </span>
          </div>

          {/* Digital Wax Seal Imprint */}
          <div className="pt-6 flex items-center justify-between flex-wrap gap-4 border-t border-[#ebdcf8]">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#35143f] border-2 border-[#fcafdb] flex items-center justify-center text-[#ffd8eb] shadow-lg shadow-[#35143f]/40 relative group">
                <span className="material-symbols-outlined text-[26px]">
                  flutter_dash
                </span>
                <div className="absolute inset-0 rounded-full border border-[#d4bbff]/40 animate-ping opacity-25 pointer-events-none"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[10px] tracking-widest uppercase text-[#883572] font-semibold">
                  DIGITAL WAX IMPRINT
                </span>
                <span className="font-body text-[13px] text-[#2a133d] font-bold">
                  SEALED WITH IMMORTAL WARMTH ✦
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#5f496f] font-body text-[11px] bg-[#eedef8] px-4 py-1.5 rounded-full border border-[#d4bbff]/50">
              <span className="material-symbols-outlined text-[15px] text-[#883572]">
                ink_pen
              </span>
              <span>Handwritten • Archival Copy #{letter.number}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6">
        <button
          type="button"
          onClick={onBackToGallery}
          className="inline-flex items-center gap-2 text-[#5E4369] hover:text-[#25152F] text-[12px] font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full hover:bg-white/70 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Desk</span>
        </button>

        <button
          type="button"
          onClick={() => {
            markLetterAsRead(letter.id);
            setShowModal(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2a133d] hover:bg-[#35184d] text-[#d4bbff] hover:text-white font-body text-[12px] font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-[0_4px_25px_rgba(212,187,255,0.25)] border-2 border-[#d4bbff] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-[#fcafdb]">
            flutter_dash
          </span>
          <span>{isAlreadyRead ? '✓ MARKED AS READ' : '✓ I\'VE READ THIS • UNLOCK NEXT LETTER ✦'}</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF5FC] max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-[#d4bbff] flex flex-col items-center text-center gap-4 relative animate-float-slow">
            <div className="w-16 h-16 rounded-full bg-[#FCEAF4] border border-[#F3A7D2] text-[#45245F] flex items-center justify-center shadow-lg shadow-[#F3A7D2]/30">
              <span className="material-symbols-outlined text-[32px]">flutter_dash</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-body text-[11px] tracking-widest uppercase text-[#8050A8] font-semibold">
                Chapter I • Unspoken Correspondence
              </span>
              <h3 className="font-display italic text-2xl text-[#25152F]">
                Letter Marked As Read
              </h3>
              <p className="font-body text-[14px] text-[#5E4369] leading-relaxed">
                “{letter.title}” has been recorded in your keepsake archive for Sheldon. Next letter in sequence is now ready.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 rounded-full bg-white border border-[#D8C7D8] text-[#5E4369] font-body text-[12px] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Keep Reading This
              </button>
              <button
                type="button"
                onClick={handleConfirmRead}
                className="w-full py-2.5 px-4 rounded-full bg-[#25152F] text-white font-body text-[12px] tracking-wider uppercase font-semibold hover:bg-[#45245F] shadow-md transition-all cursor-pointer"
              >
                Back to Desk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
