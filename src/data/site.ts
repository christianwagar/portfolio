export const site = {
  name: "Christian Wagar",
  opening: {
    paragraphs: [
      "What's up and welcome to my site.", 
      "Quick pre-read, this all came about as a fun vibe coding project and quickly morphed into a smorgasbord of trying to share experiences, ideas, and a few things in between.",
      "This site was built with the help of AI tools however; I did my absolute best to cut out as much slop as possible. All of the content has been written by me, as I know many (myself included) are tired of consuming unoriginal brain rotting, em dash filled thoughts.",
      "With that, enjoy the run on sentences, grammatical errors, half baked ideas, and hope I can spark some fun thoughts and a few laughs too.",
    ],
    signOff: "Cheers,",
  },
  shortBio:
    "Going from Data Analytics to a company that provides a copious amounts of mission critical Internet services that run 24/7 with passionate customers…who will let you know. It's fun being apart of a crew that thrives off pressure, grit and of course sugar. From deploying growth propensity segmentation and scoring, to running onsite customer bootcamp, to Uber Eats-in $200 of Vegan friendly meals 20 mins before lunch (whoops), Cloudflare continues to teach life long lessons.   ",
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
      "Walked on to play D-1 football at Monmouth University in New Jersey. Majored in International Business and spent time studying abroad in Hungary, Czech Republic, and Poland. Also had to take German lessons to pass the curriculum…'Ein Bier bitte' is all I really mastered. Lastly yes, that turf really is that shade of teal IRL.",
    image: "/images/gallery-image.jpg",
    alt: "Monmouth University football",
  },
  {
    label: "UBS",
    blurb:
      "Kicked off my professional moving to Nashville to join UBS's Robotic Process Automation team, supporting developers across the US and India. Earned my stripes wearing tucked in button-downs, and uncomfortable dress shoes 5 days a week. Got my hands on an Alteryx license to help support an ERP migration for Wealth Management Americas...aka 7 weeks stright of analyizing data dev changes. In turn, propelled me to become an analyst and developer myself, and introed me to the world of Customer Success.",
    image: "/images/ubs.jpg",
    alt: "UBS",
  },
  {
    label: "Alteryx",
    blurb:
      "Welp...the tucked-in button-down tradition followed me to Alteryx. This is where I earned my chops in Customer Success, going from player to coach, learning to operate in the gray, and racking up some serious airline miles too. I have a ton of love for Alteryx: they invested in me, helping me gain meaningful coaching reps and pushing me out of my comfort zone. That massively shaped how I lead, coach, run a business unit, and build connections today.",
    image: "/images/ayx-bus.png",
    alt: "Alteryx Grand Prix at Inspire",
  },
  {
    label: "Cloudflare",
    blurb:
      "A new challeng going from Data Analytics to a company that provides mission critical Internet services 24/7 to passionate customers… who will let you know. It's fun being apart of a crew that thrives off pressure, grit and sugar. From deploying growth propensity segmentation and scoring, to onsite customer bootcamps, to $200 Uber Eats orders of Vegan friendly meals 20 minutes before lunch (whoops), Cloudflare continues to teach life-long lessons.",
    image: "/images/cloudflare-leadership.jpg",
    alt: "Fireside chat with Cloudflare CTO",
  },
] as const;

export const featured = [
  {
    title: "Fireside Chat with Cloudflare CTO",
    description: "Hosted Dane Knecht for a conversation on the future of Cloudflare, AI, Agents, and the legendary Dane's Gold Musings channel.",
    image: "/images/fireside-chat-cropped.jpeg",
    link: null,
    embed: null,
  },
  {
    title: "Google AI Essentials",

description: "Featured by Google for applying Prompting Essentials into team workflows. Also got some sick glamor shots along the way. Exhibit A: profile picture above. ",
    image: "/images/google-ai-essentials.jpg",
    link: "https://publicpolicy.google/stories/ai-essentials-christian-tennessee/",
    embed:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7310709807248781313?compact=1",
  },
  {
    title: "Gainsight Pulse Featured Speaker",
    description: "Presented with my partner in crime, Galilea Sanchez, on the evolution of success plans: From Human ➡️ Machine ➡️ Cyborg. TLDR: data trends + team action to drive activation & utilization for expensive products.",
    image: "/images/gainsight-pulse-1.png",
    imageFit: "contain",
    link: "https://pulselibrary.gainsight.com/video/the-evolution-of-success-plans-at-alteryx-from-human-to-machine-to-cyborg/",
    embed: null,
  },
  {
    title: "Alteryx Grand Prix at Inspire Conference",
    description: "Co-hosted and live demoed to 350+ customers at the Alteryx Grand Prix. Gained valuable professional experience 'making it rain' via operating a cash cannon.",
    image: "/images/grand-prix-1.jpeg",
    imageLink: "https://www.instagram.com/p/DJt5RDdv3t4/?utm_source=ig_web_button_share_sheet",
    link: "https://community.alteryx.com/discussion/1380927/announcing-the-inspire-2025-grand-prix-are-you-ready-to-race?utm_source=community-share",
    cta: "Read More",
    embed: null,
  },
] as const;

export const influences = {
  books: [
    {
      title: "Still deciding",
      author: "TBD",
      status: "Read",
      note: "Stay tuned, y'all. I'm writing up what I'm actually reading instead of leaving fake book titles here.",
      link: null,
      slug: "example-book",
    },
    {
      title: "Currently dog-earing something",
      author: "TBD",
      status: "Reading",
      note: "Stay tuned, y'all. I'm writing up what I'm actually reading instead of leaving fake book titles here.",
      link: null,
      slug: null,
    },
    {
      title: "On the nightstand (TBD)",
      author: "TBD",
      status: "Up next",
      note: "Stay tuned, y'all. I'm writing up what I'm actually reading instead of leaving fake book titles here.",
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
      note: "In-depth, long format podcast that dives into the weeds of model preformance, research and more. Typically by the end my brain is fried.",
      link: "https://podcasts.apple.com/us/podcast/last-week-in-ai/id1502782720",
    },
  ],
} as const;

export const testimonials = [
  {
    quote:
      "Christian is one of the most hard working & naturally talented individuals I have led in my career… re-imagined our behavioral-based pay model… relentless drove a high-performance culture.",
    name: "Jordan Barker",
    title: "VP, Customer Experience | Okta",
  },
  {
    quote:
      "Christian was my manager at Cloudflare… instrumental in helping me adopt AI tools as a CSM… genuinely one of the best managers I've ever had.",
    name: "Regina Sampayo",
    title: "Customer Success Manager | Cloudflare",
  },
  {
    quote:
      "Christian builds structures from scratch… I saw a direct positive impact on my performance metrics, specifically in adoption and account expansion.",
    name: "Fernando Mendoza",
    title: "Customer Success Manager | Kroll",
  },
  {
    quote:
      "Christian is one of the most driven and dedicated professionals I've come across… a natural problem-solver who doesn't get bogged down by obstacles… builds genuine relationships quickly and effectively.",
    name: "Mena Estany",
    title: "RPA Developer Lead | UBS",
  },
] as const;
