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

export const featured = [
  {
    title: "Fireside Chat with Cloudflare CTO",
    description: "Hosted Dane Knecht for an in-depth conversation on infrastructure and customer success.",
    image: "/images/cloudflare-fireside.jpg",
    link: null,
  },
  {
    title: "Google AI Essentials — Featured Graduate",
    description: "Featured by Google for applying Prompting Essentials to team workflows and CS leadership.",
    image: "/images/google-ai-essentials.jpg",
    link: "https://publicpolicy.google/stories/ai-essentials-christian-tennessee/",
  },
  {
    title: "Gainsight Pulse 2024",
    description: "Presented on evolving success plans from human-led to AI-augmented Customer Success.",
    image: "/images/gainsight-pulse-1.jpg",
    link: "https://pulselibrary.gainsight.com/video/the-evolution-of-success-plans-at-alteryx-from-human-to-machine-to-cyborg/",
  },
  {
    title: "Alteryx Grand Prix at Inspire",
    description: "Co-hosted and live demoed to 350+ customers at the Alteryx Inspire conference.",
    image: "/images/alteryx-gp-1.jpg",
    link: null,
  },
] as const;

export const projects = [
  {
    title: "Scaled CS at Cloudflare",
    role: "Manager, Customer Success",
    summary:
      "Leading 9 CSMs/CSEs across 4,200+ accounts and $260M+ ARR (AMER, CAN, LATAM).",
    outcomes: [
      "103.2% NRR; 101% quota avg over 3 consecutive quarters",
      "194 CSQLs → $3.7M+ in new pipeline over three quarters",
      "CS Bootcamps at 92% positive sentiment",
      "AI propensity tiers for 6,000+ accounts in Salesforce",
    ],
    tags: ["Scaled CS", "AI", "Expansion", "Leadership"],
    image: "/images/cloudflare-fireside.jpg",
    link: null,
  },
  {
    title: "AI Propensity Tiers & Account Prioritization",
    role: "CS Manager, Cloudflare",
    summary:
      "Built AI-refined propensity tiers providing global Salesforce visibility for growth and retention.",
    outcomes: [
      "6,000+ accounts tiered for CS prioritization at scale",
      "Global visibility driving customer growth & retention",
    ],
    tags: ["AI", "Operations", "Salesforce"],
    image: "/images/headshot.jpg",
    link: null,
  },
  {
    title: "Gainsight Pulse — Human to Machine to Cyborg",
    role: "Presenter (Alteryx)",
    summary:
      "Conference talk on evolving success plans from human-led to AI-augmented Customer Success.",
    outcomes: [
      "Featured session at Gainsight Pulse 2024",
      "Framework for AI-augmented success planning",
    ],
    tags: ["AI", "Thought leadership", "Success plans"],
    image: "/images/gainsight-pulse-1.jpg",
    link: "https://pulselibrary.gainsight.com/video/the-evolution-of-success-plans-at-alteryx-from-human-to-machine-to-cyborg/",
  },
  {
    title: "Lift-Off Experience & CSM Dispatch Center",
    role: "Team Lead → Manager, Scaled CS (Alteryx)",
    summary:
      "Revamped account kickoff into human-led onboarding; built CSM Dispatch Center for Sales-to-CS collaboration.",
    outcomes: [
      "83% average activation rate on revamped kickoff",
      "Streamlined handoffs across 2,500+ accounts / 18 CSMs",
    ],
    tags: ["Onboarding", "Operations", "Scaled CS"],
    image: "/images/alteryx-gp-1.jpg",
    link: null,
  },
  {
    title: "Digital CS Automation at Scale",
    role: "Team Lead, Digital CSM (Alteryx)",
    summary:
      "Led 5 Digital CSMs on 850+ accounts ($219M ARR); delivered 60+ advanced automation use cases.",
    outcomes: [
      "$7.5M+ ROI quantified; 35K+ hours saved",
      "12% license activation improvement via Lift-Off Experience",
    ],
    tags: ["Automation", "Digital CS", "ROI"],
    image: "/images/alteryx-gp-2.jpg",
    link: null,
  },
  {
    title: "Google AI Essentials — Featured Graduate",
    role: "CS Leader & AI Adopter",
    summary:
      "Featured by Google for applying Prompting Essentials to team workflows and CS leadership.",
    outcomes: [
      "Featured graduate of Google Prompting Essentials",
      "Championed AI adoption across CS organization",
    ],
    tags: ["AI", "Prompt engineering", "Thought leadership"],
    image: "/images/google-ai-essentials.jpg",
    link: "https://grow.google/ai-essentials/",
  },
] as const;

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

export const awards = [
  "2023 Gainsight Digital CS Disruptor Award (team)",
  "Q2 2024 Alteryx Leadership & Mentor Award",
  "Alteryx Activate — Foundations of Leadership (inaugural class)",
] as const;
