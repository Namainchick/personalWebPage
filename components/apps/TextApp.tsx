import type { Win } from "@/components/os/store";
import { legal } from "@/data/legal";

export function TextApp({ win }: { win: Win }) {
  const item = win.item ?? "";

  if (item === "impressum" || item === "datenschutz") {
    const doc = legal[item];
    return (
      <div className="app">
        <h1 className="app-h1">{doc.title}</h1>
        {doc.sections.map((s) => (
          <section key={s.heading} className="mt-5">
            <h2 className="font-semibold text-[15px]">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-1.5 text-ink-2 text-[14.5px] leading-[1.6] max-w-[62ch]">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    );
  }

  if (item === "about-namos") {
    return (
      <div className="app">
        <div className="app-eyebrow">namOS 1.0</div>
        <h1 className="app-h1 mt-1">A portfolio that boots.</h1>
        <ul className="bullets mt-4 max-w-[56ch]">
          <li>Built with Next.js 16, React 19 and a reducer with three window slots.</li>
          <li>Wallpaper: Shanghai, the Bund at night, July 2026, on the way to AdventureX.</li>
          <li>Type: Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono.</li>
          <li>Live numbers: NeetCode from GitHub hourly, TikTok thumbnails via oEmbed.</li>
          <li>No cookies. Vercel Analytics counts page views, nothing else.</li>
          <li>The trash is load-bearing.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-eyebrow">zsh</div>
      <h1 className="app-h1 mt-1">No such file or directory.</h1>
      <p className="mt-3 text-ink-2 max-w-[50ch]">
        That URL does not exist on this machine. Everything that does is in the dock.
      </p>
    </div>
  );
}
