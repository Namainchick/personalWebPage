export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  longDescription?: string;
  images?: string[];
  learnings?: string;
  highlights?: string[];
  award?: { event: string; placement: string; prize?: string; date: string };
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Dip – Give LLMs Eyes",
    description:
      "1. Platz, Google DeepMind Gemini Track – Cursor AI Hackathon Hamburg (Feb 2026, 400+ Teilnehmer). Ein Tool, das LLMs visuellen Echtzeit-Kontext des Bildschirms gibt und die manuelle Beschreibung von On-Screen-Inhalten überflüssig macht.",
    techStack: ["Python", "Google Gemini API", "Screen Capture"],
    demoUrl: "https://dip-landing-page.vercel.app/",
    longDescription:
      "Dip entstand beim Cursor AI Hackathon Hamburg im Februar 2026 mit über 400 Teilnehmern. Das Tool gibt LLMs visuellen Echtzeit-Kontext, indem es den Bildschirm des Nutzers erfasst und als Kontext an das Modell übergibt. So entfällt die manuelle Beschreibung von On-Screen-Inhalten komplett.\n\nDie Architektur basiert auf einem Python-Backend, das Screen Captures über die Google Gemini API verarbeitet. Ein leichtgewichtiger Client erfasst den Bildschirminhalt und sendet ihn an den LLM-Kontext.",
    highlights: [
      "1. Platz Google DeepMind Gemini Track",
      "400+ Teilnehmer beim Cursor AI Hackathon Hamburg",
      "Echtzeit-Bildschirmerfassung als LLM-Kontext",
      "Eliminiert manuelle Beschreibung von Bildschirminhalten",
    ],
    learnings:
      "Gelernt, wie man multimodale KI-Modelle effizient mit Echtzeit-Bilddaten füttert und dabei Latenz minimiert. Erfahrung mit Screen-Capture-APIs und der Gemini Vision API.",
    images: [],
    award: {
      event: "Cursor AI Hackathon Hamburg",
      placement: "1. Platz · Google DeepMind Gemini Track",
      date: "Feb 2026",
    },
  },
  {
    id: "proj-2",
    title: "Mindflayer – Semantischer Social-Media-Filter",
    description:
      "1. Platz Overall ($2.000 Preisgeld) – CodeRabbit × Windsurf Hackathon (Dez 2025, 110 Teilnehmer). Eine Chrome Extension, die mit Gemini Social-Media-Posts in Echtzeit semantisch filtert.",
    techStack: ["Chrome Extension", "Google Gemini API", "JavaScript"],
    repoUrl: "https://github.com/jpzk/mindflayer",
    longDescription:
      "Mindflayer ist eine Chrome Extension, die Social-Media-Posts in Echtzeit semantisch filtert. Statt auf Keywords basiert der Filter auf dem tatsächlichen Inhalt und Kontext der Posts – powered by Google Gemini.\n\nDas Projekt gewann den 1. Platz Overall beim CodeRabbit × Windsurf Hackathon mit einem Preisgeld von $2.000. Die Extension analysiert Posts direkt im Browser und blendet unerwünschte Inhalte aus, ohne dass der Nutzer komplexe Filterregeln erstellen muss.",
    highlights: [
      "1. Platz Overall mit $2.000 Preisgeld",
      "110 Teilnehmer beim CodeRabbit × Windsurf Hackathon",
      "Semantische Echtzeit-Filterung statt Keyword-basiert",
      "Nahtlose Browser-Integration als Chrome Extension",
    ],
    learnings:
      "Tiefes Verständnis der Chrome Extension API und Content Scripts aufgebaut. Gelernt, wie man KI-Modelle effizient im Browser-Kontext einsetzt und Latenz bei Echtzeit-Filterung minimiert.",
    images: [],
    award: {
      event: "CodeRabbit × Windsurf Hackathon",
      placement: "1. Platz Overall",
      prize: "$2.000",
      date: "Dez 2025",
    },
  },
  {
    id: "proj-3",
    title: "Airbn – KI Property Management",
    description:
      "1. Platz Arbio Track, 3. Platz Overall – {Tech: Europe} Hackathon Berlin (Jan 2026). Eine KI-native Immobilienverwaltungsplattform mit Microservices-Architektur, Voice-First-Gäste-Support und automatischer Schadenserkennung via OpenCV.",
    techStack: ["GPT-4o", "OpenCV", "Flask", "FastAPI", "Node.js", "WhatsApp API"],
    repoUrl: "https://github.com/MohiCodeHub/airbio-track",
    longDescription:
      "Airbn ist eine KI-native Immobilienverwaltungsplattform, die beim {Tech: Europe} Hackathon in Berlin entstanden ist. Die Plattform kombiniert mehrere Microservices: Voice-First-Gäste-Support über WhatsApp, automatische Schadenserkennung via OpenCV und intelligente Property-Management-Features.\n\nDie Architektur nutzt GPT-4o für natürliche Konversationen, OpenCV für Bildanalyse bei Schadenmeldungen, und eine Kombination aus Flask, FastAPI und Node.js für die verschiedenen Backend-Services.",
    highlights: [
      "1. Platz Arbio Track, 3. Platz Overall",
      "{Tech: Europe} Hackathon Berlin",
      "Microservices-Architektur mit 3 Backend-Services",
      "Voice-First Gäste-Support via WhatsApp",
      "Automatische Schadenserkennung mit OpenCV",
    ],
    learnings:
      "Erfahrung mit Microservices-Architektur unter Zeitdruck gesammelt. Gelernt, wie man WhatsApp Business API für Voice-First-Interaktionen einsetzt und OpenCV für praktische Schadenerkennung nutzt.",
    images: [],
    award: {
      event: "{Tech: Europe} Hackathon Berlin",
      placement: "1. Platz Arbio Track · 3. Platz Overall",
      date: "Jan 2026",
    },
  },
  {
    id: "proj-4",
    title: "Hundewelt.space – KI-Hundeblog",
    description:
      "Vollautomatisierter deutscher Hundeblog mit KI-Content-Pipeline. Next.js Frontend mit SSR, Suche, RSS und Admin-Dashboard. Python LangGraph-Pipeline für Themenrecherche, Artikelgenerierung, Bildgenerierung und automatische Veröffentlichung. Newsletter-System mit Double Opt-In.",
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Supabase", "Google Gemini", "LangGraph"],
    demoUrl: "https://hundewelt.space",
    longDescription:
      "Hundewelt.space ist ein vollautomatisierter deutscher Hundeblog mit einer kompletten KI-Content-Pipeline. Das Next.js Frontend bietet SSR, Volltextsuche, RSS-Feeds und ein Admin-Dashboard.\n\nDas Herzstück ist eine Python LangGraph-Pipeline, die automatisch Themen recherchiert, Artikel generiert, passende Bilder erstellt und alles automatisch veröffentlicht. Ein Newsletter-System mit Double Opt-In rundet das Projekt ab.",
    highlights: [
      "Vollautomatische KI-Content-Pipeline",
      "LangGraph-basierte Multi-Step-Generierung",
      "Next.js SSR Frontend mit Suche und RSS",
      "Newsletter-System mit Double Opt-In",
      "Live unter hundewelt.space",
    ],
    learnings:
      "Umfangreiche Erfahrung mit LangGraph für komplexe, mehrstufige KI-Workflows. Gelernt, wie man eine vollautomatische Content-Pipeline von der Themenrecherche bis zur Veröffentlichung aufbaut.",
    images: [],
  },
  {
    id: "proj-5",
    title: "Video Journal Analyzer",
    description:
      "Eine Web-App zur Analyse von Video-URLs mit zwei Modi: Tagebucheintrag-Analyse (Emotionen und Stimmungen) und Rhetorik-Coach (Sprechweise, Artikulation, Verbesserungsvorschläge).",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/Projekt1.png",
    longDescription:
      "Der Video Journal Analyzer ist eine Web-App, die Video-URLs analysiert und in zwei Modi arbeitet:\n\n1. Tagebucheintrag-Analyse: Erkennt Emotionen und Stimmungen aus Video-Tagebüchern und gibt strukturiertes Feedback.\n\n2. Rhetorik-Coach: Analysiert Sprechweise, Artikulation und Körpersprache und gibt konkrete Verbesserungsvorschläge.\n\nDas Frontend ist mit Next.js und TypeScript gebaut und nutzt Tailwind CSS für das Styling.",
    highlights: [
      "Zwei Analyse-Modi: Emotions-Analyse und Rhetorik-Coaching",
      "Video-URL-basierte Analyse",
      "Strukturiertes Feedback mit konkreten Verbesserungsvorschlägen",
    ],
    learnings:
      "Erfahrung mit Video-Analyse-APIs und der Verarbeitung von multimodalen Inhalten. Gelernt, wie man komplexe Analyse-Ergebnisse nutzerfreundlich aufbereitet.",
    images: ["/Projekt1.png"],
  },
  {
    id: "proj-6",
    title: "Song Splitter",
    description:
      "Ein Audio-Tool zum Aufteilen von Songs in einzelne Komponenten wie Schlagzeug, Gitarre, Bass, Vocals und weitere Instrumente mittels KI-gestützter Audio-Quellentrennung.",
    techStack: ["Python", "Spleeter", "Demucs", "FFmpeg"],
    imageUrl: "/Projekt2.png",
    longDescription:
      "Song Splitter ist ein Audio-Tool, das Songs in ihre einzelnen Komponenten aufteilt – Schlagzeug, Gitarre, Bass, Vocals und weitere Instrumente. Das Tool nutzt KI-gestützte Audio-Quellentrennung mit Spleeter und Demucs.\n\nDer Workflow ist einfach: Song hochladen, Trennung starten, einzelne Spuren herunterladen. FFmpeg wird für die Audio-Verarbeitung und Konvertierung eingesetzt.",
    highlights: [
      "KI-gestützte Audio-Quellentrennung",
      "Unterstützung für Spleeter und Demucs Modelle",
      "Trennung in Drums, Gitarre, Bass, Vocals und mehr",
      "Einfacher Upload-und-Download-Workflow",
    ],
    learnings:
      "Tiefes Verständnis von Audio-Verarbeitung und KI-basierter Quellentrennung aufgebaut. Erfahrung mit FFmpeg für Audio-Manipulation und den Unterschieden zwischen Spleeter und Demucs.",
    images: ["/Projekt2.png"],
  },
];
