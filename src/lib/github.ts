import { Octokit } from "@octokit/rest";

export function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "Missing GITHUB_TOKEN. Set it in .env.local (see .env.example).",
    );
  }
  return new Octokit({ auth: token });
}

export function getConfiguredRepos(): string[] {
  const raw = process.env.PROJECTADD_REPOS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseOwnerRepo(ownerRepo: string): {
  owner: string;
  repo: string;
} {
  const [owner, repo] = ownerRepo.split("/");
  if (!owner || !repo) {
    throw new Error(`Invalid repo '${ownerRepo}'. Expected 'owner/repo'.`);
  }
  return { owner, repo };
}
