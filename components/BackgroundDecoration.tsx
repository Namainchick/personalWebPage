export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Dot Grid — strong, full coverage */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,148,136,0.25) 1.4px, transparent 1.4px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Large teal blob — top right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{
          top: "-20%",
          right: "-15%",
          width: "70%",
          height: "70%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.22) 0%, transparent 50%)",
        }}
      />

      {/* Large coral blob — bottom center-left */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
        style={{
          bottom: "-15%",
          left: "10%",
          width: "65%",
          height: "65%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 50%)",
        }}
      />

      {/* Medium coral blob — top left */}
      <div
        className="absolute animate-[glow-pulse_10s_ease-in-out_infinite_4s]"
        style={{
          top: "5%",
          left: "0%",
          width: "45%",
          height: "45%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 55%)",
        }}
      />

      {/* Medium teal blob — bottom right */}
      <div
        className="absolute animate-[glow-pulse_9s_ease-in-out_infinite_1s]"
        style={{
          bottom: "0%",
          right: "-5%",
          width: "50%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Ring — top right */}
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite]"
        style={{
          right: "80px",
          top: "15%",
          width: "180px",
          height: "180px",
          border: "2.5px solid rgba(13,148,136,0.25)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite_reverse]"
        style={{
          right: "110px",
          top: "calc(15% + 35px)",
          width: "110px",
          height: "110px",
          border: "2px solid rgba(13,148,136,0.18)",
          borderRadius: "50%",
        }}
      />

      {/* Ring — bottom left */}
      <div
        className="absolute animate-[spin-slow_25s_linear_infinite_reverse]"
        style={{
          left: "12%",
          bottom: "12%",
          width: "150px",
          height: "150px",
          border: "2.5px solid rgba(249,115,22,0.18)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_20s_linear_infinite]"
        style={{
          left: "calc(12% + 30px)",
          bottom: "calc(12% + 30px)",
          width: "90px",
          height: "90px",
          border: "2px solid rgba(249,115,22,0.12)",
          borderRadius: "50%",
        }}
      />

      {/* Lines — right side */}
      <div
        className="absolute"
        style={{
          right: "100px",
          bottom: "35%",
          width: "160px",
          height: "2.5px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.3), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "70px",
          bottom: "calc(35% + 30px)",
          width: "100px",
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(13,148,136,0.25), transparent)",
        }}
      />

      {/* Lines — left side */}
      <div
        className="absolute"
        style={{
          left: "8%",
          top: "40%",
          width: "130px",
          height: "2.5px",
          background:
            "linear-gradient(270deg, rgba(13,148,136,0.25), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "5%",
          top: "calc(40% + 28px)",
          width: "80px",
          height: "2px",
          background:
            "linear-gradient(270deg, rgba(249,115,22,0.2), transparent)",
        }}
      />
    </div>
  );
}
