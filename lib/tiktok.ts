export type TikTokCard = {
  id: string;
  url: string;
  title: string;
  views: number;
  publishedAt: string;
  thumbnail?: string;
};

type Featured = readonly { id: string; title: string; views: number; publishedAt: string }[];

/** Public oEmbed lookup for thumbnails. Never throws; a failed lookup yields a card without thumbnail. */
export async function getTikTokCards(featured: Featured): Promise<TikTokCard[]> {
  return Promise.all(
    featured.map(async (f) => {
      const url = `https://www.tiktok.com/@namb.tech/video/${f.id}`;
      const card: TikTokCard = { id: f.id, url, title: f.title, views: f.views, publishedAt: f.publishedAt };
      try {
        const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
          headers: { "User-Agent": "namanh-portfolio" },
          next: { revalidate: 3600 },
        });
        if (!res.ok) return card;
        const json = (await res.json()) as { thumbnail_url?: unknown };
        if (typeof json.thumbnail_url === "string") card.thumbnail = json.thumbnail_url;
      } catch {
        // offline or blocked: card stays without thumbnail
      }
      return card;
    })
  );
}
