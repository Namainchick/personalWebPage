"use client";

import { useOSData } from "@/components/os/DataProvider";
import { content } from "@/data/content";

const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function ContentApp() {
  const { tiktok } = useOSData();
  const cards = tiktok.length ? tiktok : content.featured.map((f) => ({ ...f, url: `${content.channelUrl}/video/${f.id}` }));

  return (
    <div className="app">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="app-eyebrow">TikTok</div>
          <h1 className="app-h1 mt-1">
            <a href={content.channelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {content.channel} ↗
            </a>
          </h1>
        </div>
        <div className="meta-line text-right">
          {fmt(content.totalViews)} views · {content.videos} videos · top video {fmt(content.topVideoViews)}
          <br />
          measured {date(content.measuredAt)}
        </div>
      </div>
      <p className="mt-3 text-ink-2 max-w-[62ch]">
        Walk-and-talk, one take, phone in hand. Hot takes about studying CS in Germany, hackathons and
        how to get into Big Tech from here. German with English leaking in, like the real thing.
      </p>

      <div className="tt-grid mt-5">
        {cards.map((c) => (
          <a key={c.id} className="tt-card" href={c.url} target="_blank" rel="noopener noreferrer">
            {"thumbnail" in c && c.thumbnail ? (
              // TikTok CDN hosts rotate and URLs are signed, so next/image cannot be configured for them.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-[linear-gradient(160deg,#1e1e22,#000)]" />
            )}
            <span className="play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M8 5v14l11-7z" fill="#111" />
              </svg>
            </span>
            <div className="ov">
              <div className="ti">{c.title}</div>
              <div className="vw">{fmt(c.views)} views</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-7 grid md:grid-cols-[1fr_auto] gap-4 items-start border-t border-line pt-6">
        <div>
          <div className="app-eyebrow">Discord</div>
          <h2 className="font-display font-bold text-[20px] tracking-[-0.01em] mt-1">
            {content.community.name} · {content.community.members} members
          </h2>
          <p className="mt-2 text-ink-2 max-w-[60ch] text-[14.5px]">{content.community.blurb}</p>
        </div>
        <a className="btn" href={content.community.href} target="_blank" rel="noopener noreferrer">
          Join the Discord ↗
        </a>
      </div>

      <p className="mt-6 text-[13px] text-muted max-w-[62ch] border-t border-line pt-4">{content.originStory}</p>
    </div>
  );
}
