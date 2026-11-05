/**
 * Quizzes Data Configuration
 * 100% Data-Driven Collection for "A World Made For Sheldon"
 * 
 * Quiz 1: "How Well Do You Know Me?" (quiz-me) - 11 Questions (Multiple Choice)
 * Quiz 2: "How Well Do You Know Us?" (quiz-us) - 10 Questions (4 Multiple Choice, 6 Written Response)
 */

export const optionThemes = [
  {
    border: 'border-[#F3A7D2]/40 hover:border-[#F3A7D2]',
    bg: 'bg-[#291933]/90 hover:bg-[#34233e]',
    selectedBg: 'bg-gradient-to-r from-[#6d3257]/80 via-[#45245F] to-[#25152f]',
    selectedBorder: 'border-[#fcafdb]',
    badgeBg: 'bg-[#6d3257]',
    badgeText: 'text-[#ffd8eb]',
    ring: 'ring-[#F3A7D2]/50'
  },
  {
    border: 'border-[#B99BEF]/40 hover:border-[#B99BEF]',
    bg: 'bg-[#291933]/90 hover:bg-[#34233e]',
    selectedBg: 'bg-gradient-to-r from-[#45245F]/90 via-[#34233e] to-[#25152f]',
    selectedBorder: 'border-[#B99BEF]',
    badgeBg: 'bg-[#45245F]',
    badgeText: 'text-[#ebdcff]',
    ring: 'ring-[#B99BEF]/50'
  },
  {
    border: 'border-[#9BD9D0]/40 hover:border-[#9BD9D0]',
    bg: 'bg-[#291933]/90 hover:bg-[#34233e]',
    selectedBg: 'bg-gradient-to-r from-[#175B51]/80 via-[#233f3c] to-[#25152f]',
    selectedBorder: 'border-[#9BD9D0]',
    badgeBg: 'bg-[#175B51]',
    badgeText: 'text-[#c4f2ea]',
    ring: 'ring-[#9BD9D0]/50'
  },
  {
    border: 'border-[#F28CA9]/40 hover:border-[#F28CA9]',
    bg: 'bg-[#291933]/90 hover:bg-[#34233e]',
    selectedBg: 'bg-gradient-to-r from-[#7a2a46]/80 via-[#45245F] to-[#25152f]',
    selectedBorder: 'border-[#F28CA9]',
    badgeBg: 'bg-[#7a2a46]',
    badgeText: 'text-[#ffd8eb]',
    ring: 'ring-[#F28CA9]/50'
  }
];

export const quizzesData = [
  {
    id: "quiz-me",
    number: "01",
    title: "How Well Do You Know Me?",
    subtitle: "Preferences, Habits, Personality & Ambitions",
    category: "Personal Reflections",
    description: "A gentle test to see how closely Sheldon knows Claret: her preferences, habits, personality, ambitions, and little details.",
    questions: [
      {
        id: "me-01",
        category: "Musical Heart",
        tag: "Claret Detail #001",
        question: "What's my favourite music genre?",
        type: "multiple-choice",
        options: [
          "EDM",
          "Indie Pop",
          "Classic Rock",
          "Lo-fi Hip Hop"
        ],
        correctAnswer: "EDM",
        correctAnswerIndex: 0,
        hint: "Bass drops, electric synths, and pure high-energy euphoria."
      },
      {
        id: "me-02",
        category: "Endless Passions",
        tag: "Claret Detail #002",
        question: "What's one thing I could never get bored of?",
        type: "multiple-choice",
        options: [
          "Reading crime thrillers",
          "Gaming",
          "Solving puzzles",
          "Watching anime marathons"
        ],
        correctAnswer: "Gaming",
        correctAnswerIndex: 1,
        hint: "Controller or keyboard in hand, getting competitive alongside Player Two."
      },
      {
        id: "me-03",
        category: "Pure Joy",
        tag: "Claret Detail #003",
        question: "What's something that instantly makes me happy?",
        type: "multiple-choice",
        options: [
          "A hot cup of coffee on a cold morning",
          "Unboxing new stationery",
          "Sheldon",
          "Finding a lost note from months ago"
        ],
        correctAnswer: "Sheldon",
        correctAnswerIndex: 2,
        hint: "The easiest question in this entire universe."
      },
      {
        id: "me-04",
        category: "Personality Quirks",
        tag: "Claret Detail #004",
        question: "What kind of person do I never get along with?",
        type: "multiple-choice",
        options: [
          "Illogical people",
          "Overly quiet introverts",
          "Loud, spontaneous extroverts",
          "People who are always five minutes late"
        ],
        correctAnswer: "Illogical people",
        correctAnswerIndex: 0,
        hint: "When sense and reasoning go out the window, so does my patience."
      },
      {
        id: "me-05",
        category: "Morning Rituals",
        tag: "Claret Detail #005",
        question: "What's the first thing I usually do after waking up?",
        type: "multiple-choice",
        options: [
          "Check social media notifications",
          "Call Sheldon",
          "Drink a tall glass of ice water",
          "Stretch and stare at the ceiling for 10 minutes"
        ],
        correctAnswer: "Call Sheldon",
        correctAnswerIndex: 1,
        hint: "My day never really begins until I hear your voice."
      },
      {
        id: "me-06",
        category: "Daily Essentials",
        tag: "Claret Detail #006",
        question: "What's one thing I always carry with me?",
        type: "multiple-choice",
        options: [
          "A small pocket notebook",
          "A strawberry lip balm",
          "Headphones",
          "A spare hair scrunchie"
        ],
        correctAnswer: "Headphones",
        correctAnswerIndex: 2,
        hint: "Music sanctuary on the go—never leaving home without them."
      },
      {
        id: "me-07",
        category: "Digital Signature",
        tag: "Claret Detail #007",
        question: "What's my most-used emoji?",
        type: "multiple-choice",
        options: [
          "🥺",
          "😊",
          "😂",
          "✨"
        ],
        correctAnswer: "😊",
        correctAnswerIndex: 1,
        hint: "Warm, sweet, and always sent with fond thoughts."
      },
      {
        id: "me-08",
        category: "Speech Habits",
        tag: "Claret Detail #008",
        question: "What's a word I keep repeating?",
        type: "multiple-choice",
        options: [
          "Literally",
          "Actually",
          "Basically",
          "Like"
        ],
        correctAnswer: "Like",
        correctAnswerIndex: 3,
        hint: "It finds its way into, like, every single sentence."
      },
      {
        id: "me-09",
        category: "Wildest Dreams",
        tag: "Claret Detail #009",
        question: "If money weren't a problem, what would I do?",
        type: "multiple-choice",
        options: [
          "Buy all the things I want",
          "Buy an island and never talk to humans",
          "Sleep for an entire month with no alarms",
          "Travel to every continent back-to-back"
        ],
        correctAnswer: "Buy all the things I want",
        correctAnswerIndex: 0,
        hint: "Unfiltered wishlist freedom: all the clothes, gadgets, and gifts."
      },
      {
        id: "me-10",
        category: "Supernatural Wishes",
        tag: "Claret Detail #010",
        question: "What's one ability I'd love to master?",
        type: "multiple-choice",
        options: [
          "Teleportation",
          "Telekinesis",
          "Time travel",
          "Mind reading"
        ],
        correctAnswer: "Telekinesis",
        correctAnswerIndex: 1,
        hint: "Moving things with the power of the mind—the ultimate cool power."
      },
      {
        id: "me-11",
        category: "Comfort Food",
        tag: "Claret Detail #011",
        question: "If I had to eat one food for a week, what would I choose?",
        type: "multiple-choice",
        options: [
          "Dosa",
          "Wood-fired sourdough pizza",
          "Creamy white sauce pasta",
          "Rich tonkotsu ramen"
        ],
        correctAnswer: "Dosa",
        correctAnswerIndex: 0,
        hint: "Crispy, golden, piping hot, and impossible to ever get tired of."
      }
    ]
  },
  {
    id: "quiz-us",
    number: "02",
    title: "How Well Do You Know Us?",
    subtitle: "Shared Story, Memories & Connection",
    category: "Keepsake Journey",
    description: "A trip down memory lane through our shared story, inside jokes, and the connection between Sheldon and Claret.",
    questions: [
      {
        id: "us-01",
        category: "The First Chapter",
        tag: "Our Story #001",
        question: "What was the first thing we talked about?",
        type: "multiple-choice",
        options: [
          "Something about a hackathon",
          "Which programming stack we preferred",
          "A funny meme sent by a mutual friend",
          "Complaining about college exam schedules"
        ],
        correctAnswer: "Something about a hackathon",
        correctAnswerIndex: 0,
        hint: "December 13, 2025—hesitantly approaching a guy in a green shirt."
      },
      {
        id: "us-02",
        category: "The Spark",
        tag: "Our Story #002",
        question: "Who initiated our first conversation?",
        type: "multiple-choice",
        options: [
          "Claret",
          "Sheldon",
          "A mutual teammate introduced us",
          "Neither, we were assigned partners automatically"
        ],
        correctAnswer: "Claret",
        correctAnswerIndex: 0,
        hint: "Talking to Tamil first, then gathering the courage to walk up to you."
      },
      {
        id: "us-03",
        category: "Honest Impressions",
        tag: "Our Story #003",
        question: "What was your first impression of me?",
        type: "text",
        placeholder: "Write your honest first impression of Claret here... (Take your time, Claret will read this ♡)",
        hint: "Be completely genuine. Written responses are saved safely and not scored with a rigid key."
      },
      {
        id: "us-04",
        category: "Unforgettable Talks",
        tag: "Our Story #004",
        question: "What's one conversation between us that I'll never forget?",
        type: "text",
        placeholder: "Tell me about that late-night talk, confession, or moment you remember...",
        hint: "The times where silence turned to truth, or we laughed until our ribs ached."
      },
      {
        id: "us-05",
        category: "Time Rewind",
        tag: "Our Story #005",
        question: "What's one moment you wish you could relive?",
        type: "text",
        placeholder: "Which memory together would you press rewind on if you could?...",
        hint: "If you had a pocket time machine for our story."
      },
      {
        id: "us-06",
        category: "Constant Reminders",
        tag: "Our Story #006",
        question: "What's something that reminds me of you?",
        type: "text",
        placeholder: "A song, a habit, an item, or an everyday sight...",
        hint: "What makes Claret instantly stop and think 'that is so Sheldon'?"
      },
      {
        id: "us-07",
        category: "Daily Dynamic",
        tag: "Our Story #007",
        question: "Who usually texts first?",
        type: "multiple-choice",
        options: [
          "Claret",
          "Sheldon",
          "It's always an even 50/50 split",
          "Whoever wakes up first"
        ],
        correctAnswer: "Claret",
        correctAnswerIndex: 0,
        hint: "Waking up and immediately wanting to share the newest random thought."
      },
      {
        id: "us-08",
        category: "Playful Bickering",
        tag: "Our Story #008",
        question: "Who is more likely to start an argument over something silly?",
        type: "multiple-choice",
        options: [
          "Claret",
          "Sheldon",
          "Neither of us ever argues",
          "Depends entirely on who hasn't eaten yet"
        ],
        correctAnswer: "Claret",
        correctAnswerIndex: 0,
        hint: "Admit it—dramatic, competitive, and always ready to defend Player Two's honor!"
      },
      {
        id: "us-09",
        category: "Our Melody",
        tag: "Our Story #009",
        question: "What's a song that reminds me of us?",
        type: "text",
        placeholder: "Name the song or melody that echoes between us...",
        hint: "Music carries memories that never fade."
      },
      {
        id: "us-10",
        category: "Future Horizons",
        tag: "Our Story #010",
        question: "What's something we've always wanted to do together?",
        type: "text",
        placeholder: "Trips, adventures, becoming millionaires, or our dream plans...",
        hint: "All the future dreams we've promised to chase together."
      }
    ]
  }
];
