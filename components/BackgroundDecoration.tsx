/**
 * Decorative background with personal icons scattered across the page.
 * Icons represent Namanh's personality: coding, AI, calisthenics, music, content creation.
 */

const icons = [
  // Code & Tech
  { emoji: "</>", x: "8%", y: "12%", size: 42, rotation: -12, opacity: 0.18 },
  { emoji: "{ }", x: "85%", y: "8%", size: 38, rotation: 8, opacity: 0.15 },
  { emoji: "</>", x: "72%", y: "55%", size: 34, rotation: -20, opacity: 0.13 },
  { emoji: "{ }", x: "15%", y: "78%", size: 36, rotation: 15, opacity: 0.15 },

  // AI & Brain
  { emoji: "\u{1F9E0}", x: "92%", y: "25%", size: 48, rotation: 10, opacity: 0.20 },
  { emoji: "\u{2728}", x: "5%", y: "45%", size: 44, rotation: -5, opacity: 0.18 },
  { emoji: "\u{1F916}", x: "78%", y: "82%", size: 44, rotation: -15, opacity: 0.18 },
  { emoji: "\u{2728}", x: "55%", y: "5%", size: 38, rotation: 20, opacity: 0.15 },

  // Calisthenics / Fitness
  { emoji: "\u{1F4AA}", x: "88%", y: "48%", size: 48, rotation: 12, opacity: 0.20 },
  { emoji: "\u{1F3CB}\u{FE0F}", x: "20%", y: "22%", size: 44, rotation: -8, opacity: 0.17 },
  { emoji: "\u{1F4AA}", x: "40%", y: "90%", size: 40, rotation: 5, opacity: 0.15 },

  // Music / Band
  { emoji: "\u{1F3B8}", x: "95%", y: "68%", size: 50, rotation: -18, opacity: 0.20 },
  { emoji: "\u{1F3B5}", x: "12%", y: "60%", size: 42, rotation: 10, opacity: 0.18 },
  { emoji: "\u{1F3B5}", x: "65%", y: "35%", size: 34, rotation: -10, opacity: 0.13 },

  // Content Creation / TikTok
  { emoji: "\u{1F4F1}", x: "30%", y: "8%", size: 42, rotation: -6, opacity: 0.16 },
  { emoji: "\u{1F3AC}", x: "82%", y: "92%", size: 42, rotation: 14, opacity: 0.18 },

  // Hamburg / Location
  { emoji: "\u{2693}", x: "48%", y: "72%", size: 44, rotation: -10, opacity: 0.16 },

  // Hackathon / Trophy
  { emoji: "\u{1F3C6}", x: "3%", y: "88%", size: 46, rotation: 8, opacity: 0.20 },
  { emoji: "\u{1F680}", x: "60%", y: "18%", size: 44, rotation: -12, opacity: 0.17 },

  // Education
  { emoji: "\u{1F393}", x: "35%", y: "50%", size: 40, rotation: 5, opacity: 0.15 },
];

export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Dot Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,148,136,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{
          top: "-15%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 50%)",
        }}
      />

      {/* Coral glow — bottom left */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
        style={{
          bottom: "-10%",
          left: "10%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Scattered personal icons */}
      {icons.map((icon, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            left: icon.x,
            top: icon.y,
            fontSize: `${icon.size}px`,
            transform: `rotate(${icon.rotation}deg)`,
            opacity: icon.opacity,
            lineHeight: 1,
          }}
        >
          {icon.emoji}
        </div>
      ))}
    </div>
  );
}
