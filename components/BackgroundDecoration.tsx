export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Dot Grid — covers entire background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,148,136,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{
          top: "-15%",
          right: "-10%",
          width: "60%",
          height: "65%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.14) 0%, transparent 55%)",
        }}
      />

      {/* Coral glow — bottom left-center */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
        style={{
          bottom: "-10%",
          left: "20%",
          width: "50%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 55%)",
        }}
      />

      {/* Coral glow — top left */}
      <div
        className="absolute animate-[glow-pulse_10s_ease-in-out_infinite_4s]"
        style={{
          top: "10%",
          left: "5%",
          width: "35%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Teal glow — bottom right */}
      <div
        className="absolute animate-[glow-pulse_9s_ease-in-out_infinite_1s]"
        style={{
          bottom: "5%",
          right: "0%",
          width: "45%",
          height: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 55%)",
        }}
      />

      {/* Geometric rings — right side */}
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite]"
        style={{
          right: "60px",
          top: "20%",
          width: "160px",
          height: "160px",
          border: "2px solid rgba(13,148,136,0.2)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite_reverse]"
        style={{
          right: "90px",
          top: "calc(20% + 30px)",
          width: "100px",
          height: "100px",
          border: "2px solid rgba(13,148,136,0.14)",
          borderRadius: "50%",
        }}
      />

      {/* Geometric rings — left side (spread across page) */}
      <div
        className="absolute animate-[spin-slow_25s_linear_infinite_reverse]"
        style={{
          left: "15%",
          bottom: "15%",
          width: "120px",
          height: "120px",
          border: "2px solid rgba(249,115,22,0.12)",
          borderRadius: "50%",
        }}
      />

      {/* Decorative lines — scattered */}
      <div
        className="absolute"
        style={{
          right: "80px",
          bottom: "35%",
          width: "140px",
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.25), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "50px",
          bottom: "calc(35% + 28px)",
          width: "90px",
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(13,148,136,0.22), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "10%",
          top: "45%",
          width: "100px",
          height: "2px",
          background:
            "linear-gradient(270deg, rgba(13,148,136,0.18), transparent)",
        }}
      />
    </div>
  );
}
