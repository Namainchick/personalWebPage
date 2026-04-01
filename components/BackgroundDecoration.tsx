export default function BackgroundDecoration() {
  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, left: "240px" }}
      aria-hidden="true"
    >
      {/* Dot Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(13,148,136,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Teal glow — top right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "50%",
          background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Coral glow — bottom right */}
      <div
        className="absolute animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
        style={{
          bottom: "0",
          right: "10%",
          width: "30%",
          height: "40%",
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Geometric rings — right side */}
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite]"
        style={{
          right: "40px",
          top: "25%",
          width: "120px",
          height: "120px",
          border: "2px solid rgba(13,148,136,0.1)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-[spin-slow_30s_linear_infinite_reverse]"
        style={{
          right: "60px",
          top: "calc(25% + 20px)",
          width: "80px",
          height: "80px",
          border: "2px solid rgba(13,148,136,0.07)",
          borderRadius: "50%",
        }}
      />

      {/* Decorative lines — bottom right */}
      <div
        className="absolute"
        style={{
          right: "60px",
          bottom: "30%",
          width: "100px",
          height: "2px",
          background: "linear-gradient(90deg, rgba(249,115,22,0.15), transparent)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "40px",
          bottom: "calc(30% + 20px)",
          width: "60px",
          height: "2px",
          background: "linear-gradient(90deg, rgba(13,148,136,0.12), transparent)",
        }}
      />
    </div>
  );
}
