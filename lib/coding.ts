// "The Grind" data — sourced live from Namanh's NeetCode submissions repo on GitHub.
// He solves on neetcode.io and commits each solved problem as a folder
// (`Data Structures & Algorithms/<slug>/submission-*.py`), so the set of solved
// problem slugs = the second path segment of every blob. We match those against the
// canonical NeetCode-150 list (bundled in neetcode150.json) for the progress views.

import neetcode150 from "@/lib/neetcode/neetcode150.json";

const REPO = "Namainchick/neetcode-submissions";

type DiffKey = "E" | "M" | "H";
const DIFF_LABEL: Record<DiffKey, string> = { E: "Easy", M: "Medium", H: "Hard" };

type Pattern = { name: string; problems: { title: string; slug: string; difficulty: string }[] };
const PATTERNS = neetcode150.patterns as Pattern[];

type RefProblem = { slug: string; difficulty: DiffKey };
const REFERENCE: RefProblem[] = PATTERNS.flatMap((p) =>
  p.problems.map((pr) => ({ slug: pr.slug, difficulty: pr.difficulty as DiffKey }))
);

export type CodingView = {
  totalSolved: number;
  list150Total: number;
  list150Solved: number;
  completionPct: number;
  byDifficulty: { key: DiffKey; label: string; solved: number; total: number }[];
  byCategory: { name: string; solved: number; total: number }[];
};

async function fetchSolvedSlugs(): Promise<Set<string>> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/git/trees/HEAD?recursive=1`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "namanh-portfolio" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const data = (await res.json()) as { tree: { path: string; type: string }[] };
  const slugs = new Set<string>();
  for (const node of data.tree) {
    if (node.type !== "blob") continue;
    const parts = node.path.split("/");
    if (parts.length >= 3) slugs.add(parts[1]);
  }
  return slugs;
}

export async function getCodingView(): Promise<CodingView | null> {
  let solved: Set<string>;
  try {
    solved = await fetchSolvedSlugs();
  } catch {
    return null;
  }

  const solved150 = REFERENCE.filter((p) => solved.has(p.slug));
  const byDifficulty = (["E", "M", "H"] as DiffKey[]).map((k) => ({
    key: k,
    label: DIFF_LABEL[k],
    solved: solved150.filter((p) => p.difficulty === k).length,
    total: REFERENCE.filter((p) => p.difficulty === k).length,
  }));
  const byCategory = PATTERNS.map((p) => ({
    name: p.name,
    solved: p.problems.filter((pr) => solved.has(pr.slug)).length,
    total: p.problems.length,
  }));

  return {
    totalSolved: solved.size,
    list150Total: REFERENCE.length,
    list150Solved: solved150.length,
    completionPct: Math.round((solved150.length / REFERENCE.length) * 100),
    byDifficulty,
    byCategory,
  };
}
