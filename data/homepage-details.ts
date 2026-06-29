export interface CardDetail {
  id: string;
  title: string;
  content: string;
  images?: string[];
  links?: { label: string; href: string }[];
}

export const homepageDetails: Record<string, CardDetail> = {
  hero: {
    id: "hero",
    title: "Hi, ich bin Namanh",
    content:
      "Ich bin 20 Jahre alt und studiere Computer Science an der Technischen Universität Hamburg. Nebenbei arbeite ich als Werkstudent im Bereich KI-Automation bei Position One GmbH und baue als CTO ein Startup für Studierende.\n\nMeine Leidenschaft liegt in der Entwicklung von KI-gestützten Anwendungen. Bei drei Hackathons habe ich jeweils den ersten Platz gewonnen – in Hamburg, Berlin und remote.",
  },
  location: {
    id: "location",
    title: "TUHH, Hamburg",
    content:
      "Ich studiere Computer Science (B.Sc.) an der Technischen Universität Hamburg (TUHH). Hamburg ist meine Basis für Studium, Arbeit und die Tech-Community.",
  },
  tiktok: {
    id: "tiktok",
    title: "50k+ Follower auf TikTok",
    content:
      "Als Tech Creator auf TikTok erreiche ich über 50.000 Follower und mehr als 20 Millionen Views. Ich erstelle Content über Programmierung, KI und das Informatik-Studium.\n\nDurch das TikTok Creator Program generiere ich Einnahmen und habe eine Community aufgebaut, die sich für Tech-Themen begeistert.",
    links: [{ label: "TikTok Profil", href: "https://www.tiktok.com/@namb.tech" }],
  },
  techStack: {
    id: "techStack",
    title: "Mein Tech Stack",
    content:
      "Mein Fokus liegt auf modernen Web-Technologien und KI-Integration:\n\nFrontend: React, Next.js, TypeScript, TailwindCSS\nBackend: Python, FastAPI, Node.js\nDatenbanken: PostgreSQL, Supabase\nKI/ML: OpenAI API, Google Gemini, LangGraph\nDevOps: Docker, Vercel, n8n",
  },
  about: {
    id: "about",
    title: "Über mich",
    content:
      "Hey, I'm Namanh – 21, studying Computer Science at TUHH, and at heart just someone who can't stop building things.\n\nIt started with hardware, not code: as a kid I took apart my parents' PCs to see how they worked and put them back together – not always in the right order, and not always still booting. Curiosity first, consequences later has been a bit of a theme.\n\nAt 13, 14 I found I had a feel for social media – I grew a few Instagram accounts past 10k, one past 60k, and rode the early TikTok wave into my first real income through the Creator Program (today that's 50k+ followers and 20M+ views). It turned into a small business of buying, growing and flipping accounts; the money was never really the point, reverse-engineering what makes attention move was.\n\nAround 16, 17 I got a little too good at finding gaps in big companies' systems. I'll keep the specifics vague – let's just say I learned early how much of the world quietly runs on assumptions nobody checks. These days that instinct goes into building things, not breaking them.\n\nProgramming came late, at 17, and I only got serious at 19 once I started my degree – haven't been able to put it down since. Code, for me, isn't an engineering chore, it's the fastest medium I've found to get an idea out of my head and into something real. I work AI-native by default: too many tabs open, half my life wired up with AI agents, and a compulsion to try every new agent harness the week it drops.",
  },
  hackathon: {
    id: "hackathon",
    title: "3x 1. Platz bei Hackathons",
    content:
      "Ich habe bei drei verschiedenen Hackathons den ersten Platz gewonnen:\n\n1. Cursor AI Hackathon Hamburg (Feb 2026, 400+ Teilnehmer) – Google DeepMind Gemini Track mit 'Dip'\n\n2. CodeRabbit × Windsurf Hackathon (Dez 2025, 110 Teilnehmer) – Overall Winner mit 'Mindflayer' ($2.000 Preisgeld)\n\n3. {Tech: Europe} Hackathon Berlin (Jan 2026) – Arbio Track Winner mit 'Airbn'",
  },
  mission: {
    id: "mission",
    title: "Meine Mission",
    content:
      "These days I build as a Product Engineer at Arbio, and I've won five hackathons along the way – mostly for the rush of shipping under pressure. What keeps me going is the creative side of it: taking a random idea and making it real, and figuring out how to fuse building, content and community into one thing.",
  },
  hobbies: {
    id: "hobbies",
    title: "Hobbies",
    content:
      "Outside the screen, I've had a camera in my hand since I was a kid and have basically documented my whole life. Lately I've been pointing it outward instead of inward – making personal content about tech, AI and startups, and building a real community around it – already 250+ members.\n\nThere's music, too. I didn't want to just play alone in my room, so out of sheer boredom I started a band at uni – which somehow turned into us actually playing university events. A lot of what I do starts like that: a small itch, a 'why not', and then it snowballs.",
  },
  emailCta: {
    id: "emailCta",
    title: "Kontakt",
    content:
      "Schreib mir gerne eine E-Mail – ich freue mich über Nachrichten zu Projekten, Zusammenarbeit oder einfach zum Austausch.",
    links: [{ label: "E-Mail schreiben", href: "mailto:namanh.bui2005@gmail.com" }],
  },
};
