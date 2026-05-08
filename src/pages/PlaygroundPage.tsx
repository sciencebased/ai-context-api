import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { Benchmark, Model, Modality, Pricing } from "../data/types";
import { apiUrl } from "../lib/apiUrl";
import { rankModels } from "../lib/recommend";

const MODALITIES = ["", "text", "vision", "audio", "code", "tool-use"] as const;

interface CatalogResponse<T> {
  count: number;
  data: T[];
}

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export function PlaygroundPage() {
  const [tone, setTone] = useState("");
  const [modality, setModality] = useState<(typeof MODALITIES)[number]>("");
  const [maxInput, setMaxInput] = useState("");
  const [minTool, setMinTool] = useState("");
  const [minLong, setMinLong] = useState("");

  const queries = useQueries({
    queries: [
      {
        queryKey: ["models"],
        queryFn: () => fetchJson<CatalogResponse<Model>>(apiUrl("api/models")),
      },
      {
        queryKey: ["pricing"],
        queryFn: () =>
          fetchJson<CatalogResponse<Pricing>>(apiUrl("api/model-pricing")),
      },
      {
        queryKey: ["benchmarks"],
        queryFn: () =>
          fetchJson<CatalogResponse<Benchmark>>(apiUrl("api/model-benchmark")),
      },
    ],
  });

  const [modelsQ, pricingQ, benchQ] = queries;
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.error);

  const ranked = useMemo(() => {
    if (!modelsQ.data || !pricingQ.data || !benchQ.data) return [];
    return rankModels(modelsQ.data.data, pricingQ.data.data, benchQ.data.data, {
      tone: tone || undefined,
      modality: (modality || undefined) as Modality | undefined,
      maxInputUsdPerMtok:
        maxInput && Number.isFinite(Number(maxInput)) ? Number(maxInput) : undefined,
      minToolUse:
        minTool && Number.isFinite(Number(minTool)) ? Number(minTool) : undefined,
      minLongContext:
        minLong && Number.isFinite(Number(minLong)) ? Number(minLong) : undefined,
    }).slice(0, 10);
  }, [modelsQ.data, pricingQ.data, benchQ.data, tone, modality, maxInput, minTool, minLong]);

  const exampleUrl = useMemo(() => {
    const p = new URLSearchParams();
    if (tone) p.set("tone", tone);
    if (modality) p.set("modality", modality);
    if (maxInput) p.set("maxInputUsdPerMtok", maxInput);
    if (minTool) p.set("minToolUse", minTool);
    if (minLong) p.set("minLongContext", minLong);
    const qs = p.toString();
    return apiUrl(qs ? `api/recommend?${qs}` : "api/recommend");
  }, [tone, modality, maxInput, minTool, minLong]);

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
            // equivalent request (dev server)
          </div>
          <pre className="mt-1 overflow-x-auto break-all text-xs text-neon-cyan">
            GET {exampleUrl}
          </pre>
          <div className="mt-2 text-[10px] text-zinc-500 leading-relaxed">
            On the dev server this filters server-side. On the static deploy
            the query string is decorative — filtering runs client-side from
            the catalog snapshots.
          </div>
        </div>
      </aside>

      <div>
        {isLoading && (
          <div className="text-neon-cyan animate-pulse">// running...</div>
        )}
        {isError && <div className="text-neon-pink">// error</div>}
        {!isLoading && !isError && (
          <div>
            <div className="mb-3 text-xs text-zinc-400">
              {ranked.length} match{ranked.length === 1 ? "" : "es"} •{" "}
              <span className="text-zinc-500">
                score = reasoning + 0.5*toolUse - 0.5*inputUsdPerMtok (illustrative)
              </span>
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
                  {ranked.map((r, i) => (
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
                  {ranked.length === 0 && (
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
