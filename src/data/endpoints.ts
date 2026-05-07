export interface EndpointDoc {
  method: "GET";
  path: string;
  title: string;
  describe: string;
  query?: { name: string; describe: string; example?: string }[];
  example: { url: string; sampleResponseSnippet: string };
}

export const endpoints: EndpointDoc[] = [
  {
    method: "GET",
    path: "/api",
    title: "Index",
    describe: "List of all available endpoints with descriptions.",
    example: {
      url: "/api",
      sampleResponseSnippet: `{
  "name": "ai-context-api",
  "version": "0.1.0",
  "endpoints": [ /* ... */ ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/models",
    title: "Models catalog",
    describe:
      "Full catalog of tracked models with capabilities, modalities, tone, and best-fit guidance.",
    query: [
      {
        name: "provider",
        describe: "Filter by provider (Anthropic, OpenAI, Google, Meta, ...).",
        example: "Anthropic",
      },
    ],
    example: {
      url: "/api/models?provider=Anthropic",
      sampleResponseSnippet: `{
  "count": 3,
  "data": [
    { "id": "claude-opus-4-7", "name": "Claude Opus 4.7", "contextWindowTokens": 1000000, ... }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/models/:id",
    title: "Single model",
    describe: "Detailed view for one model id.",
    example: {
      url: "/api/models/claude-sonnet-4-6",
      sampleResponseSnippet: `{
  "id": "claude-sonnet-4-6",
  "provider": "Anthropic",
  "tone": "crisp, professional, balanced",
  "bestFor": ["production agent loops on a budget", ...]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/models-uses-cases",
    title: "Models // use-cases",
    describe:
      "Curated use-cases with recommended models, why they fit, and a cost-control playbook for each.",
    example: {
      url: "/api/models-uses-cases",
      sampleResponseSnippet: `{
  "count": 8,
  "data": [
    {
      "id": "agent-orchestrator",
      "title": "Long-running agent orchestrator",
      "recommendedModels": ["claude-opus-4-7", "claude-sonnet-4-6"],
      "why": "Sustained multi-step planning ...",
      "costStrategy": "Route easy turns to Sonnet/Haiku ..."
    }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/model-pricing",
    title: "Pricing",
    describe:
      "Per-model input/output/cached/batch pricing in USD per million tokens.",
    query: [
      { name: "modelId", describe: "Filter to a single model id.", example: "claude-sonnet-4-6" },
    ],
    example: {
      url: "/api/model-pricing?modelId=claude-sonnet-4-6",
      sampleResponseSnippet: `{
  "unit": "USD per million tokens",
  "data": [
    {
      "modelId": "claude-sonnet-4-6",
      "inputPerMTokUsd": 3.0,
      "outputPerMTokUsd": 15.0,
      "cachedInputPerMTokUsd": 0.3,
      "batchInputPerMTokUsd": 1.5
    }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/model-benchmark",
    title: "Benchmarks",
    describe:
      "Composite scores (0-100) on reasoning, coding, math, multilingual, long-context, tool-use — plus speed and TTFT.",
    query: [
      { name: "modelId", describe: "Filter to a single model id.", example: "gpt-5" },
    ],
    example: {
      url: "/api/model-benchmark?modelId=gpt-5",
      sampleResponseSnippet: `{
  "scale": "0-100",
  "data": [
    {
      "modelId": "gpt-5",
      "reasoning": 90, "coding": 87, "longContext": 86,
      "speedTokensPerSec": 80, "ttftMs": 900
    }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/historic-usage-cases",
    title: "Real-world usage",
    describe:
      "Compilation of enterprise / startup / open-source deployments — problem, model, outcome.",
    query: [
      {
        name: "type",
        describe: "Filter by deployment type.",
        example: "enterprise",
      },
    ],
    example: {
      url: "/api/historic-usage-cases?type=enterprise",
      sampleResponseSnippet: `{
  "data": [
    {
      "org": "Klarna",
      "model": "GPT-4 family (later upgraded)",
      "problem": "Handling tens of thousands of weekly support tickets ...",
      "outcome": "Reported handling work equivalent to ~700 FTEs ..."
    }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/recommend",
    title: "Recommend",
    describe:
      "Decision-helper for agent architects. Filter by tone, modality, max price, minimum tool-use score, etc. Returns a ranked top-10.",
    query: [
      { name: "tone", describe: "Substring match against the tone field.", example: "balanced" },
      { name: "modality", describe: "text | vision | audio | code | tool-use", example: "tool-use" },
      { name: "maxInputUsdPerMtok", describe: "Max acceptable input price.", example: "5" },
      { name: "minToolUse", describe: "Min tool-use benchmark score (0-100).", example: "85" },
      { name: "minLongContext", describe: "Min long-context score (0-100).", example: "80" },
    ],
    example: {
      url: "/api/recommend?modality=tool-use&maxInputUsdPerMtok=5&minToolUse=85",
      sampleResponseSnippet: `{
  "ranking": "score = reasoning + 0.5*toolUse - 0.5*inputUsdPerMtok (illustrative).",
  "data": [
    { "model": { "id": "claude-sonnet-4-6", ... }, "score": 130.5 }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/compare",
    title: "Compare",
    describe:
      "Side-by-side comparison of two or more models — capabilities + pricing + benchmarks joined.",
    query: [
      {
        name: "ids",
        describe: "Comma-separated list of model ids.",
        example: "claude-sonnet-4-6,gpt-5,gemini-2-5-pro",
      },
    ],
    example: {
      url: "/api/compare?ids=claude-sonnet-4-6,gpt-5",
      sampleResponseSnippet: `{
  "data": [
    {
      "model": { "id": "claude-sonnet-4-6", ... },
      "pricing": { "inputPerMTokUsd": 3.0, ... },
      "benchmark": { "reasoning": 87, ... }
    },
    { "model": { "id": "gpt-5", ... }, ... }
  ]
}`,
    },
  },
  {
    method: "GET",
    path: "/api/providers",
    title: "Providers",
    describe: "List of providers tracked, with model counts.",
    example: {
      url: "/api/providers",
      sampleResponseSnippet: `{
  "data": [
    { "provider": "Anthropic", "count": 3 },
    { "provider": "OpenAI", "count": 2 }
  ]
}`,
    },
  },
];
