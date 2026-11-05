import React, { useState } from 'react';
import { playlistData } from '../../data/playlistData';
import { useProgression } from '../../context/ProgressionContext';

/**
 * Music Room Component
 * 100% Data-Driven & Integrated with YouTube Music:
 * - 8 Curated soundtrack pieces for Sheldon
 * - External playback on YouTube Music opened in a new tab
 * - Explicit "I've listened to this song" confirmation button to record progress
 * - Dynamic discovery tracker unlocking Destination 04 once all songs are heard
 * - Dedicated "Tender Note from the Curator" card with lyric excerpt and interpretation
 * - Nighttrack Folio tracklist with listened indicators
 * - Replay & revisit support without resetting progress
 */
export default function MusicRoom({ onBack, onCompleteDestination }) {
  const { progression, recordTrackPlayed, derivedStatus } = useProgression();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const totalTracks = playlistData.length;
  const safeIndex = totalTracks > 0 ? Math.min(currentTrackIndex, totalTracks - 1) : 0;
  const currentTrack = playlistData[safeIndex] || {
    id: 'placeholder',
    number: '01',
    title: 'Sanctuary of Sound',
    artist: 'Claret',
    genre: 'Ambient Twilight',
    duration: '0:00',
    youtubeUrl: 'https://music.youtube.com',
    lyric: '“A starlight melody for Sheldon.”',
    quote: 'A gentle melody waiting in the stars.',
    decoration: 'Pressed Lavender & Mint Spore',
    sealDate: 'October 2024',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  };

  const playedIds = progression?.playedTrackIds || [];
  const discoveredCount = playlistData.filter((t) => playedIds.includes(t.id)).length;
  const progressPercent = totalTracks > 0 ? Math.round((discoveredCount / totalTracks) * 100) : 100;
  const remainingCount = Math.max(0, totalTracks - discoveredCount);
  const isSurpriseUnlocked = derivedStatus['surprise-box']?.unlocked ?? false;
  const isCurrentTrackListened = playedIds.includes(currentTrack.id);

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleConfirmListened = () => {
    recordTrackPlayed(currentTrack.id);
  };

  const handlePrev = () => {
    if (totalTracks === 0) return;
    const nextIdx = currentTrackIndex > 0 ? currentTrackIndex - 1 : totalTracks - 1;
    handleSelectTrack(nextIdx);
  };

  const handleNext = () => {
    if (totalTracks === 0) return;
    const nextIdx = currentTrackIndex < totalTracks - 1 ? currentTrackIndex + 1 : 0;
    handleSelectTrack(nextIdx);
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex flex-col gap-8 text-[#cbc4d1]">
      {/* Header & Discovery Progress Banner */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#34233e]/80 border border-[#fcafdb]/30 backdrop-blur-md shadow-[0_0_18px_rgba(252,175,219,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94d2c9] animate-ping"></span>
              <span className="font-body text-[11px] uppercase tracking-widest text-[#ebdcff] font-semibold">
                Destination 03 • Sanctuary of Sound
              </span>
            </div>
            <h1 className="font-display italic text-3xl sm:text-5xl text-[#f3dafe] tracking-tight leading-none mt-2 drop-shadow-[0_2px_24px_rgba(212,187,255,0.3)]">
              Music Room
            </h1>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#d4bbff]/90 font-normal max-w-xl">
              A little collection of songs, each carrying an immortal piece of a feeling for Sheldon.
            </p>
          </div>

          {/* Discovery Milestone Pill */}
          <div className="flex flex-col gap-2 bg-[#25152f]/90 border border-[#d4bbff]/25 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(15,3,23,0.7)] min-w-[280px]">
            <div className="flex items-center justify-between text-[#f3dafe]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#94d2c9]">
                  auto_awesome
                </span>
                <span className="font-body text-[12px] tracking-wider uppercase text-[#ebdcff] font-bold">
                  Melody Memory
                </span>
              </div>
              <span className="font-body text-[16px] text-[#fcafdb] font-bold">
                {discoveredCount} / {totalTracks}
              </span>
            </div>
            <div className="w-full bg-[#3f2e4a]/90 h-2.5 rounded-full overflow-hidden p-0.5 border border-[#d4bbff]/20">
              <div
                className="h-full bg-gradient-to-r from-[#fcafdb] via-[#d4bbff] to-[#94d2c9] rounded-full shadow-[0_0_16px_rgba(212,187,255,0.9)] transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between font-body text-[11px] text-[#cbc4d1]">
              <span className="text-[#94d2c9] font-semibold">{progressPercent}% Discovered</span>
              <span className="flex items-center gap-1 text-[#fcafdb]">
                <span className="material-symbols-outlined text-[13px]">lock_clock</span>
                {remainingCount} tracks remaining
              </span>
            </div>
          </div>
        </div>

        {/* Progression Status Banner */}
        <div className="bg-gradient-to-r from-[#25152f]/95 via-[#6d3257]/40 to-[#34233e]/90 border border-[#d4bbff]/25 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(15,3,23,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6d3257]/80 border border-[#fcafdb]/40 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(252,175,219,0.35)]">
              <span className="material-symbols-outlined text-[#fcafdb] text-[20px]">
                hotel_class
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[12px] uppercase tracking-wider text-[#d4bbff] font-bold">
                Surprise Box Unlocking Ritual
              </span>
              <span className="font-body text-[13px] text-[#cbc4d1]">
                {discoveredCount} of {totalTracks} songs confirmed. Destination 04 awakens the moment every melody is experienced.
              </span>
            </div>
          </div>
          <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#170721]/80 border border-[#94d2c9]/40 text-[#94d2c9] font-body text-[11px] tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">stars</span>
            <span>{isSurpriseUnlocked ? 'Destination 04: Unlocked!' : 'Destination 04: In Progress'}</span>
          </div>
        </div>
      </section>

      {/* Two-Column Master Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RIGHT (or Top on Mobile): Player Showcase & Curator Dedication */}
        <section className="order-1 lg:order-2 lg:col-span-7 flex flex-col gap-6">
          {/* Main Deck */}
          <div className="bg-[#25152f]/85 border border-[#d4bbff]/25 backdrop-blur-2xl rounded-3xl p-5 sm:p-7 shadow-[0_24px_64px_rgba(10,2,18,0.7)] flex flex-col gap-5 relative overflow-hidden">
            {/* Album Artwork Showcase */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.65)] group border border-[#d4bbff]/20">
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0c26] via-[#25152f]/60 to-transparent"></div>

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3.5 py-1 rounded-full bg-[#170721]/85 border border-[#94d2c9]/40 backdrop-blur-md text-[#94d2c9] text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[13px] text-[#ff4b6b]">play_arrow</span>
                  <span>YouTube Music Edition</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-9 h-9 rounded-full bg-[#170721]/80 border border-[#fcafdb]/40 backdrop-blur-md flex items-center justify-center text-[#fcafdb] cursor-pointer hover:bg-[#fcafdb] hover:text-[#25152F] transition-all"
                  title="Mark as Favorite"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFavorite ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* Track Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-bold">
                    Track {currentTrack.number} • {currentTrack.artist}
                  </span>
                  {isCurrentTrackListened && (
                    <span className="px-2 py-0.5 rounded-full bg-[#175B51]/80 border border-[#9BD9D0] text-[#9BD9D0] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      Listened
                    </span>
                  )}
                </div>
                <h3 className="font-display italic text-2xl sm:text-4xl text-[#f3dafe] font-semibold leading-tight drop-shadow-md">
                  {currentTrack.title}
                </h3>
                <p className="font-body text-[13px] text-[#d4bbff]/90 mt-0.5">
                  {currentTrack.genre} • Dedicated to Sheldon
                </p>
              </div>
            </div>

            {/* Listening Instruction Helper Box */}
            <div className="p-3.5 rounded-2xl bg-[#1c0c26]/80 border border-[#45245F] text-xs text-[#cbc4d1] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#9BD9D0] shrink-0">
                headphones
              </span>
              <span>
                Click <strong className="text-[#fcafdb]">“Listen on YouTube Music”</strong> to play the track in a new tab. When you finish, click <strong className="text-[#9BD9D0]">“I've listened to this song”</strong> to mark your memory!
              </span>
            </div>

            {/* YouTube Music Action & Confirmation Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {/* Primary YouTube Music Link Button (Opens in new tab) */}
              <a
                href={currentTrack.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#fcafdb] via-[#B99BEF] to-[#ffd8eb] text-[#25152F] font-body text-[13px] sm:text-[14px] font-bold tracking-wide shadow-[0_0_24px_rgba(252,175,219,0.5)] hover:shadow-[0_0_35px_rgba(212,187,255,0.8)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px] text-[#25152F]">
                  play_circle
                </span>
                <span>Listen on YouTube Music</span>
                <span className="material-symbols-outlined text-[17px] opacity-75">
                  open_in_new
                </span>
              </a>

              {/* Separate Confirmation Button */}
              <button
                type="button"
                onClick={handleConfirmListened}
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-body text-[13px] font-bold tracking-wide transition-all cursor-pointer border ${
                  isCurrentTrackListened
                    ? 'bg-[#175B51]/50 border-[#9BD9D0] text-[#9BD9D0] shadow-[0_0_20px_rgba(155,217,208,0.3)] hover:bg-[#175B51]/70'
                    : 'bg-[#34233e] hover:bg-[#45245F] border-[#fcafdb]/60 hover:border-[#fcafdb] text-[#ffd8eb] shadow-md hover:scale-[1.01] active:scale-95'
                }`}
                title={isCurrentTrackListened ? 'Already marked as listened (revisit anytime)' : 'Confirm you have listened to this song'}
              >
                <span className="material-symbols-outlined text-[19px]">
                  {isCurrentTrackListened ? 'task_alt' : 'check_circle'}
                </span>
                <span>
                  {isCurrentTrackListened
                    ? "I've Listened ✓"
                    : "I've listened to this song"}
                </span>
              </button>
            </div>

            {/* Previous / Next Track Controls */}
            <div className="flex items-center justify-between w-full pt-3 border-t border-[#d4bbff]/15">
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-full bg-[#34233e]/70 hover:bg-[#3f2e4a] text-[#f3dafe] border border-[#d4bbff]/25 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Previous Track"
              >
                <span className="material-symbols-outlined text-[17px]">skip_previous</span>
                <span>Previous Track</span>
              </button>

              <span className="font-mono text-xs text-[#fcafdb] font-semibold">
                Track {currentTrack.number} of {totalTracks}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-full bg-[#34233e]/70 hover:bg-[#3f2e4a] text-[#f3dafe] border border-[#d4bbff]/25 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Next Track"
              >
                <span>Next Track</span>
                <span className="material-symbols-outlined text-[17px]">skip_next</span>
              </button>
            </div>
          </div>

          {/* Song Dedication Keepsake Card with Lyric Excerpt & Curator Note */}
          <div className="relative bg-gradient-to-br from-[#2b1739]/95 via-[#25152f]/95 to-[#1e0d29]/95 text-[#f3dafe] rounded-2xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(10,2,18,0.7)] border border-[#d4bbff]/25 overflow-hidden">
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#6d3257] border border-[#fcafdb]/40 flex items-center justify-center text-[#fcafdb]">
                    <span className="material-symbols-outlined text-[15px]">flutter_dash</span>
                  </div>
                  <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-bold">
                    Tender Note from the Curator
                  </span>
                </div>
                <div className="px-3 py-0.5 rounded-full bg-[#3f2e4a]/80 border border-[#fcafdb]/40 text-[#fcafdb] text-[11px]">
                  {currentTrack.sealDate}
                </div>
              </div>

              {/* Lyric Excerpt */}
              {currentTrack.lyric && (
                <div className="p-3.5 rounded-xl bg-[#170721]/90 border-l-4 border-[#fcafdb] text-[#ffd8eb] font-editorial italic text-lg sm:text-xl leading-snug">
                  {currentTrack.lyric}
                  <span className="block text-[11px] not-italic text-[#cbc4d1]/70 font-body uppercase tracking-wider mt-1">
                    — Excerpt from {currentTrack.title} ({currentTrack.artist})
                  </span>
                </div>
              )}

              {/* Claret's Personal Interpretation */}
              <div className="space-y-3 font-body text-[14px] sm:text-[15px] text-[#d4bbff] leading-relaxed whitespace-pre-wrap">
                <p>{currentTrack.quote}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-3 border-t border-[#d4bbff]/15 text-[12px]">
                <span className="text-[#cbc4d1]">
                  — Written for track {currentTrack.number} • Sheldon's birthday keepsake
                </span>
                <span className="text-[#94d2c9] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_florist</span>
                  {currentTrack.decoration}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* LEFT (or Bottom on Mobile): The Nighttrack Folio Tracklist */}
        <section className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-3 bg-[#25152f]/85 border border-[#d4bbff]/25 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 shadow-[0_16px_48px_rgba(10,2,18,0.7)]">
          <div className="flex items-center justify-between pb-3 px-1 border-b border-[#d4bbff]/15">
            <div className="flex flex-col">
              <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-bold">
                Archival Sequence
              </span>
              <h2 className="font-display italic text-xl sm:text-2xl text-[#f3dafe] font-semibold">
                The Nighttrack Folio
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34233e]/80 border border-[#d4bbff]/30 text-[#ebdcff] text-[11px]">
              <span className="material-symbols-outlined text-[14px] text-[#94d2c9]">
                queue_music
              </span>
              <span>{totalTracks} Curated Pieces</span>
            </div>
          </div>

          {/* Tracklist items */}
          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
            {playlistData.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              const hasBeenPlayed = playedIds.includes(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#6d3257]/70 via-[#34233e] to-[#25152f] border border-[#fcafdb]/50 shadow-sm'
                      : 'hover:bg-[#34233e]/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-[13px] font-bold w-6 ${
                        isSelected ? 'text-[#fcafdb]' : 'text-[#cbc4d1]/70'
                      }`}
                    >
                      {track.number}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`font-body text-[14px] font-medium truncate ${
                          isSelected ? 'text-[#f3dafe] font-bold' : 'text-[#cbc4d1]'
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="text-[11px] text-[#cbc4d1]/70 truncate">
                        {track.artist} • {track.genre}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hasBeenPlayed ? (
                      <span className="material-symbols-outlined text-[18px] text-[#94d2c9]" title="Listened">
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px] text-[#cbc4d1]/40" title="Not yet listened">
                        radio_button_unchecked
                      </span>
                    )}
                    <span className="font-mono text-[12px] text-[#cbc4d1]/80">
                      {track.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 px-1 flex items-center justify-between text-[#cbc4d1]/80 text-[11px] border-t border-[#d4bbff]/15">
            <span className="flex items-center gap-1.5 text-[#d4bbff]">
              <span className="material-symbols-outlined text-[14px] text-[#94d2c9]">
                touch_app
              </span>
              Select song to view note &amp; link
            </span>
            <span className="text-[#fcafdb] font-mono">{totalTracks} Songs Total</span>
          </div>
        </section>
      </div>

      {/* Surprise Box Gateway Card */}
      <section className="w-full bg-gradient-to-r from-[#25152f]/95 via-[#6d3257]/30 to-[#34233e]/90 border border-[#d4bbff]/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(10,2,18,0.75)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 max-w-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#34233e]/80 border border-[#d4bbff]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,187,255,0.2)]">
            <span className="material-symbols-outlined text-[28px] text-[#fcafdb]">
              featured_seasonal_and_gifts
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-body text-[11px] uppercase tracking-widest text-[#fcafdb] font-bold">
                Next Horizon
              </span>
              <span className="h-1 w-1 rounded-full bg-[#94d2c9]"></span>
              <span className="font-body text-[11px] text-[#ebdcff] uppercase font-semibold">
                Destination 04 of 04
              </span>
            </div>
            <h3 className="font-display italic text-xl sm:text-2xl text-[#f3dafe] font-semibold leading-tight">
              The Surprise Box Awaits Beyond
            </h3>
            <p className="font-body text-[13px] text-[#cbc4d1]">
              Listen to all songs to unseal the final chapter and blow out the birthday candles for Sheldon.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onCompleteDestination('surprise-box')}
          className={`w-full md:w-auto px-7 py-3.5 rounded-full font-body text-[12px] font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isSurpriseUnlocked
              ? 'bg-gradient-to-r from-[#fcafdb] to-[#B99BEF] text-[#25152F] shadow-[0_0_20px_rgba(252,175,219,0.5)] hover:shadow-[0_0_30px_rgba(148,210,201,0.6)]'
              : 'bg-[#34233e]/80 text-[#cbc4d1] border border-[#d4bbff]/30 hover:border-[#fcafdb]/50'
          }`}
        >
          <span>{isSurpriseUnlocked ? 'Explore Surprise Box' : `Surprise Box (${discoveredCount}/${totalTracks} Listened)`}</span>
          <span className="material-symbols-outlined text-[18px]">
            {isSurpriseUnlocked ? 'arrow_forward' : 'lock'}
          </span>
        </button>
      </section>
    </div>
  );
}
