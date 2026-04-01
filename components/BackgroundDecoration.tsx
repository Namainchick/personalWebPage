export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1, left: "288px" }}
      aria-hidden="true"
    >
      {/* Dot Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,148,136,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{
          top: "-10%",
          right: "-5%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Coral glow — bottom right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
        style={{
          bottom: "-5%",
          right: "5%",
          width: "40%",
          height: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Geometric rings — right side */}
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite]"
        style={{
          right: "40px",
          top: "25%",
          width: "140px",
          height: "140px",
          border: "2px solid rgba(13,148,136,0.15)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite_reverse]"
        style={{
          right: "70px",
          top: "calc(25% + 25px)",
          width: "90px",
          height: "90px",
          border: "2px solid rgba(13,148,136,0.1)",
          borderRadius: "50%",
        }}
      />

      {/* Decorative lines — bottom right */}
      <div
        className="absolute"
        style={{
          right: "50px",
          bottom: "30%",
          width: "120px",
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.2), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "30px",
          bottom: "calc(30% + 24px)",
          width: "80px",
          height: "2px",
          background:
            "linear-gradient(90deg, rgba(13,148,136,0.18), transparent)",
        }}
      />
    </div>
  );
}
