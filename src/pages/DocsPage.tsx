import { endpoints } from "../data/endpoints";

export function DocsPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="text-[10px] uppercase tracking-[0.3em] text-neon-pink">
          // endpoints
        </div>
        <ul className="mt-3 space-y-1.5 text-sm">
          {endpoints.map((e) => (
            <li key={e.path}>
              <a
                href={`#${e.path}`}
                className="block rounded-sm px-2 py-1 text-zinc-400 hover:bg-neon-cyan/10 hover:text-neon-cyan"
              >
                <span className="text-neon-pink">GET</span>{" "}
                <span className="font-mono">{e.path}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-md border border-neon-lime/30 bg-neon-lime/5 p-3 text-xs text-zinc-300">
          <div className="font-display text-neon-lime">no auth</div>
          <p className="mt-1 text-zinc-400">
            POC is unauthenticated and runs on mock data. Drop your own
            data layer behind these handlers when you fork.
          </p>
        </div>
      </aside>

      {/* Body */}
      <div>
        <header className="mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-neon-cyan">
            // documentation
          </div>
          <h1 className="mt-2 font-display text-4xl font-black text-zinc-100">
            Endpoints
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            All endpoints return JSON, are <code className="text-neon-cyan">GET</code>-only,
            and accept query params where documented. Base URL during local dev:{" "}
            <code className="text-neon-pink">http://localhost:5173</code>.
          </p>
        </header>

        <div className="space-y-12">
          {endpoints.map((e) => (
            <section key={e.path} id={e.path} className="scroll-mt-28">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip-pink">{e.method}</span>
                <code className="font-mono text-lg text-neon-cyan">{e.path}</code>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-zinc-100">
                {e.title}
              </h2>
              <p className="mt-2 max-w-3xl text-zinc-300">{e.describe}</p>

              {e.query && e.query.length > 0 && (
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-neon-lime">
                    query params
                  </div>
                  <table className="mt-2 w-full max-w-3xl border border-neon-cyan/15 text-sm">
                    <thead className="bg-ink-800 text-left text-zinc-400">
                      <tr>
                        <th className="px-3 py-2 font-mono">name</th>
                        <th className="px-3 py-2 font-mono">describe</th>
                        <th className="px-3 py-2 font-mono">example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.query.map((q) => (
                        <tr key={q.name} className="border-t border-neon-cyan/10">
                          <td className="px-3 py-2 font-mono text-neon-cyan">
                            {q.name}
                          </td>
                          <td className="px-3 py-2 text-zinc-300">{q.describe}</td>
                          <td className="px-3 py-2 font-mono text-zinc-400">
                            {q.example ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <CodeBlock label="example request" body={`curl ${e.example.url}`} />
                <CodeBlock
                  label="response (excerpt)"
                  body={e.example.sampleResponseSnippet}
                />
              </div>

              <div className="mt-4">
                <a
                  href={e.example.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-widest text-neon-pink hover:text-neon-cyan"
                >
                  -&gt; open {e.example.url}
                </a>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-md border border-neon-cyan/20 bg-ink-900/80">
      <div className="border-b border-neon-cyan/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-xs leading-relaxed text-zinc-200">
        {body}
      </pre>
    </div>
  );
}
