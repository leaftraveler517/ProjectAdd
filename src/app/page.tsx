import { getSummary } from "@/lib/summary";

export const runtime = "nodejs";

export default async function Home() {
  let data:
    | {
        repos: { repo: string; openIssues: number; openPRs: number }[];
        totals: { openIssues: number; openPRs: number };
      }
    | null = null;
  let error: string | null = null;

  try {
    data = await getSummary();
  } catch (e: any) {
    error = e?.message ?? "Failed to load summary";
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">ProjectAdd</h1>
      <p className="text-sm text-gray-600">
        GitHub roll-up for open issues/PRs + local prioritization (kanban soon).
      </p>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="font-medium">Summary</h2>

        {error ? (
          <pre className="mt-3 whitespace-pre-wrap text-sm text-red-700">
            {error}
          </pre>
        ) : (
          <div className="mt-3">
            <div className="flex gap-6">
              <div>
                <div className="text-xs text-gray-500">Open issues</div>
                <div className="text-xl font-semibold">
                  {data?.totals?.openIssues ?? "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Open PRs</div>
                <div className="text-xl font-semibold">
                  {data?.totals?.openPRs ?? "—"}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">Repos</div>
              <ul className="mt-2 space-y-2">
                {(data?.repos ?? []).map((r) => (
                  <li key={r.repo} className="rounded border px-3 py-2">
                    <div className="font-mono text-sm">{r.repo}</div>
                    <div className="text-sm text-gray-600">
                      {r.openIssues} issues · {r.openPRs} PRs
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="font-medium">Next</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          <li>Add a Kanban board (local-first) for prioritization</li>
          <li>Label-based rollups (bug/feature/chore)</li>
          <li>Stale detection (no activity in N days)</li>
        </ul>
      </section>
    </main>
  );
}
