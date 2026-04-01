export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Dot Grid — bold */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,148,136,0.35) 1.5px, transparent 1.5px)",
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
            "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 50%)",
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
            "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 50%)",
        }}
      />

      {/* === RINGS — large, bold, scattered === */}

      {/* Top right cluster */}
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite]"
        style={{
          right: "60px",
          top: "10%",
          width: "220px",
          height: "220px",
          border: "3px solid rgba(13,148,136,0.30)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_25s_linear_infinite_reverse]"
        style={{
          right: "100px",
          top: "calc(10% + 50px)",
          width: "130px",
          height: "130px",
          border: "2.5px solid rgba(13,148,136,0.22)",
          borderRadius: "50%",
        }}
      />

      {/* Bottom left cluster */}
      <div
        className="absolute animate-[spin-slow_28s_linear_infinite_reverse]"
        style={{
          left: "8%",
          bottom: "8%",
          width: "200px",
          height: "200px",
          border: "3px solid rgba(249,115,22,0.25)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_22s_linear_infinite]"
        style={{
          left: "calc(8% + 45px)",
          bottom: "calc(8% + 45px)",
          width: "110px",
          height: "110px",
          border: "2.5px solid rgba(249,115,22,0.18)",
          borderRadius: "50%",
        }}
      />

      {/* Center right */}
      <div
        className="absolute animate-[spin-slow_35s_linear_infinite]"
        style={{
          right: "30px",
          top: "50%",
          width: "170px",
          height: "170px",
          border: "2.5px solid rgba(13,148,136,0.22)",
          borderRadius: "50%",
        }}
      />

      {/* Top left */}
      <div
        className="absolute animate-[spin-slow_32s_linear_infinite_reverse]"
        style={{
          left: "15%",
          top: "5%",
          width: "150px",
          height: "150px",
          border: "2.5px solid rgba(13,148,136,0.20)",
          borderRadius: "50%",
        }}
      />

      {/* Bottom right */}
      <div
        className="absolute animate-[spin-slow_26s_linear_infinite]"
        style={{
          right: "15%",
          bottom: "12%",
          width: "180px",
          height: "180px",
          border: "2.5px solid rgba(249,115,22,0.20)",
          borderRadius: "50%",
        }}
      />

      {/* === LINES — long, bold, scattered === */}

      {/* Right side */}
      <div
        className="absolute"
        style={{
          right: "80px",
          top: "38%",
          width: "200px",
          height: "3px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.35), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "50px",
          top: "calc(38% + 35px)",
          width: "130px",
          height: "2.5px",
          background:
            "linear-gradient(90deg, rgba(13,148,136,0.30), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "120px",
          bottom: "28%",
          width: "170px",
          height: "2.5px",
          background:
            "linear-gradient(90deg, rgba(13,148,136,0.28), transparent)",
        }}
      />

      {/* Left side */}
      <div
        className="absolute"
        style={{
          left: "5%",
          top: "42%",
          width: "180px",
          height: "3px",
          background:
            "linear-gradient(270deg, rgba(13,148,136,0.32), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "3%",
          top: "calc(42% + 32px)",
          width: "120px",
          height: "2.5px",
          background:
            "linear-gradient(270deg, rgba(249,115,22,0.28), transparent)",
        }}
      />

      {/* Bottom center */}
      <div
        className="absolute"
        style={{
          left: "35%",
          bottom: "5%",
          width: "160px",
          height: "2.5px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.25), transparent)",
        }}
      />

      {/* Top center */}
      <div
        className="absolute"
        style={{
          left: "40%",
          top: "3%",
          width: "150px",
          height: "2.5px",
          background:
            "linear-gradient(270deg, rgba(13,148,136,0.25), transparent)",
        }}
      />
    </div>
  );
}
