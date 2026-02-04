# ProjectAdd

Self-hosted dashboard for viewing your active GitHub projects, their current state, and a roll-up of bugs/features. Includes a lightweight Kanban-style prioritization board (local-first).

## Goals (v0)
- Aggregate **open issues** and **open PRs** from a configured repo list
- Basic roll-ups:
  - counts by label (bug / feature / chore)
  - “stale” items (no activity in N days)
- A local Kanban board to prioritize work (stores state locally; GitHub sync later)

## Stack
- Next.js (App Router) + TypeScript
- Tailwind
- GitHub API via `@octokit/rest`

## Setup
1. Install deps
   ```bash
   pnpm install
   ```

2. Create env file
   - Copy `.env.example` to `.env.local`
   - Set:
     - `GITHUB_TOKEN` (fine-grained PAT recommended)
     - `PROJECTADD_REPOS` (comma-separated `owner/repo`)

3. Run dev
   ```bash
   pnpm dev
   ```

Open: http://localhost:3000

## Deployment (planned)
- Dockerfile + docker-compose for easy moves between servers.

## Roadmap
- Kanban persistence (local sqlite/json)
- Repo auto-discovery from org/user
- GitHub Projects (v2) integration (optional)
- Webhook-driven refresh (optional)
