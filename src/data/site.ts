export const site = {
  name: "Christian Wagar",
  tagline: "Customer Success & GTM Leader · AI-Native Operator",
  shortBio:
    "Customer Success leader at Cloudflare. I build scaled CS teams, AI-augmented workflows, and customer journeys that drive retention and growth. Featured by Google for AI prompting; speaker at Gainsight Pulse. Coaching-first leader — metrics follow when the people are right.",
  about: [
    "I've spent my career in Customer Success because I genuinely believe the best growth happens at the intersection of people and systems, and I love building both.",
    "My leadership style is rooted in coaching. I'm most energized when I'm unlocking something in someone that they didn't know was there — whether that's a CSM finding their commercial voice or a team discovering a smarter way to work. The metrics follow when the people are right.",
    "On the operational side, I've led scaled CS teams across Strategic and Digital segments, building customer journeys that work across global markets and diverse account bases. From onboarding frameworks to AI-refined propensity models, I care about building things that outlast my involvement.",
    "My relationship with AI is honest. I'm learning as I go, like most people. But I've leaned in early, been featured by Google for my work in prompt engineering, and spoken at Gainsight on what it actually looks like to evolve from human-led to AI-augmented CS. I don't think AI replaces the human judgment in this work. I think it finally gives us space to use it.",
  ],
  consulting: {
    headline: "Advisory for CS leaders building high-performing, AI-augmented teams",
    bullets: [
      "Scaled CS team design — Strategic, Digital, and hybrid models across global segments",
      "AI-augmented Customer Success — propensity models, CSM workflows, adoption frameworks",
      "Onboarding & activation programs — human-led journeys that improve license activation and time-to-value",
      "GTM alignment — Sales-to-CS handoffs, CSQL programs, expansion pipeline",
      "Leadership coaching — developing CSM commercial voice and high-performance culture",
    ],
  },
  cta: "Let's connect",
  linkedin: "https://www.linkedin.com/in/christian-wagar-316b59139/",
  education: [
    "Monmouth University — B.A. International Business (2015–2018), D1 student-athlete",
    "Red Bank Catholic High School (2011–2014)",
  ],
  seo: {
    title: "Christian Wagar — Customer Success & GTM Leader",
    description:
      "Customer Success leader at Cloudflare. Scaled CS teams, AI-augmented workflows, and consulting for high-performing CS organizations.",
  },
} as const;

export const path = [
  {
    label: "University",
    blurb:
      "Monmouth University — B.A. International Business. Four years as a D1 student-athlete, where the habits around competition, accountability, and showing up for a team first started to take shape.",
    image: "gallery_image.jpg",
    alt: "Monmouth University football",
  },
  {
    label: "UBS",
    blurb:
      "Started in financial services at UBS, learning how high-stakes client relationships actually work — precision, trust, and the discipline of following through. The foundation for everything that came after in Customer Success.",
    image: "UBS.jpg",
    alt: "UBS",
  },
  {
    label: "Alteryx",
    blurb:
      "Built and led Customer Success at Alteryx — scaled journeys, coached CSMs into their commercial voice, and took the work on stage: Gainsight Pulse on AI-augmented success plans, and the Grand Prix at Inspire in front of 350+ customers.",
    image: "AYX Bus.png",
    alt: "Alteryx Grand Prix at Inspire",
  },
  {
    label: "Cloudflare",
    blurb:
      "Customer Success leader at Cloudflare. I build scaled CS teams, AI-augmented workflows, and customer journeys that drive retention and growth — and hosted a fireside with Cloudflare's CTO on the future of the platform and AI agents.",
    image: "Cloudflare_Leadership.JPG",
    alt: "Fireside chat with Cloudflare CTO",
  },
] as const;

export const featured = [
  {
    title: "Fireside Chat with Cloudflare CTO",
    description: "Hosted Dane Knecht for a conversation on the future of Cloudflare, AI agents, and the legendary Dane's Gold Musings channel.",
    image: "Fireside Chat Cropped.jpeg",
    link: null,
    embed: null,
  },
  {
    title: "Google AI Essentials — Featured Graduate",
    description: "Featured by Google for applying Prompting Essentials to team workflows and CS leadership.",
    image: "/images/google-ai-essentials.jpg",
    link: "https://publicpolicy.google/stories/ai-essentials-christian-tennessee/",
    embed:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7310709807248781313?compact=1",
  },
  {
    title: "Gainsight Pulse Featured Speaker",
    description: "Presented on evolving success plans from human-led to AI-augmented Customer Success.",
    image: "/images/gainsight-pulse-1.png",
    imageFit: "contain",
    link: "https://pulselibrary.gainsight.com/video/the-evolution-of-success-plans-at-alteryx-from-human-to-machine-to-cyborg/",
    embed: null,
  },
  {
    title: "Alteryx Grand Prix at Inspire",
    description: "Co-hosted and live demoed to 350+ customers at the Alteryx Inspire conference.",
    image: "/Grand Prix1.jpeg",
    imageLink: "https://www.instagram.com/p/DJt5RDdv3t4/?utm_source=ig_web_button_share_sheet",
    link: "https://community.alteryx.com/discussion/1380927/announcing-the-inspire-2025-grand-prix-are-you-ready-to-race?utm_source=community-share",
    cta: "Read More",
    embed: null,
  },
] as const;

export const fieldNotes = [
  {
    title: "Account growth propensity",
    teaser:
      "How I score, prioritize, and align CS + GTM around where growth actually lives.",
    status: "Tinkering",
  },
  {
    title: "Growth and promotion framework",
    teaser:
      "A coaching-first way to talk about leveling, performance, and what “ready” means.",
    status: "Tinkering",
  },
  {
    title: "Burnout",
    teaser:
      "What it looks like on a CS team, what managers miss, and the habits that prevent it.",
    status: "Tinkering",
  },
  {
    title: "Demo booth crash course",
    teaser:
      "A practical playbook for live demos, energy, and not winging it on the show floor.",
    status: "Tinkering",
  },
  {
    title: "Hiring",
    teaser:
      "Signal I look for, interview design, and building a squad that can coach each other.",
    status: "Tinkering",
  },
  {
    title: "Coaching the squad",
    teaser:
      "1:1s, commercial voice, and the rituals I use when the metrics follow the people.",
    status: "Tinkering",
  },
  {
    title: "The first 100 days",
    teaser:
      "Diagnosis, relationships, and what not to boil the ocean on in a new seat.",
    status: "Tinkering",
  },
] as const;

export const influences = {
  books: [
    {
      title: "Book title — replace me",
      author: "Author name",
      status: "Read",
      note: "One sentence on why this mattered — edit in site.ts.",
      link: null,
      slug: "example-book",
    },
    {
      title: "Book you’re in the middle of",
      author: "Author name",
      status: "Reading",
      note: "One sentence on why you’re reading it — edit in site.ts.",
      link: null,
      slug: null,
    },
    {
      title: "Book on the nightstand",
      author: "Author name",
      status: "Up next",
      note: "One sentence on why it’s queued — edit in site.ts.",
      link: null,
      slug: null,
    },
  ],
  podcasts: [
    {
      title: "Hard Fork — The New York Times",
      host: "Kevin Roose and Casey Newton ",
      status: "Listening",
      note: "Highly recommend this podcast to gather the general TLDR of the lastest in all things AI over the last week. Admittedly, I listen to this when I do my laundry on Sundays.",
      link: "https://podcasts.apple.com/us/podcast/hard-fork/id1528594034",
    },
    {
      title: "Grit — Kleiner Perkins",
      host: "Joubin Mirzadegan",
      status: "Listening",
      note: "Really helpful in getting visibility + learning how Founders and C-level executives think, operate and run their businesses.",
      link: "https://podcasts.apple.com/us/podcast/grit/id1510985491",
    },
    {
      title: "Last Week in AI — Independent",
      host: "Andrey Kurenkov and Jeremie Harris",
      status: "Listening",
      note: "In-depth, long format podcast that dives into the weeds of model preformance, research and more.",
      link: "https://podcasts.apple.com/us/podcast/last-week-in-ai/id1510985491",
    },
  ],
} as const;

export const testimonials = [
  {
    quote:
      "Christian is one of the most hard working & naturally talented individuals I have led in my career… re-imagined our behavioral-based pay model… relentless drove a high-performance culture.",
    name: "Jordan Barker",
    title: "VP, Customer Experience at Okta (former manager)",
  },
  {
    quote:
      "Christian was my manager at Cloudflare… instrumental in helping me adopt AI tools as a CSM… genuinely one of the best managers I've ever had.",
    name: "Regina Sampayo",
    title: "Customer Success Manager at Cloudflare",
  },
  {
    quote:
      "Christian builds structures from scratch… I saw a direct positive impact on my performance metrics, specifically in adoption and account expansion.",
    name: "Fernando Mendoza",
    title: "Customer Success Manager",
  },
] as const;
