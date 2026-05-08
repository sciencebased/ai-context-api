import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { Model, Pricing, Benchmark } from "../data/types";
import { apiUrl } from "../lib/apiUrl";

interface CatalogResponse<T> {
  count: number;
  data: T[];
}

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export function ModelsPage() {
  const modelsQ = useQuery({
    queryKey: ["models"],
    queryFn: () => fetchJson<CatalogResponse<Model>>(apiUrl("api/models")),
  });
  const pricingQ = useQuery({
    queryKey: ["pricing"],
    queryFn: () => fetchJson<CatalogResponse<Pricing>>(apiUrl("api/model-pricing")),
  });
  const benchQ = useQuery({
    queryKey: ["benchmarks"],
    queryFn: () => fetchJson<CatalogResponse<Benchmark>>(apiUrl("api/model-benchmark")),
  });

  const [provider, setProvider] = useState<string>("All");

  const rows = useMemo(() => {
    if (!modelsQ.data || !pricingQ.data || !benchQ.data) return [];
    return modelsQ.data.data.map((m) => ({
      model: m,
      pricing: pricingQ.data.data.find((p) => p.modelId === m.id),
      bench: benchQ.data.data.find((b) => b.modelId === m.id),
    }));
  }, [modelsQ.data, pricingQ.data, benchQ.data]);

  const providers = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((r) => r.model.provider)))],
    [rows],
  );
  const filtered = rows.filter(
    (r) => provider === "All" || r.model.provider === provider,
  );

  if (modelsQ.isLoading || pricingQ.isLoading || benchQ.isLoading) {
    return <div className="text-neon-cyan animate-pulse">// loading model intel...</div>;
  }
  if (modelsQ.error || pricingQ.error || benchQ.error) {
    return <div className="text-neon-pink">// error loading data</div>;
  }

  return (
    <div>
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-neon-cyan">
          // catalog
        </div>
        <h1 className="mt-2 font-display text-4xl font-black text-zinc-100">
          Models
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Every tracked model, with pricing and benchmark side-by-side. All data
          fetched live from{" "}
          <code className="text-neon-cyan">/api/models</code>,{" "}
          <code className="text-neon-pink">/api/model-pricing</code>, and{" "}
          <code className="text-neon-lime">/api/model-benchmark</code>.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {providers.map((p) => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            className={`rounded-sm border px-3 py-1 text-xs uppercase tracking-widest transition ${
              p === provider
                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                : "border-zinc-700 text-zinc-400 hover:border-neon-cyan/50 hover:text-neon-cyan"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map(({ model: m, pricing: p, bench: b }) => (
          <article
            key={m.id}
            className="rounded-md border border-neon-cyan/20 bg-ink-800/60 p-5 hover:border-neon-pink/40 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl text-zinc-100">{m.name}</h2>
                <div className="mt-1 text-xs text-zinc-500">
                  {m.provider} • {m.family} • {m.releaseDate}
                </div>
              </div>
              <span className="chip">{m.censorship}</span>
            </div>

            <p className="mt-3 text-sm text-zinc-300">{m.blurb}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <KV label="ctx" value={`${(m.contextWindowTokens / 1000).toLocaleString()}K`} />
              <KV
                label="max out"
                value={`${(m.maxOutputTokens / 1000).toLocaleString()}K`}
              />
              <KV
                label="$ in / Mtok"
                value={p ? `$${p.inputPerMTokUsd.toFixed(2)}` : "—"}
              />
              <KV
                label="$ out / Mtok"
                value={p ? `$${p.outputPerMTokUsd.toFixed(2)}` : "—"}
              />
              <KV label="reasoning" value={b ? String(b.reasoning) : "—"} accent="cyan" />
              <KV label="coding" value={b ? String(b.coding) : "—"} accent="lime" />
              <KV
                label="long-ctx"
                value={b ? String(b.longContext) : "—"}
                accent="pink"
              />
              <KV label="tool-use" value={b ? String(b.toolUse) : "—"} accent="yellow" />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.modalities.map((mo) => (
                <span key={mo} className="chip">
                  {mo}
                </span>
              ))}
            </div>

            <div className="mt-4 text-xs text-zinc-400">
              <div className="text-neon-lime">best for</div>
              <ul className="mt-1 list-disc pl-4">
                {m.bestFor.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function KV({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "pink" | "lime" | "yellow";
}) {
  const c =
    accent === "cyan"
      ? "text-neon-cyan"
      : accent === "pink"
        ? "text-neon-pink"
        : accent === "lime"
          ? "text-neon-lime"
          : accent === "yellow"
            ? "text-neon-yellow"
            : "text-zinc-100";
  return (
    <div className="rounded-sm border border-neon-cyan/10 bg-ink-900/60 p-2">
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </div>
      <div className={`font-mono text-sm ${c}`}>{value}</div>
    </div>
  );
}
