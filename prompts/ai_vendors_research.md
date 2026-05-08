## Context

`ai-context-api` is a developer-oriented context layer for picking the right LLM when designing agent architectures. It exposes pricing, benchmarks, modalities, tone, censorship posture, archetypal use-cases, and real-world deployments through a single queryable JSON API at `https://sciencebased.github.io/ai-context-api/`.

The data is hand-curated TypeScript in `src/data/*.ts`. Accurate when written, stale the moment a vendor ships a new SKU or halves a price. To keep the API useful, the dataset needs a periodic refresh cycle — vendor docs scrapers + benchmark snapshots + a curation layer.

This file is the **curation prompt** of that loop. Feed it to Perplexity (or any retrieval-grounded LLM) to produce a single dated, source-cited markdown research report. A downstream Claude Code session reads the report and proposes edits to `src/data/*.ts`.

The canonical schema lives in `src/data/types.ts`. Field names in the output **must match** the interfaces declared there (`Model`, `Pricing`, `Benchmark`, `UseCase`, `HistoricUsageCase`) so the translation step is mechanical.

Tracked providers (locked list — do not invent new ones in the main report; flag candidates in an appendix):

- Anthropic
- OpenAI
- Google
- Meta
- Mistral
- DeepSeek
- xAI
- Cohere

## Role

Act as a senior AI infrastructure analyst. You write for engineers shipping production agent systems, not for buyers reading a feature page.

- Source primary over secondary. The vendor's own pricing page beats a third-party aggregator. An independent leaderboard beats a vendor blog post. A peer-reviewed eval beats a tweet.
- Distinguish **verified** (cite primary source) from **inferred** (label as such). When sources disagree, mark the field `⚠ disputed` and list each source's number with the value it gave — never silently pick a winner.
- Terse over polished. Bullets over narrative. Tables when comparing rows.
- No marketing language. "Best-in-class" is not a fact. A benchmark score is.
- Cite everything numeric. Every price, score, context window, release date carries an inline `[n]` reference resolving to a URL in a numbered references list at the end of each section.

## Task

Produce a single markdown document refreshing the five datasets that back `ai-context-api`. Use the field names in `src/data/types.ts` verbatim — a downstream automation depends on it.

The report opens with a **Diff & Freshness** preamble, then five top-level sections in the order below.

### 0. Diff & Freshness (preamble)

- **Report date**: today's date (ISO `yyyy-mm-dd`)
- **Prompt version**: `v1`
- **Optional input**: if the user pastes the current `src/data/*.ts` snapshot above this prompt, produce a delta block listing:
  - **New since last refresh** — model ids and providers that did not appear in the prior catalog
  - **Price changes** — `modelId` + old → new for input/output/cached/batch USD/Mtok
  - **Deprecated / sunset** — `modelId`, sunset date, recommended successor
  - **Benchmark movements** — only call out shifts of ≥ 5 points on the 0–100 scale
- If no prior catalog is provided, state that explicitly and skip the delta block.

### 1. Models catalog (`Model`)

For each tracked provider, enumerate the production models available on the vendor's API today. Include flagship, workhorse, and small/cheap tiers. Mark deprecated SKUs with `(deprecated, sunset yyyy-mm-dd)`. Exclude research-only previews unless they are GA-priced.

Per model, fill **every** field declared in `Model`:

| Field | Source / format |
| --- | --- |
| `id` | lowercase, hyphen-separated, family-suffixed, matching existing convention (`claude-opus-4-7`, `gpt-5`, `gemini-2-5-pro`, `llama-4-405b-instruct`, `deepseek-v3-1`, `command-r-plus-2025`) |
| `name` | Vendor's public display name |
| `provider` | One of the 8 tracked providers, exact capitalization |
| `family` | Family/series the model belongs to (`Claude 4`, `GPT-5`, `Gemini 2.5`, …) |
| `releaseDate` | ISO `yyyy-mm-dd`, GA date — not the announce-only date |
| `contextWindowTokens` | Maximum input tokens, integer (use the API limit, not the marketing number) |
| `maxOutputTokens` | Maximum completion tokens, integer |
| `modalities` | Subset of `text \| vision \| audio \| code \| tool-use`. Use `code` only when the vendor positions it as a code-specialized SKU. Use `tool-use` whenever function calling is supported. |
| `tone` | One short phrase describing the model's voice (`crisp, professional, balanced` / `irreverent, opinionated`) |
| `censorship` | One of `low \| balanced \| strict` based on default RLHF refusal posture, not policy promises |
| `bestFor` | 3–5 bullets — concrete tasks the model is the right call for |
| `notIdealFor` | 1–2 bullets — concrete failure modes (cost, latency, censorship, capability) |
| `blurb` | One sentence summarizing the niche, no marketing |

Cite the vendor's model card or API docs page for `releaseDate`, `contextWindowTokens`, `maxOutputTokens`, and `modalities`. The qualitative fields (`tone`, `bestFor`, `notIdealFor`, `blurb`) need at least one independent reference (review, eval, deployment story).

### 2. Pricing (`Pricing`)

Per `modelId`, source from the **vendor's own pricing page** — not aggregators:

| Field | Notes |
| --- | --- |
| `inputPerMTokUsd` | Standard input rate |
| `outputPerMTokUsd` | Standard output rate |
| `cachedInputPerMTokUsd` | Omit if the vendor does not offer prompt caching |
| `batchInputPerMTokUsd` | Omit if the vendor does not offer a batch API |
| `notes` | One short string capturing tier specifics, regional differences, or volume-discount thresholds |

If the vendor lists multiple regions/tiers, use the default US/global on-demand rate and note the regional spread in `notes`.

### 3. Benchmarks (`Benchmark`)

Per `modelId`, all scores normalized to **0–100 (higher is better)** matching the existing scale:

| Field | Suggested sources |
| --- | --- |
| `reasoning` | MMLU-Pro, ARC-AGI, GPQA — composite |
| `coding` | SWE-bench Verified, HumanEval, LiveCodeBench |
| `math` | MATH, AIME, AIMO |
| `multilingual` | MGSM, XNLI, FLORES |
| `visionUnderstanding` | MMMU, MathVista — omit for text-only models |
| `longContext` | RULER, LongBench, ZeroSCROLLS |
| `toolUse` | BFCL (Berkeley Function-Calling Leaderboard), τ-bench |
| `speedTokensPerSec` | Artificial Analysis or vendor disclosure (raw tokens/sec, not normalized) |
| `ttftMs` | Artificial Analysis (raw milliseconds) |
| `source` | The leaderboard or paper name + URL the row was sourced from |

Prefer **Artificial Analysis** as a single cross-cutting reference when official leaderboards are unavailable. Quote vendor-published numbers only when independent leaderboards have not yet evaluated the model — and when you do, label the row `⚠ vendor-reported`.

### 4. Use-cases (`UseCase`)

Produce **at least 8** archetypal agent use-cases, one per category, covering all of:

`agent-orchestration | code-generation | rag | extraction | creative | support | analytics | voice`

Per row:

| Field | Format |
| --- | --- |
| `id` | kebab-case stable handle (`code-refactor-agent`, `rag-citations-enterprise`) |
| `title` | Human-readable use-case name |
| `category` | One of the 8 categories above |
| `recommendedModels` | Exactly 3 model ids from §1 — primary + cheaper fallback + premium escalation, with the rationale in `why` |
| `why` | 1–2 sentences explaining why these three, in this order |
| `costStrategy` | Concrete tactic: prompt caching, batch API, model routing, output length cap, tool-result truncation, etc. |

### 5. Historic-usage (`HistoricUsageCase`)

Produce **at least 15** real-world production deployments, mixing `enterprise`, `startup`, and `open-source` types:

| Field | Format |
| --- | --- |
| `id` | kebab-case (`klarna-customer-service`, `harvey-legal`) |
| `org` | Public-facing org name |
| `type` | `enterprise \| startup \| open-source` |
| `domain` | Short phrase (`fintech / customer support`, `developer tools`) |
| `model` | Free-text — name the family if the deployment routes across SKUs (`Claude Sonnet`, `GPT-4 family + voice models`) |
| `problem` | 1–2 sentence framing of what the org was trying to solve |
| `outcome` | 1–2 sentences with **concrete numbers** when public (resolution rate, productivity %, ARR signal) — otherwise mark `⚠ unverified` |
| `yearStarted` | Integer year |
| `reference` | URL or publication name (vendor blog, earnings call, press release, Bloomberg, The Information, etc.) |

Bias toward deployments with a public source. Skip rumor-only entries.

### Anti-patterns

- Inventing model ids that don't appear on the vendor's docs page
- Quoting benchmark scores lifted from vendor marketing slides
- Folding deprecated SKUs into the catalog without `(deprecated, sunset …)` tagging
- Skipping citations on the assumption "everyone knows this"
- Picking a value silently when sources disagree — flag `⚠ disputed` instead
- Introducing a 9th provider in the main catalog — gate new entrants in a `## Provider candidates` appendix

## Format

- Single markdown document
- A **Diff & Freshness** preamble, then five top-level sections (`# 1. Models`, `# 2. Pricing`, `# 3. Benchmarks`, `# 4. Use-cases`, `# 5. Historic-usage`)
- Field names match `src/data/types.ts` exactly — `inputPerMTokUsd`, `contextWindowTokens`, `recommendedModels`, etc.
- Dates in ISO `yyyy-mm-dd`
- Prices in USD per million tokens (USD/Mtok)
- Benchmark scores on 0–100; speed in raw tokens/sec; TTFT in raw milliseconds
- Every numeric claim carries an inline citation `[n]` resolving to a numbered reference list **per section** — Section 2's `[1]` and Section 3's `[1]` are independent
- Tables welcome — preferred for §2 and §3
- Bullet over narrative; coverage over prose
- Top of report: report date (today, ISO), prompt version (`v1`), data-as-of date per row when it differs from report date
- Use `⚠ disputed`, `⚠ vendor-reported`, or `⚠ unverified` markers liberally — silent confidence is the failure mode
- Do not generate TypeScript code in this report — that is the next agent's job. This report is the source material.
