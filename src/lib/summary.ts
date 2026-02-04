import { getConfiguredRepos, getOctokit, parseOwnerRepo } from "@/lib/github";

export type RepoSummary = {
  repo: string;
  openIssues: number;
  openPRs: number;
};

export async function getSummary(): Promise<{
  repos: RepoSummary[];
  totals: { openIssues: number; openPRs: number };
}> {
  const repos = getConfiguredRepos();
  if (repos.length === 0) {
    throw new Error(
      "No repos configured. Set PROJECTADD_REPOS in .env.local (see .env.example).",
    );
  }

  const octokit = getOctokit();

  const results = await Promise.all(
    repos.map(async (full) => {
      const { owner, repo } = parseOwnerRepo(full);

      const [issues, pulls] = await Promise.all([
        octokit.issues.listForRepo({
          owner,
          repo,
          state: "open",
          per_page: 100,
        }),
        octokit.pulls.list({
          owner,
          repo,
          state: "open",
          per_page: 100,
        }),
      ]);

      const openIssues = issues.data.filter((i) => !i.pull_request);

      return {
        repo: full,
        openIssues: openIssues.length,
        openPRs: pulls.data.length,
      };
    }),
  );

  const totals = results.reduce(
    (acc, r) => {
      acc.openIssues += r.openIssues;
      acc.openPRs += r.openPRs;
      return acc;
    },
    { openIssues: 0, openPRs: 0 },
  );

  return { repos: results, totals };
}
