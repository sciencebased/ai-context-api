import type { Plugin, Connect, ResolvedConfig } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { models, findModel } from "../src/data/models";
import { pricing } from "../src/data/pricing";
import { benchmarks } from "../src/data/benchmarks";
import { useCases } from "../src/data/use-cases";
import { historicUsage } from "../src/data/historic-usage";

type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
) => unknown;

const json = (res: ServerResponse, body: unknown, status = 200) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.end(JSON.stringify(body, null, 2));
};

const error = (res: ServerResponse, status: number, message: string) =>
  json(res, { error: message }, status);

const ENDPOINTS: { path: string; method: "GET"; handler: Handler; describe: string }[] = [
  {
    path: "/api",
    method: "GET",
    describe: "API index — list of all available endpoints with descriptions.",
    handler: (_req, res) => {
      json(res, {
        name: "ai-context-api",
        version: "0.1.0",
        description:
          "Live, developer-oriented context about LLMs for AI agent architects.",
        endpoints: ENDPOINTS.map((e) => ({
          method: e.method,
          path: e.path,
          describe: e.describe,
        })),
      });
    },
  },
  {
    path: "/api/models",
    method: "GET",
    describe: "Full catalog of tracked models with capabilities and tone.",
    handler: (_req, res, url) => {
      const provider = url.searchParams.get("provider");
      const result = provider
        ? models.filter(
            (m) => m.provider.toLowerCase() === provider.toLowerCase(),
          )
        : models;
      json(res, { count: result.length, data: result });
    },
  },
  {
    path: "/api/models/:id",
    method: "GET",
    describe: "Single model — capabilities, tone, modalities, best-for/not-ideal-for.",
    handler: (_req, res, url) => {
      const id = url.pathname.split("/").pop()!;
      const m = findModel(id);
      if (!m) return error(res, 404, `unknown model id: ${id}`);
      json(res, m);
    },
  },
  {
    path: "/api/models-uses-cases",
    method: "GET",
    describe:
      "Curated use-cases mapped to recommended models, with reasoning and a cost-control playbook.",
    handler: (_req, res) => json(res, { count: useCases.length, data: useCases }),
  },
  {
    path: "/api/model-pricing",
    method: "GET",
    describe:
      "Per-model input / output / cached / batch pricing in USD per million tokens.",
    handler: (_req, res, url) => {
      const id = url.searchParams.get("modelId");
      const result = id ? pricing.filter((p) => p.modelId === id) : pricing;
      json(res, {
        count: result.length,
        unit: "USD per million tokens",
        data: result,
      });
    },
  },
  {
    path: "/api/model-benchmark",
    method: "GET",
    describe:
      "Composite benchmark scores: reasoning, coding, math, multilingual, long-context, tool-use, plus speed/TTFT.",
    handler: (_req, res, url) => {
      const id = url.searchParams.get("modelId");
      const result = id ? benchmarks.filter((b) => b.modelId === id) : benchmarks;
      json(res, { count: result.length, scale: "0-100", data: result });
    },
  },
  {
    path: "/api/historic-usage-cases",
    method: "GET",
    describe:
      "Real-world enterprise / startup deployments with the problem, model, and outcome.",
    handler: (_req, res, url) => {
      const type = url.searchParams.get("type"); // enterprise | startup | open-source
      const result = type
        ? historicUsage.filter((h) => h.type === type)
        : historicUsage;
      json(res, { count: result.length, data: result });
    },
  },
  {
    path: "/api/recommend",
    method: "GET",
    describe:
      "Decision-helper. Query params: tone (e.g. 'irreverent'), maxInputUsdPerMtok (number), minLongContext (0-100), minToolUse (0-100), modality (text|vision|audio|code|tool-use). Returns ranked candidates.",
    handler: (_req, res, url) => {
      const tone = url.searchParams.get("tone")?.toLowerCase();
      const maxInput = numParam(url, "maxInputUsdPerMtok");
      const minLong = numParam(url, "minLongContext");
      const minTool = numParam(url, "minToolUse");
      const modality = url.searchParams.get("modality");

      const enriched = models
        .map((m) => {
          const p = pricing.find((x) => x.modelId === m.id);
          const b = benchmarks.find((x) => x.modelId === m.id);
          return { model: m, pricing: p, benchmark: b };
        })
        .filter(({ model: m, pricing: p, benchmark: b }) => {
          if (!p || !b) return false;
          if (tone && !m.tone.toLowerCase().includes(tone)) return false;
          if (maxInput !== undefined && p.inputPerMTokUsd > maxInput) return false;
          if (minLong !== undefined && b.longContext < minLong) return false;
          if (minTool !== undefined && b.toolUse < minTool) return false;
          if (modality && !m.modalities.includes(modality as never)) return false;
          return true;
        })
        .map((row) => {
          // simple ranking: reasoning + 0.5*toolUse - 0.05*input price
          const score =
            row.benchmark!.reasoning +
            0.5 * row.benchmark!.toolUse -
            0.05 * row.pricing!.inputPerMTokUsd * 10;
          return { ...row, score: Number(score.toFixed(2)) };
        })
        .sort((a, b) => b.score - a.score);

      json(res, {
        query: Object.fromEntries(url.searchParams.entries()),
        count: enriched.length,
        ranking:
          "score = reasoning + 0.5*toolUse - 0.5*inputUsdPerMtok (illustrative).",
        data: enriched.slice(0, 10),
      });
    },
  },
  {
    path: "/api/compare",
    method: "GET",
    describe:
      "Side-by-side comparison. Query: ids=comma-separated. Returns model + pricing + benchmark joined.",
    handler: (_req, res, url) => {
      const idsParam = url.searchParams.get("ids");
      if (!idsParam) return error(res, 400, "missing ids query param");
      const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
      const data = ids.map((id) => {
        const m = findModel(id);
        if (!m) return { id, error: "unknown" };
        return {
          model: m,
          pricing: pricing.find((p) => p.modelId === id),
          benchmark: benchmarks.find((b) => b.modelId === id),
        };
      });
      json(res, { count: data.length, data });
    },
  },
  {
    path: "/api/providers",
    method: "GET",
    describe: "List of providers tracked, with model counts.",
    handler: (_req, res) => {
      const map = new Map<string, number>();
      for (const m of models) map.set(m.provider, (map.get(m.provider) ?? 0) + 1);
      const data = [...map.entries()]
        .map(([provider, count]) => ({ provider, count }))
        .sort((a, b) => b.count - a.count);
      json(res, { count: data.length, data });
    },
  },
];

const numParam = (url: URL, key: string): number | undefined => {
  const v = url.searchParams.get(key);
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const matchPath = (pattern: string, pathname: string): boolean => {
  const pp = pattern.split("/");
  const ap = pathname.split("/");
  if (pp.length !== ap.length) return false;
  return pp.every((seg, i) => seg.startsWith(":") || seg === ap[i]);
};

// ---------------------------------------------------------------------------
// Static snapshots for GitHub Pages / any static host. Each non-parameterized
// endpoint gets a JSON file written to dist/. Query params can't filter on
// static hosts; the React app does that work client-side instead.
// ---------------------------------------------------------------------------
const buildStaticSnapshots = () => {
  const providersIndex = (() => {
    const map = new Map<string, number>();
    for (const m of models) map.set(m.provider, (map.get(m.provider) ?? 0) + 1);
    return [...map.entries()]
      .map(([provider, count]) => ({ provider, count }))
      .sort((a, b) => b.count - a.count);
  })();

  const indexBody = {
    name: "ai-context-api",
    version: "0.1.0",
    description:
      "Live, developer-oriented context about LLMs for AI agent architects.",
    note:
      "Static snapshot. Query params don't filter on this host — clients filter the full datasets locally.",
    endpoints: ENDPOINTS.map((e) => ({
      method: e.method,
      path: e.path,
      describe: e.describe,
    })),
  };

  const files: { path: string; body: unknown }[] = [
    // The catalog index lives at /api/index because /api itself has to be a
    // directory on disk to hold the per-endpoint files below.
    { path: "api/index", body: indexBody },
    { path: "api/models", body: { count: models.length, data: models } },
    { path: "api/models-uses-cases", body: { count: useCases.length, data: useCases } },
    {
      path: "api/model-pricing",
      body: {
        count: pricing.length,
        unit: "USD per million tokens",
        data: pricing,
      },
    },
    {
      path: "api/model-benchmark",
      body: { count: benchmarks.length, scale: "0-100", data: benchmarks },
    },
    {
      path: "api/historic-usage-cases",
      body: { count: historicUsage.length, data: historicUsage },
    },
    { path: "api/providers", body: { count: providersIndex.length, data: providersIndex } },
  ];

  // Note: /api/models/:id is intentionally not snapshotted — keeping
  // /api/models as a file would collide with /api/models/<id>/ as a dir on
  // disk. Static deploys redirect callers to the full /api/models catalog.
  return files;
};

export function mockApiPlugin(): Plugin {
  let resolved: ResolvedConfig | undefined;

  return {
    name: "ai-context-api:mock",
    configResolved(c) {
      resolved = c;
    },
    configureServer(server) {
      const middleware: Connect.NextHandleFunction = (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api")) return next();
        const url = new URL(req.url, "http://localhost");
        const ep = ENDPOINTS.find((e) => matchPath(e.path, url.pathname));
        if (!ep) return error(res, 404, `no such endpoint: ${url.pathname}`);
        if (req.method !== ep.method)
          return error(res, 405, `method ${req.method} not allowed`);
        try {
          ep.handler(req, res, url);
        } catch (e) {
          error(res, 500, (e as Error).message);
        }
      };
      server.middlewares.use(middleware);
    },
    closeBundle() {
      if (!resolved || resolved.command !== "build") return;
      const outDir = resolve(resolved.root, resolved.build.outDir);

      // Write static API snapshots.
      for (const { path: p, body } of buildStaticSnapshots()) {
        const outPath = resolve(outDir, p);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, JSON.stringify(body, null, 2), "utf8");
      }

      // SPA fallback for GitHub Pages — copy index.html to 404.html so deep
      // links (e.g. /docs) get the SPA shell instead of a real 404.
      const indexHtml = resolve(outDir, "index.html");
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, resolve(outDir, "404.html"));
      }

      // Disable Jekyll on GitHub Pages so files starting with _ are served.
      writeFileSync(resolve(outDir, ".nojekyll"), "", "utf8");
    },
  };
}

export const endpointCatalog = ENDPOINTS.map((e) => ({
  method: e.method,
  path: e.path,
  describe: e.describe,
}));
