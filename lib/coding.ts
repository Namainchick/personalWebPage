// Known limitation: the LeetCode public API exposes only the last ~20 accepted submissions,
// so neetcodeSolved reflects recent solves only, not lifetime completions.
// This is acceptable for v1 and should be noted in the UI as "of recent solves".

import { fetchUserProfile, fetchRecentSubmissions } from "@/lib/leetcode/client";
import { NEETCODE_250, NEETCODE_SLUGS } from "@/lib/neetcode/problems";

export type CodingView = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  neetcodeSolved: number;
  neetcodeTotal: number;
  recent: { slug: string; title: string; difficulty: "easy" | "medium" | "hard" | "unknown"; solvedAt: Date }[];
};

export async function getCodingView(username: string): Promise<CodingView | null> {
  const profile = await fetchUserProfile(username);
  if (!profile) return null;
  let recentRaw: Awaited<ReturnType<typeof fetchRecentSubmissions>> = [];
  try {
    recentRaw = await fetchRecentSubmissions(username);
  } catch {
    recentRaw = [];
  }
  const recent = recentRaw.map((s) => {
    const meta = NEETCODE_250[s.slug];
    return {
      slug: s.slug,
      title: meta?.title ?? s.slug.replace(/-/g, " "),
      difficulty: meta?.difficulty ?? ("unknown" as const),
      solvedAt: s.solvedAt,
    };
  });
  const neetcodeSolved = recentRaw.filter((s) => NEETCODE_SLUGS.has(s.slug)).length;
  return {
    total: profile.easy + profile.medium + profile.hard,
    easy: profile.easy,
    medium: profile.medium,
    hard: profile.hard,
    streak: profile.streak,
    neetcodeSolved,
    neetcodeTotal: NEETCODE_SLUGS.size,
    recent,
  };
}
