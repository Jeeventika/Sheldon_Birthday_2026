import React from 'react';

/**
 * Atmospheric Background with Clove-inspired Ethereal Mist,
 * Floating Butterfly Silhouettes & Radiant Starlight Particles
 */
export default function AtmosphericBackground({ isDark = false }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Radiant Glowing Blobs */}
      {isDark ? (
        <>
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[#6d3257]/25 blur-[140px]"></div>
          <div className="absolute top-1/3 -right-28 w-[550px] h-[550px] rounded-full bg-[#9BD9D0]/15 blur-[150px]"></div>
          <div className="absolute -bottom-24 left-10 w-[500px] h-[500px] rounded-full bg-[#B99BEF]/20 blur-[130px]"></div>
          <div className="absolute top-[60%] right-1/3 w-[450px] h-[450px] rounded-full bg-[#F3A7D2]/15 blur-[140px]"></div>
        </>
      ) : (
        <>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#F3A7D2]/25 via-[#B99BEF]/20 to-transparent rounded-full blur-[130px]"></div>
          <div className="absolute top-[40%] -right-24 w-[550px] h-[550px] bg-[#9BD9D0]/20 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-10 left-10 w-[600px] h-[400px] bg-[#F28CA9]/20 rounded-full blur-[150px]"></div>
          <div className="absolute top-[65%] left-1/3 w-[400px] h-[400px] bg-[#8050A8]/15 rounded-full blur-[120px]"></div>
        </>
      )}

      {/* Floating Butterfly SVG Elements */}
      <div className="butterfly-float absolute top-[18%] left-[10%] text-[#F3A7D2] opacity-75 drop-shadow-[0_0_8px_#F3A7D2]">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
        </svg>
      </div>

      <div className="butterfly-float-delayed absolute top-[65%] right-[12%] text-[#B99BEF] opacity-70 drop-shadow-[0_0_10px_#B99BEF]">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
        </svg>
      </div>

      <div className="butterfly-float absolute top-[30%] right-[18%] text-[#9BD9D0] opacity-60 drop-shadow-[0_0_8px_#9BD9D0]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C10.5 2 7 1.5 4.5 3.5C2 5.5 2 9 4.5 12C6.5 14.5 10 15 12 16.5C14 15 17.5 14.5 19.5 12C22 9 22 5.5 19.5 3.5C17 1.5 13.5 2 12 4.5ZM12 8C12.5 8 13 8.5 13 9.5C13 11 12 13 12 13C12 13 11 11 11 9.5C11 8.5 11.5 8 12 8Z"></path>
        </svg>
      </div>

      {/* Twinkling Starlight SVG */}
      <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <g className="star-twinkle-1">
          <circle cx="15%" cy="25%" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" r="1.5"></circle>
          <circle cx="82%" cy="30%" fill="#F3A7D2" filter="drop-shadow(0 0 4px #F3A7D2)" r="2"></circle>
          <circle cx="68%" cy="15%" fill="#9BD9D0" filter="drop-shadow(0 0 3px #9BD9D0)" r="1.5"></circle>
        </g>
        <g className="star-twinkle-2">
          <circle cx="28%" cy="18%" fill="#B99BEF" filter="drop-shadow(0 0 5px #B99BEF)" r="2"></circle>
          <circle cx="72%" cy="75%" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)" r="1.2"></circle>
          <circle cx="88%" cy="70%" fill="#F28CA9" filter="drop-shadow(0 0 3px #F28CA9)" r="1.6"></circle>
        </g>
        <g className="star-twinkle-3">
          <circle cx="48%" cy="20%" fill="#fff" opacity="0.7" r="1.2"></circle>
          <circle cx="88%" cy="40%" fill="#F3A7D2" filter="drop-shadow(0 0 3px #F3A7D2)" r="1.8"></circle>
          <circle cx="18%" cy="78%" fill="#9BD9D0" filter="drop-shadow(0 0 4px #9BD9D0)" opacity="0.85" r="1.5"></circle>
        </g>
        <g className="star-twinkle-4">
          <circle cx="34%" cy="82%" fill="#B99BEF" r="1.4"></circle>
          <circle cx="65%" cy="28%" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" r="1.5"></circle>
          <circle cx="10%" cy="48%" fill="#F3A7D2" opacity="0.6" r="1.2"></circle>
        </g>
      </svg>
    </div>
  );
}
