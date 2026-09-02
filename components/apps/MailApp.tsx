import { site } from "@/data/site";

export function MailApp() {
  return (
    <div className="app">
      <div className="app-eyebrow">New message</div>
      <h1 className="app-h1 mt-1">Say hi.</h1>
      <p className="mt-2 text-ink-2 max-w-[46ch]">
        Projects, hackathon teams, internships for summer 2027, or just to argue about the hot take.
      </p>
      <div className="mt-4">
        <div className="mail-row">
          <span className="meta-line">To</span>
          <a className="btn" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        {site.socials.map((s) => (
          <div key={s.id} className="mail-row">
            <span className="meta-line">{s.label}</span>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">
              {s.href.replace(/^https?:\/\/(www\.)?/, "")} ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
