import type { LCUserProfile, LCSubmission } from "./types";

const ENDPOINT = "https://leetcode.com/graphql";

async function graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "portfolio" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`LeetCode ${res.status}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}

export async function fetchUserProfile(username: string): Promise<LCUserProfile | null> {
  const data = await graphql<{
    matchedUser: {
      submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
      userCalendar: { streak: number };
    } | null;
  }>(
    `query($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
        userCalendar { streak }
      }
    }`,
    { username }
  );
  if (!data.matchedUser) return null;
  const counts = data.matchedUser.submitStatsGlobal.acSubmissionNum;
  const get = (d: string) => counts.find((c) => c.difficulty === d)?.count ?? 0;
  return { easy: get("Easy"), medium: get("Medium"), hard: get("Hard"), streak: data.matchedUser.userCalendar.streak };
}

export async function fetchRecentSubmissions(username: string): Promise<LCSubmission[]> {
  const data = await graphql<{ recentAcSubmissionList: { titleSlug: string; timestamp: string }[] }>(
    `query($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) { titleSlug timestamp }
    }`,
    { username, limit: 20 }
  );
  return (data.recentAcSubmissionList ?? []).map((s) => ({
    slug: s.titleSlug,
    solvedAt: new Date(parseInt(s.timestamp) * 1000),
  }));
}
