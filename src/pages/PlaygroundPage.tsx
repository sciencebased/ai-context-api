import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface Recommendation {
  model: { id: string; name: string; provider: string; tone: string };
  pricing: { inputPerMTokUsd: number; outputPerMTokUsd: number };
  benchmark: {
    reasoning: number;
    toolUse: number;
    longContext: number;
    speedTokensPerSec: number;
  };
  score: number;
}

interface RecommendResponse {
  query: Record<string, string>;
  count: number;
  ranking: string;
  data: Recommendation[];
}

const MODALITIES = ["", "text", "vision", "audio", "code", "tool-use"] as const;

export function PlaygroundPage() {
  const [tone, setTone] = useState("");
  const [modality, setModality] = useState<(typeof MODALITIES)[number]>("");
  const [maxInput, setMaxInput] = useState("");
  const [minTool, setMinTool] = useState("");
  const [minLong, setMinLong] = useState("");

  const url = useMemo(() => {
    const p = new URLSearchParams();
    if (tone) p.set("tone", tone);
    if (modality) p.set("modality", modality);
    if (maxInput) p.set("maxInputUsdPerMtok", maxInput);
    if (minTool) p.set("minToolUse", minTool);
    if (minLong) p.set("minLongContext", minLong);
    const qs = p.toString();
    return qs ? `/api/recommend?${qs}` : "/api/recommend";
  }, [tone, modality, maxInput, minTool, minLong]);

  const q = useQuery({
    queryKey: ["recommend", url],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as RecommendResponse;
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-neon-cyan">
            // playground
          </div>
          <h1 className="mt-2 font-display text-3xl font-black">/api/recommend</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Tweak the filters, watch the ranking change live. The score is{" "}
            <span className="text-neon-cyan">illustrative</span> — fork it.
          </p>
        </div>

        <Field label="tone (substring)">
          <input
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="e.g. balanced, irreverent, formal"
            className="input"
          />
        </Field>
        <Field label="modality">
          <select
            value={modality}
            onChange={(e) =>
              setModality(e.target.value as (typeof MODALITIES)[number])
            }
            className="input"
          >
            {MODALITIES.map((m) => (
              <option key={m} value={m}>
                {m || "(any)"}
              </option>
            ))}
          </select>
        </Field>
        <Field label="max input $ / Mtok">
          <input
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            placeholder="e.g. 5"
            className="input"
          />
        </Field>
        <Field label="min tool-use score (0-100)">
          <input
            type="number"
            value={minTool}
            onChange={(e) => setMinTool(e.target.value)}
            placeholder="e.g. 85"
            className="input"
          />
        </Field>
        <Field label="min long-context score (0-100)">
          <input
            type="number"
            value={minLong}
            onChange={(e) => setMinLong(e.target.value)}
            placeholder="e.g. 80"
            className="input"
          />
        </Field>

        <div className="rounded-md border border-neon-cyan/30 bg-ink-900/80 p-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            // request
          </div>
          <pre className="mt-1 overflow-x-auto break-all text-xs text-neon-cyan">
            GET {url}
          </pre>
        </div>
      </aside>

      <div>
        {q.isLoading && (
          <div className="text-neon-cyan animate-pulse">// running...</div>
        )}
        {q.error && <div className="text-neon-pink">// error</div>}
        {q.data && (
          <div>
            <div className="mb-3 text-xs text-zinc-400">
              {q.data.count} match{q.data.count === 1 ? "" : "es"} •{" "}
              <span className="text-zinc-500">{q.data.ranking}</span>
            </div>
            <div className="overflow-hidden rounded-md border border-neon-cyan/20">
              <table className="w-full text-sm">
                <thead className="bg-ink-800 text-left text-zinc-400">
                  <tr>
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">model</th>
                    <th className="px-3 py-2">tone</th>
                    <th className="px-3 py-2 text-right">$ in</th>
                    <th className="px-3 py-2 text-right">tool-use</th>
                    <th className="px-3 py-2 text-right">long-ctx</th>
                    <th className="px-3 py-2 text-right">spd t/s</th>
                    <th className="px-3 py-2 text-right">score</th>
                  </tr>
                </thead>
                <tbody>
                  {q.data.data.map((r, i) => (
                    <tr
                      key={r.model.id}
                      className="border-t border-neon-cyan/10 hover:bg-neon-cyan/5"
                    >
                      <td className="px-3 py-2 text-zinc-500">{i + 1}</td>
                      <td className="px-3 py-2">
                        <div className="font-display text-zinc-100">
                          {r.model.name}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {r.model.provider}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-zinc-400">{r.model.tone}</td>
                      <td className="px-3 py-2 text-right font-mono text-neon-cyan">
                        ${r.pricing.inputPerMTokUsd.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-neon-yellow">
                        {r.benchmark.toolUse}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-neon-pink">
                        {r.benchmark.longContext}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-zinc-300">
                        {r.benchmark.speedTokensPerSec}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-neon-lime">
                        {r.score}
                      </td>
                    </tr>
                  ))}
                  {q.data.count === 0 && (
                    <tr>
                      <td colSpan={8} className="px-3 py-6 text-center text-zinc-500">
                        // no models matched. loosen the filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          background: #0a0e1a;
          border: 1px solid rgba(0, 240, 255, 0.25);
          color: #e4e4e7;
          padding: 0.5rem 0.75rem;
          font-family: inherit;
          font-size: 0.875rem;
          border-radius: 0.25rem;
          outline: none;
        }
        .input:focus {
          border-color: #00f0ff;
          box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-neon-pink">
        {label}
      </div>
      {children}
    </label>
  );
}
