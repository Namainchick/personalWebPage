/**
 * Decorative background with personal icons scattered across the page.
 * Icons represent Namanh's personality: coding, AI, calisthenics, music, content creation.
 */

const icons = [
  // Code & Tech
  { emoji: "</>", x: "8%", y: "12%", size: 18, rotation: -12, opacity: 0.12 },
  { emoji: "{ }", x: "85%", y: "8%", size: 16, rotation: 8, opacity: 0.10 },
  { emoji: "</>", x: "72%", y: "55%", size: 14, rotation: -20, opacity: 0.08 },
  { emoji: "{ }", x: "15%", y: "78%", size: 15, rotation: 15, opacity: 0.10 },

  // AI & Brain
  { emoji: "\u{1F9E0}", x: "92%", y: "25%", size: 22, rotation: 10, opacity: 0.14 },
  { emoji: "\u{2728}", x: "5%", y: "45%", size: 20, rotation: -5, opacity: 0.12 },
  { emoji: "\u{1F916}", x: "78%", y: "82%", size: 20, rotation: -15, opacity: 0.12 },
  { emoji: "\u{2728}", x: "55%", y: "5%", size: 16, rotation: 20, opacity: 0.10 },

  // Calisthenics / Fitness
  { emoji: "\u{1F4AA}", x: "88%", y: "48%", size: 22, rotation: 12, opacity: 0.14 },
  { emoji: "\u{1F3CB}\u{FE0F}", x: "20%", y: "22%", size: 20, rotation: -8, opacity: 0.11 },
  { emoji: "\u{1F4AA}", x: "40%", y: "90%", size: 18, rotation: 5, opacity: 0.10 },

  // Music / Band
  { emoji: "\u{1F3B8}", x: "95%", y: "68%", size: 22, rotation: -18, opacity: 0.14 },
  { emoji: "\u{1F3B5}", x: "12%", y: "60%", size: 18, rotation: 10, opacity: 0.12 },
  { emoji: "\u{1F3B5}", x: "65%", y: "35%", size: 14, rotation: -10, opacity: 0.08 },

  // Content Creation / TikTok
  { emoji: "\u{1F4F1}", x: "30%", y: "8%", size: 18, rotation: -6, opacity: 0.10 },
  { emoji: "\u{1F3AC}", x: "82%", y: "92%", size: 18, rotation: 14, opacity: 0.12 },

  // Hamburg / Location
  { emoji: "\u{2693}", x: "48%", y: "72%", size: 18, rotation: -10, opacity: 0.10 },

  // Hackathon / Trophy
  { emoji: "\u{1F3C6}", x: "3%", y: "88%", size: 20, rotation: 8, opacity: 0.13 },
  { emoji: "\u{1F680}", x: "60%", y: "18%", size: 18, rotation: -12, opacity: 0.11 },

  // Education
  { emoji: "\u{1F393}", x: "35%", y: "50%", size: 16, rotation: 5, opacity: 0.09 },
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
