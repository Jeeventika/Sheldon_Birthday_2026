/**
 * The 4 Canonical Destinations for "A World Made For Sheldon"
 * 01 Quizzes -> 02 Letters -> 03 Playlist -> 04 Surprise Box
 */
export const destinationsConfig = [
  {
    id: "quizzes",
    number: "01",
    title: "Quizzes",
    subtitle: "“Let's see how well you know me.”",
    description: "Two heartfelt memory quizzes celebrating our shared memories.",
    icon: "auto_awesome",
    statusText: "Unlocked",
    unlocked: true,
    accentColor: "#F3A7D2",
    gradient: "from-[#FFF0F6] via-[#FCE4F0] to-[#F8D2E6]",
    borderColor: "border-[#F3A7D2]",
    badgeBg: "bg-white",
    ctaLabel: "Begin Journey",
  },
  {
    id: "letters",
    number: "02",
    title: "Letters",
    subtitle: "“A few things I want you to know.”",
    description: "Three sealed notes waiting patiently. Unfolds in sequential order.",
    icon: "mail",
    statusText: "Unlocks after Quizzes",
    unlocked: false,
    accentColor: "#B99BEF",
    gradient: "from-[#FAF5FD] via-[#F4EBFA] to-[#EDE0F6]",
    borderColor: "border-[#D8C7D8]",
    badgeBg: "bg-white/90",
    ctaLabel: "Locked",
    note: "Three sealed folios waiting patiently"
  },
  {
    id: "playlist",
    number: "03",
    title: "Playlist",
    subtitle: "“A collection of songs with a little meaning.”",
    description: "A soundtrack curated for quiet hours and shared late-night drives.",
    icon: "album",
    statusText: "Unlocks after Letters",
    unlocked: false,
    accentColor: "#9BD9D0",
    gradient: "from-[#F2FBF9] via-[#E8F7F4] to-[#DBF1ED]",
    borderColor: "border-[#9BD9D0]/80",
    badgeBg: "bg-white/90",
    ctaLabel: "Locked",
    note: "A soundtrack curated for quiet hours"
  },
  {
    id: "surprise-box",
    number: "04",
    title: "Surprise Box",
    subtitle: "“Something special is waiting for you.”",
    description: "The grand finale: a bespoke gift box and ceremonial birthday cake.",
    icon: "featured_seasonal_and_gifts",
    statusText: "Unlocks after Playlist",
    unlocked: false,
    accentColor: "#F28CA9",
    gradient: "from-[#FFF4F7] via-[#FDE8EF] to-[#FBD6E2]",
    borderColor: "border-[#F28CA9]/60",
    badgeBg: "bg-white/90",
    ctaLabel: "Locked",
    note: "Reserved for the final destination of your journey"
  }
];
