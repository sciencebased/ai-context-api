export type Provider =
  | "Anthropic"
  | "OpenAI"
  | "Google"
  | "Meta"
  | "Mistral"
  | "DeepSeek"
  | "xAI"
  | "Cohere";

export type Modality = "text" | "vision" | "audio" | "code" | "tool-use";

export interface Model {
  id: string;
  name: string;
  provider: Provider;
  family: string;
  releaseDate: string; // ISO yyyy-mm-dd
  contextWindowTokens: number;
  maxOutputTokens: number;
  modalities: Modality[];
  tone: string;
  censorship: "low" | "balanced" | "strict";
  bestFor: string[];
  notIdealFor: string[];
  blurb: string;
}

export interface Pricing {
  modelId: string;
  inputPerMTokUsd: number;
  outputPerMTokUsd: number;
  cachedInputPerMTokUsd?: number;
  batchInputPerMTokUsd?: number;
  notes?: string;
}

export interface Benchmark {
  modelId: string;
  // 0..100, higher is better
  reasoning: number; // composite reasoning (MMLU-pro / ARC-AGI proxy)
  coding: number; // SWE-bench / HumanEval composite
  math: number; // MATH / AIME composite
  multilingual: number; // MGSM / XNLI composite
  visionUnderstanding?: number;
  longContext: number; // long-doc QA composite
  toolUse: number; // function-calling reliability
  speedTokensPerSec: number; // approximate generation speed
  ttftMs: number; // time-to-first-token, approximate
  source: string;
}

export interface UseCase {
  id: string;
  title: string;
  category:
    | "agent-orchestration"
    | "code-generation"
    | "rag"
    | "extraction"
    | "creative"
    | "support"
    | "analytics"
    | "voice";
  recommendedModels: string[];
  why: string;
  costStrategy: string;
}

export interface HistoricUsageCase {
  id: string;
  org: string;
  type: "enterprise" | "startup" | "open-source";
  domain: string;
  model: string;
  problem: string;
  outcome: string;
  yearStarted: number;
  reference?: string;
}
