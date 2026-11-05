/**
 * Dynamically Sized Regular Letters Collection for Sheldon
 * 
 * 100% Data-Driven:
 * Letter 01: "Before You, After You" (letter-before-after)
 * Letter 02: "Player Two, My Favourite Person" (letter-player-two)
 * Letter 03: "The Princess Treatment" (letter-princess)
 * 
 * Unfolds in strict sequential order:
 * Letter 01 unlocks when all quizzes are complete.
 * Letter 02 unlocks only after Letter 01 is read.
 * Letter 03 unlocks only after Letter 02 is read.
 * Playlist unlocks only after all regular letters are read.
 */

export const lettersData = [
  {
    id: "letter-before-after",
    number: "01",
    folio: "Folio I",
    title: "Before You, After You",
    subtitle: "A quiet ledger of the day my world shifted on its axis.",
    preview: "Do you remember December 13, 2025? I do. I remember that green shirt you were wearing...",
    sealType: "Deep Plum Butterfly Seal",
    salutation: "Dear Sheldon,",
    dateNote: "December 13 • The Green Shirt Chapter",
    writtenLocation: "Sanctuary Delivery • With All My Heart",
    paragraphs: [
      "Do you remember December 13, 2025?",
      "I do. I remember that green shirt you were wearing. I remember talking to Tamil about how I should approach you regarding the hackathon. And I remember looking at you for the first time and thinking you were just another rugged topper who cared about nothing but himself.",
      "Little did I know that the person I was so hesitant to approach would eventually become one of the most important people in my life.",
      "That day, something changed. We clicked so quickly that it felt like we had known each other for years. I still don't know how to explain how comfortable I felt talking to someone I barely knew. Maybe it was the way our conversations flowed, or maybe we were just meant to find each other.",
      "Initially, we didn't talk that much. Board exams kept us occupied, and our conversations were mostly little updates about how our exams went. But then came the day I had absolutely no one to share my conspiracy theories with.",
      "I was scrolling through reels, finding all these interesting things I desperately wanted to discuss with someone. And somehow, you were the first person who came to my mind. I thought, “He's smart. He might actually enjoy these things.”",
      "And that's where everything really began.",
      "Our conversations grew longer, our interests started overlapping, and somehow, we became closer without even realising it.",
      "Then came the grouping. I never expected to end up in your team. I thought I'd be joining a second-year group, but when that didn't happen, you added me to yours. And one thing I will always remember is how you stood up for me and wanted me to stay in your team, even when we hadn't known each other for that long.",
      "Looking back, I think we started recognising something special in each other long before we actually understood what it was.",
      "And then life happened. There were things going on at home, and for someone like me, who has always believed she could handle everything independently, sharing those things with someone wasn't easy.",
      "I usually prefer dealing with things on my own. I don't like feeling helpless, and I certainly don't like showing that side of myself. But that day, everything became too much, and I found myself opening up to you.",
      "And you listened.",
      "I think that was one of the moments that changed our bond forever.",
      "We started sharing more than just random conversations. We shared our thoughts, our goals, our perspectives, our worries and all those little things that made us who we are.",
      "We discovered how much we had in common. The same interests, similar mindsets, similar ambitions and sometimes, almost identical ways of thinking.",
      "Eventually, it got to the point where we could practically read each other's minds. We'd predict what the other person was going to say or do. We'd understand things without needing lengthy explanations.",
      "It's almost like we developed our own little language.",
      "And somewhere along this journey, our friendship became something I still struggle to describe with ordinary words.",
      "You're my platonic twin soulmate. My other half. My favourite person to share the most random thoughts with.",
      "Before you, I thought happiness was something I had to create and maintain all by myself. I was that independent girl who believed she could handle everything that came her way.",
      "But after you, I discovered a version of myself I didn't even know existed.",
      "The helpless child in me started feeling happy again. My childishness came alive. I found myself laughing more, sharing more, being more expressive and allowing myself to be vulnerable.",
      "You made me realise that I could be cared for without having to earn it.",
      "You care about me for who I am, not just for who I might become. You listen to me, respect me, care about my happiness and make me feel like I matter.",
      "And I hope you know that I want to be that person for you too.",
      "I want to hear everything you have to say. I want you to tell me when something hurts you. I want you to share your worries without feeling like you have to deal with everything alone.",
      "I don't want you to hide your feelings from me. I want to understand you just as much as you've tried to understand me.",
      "I want to protect you too, Sheldon. You're precious to me, and I would never want you to feel like you're facing the world alone.",
      "If someone asks me whether I'm happy, I wouldn't simply say yes.",
      "I'd say I'm the happiest I've ever been, because somewhere along the way, you became one of the biggest reasons behind my happiness.",
      "I want us to experience everything together. I want us to become millionaires, travel the world, go on countless trips, wear all the dresses we've dreamed of and create memories that we'll laugh about when we're old.",
      "I want to see where life takes us, as long as we keep choosing to be part of each other's lives.",
      "I don't know what the universe had planned when it made us cross paths that December day. But I'm incredibly grateful that it did.",
      "My life has a before you and an after you, and I wouldn't trade the latter for anything."
    ],
    closing: "I'm enchanted to have met you.\n\nAlways your Claret ❤️",
    photoSection: {
      type: "polaroid",
      image: "/images/letter1.jpeg",
      alt: "Sheldon and Claret - December 13 Hackathon Memory",
      caption: "Somewhere between a random conversation and a thousand memories, you became my favourite part of the story.",
      location: "The Hackathon Hall • Where it all started",
      tapeLabel: "MINT WASHI • DEC 13",
      badge: "DEC 13, 2025",
      insertAfterParagraphIndex: 6
    },
    polaroids: [
      {
        id: "pol-hackathon",
        caption: "Somewhere between a random conversation and a thousand memories, you became my favourite part of the story.",
        location: "The Hackathon Hall • Where it all started",
        tapeLabel: "MINT WASHI",
        badge: "DEC 13",
        image: "/images/letter1.jpeg"
      }
    ]
  },
  {
    id: "letter-player-two",
    number: "02",
    folio: "Folio II",
    title: "Player Two, My Favourite Person",
    subtitle: "Two nerds, one world, and an infinite number of adventures.",
    preview: "You know what I love about us? We can talk about the most random things, jump from one topic to another...",
    sealType: "Electric Lavender Wax Stamp",
    salutation: "Dear Sheldon,",
    dateNote: "Late Night Gaming • Two Nerds in Orbit",
    writtenLocation: "Between rounds • Player Two Sanctuary",
    paragraphs: [
      "You know what I love about us?",
      "We can talk about the most random things, jump from one topic to another, discuss the most complicated nerdy stuff and somehow never run out of things to say.",
      "And honestly, I wouldn't have it any other way.",
      "I love that brain of yours. Yes, I'm talking about that nerdy, analytical brain that makes you YOU.",
      "I love listening to you explain things. I love how you get into the details, how you think about things and how you can turn even the most ordinary topic into something interesting.",
      "And the funniest part?",
      "I'm a nerd too.",
      "So instead of being confused by your interests, I find myself getting even more interested. We can be two people discussing something nobody else around us cares about, and somehow that's one of my favourite things.",
      "And then there's gaming.",
      "I love that we have another little world where we can just enjoy ourselves, have fun, get competitive and forget about everything else for a while.",
      "I don't care whether we're winning or losing. I care about the memories we create along the way.",
      "Of course, I might get competitive, and I might argue with you over the smallest things, but that's part of the experience, isn't it?",
      "I want more gaming nights, more silly arguments, more unexpected victories, more ridiculous moments and more memories that we'll randomly bring up months later.",
      "I want us to keep discovering games together, trying new things and occasionally proving that one of us is definitely better than the other.",
      "And Sheldon, I hope you know that you're not just my favourite person to play games with.",
      "You're my favourite person to share things with.",
      "Whether it's a new game, an interesting discovery, a random theory or something completely insignificant, you're the person I want to tell.",
      "I love how we can be serious one moment and absolutely unserious the next.",
      "I love that I don't have to pretend to be someone else around you.",
      "I can be competitive, childish, dramatic, nerdy, curious and completely random, and you still get to see all those versions of me.",
      "I hope we never lose that.",
      "I hope we continue being those two nerds who have a million things to discuss, a million things to explore and a million little adventures waiting for us.",
      "So here's to being each other's favourite teammate.",
      "And if life ever becomes a difficult game, remember that you don't have to play it alone.",
      "You've got your Claret.",
      "Player Two isn't going anywhere. ❤️"
    ],
    closing: "Your favourite teammate,\nClaret",
    photoSection: {
      type: "gaming",
      image: "/images/letter2.jpeg",
      alt: "Valorant Victory Screen - Team MVP with Sheldon",
      caption: "My favourite teammate, my favourite victories, and my favourite person to share every little win with.",
      subtext: "Player One & Player Two • Unstoppable Duo",
      badge: "VICTORY // TEAM MVP",
      insertAfterParagraphIndex: 10
    },
    polaroids: [
      {
        id: "pol-nerd",
        caption: "My favourite teammate, my favourite victories, and my favourite person to share every little win with.",
        location: "Late Night Gaming • Team MVP",
        tapeLabel: "LAVENDER WASHI",
        badge: "PLAYER 2",
        image: "/images/letter2.jpeg"
      }
    ]
  },
  {
    id: "letter-princess",
    number: "03",
    folio: "Folio III",
    title: "The Princess Treatment",
    subtitle: "A princess who protects her knight just as fiercely.",
    preview: "Why do you want to spoil me so much? Why do you insist on spending your money on me?...",
    sealType: "Golden Crown & Rose Starlight Seal",
    salutation: "Dear Sheldon,",
    dateNote: "Royal Decree • Sealed with Pressed Rose",
    writtenLocation: "From your Princess • Always & Forever",
    paragraphs: [
      "I have a question for you.",
      "Why do you want to spoil me so much?",
      "Why do you insist on spending your money on me? Why do you remember the little things I like? Why do you keep offering me snacks even when I say I don't want them?",
      "Actually, don't answer that. I think I already know.",
      "You just want to see me happy.",
      "And somehow, seeing me happy makes you happy too.",
      "I don't think you realise how much those little gestures mean to me.",
      "Sometimes my mouth says no, but my heart is already accepting the snack. And you somehow know the difference.",
      "You read me like an open book, Sheldon. A book that, apparently, only you have the privilege of reading.",
      "I love the way you want to treat me like a princess. The way you want to make sure I'm happy, comfortable and taken care of. The way you want to fulfil my little wishes and spoil me without expecting anything in return.",
      "And I love it.",
      "I really do.",
      "But there's something I want you to understand.",
      "I don't want to be the only one receiving all that love.",
      "I want to spoil you too.",
      "I want to know your wishes, your desires, the things you've always wanted but never asked for. I want to fulfil them with you. I want to make you feel just as special as you make me feel.",
      "So come on, Sheldon. Tell me what you want. Tell me what makes you happy. Let's fulfil those little wishes together.",
      "You might be my knight, but don't forget that your princess is capable of protecting you too.",
      "I would go to any extent to protect you from anything that threatens your happiness. I want to be your safe place, your listener, your supporter and the person you can always come back to.",
      "You don't always have to be the strong one. You don't always have to take care of everything.",
      "Let me take care of you sometimes.",
      "And honestly, I don't need grand gestures all the time. It's the little things that get me.",
      "The snacks you bring even when I refuse them. The way you remember something I mentioned casually. The way you listen to my random thoughts. The way you want to make me happy without me even asking.",
      "Those things make me feel loved in ways I cannot properly explain.",
      "I want you to know that I'll always appreciate the person behind those gestures.",
      "Not just what you do for me, but who you are.",
      "I love your brain, your personality, your nerdiness, your kindness and all those little things that make you Sheldon.",
      "I don't want you to think that you have to spend money or do something extraordinary to make me happy. Your presence itself means so much to me.",
      "I want to be there when you achieve something amazing, when you're excited about something, when you're having a bad day and when you simply want someone to listen.",
      "I want to celebrate your victories and stand beside you through your difficult moments.",
      "Because this princess doesn't just want a knight who protects her.",
      "She wants to protect her knight too.",
      "So let's make a deal.",
      "You keep spoiling me with your love, your attention and those snacks I pretend I don't want.",
      "And I'll keep finding ways to spoil you right back.",
      "We'll make each other's wishes come true, create our own little fairytale and make sure neither of us ever feels alone in it.",
      "After all, what's the point of being a princess if I can't make my knight feel like royalty too?"
    ],
    closing: "Forever your princess,\n\nClaret 👑❤️",
    photoSection: {
      type: "duo_portrait",
      leftPhoto: {
        image: "/images/letter3_left.jpeg",
        alt: "Sheldon - The Knight",
        label: "Sheldon • The Knight ⚔️",
        tapeLabel: "ROYAL GOLD WASHI",
        badge: "THE KNIGHT"
      },
      rightPhoto: {
        image: "/images/letter3_right.jpeg",
        alt: "Claret - The Princess",
        label: "Claret • The Princess 👑",
        tapeLabel: "ROSE WASHI",
        badge: "THE PRINCESS"
      },
      caption: "Your princess and her favourite knight. Two little worlds, always finding their way towards each other.",
      subtext: "Two little worlds • Always finding their way towards each other",
      insertAfterParagraphIndex: 17
    },
    polaroids: [
      {
        id: "pol-knight-sheldon",
        caption: "Your princess and her favourite knight. Two little worlds, always finding their way towards each other.",
        location: "Sheldon • The Knight",
        tapeLabel: "GOLD WASHI",
        badge: "KNIGHT",
        image: "/images/letter3_left.jpeg"
      },
      {
        id: "pol-knight-claret",
        caption: "Your princess and her favourite knight. Two little worlds, always finding their way towards each other.",
        location: "Claret • The Princess",
        tapeLabel: "ROSE WASHI",
        badge: "PRINCESS",
        image: "/images/letter3_right.jpeg"
      }
    ]
  }
];
