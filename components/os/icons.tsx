import type { AppId } from "./store";

type IconId = AppId | "cv";

const TILE: Record<IconId, string> = {
  terminal: "linear-gradient(160deg, #2A2F3A, #12151C)",
  work: "linear-gradient(160deg, #4C6FFF, #2B45D9)",
  finder: "linear-gradient(160deg, #3FA0FF, #1F6FE0)",
  grind: "linear-gradient(160deg, #FF7A4D, #FF5C2A)",
  content: "linear-gradient(160deg, #1E1E22, #000)",
  mail: "linear-gradient(160deg, #FFFFFF, #E9E8E2)",
  text: "linear-gradient(160deg, #FFFFFF, #ECEBE6)",
  trash: "linear-gradient(160deg, #A7ABB4, #7E838D)",
  cv: "linear-gradient(160deg, #FFFFFF, #ECEBE6)",
};

function Glyph({ id }: { id: IconId }) {
  switch (id) {
    case "terminal":
      return (
        <text
          x="6"
          y="22"
          fontFamily="var(--mono)"
          fontSize="13"
          fontWeight="700"
          fill="#7FD1A6"
        >
          &gt;_
        </text>
      );
    case "work":
      return (
        <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round">
          <rect x="5" y="10" width="22" height="15" rx="2.5" />
          <path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10M5 16h22" />
        </g>
      );
    case "finder":
      return (
        <g>
          <path d="M4 9.5A1.5 1.5 0 0 1 5.5 8H12l2.5 2.5H26.5A1.5 1.5 0 0 1 28 12v11.5A1.5 1.5 0 0 1 26.5 25h-21A1.5 1.5 0 0 1 4 23.5z" fill="#fff" fillOpacity=".95" />
          <path d="M4 13h24v10.5A1.5 1.5 0 0 1 26.5 25h-21A1.5 1.5 0 0 1 4 23.5z" fill="#DCE9FF" />
        </g>
      );
    case "grind":
      return (
        <g fill="#fff">
          <rect x="7" y="18" width="4.5" height="8" rx="1" />
          <rect x="13.75" y="13" width="4.5" height="13" rx="1" />
          <rect x="20.5" y="7" width="4.5" height="19" rx="1" />
        </g>
      );
    case "content":
      return <path d="M12 8.5v15l13-7.5z" fill="#fff" />;
    case "mail":
      return (
        <g fill="none" stroke="#17181C" strokeWidth="2" strokeLinejoin="round">
          <rect x="5" y="9" width="22" height="14" rx="2.5" />
          <path d="M6 10.5 16 18l10-7.5" />
        </g>
      );
    case "text":
      return (
        <g fill="#9A9BA3">
          <rect x="8" y="9" width="16" height="2" rx="1" />
          <rect x="8" y="14" width="16" height="2" rx="1" />
          <rect x="8" y="19" width="10" height="2" rx="1" />
        </g>
      );
    case "trash":
      return (
        <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M8 11h16l-1.2 14H9.2z" />
          <path d="M6 11h20M13 11V8h6v3M13.5 15v6M18.5 15v6" />
        </g>
      );
    case "cv":
      return (
        <g>
          <path d="M9 5h10l5 5v17H9z" fill="#fff" stroke="#C9C8C2" />
          <path d="M19 5v5h5" fill="#E9E8E2" stroke="#C9C8C2" />
          <text x="10.5" y="23" fontFamily="var(--mono)" fontSize="6.5" fontWeight="700" fill="#FF5C2A">
            PDF
          </text>
        </g>
      );
  }
}

export function AppIcon({ id, size = 48 }: { id: IconId; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="app-icon"
      style={{
        width: size,
        height: size,
        background: TILE[id],
        borderRadius: Math.round(size * 0.24),
      }}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} focusable="false">
        <Glyph id={id} />
      </svg>
    </span>
  );
}
