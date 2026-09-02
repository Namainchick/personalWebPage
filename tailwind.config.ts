import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FF5C2A",
        surface: "#F4F3EF",
        ink: { DEFAULT: "#17181C", 2: "#3C3E46" },
        muted: "#6E7079",
        line: "#D8D7D0",
        term: { DEFAULT: "#0E1116", fg: "#D9E1D4", prompt: "#7FD1A6", hi: "#F2A65A" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
