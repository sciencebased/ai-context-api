import type { UseCase } from "./types";

export const useCases: UseCase[] = [
  {
    id: "agent-orchestrator",
    title: "Long-running agent orchestrator",
    category: "agent-orchestration",
    recommendedModels: ["claude-opus-4-7", "claude-sonnet-4-6"],
    why:
      "Sustained multi-step planning, tool use over 100+ turns, and the ability to recover from failure modes are where Anthropic's Claude 4 family is hardest to beat right now.",
    costStrategy:
      "Route easy turns to Sonnet/Haiku, escalate to Opus only when the model itself signals uncertainty. Cache the system prompt + tool schemas — typically 70-90% input cache hit rate.",
  },
  {
    id: "production-coding-assistant",
    title: "Production coding assistant (IDE / PR review)",
    category: "code-generation",
    recommendedModels: ["claude-sonnet-4-6", "claude-opus-4-7", "deepseek-v3-1"],
    why:
      "Sonnet 4.6 is the cost/perf sweet spot for diff-grade edits. Use Opus for architectural reviews; DeepSeek if cost is the primary driver.",
    costStrategy:
      "Cache the repo manifest + lint rules. Use Haiku 4.5 for autocomplete-style suggestions; Sonnet for full-file refactors.",
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG with citations",
    category: "rag",
    recommendedModels: ["command-r-plus-2025", "claude-sonnet-4-6", "gemini-2-5-pro"],
    why:
      "Cohere's Command R+ is purpose-built for grounded answers with citations. Gemini 2.5 Pro shines when the corpus is pasted into a single 1M+ token context. Sonnet is the safe middle.",
    costStrategy:
      "Embed once with a cheap embedding model, retrieve top-K, and pass to a mid-tier generator. Don't pay frontier prices for retrieval-grounded generation.",
  },
  {
    id: "high-volume-extraction",
    title: "High-volume structured extraction",
    category: "extraction",
    recommendedModels: ["claude-haiku-4-5", "gpt-5-mini", "gemini-2-5-flash"],
    why:
      "All three deliver reliable JSON / function-calling at low latency and price. Choose based on existing cloud relationship.",
    costStrategy:
      "Use batch APIs for offline workloads (typically 50% off). Cache schemas. Validate with a typed schema (zod / pydantic) before persisting.",
  },
  {
    id: "creative-writing",
    title: "Creative / less-filtered writing",
    category: "creative",
    recommendedModels: ["grok-4", "claude-opus-4-7", "llama-4-405b-instruct"],
    why:
      "Grok 4 has the loosest filters out of the box. Opus 4.7 has the strongest prose voice. Llama gives you full control via fine-tune.",
    costStrategy:
      "Creative latency tolerances are usually high — drop to batch and cache the system prompt aggressively.",
  },
  {
    id: "voice-customer-support",
    title: "Voice-first customer support",
    category: "voice",
    recommendedModels: ["gpt-5", "gemini-2-5-flash", "claude-haiku-4-5"],
    why:
      "GPT-5 has the most mature audio I/O. Gemini 2.5 Flash is competitive at much lower cost. Haiku keeps text-portion costs in check when paired with a separate STT/TTS stack.",
    costStrategy:
      "Audio tokens are usually 5-20x more expensive than text. Transcribe with a cheap STT, reason in text, synthesize with a dedicated TTS — don't pay multimodal prices for the whole loop.",
  },
  {
    id: "regulated-eu-deployment",
    title: "Regulated EU / data-residency deployment",
    category: "support",
    recommendedModels: ["mistral-large-3", "command-r-plus-2025"],
    why:
      "Mistral hosts in EU regions. Cohere offers private deployment options for regulated industries (finance, healthcare).",
    costStrategy:
      "Negotiate a committed-use contract — list pricing here is rarely what enterprises actually pay.",
  },
  {
    id: "log-analytics",
    title: "Log / transcript analytics over huge windows",
    category: "analytics",
    recommendedModels: ["gemini-2-5-pro", "gemini-2-5-flash", "claude-opus-4-7"],
    why:
      "When the question is 'find the needle in 1.5M tokens', Gemini's window is the differentiator. Opus 4.7 catches up at 1M.",
    costStrategy:
      "Pre-summarize chunks with Flash, then feed the summary to Pro/Opus. Don't blast 2M tokens through a frontier model unless you have to.",
  },
];
