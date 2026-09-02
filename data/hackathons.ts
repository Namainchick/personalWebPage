export type Hackathon = {
  id: string;
  event: string;
  city: string;
  /** ISO date used for sorting */
  date: string;
  dateLabel: string;
  project: string;
  placement: string;
  prize?: string;
  participants?: string;
  oneLiner: string;
  description: string;
  stack: string[];
  photos: { src: string; alt: string; feature?: boolean }[];
  links?: { label: string; href: string }[];
};

/** Wins only, newest first. Participated-only events are deliberately not listed. */
export const hackathons: Hackathon[] = [
  {
    id: "adventurex",
    event: "AdventureX 2026",
    city: "Hangzhou, China",
    date: "2026-07-26",
    dateLabel: "Jul 2026",
    project: "Pico XR experience",
    placement: "1st Place · Pico XR Track",
    participants: "800 participants",
    oneLiner:
      "China's largest hackathon. A fully funded seat, first time in China, an immersive XR experience on ByteDance Pico hardware.",
    description:
      "Got the invite, booked the flight, looked at Shanghai first. Then five days in Hangzhou building an immersive XR experience in Unity for ByteDance's Pico headsets, surrounded by the most cracked builders I have met. We won the Pico track. The infrastructure, the scale and the speed of the companies there were the bigger takeaway. Really want to go back.",
    stack: ["Unity", "C#", "Pico XR"],
    photos: [
      {
        src: "/img/hackathons/adventurex-trophy-airport.jpg",
        alt: "Nam holding the orange Pico track trophy at Hangzhou airport, lanyard still on",
        feature: true,
      },
      {
        src: "/img/hackathons/adventurex-2.jpg",
        alt: "The four-person team on stage with the AdventureX trophy under blue lights",
      },
    ],
  },
  {
    id: "megathon",
    event: "Megathon 2026",
    city: "Amsterdam",
    date: "2026-06-21",
    dateLabel: "Jun 2026",
    project: "HorseGPT",
    placement: "Track Winner · TAG × Base44",
    prize: "€1,000 + priority accelerator",
    participants: "Europe's largest hackathon",
    oneLiner:
      "A deliberately silly AI app as a distribution experiment: how far do marketing and distribution alone carry a product? 100+ users in two days.",
    description:
      "HorseGPT started as a joke and turned into a growth experiment. Instead of obsessing over features we spent the weekend on distribution and messaging to see how far that alone gets you. The answer was 100+ users within the first two days, and the TAG × Base44 track.",
    stack: ["base44", "Growth", "Distribution"],
    photos: [
      {
        src: "/img/hackathons/megathon-horsegpt-cheque.jpg",
        alt: "Nam holding an oversized Megathon cheque reading HorseGPT, TAG × Base44, €1k cash plus priority accelerator",
        feature: true,
      },
    ],
    links: [{ label: "Demo", href: "https://horsegpt.vercel.app/" }],
  },
  {
    id: "rushhour",
    event: "AI Beavers × Mollie Founder Hackathon",
    city: "Hamburg",
    date: "2026-06-05",
    dateLabel: "Jun 2026",
    project: "RushHour",
    placement: "1st Place Overall · Qwen Track",
    participants: "150+ builders",
    oneLiner:
      "Airbnb meets LinkedIn for creator collaborations: AI predicts which local brand × creator partnership actually works, instead of endless scrolling.",
    description:
      "Local businesses burn time finding creators by hand; creators struggle with outreach. RushHour predicts which business–creator combination will perform: a small hyper-local creator with real engagement beats a 200k-follower account for a neighbourhood goal. Qwen handles extraction and the human-readable reasoning, the scoring is deterministic math, Supabase persists the match pool. Ten hours, an MVP, customer interviews, a three-minute pitch, and the VCs in the jury bought it.",
    stack: ["Next.js", "TypeScript", "Qwen", "Supabase"],
    photos: [
      {
        src: "/img/hackathons/rushhour-4.jpg",
        alt: "Rush Hour movie poster parody with the three team members striking action poses",
        feature: true,
      },
      {
        src: "/img/hackathons/rushhour-1.jpg",
        alt: "Team on stage holding the 1st place cheque while confetti falls",
      },
      {
        src: "/img/hackathons/rushhour-3.jpg",
        alt: "Team and organizers with the founder hackathon 1st place cheque, best dam project",
      },
    ],
    links: [
      { label: "Demo", href: "https://rush-hour-two.vercel.app" },
      { label: "Code", href: "https://github.com/Namainchick/RushHour" },
    ],
  },
  {
    id: "dip",
    event: "Cursor AI Hackathon",
    city: "Hamburg",
    date: "2026-01-31",
    dateLabel: "Jan 2026",
    project: "Dip — give LLMs eyes",
    placement: "1st · Google DeepMind Gemini Track",
    prize: "$10,000 Gemini credits",
    participants: "400+ participants",
    oneLiner:
      "Streams your screen into the model in real time, so you stop describing what is on it.",
    description:
      "Everyone at the table had felt the same thing: explaining to the LLM what we see on screen, because it cannot see. Dip captures the screen and feeds it into Gemini as live context for pair-programming and debugging. A lightweight client captures, a Python backend streams. Best use of the Google DeepMind Gemini API out of 400+ participants.",
    stack: ["Python", "Gemini API", "Screen capture"],
    photos: [
      {
        src: "/img/hackathons/dip-cheque.jpg",
        alt: "Three teammates holding the Cursor 2-day AI hackathon cheque for best use of Google DeepMind Gemini API, $10,000 credits",
        feature: true,
      },
      { src: "/img/hackathons/dip-2.jpg", alt: "Team selfie in the venue after the win" },
      { src: "/img/hackathons/dip-3.jpg", alt: "Nam on the train home with the oversized cheque on his lap" },
    ],
    links: [{ label: "Demo", href: "https://dip-landing-page.vercel.app/" }],
  },
  {
    id: "airbn",
    event: "{Tech: Europe} Hackathon",
    city: "Berlin",
    date: "2026-01-25",
    dateLabel: "Jan 2026",
    project: "Airbn",
    placement: "1st · Arbio Track · 3rd Overall",
    oneLiner:
      "AI-native property management: voice-first guest support over WhatsApp and damage detection with OpenCV. The win that turned into the Arbio job.",
    description:
      "Airbn combines three services: voice-first guest support over WhatsApp with GPT-4o, automatic damage detection from checkout photos with OpenCV, and property-management workflows on top. Won the Arbio track, finished third overall, and a few weeks later Arbio hired me to build the real thing.",
    stack: ["GPT-4o", "OpenCV", "FastAPI", "Node.js", "WhatsApp API"],
    photos: [
      {
        src: "/img/hackathons/airbn-3.jpg",
        alt: "Close-up of a small 3D-printed token reading ARBIO {Track Winner} Berlin Jan 2026",
        feature: true,
      },
      { src: "/img/hackathons/airbn-stage.jpg", alt: "Nam pitching on stage with a microphone and a cap" },
      { src: "/img/hackathons/airbn-2.jpg", alt: "The team hacking around a blue table late at night" },
    ],
    links: [{ label: "Code", href: "https://github.com/MohiCodeHub/airbio-track" }],
  },
  {
    id: "mindflayer",
    event: "San Francisco × Hamburg AI Sprint",
    city: "Hamburg",
    date: "2025-12-20",
    dateLabel: "Dec 2025",
    project: "Mindflayer",
    placement: "1st Place Overall",
    prize: "$2,000",
    participants: "110 builders",
    oneLiner:
      "A Chrome extension that filters your feed by meaning: tell it what matters, everything else disappears. First win, built in four hours.",
    description:
      "You open X to research something serious and five minutes later you are deep in content you never asked for. Mindflayer flips it: you tell the feed what matters and Gemini hides every post that does not fit, in real time, inside the browser. Built in four intense hours, sponsored by CodeRabbit and Windsurf, first place overall.",
    stack: ["Chrome Extension", "Gemini API", "JavaScript"],
    photos: [
      {
        src: "/img/hackathons/mindflayer-aisprint.jpg",
        alt: "Team and organizers holding the AI Sprint winner cheque in a brick-walled venue",
        feature: true,
      },
    ],
    links: [{ label: "Code", href: "https://github.com/jpzk/mindflayer" }],
  },
];
