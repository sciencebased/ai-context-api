import type { Model, Pricing, Benchmark, Modality } from "../data/types";

export interface RecommendFilters {
  tone?: string;
  modality?: Modality;
  maxInputUsdPerMtok?: number;
  minToolUse?: number;
  minLongContext?: number;
}

export interface ScoredCandidate {
  model: Model;
  pricing: Pricing;
  benchmark: Benchmark;
  score: number;
}

// Same logic the dev /api/recommend endpoint runs. Kept in /lib so it works
// both on a static host (where /api/recommend would just be a snapshot of the
// full dataset) and on the dev server.
export const rankModels = (
  models: Model[],
  pricing: Pricing[],
  benchmarks: Benchmark[],
  f: RecommendFilters,
): ScoredCandidate[] => {
  const tone = f.tone?.toLowerCase();

  return models
    .map((m) => ({
      model: m,
      pricing: pricing.find((p) => p.modelId === m.id),
      benchmark: benchmarks.find((b) => b.modelId === m.id),
    }))
    .filter((row): row is ScoredCandidate & { score?: number } => {
      if (!row.pricing || !row.benchmark) return false;
      if (tone && !row.model.tone.toLowerCase().includes(tone)) return false;
      if (
        f.maxInputUsdPerMtok !== undefined &&
        row.pricing.inputPerMTokUsd > f.maxInputUsdPerMtok
      )
        return false;
      if (f.minLongContext !== undefined && row.benchmark.longContext < f.minLongContext)
        return false;
      if (f.minToolUse !== undefined && row.benchmark.toolUse < f.minToolUse)
        return false;
      if (f.modality && !row.model.modalities.includes(f.modality)) return false;
      return true;
    })
    .map((row) => {
      const score =
        row.benchmark.reasoning +
        0.5 * row.benchmark.toolUse -
        0.5 * row.pricing.inputPerMTokUsd;
      return { ...row, score: Number(score.toFixed(2)) } as ScoredCandidate;
    })
    .sort((a, b) => b.score - a.score);
};
