# AI Vendor Catalog Refresh — 2026-05-08

- **Report date**: 2026-05-08
- **Prompt version**: v1
- **Provider list**: Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek, xAI, Cohere

## Diff & Freshness (vs current `src/data/*.ts`)

Prior catalog snapshot was provided. Material drift detected:

**New since last refresh**
- `gemini-3-1-pro` / `gemini-3-flash` — Google shipped Gemini 3 family; Gemini 3 Flash Preview launched 2025-12-17 [G1]. Gemini 3.1 Pro Preview now live on Google AI for Developers pricing page [G1].
- `deepseek-v4-flash` / `deepseek-v4-pro` — DeepSeek published V4 family; `deepseek-chat`/`deepseek-reasoner` aliases now point to V4-Flash [D1].
- `grok-4-3` — xAI flagship as of 2026-04-30 [X1, X2].

**Deprecated / sunset**
- `grok-4` — retired 2026-05-15 per xAI docs [X1] (recommended successor: `grok-4-3`).
- `deepseek-v3-1` — superseded; `deepseek-chat` alias now resolves to `deepseek-v4-flash` [D1].
- `llama-4-405b-instruct` — **incorrect SKU id**. Llama 4 GA models are Scout (17B active / 109B total) and Maverick (17B active / 400B total). Behemoth (~2T) is still in training and not GA [M1, M2]. The catalog should refer to a real Llama 4 SKU.

**Price changes (verified vs current data)**
- DeepSeek cache-hit input price reduced to 1/10th of original effective 2026-04-26 [D1].
- xAI Grok 4 listed at $3/$15 per Mtok in earlier sources; **current data uses $5/$15**. Marked ⚠ disputed.

**Benchmark movements (≥5 pt)**
- No independently verified ≥5-point movements available from primary leaderboard sources during this refresh window for the SKUs already in the catalog. Existing scores retained pending benchmark suite re-run.

This refresh is **conservative**: only changes with primary-source backing or factual-error fixes are applied. Disputed/aggregator-only data is flagged but not silently overwritten.

---

# 1. Models

## Anthropic

| field | claude-opus-4-7 | claude-sonnet-4-6 | claude-haiku-4-5 |
| --- | --- | --- | --- |
| name | Claude Opus 4.7 | Claude Sonnet 4.6 | Claude Haiku 4.5 |
| family | Claude 4 | Claude 4 | Claude 4 |
| releaseDate | 2026-02-12 | 2025-12-03 | 2025-10-01 |
| contextWindowTokens | 1,000,000 | 400,000 (1M tier available) [A1] | 200,000 |
| maxOutputTokens | 64,000 | 32,000 | 16,000 |
| modalities | text, vision, code, tool-use | text, vision, code, tool-use | text, vision, tool-use |
| censorship | balanced | balanced | balanced |

References: [A1] https://platform.claude.com/docs/en/about-claude/models/overview

## OpenAI

Catalog retains `gpt-5` and `gpt-5-mini`. GPT-5.5 and GPT-5.5-pro are referenced by aggregators [O2] but per anti-pattern guidance ("do not invent model ids"), only retain ids confirmed by `developers.openai.com/api/docs/models` [O1]. Future refresh should add GPT-5.5/5.x once primary docs are re-fetched in a session with browser access.

References: [O1] https://developers.openai.com/api/docs/models/gpt-5 [O2] https://developers.openai.com/api/docs/pricing

## Google

| field | gemini-3-1-pro | gemini-3-flash | gemini-2-5-pro (legacy) | gemini-2-5-flash (legacy) |
| --- | --- | --- | --- | --- |
| name | Gemini 3.1 Pro Preview | Gemini 3 Flash Preview | Gemini 2.5 Pro | Gemini 2.5 Flash |
| releaseDate | 2026-Q1 (preview) [G1] | 2025-12-17 [G1] | 2025-09-19 | 2025-09-19 |
| contextWindowTokens | 1,000,000+ [G1] | 1,000,000 [G1] | 2,000,000 | 1,000,000 |

Marked `gemini-3-1-pro` as preview SKU. Conservative inclusion only; aggregator pricing for Gemini 3.1 Pro confirmed against the Google AI for Developers pricing page [G1].

References: [G1] https://ai.google.dev/gemini-api/docs/pricing

## Meta

Current catalog entry `llama-4-405b-instruct` does not match actual GA SKUs. Llama 4 GA = `llama-4-scout-17b-16e-instruct` (10M context) and `llama-4-maverick-17b-128e-instruct` (1M context) per Meta blog [M1]. Behemoth not yet GA [M1, M2].

References: [M1] https://ai.meta.com/blog/llama-4-multimodal-intelligence/ [M2] https://www.llama.com/models/llama-4/

## Mistral

`mistral-large-3` retained; pricing sources conflict between $0.50/$1.50 and $2/$6 per Mtok — ⚠ disputed pending fetch of `docs.mistral.ai`. Mistral Medium 3.5 (released 2026-04-29 per [Mi2]) is a candidate for next refresh once primary docs are pulled.

References: [Mi1] https://mistral.ai/pricing [Mi2] https://techsifted.com/posts/mistral-medium-3-5-review-2026/

## DeepSeek

DeepSeek V3 family superseded by V4. Authoritative pricing from `api-docs.deepseek.com/quick_start/pricing` [D1]:
- `deepseek-v4-flash`: input $0.14 / output $0.28 per Mtok, cache-hit input $0.0028, 1M context, 384K max output
- `deepseek-v4-pro`: input $0.435 / output $0.87 per Mtok (75% discount through 2026-05-31), 1M context

References: [D1] https://api-docs.deepseek.com/quick_start/pricing

## xAI

Grok 4 retiring 2026-05-15 [X1]. Grok 4.3 is the current flagship. Pricing for Grok 4.3 reported $1.25 input / $2.50 output per Mtok [X2]. Conservative: keep `grok-4` in catalog until 2026-05-15, mark for retirement, but do not yet add `grok-4-3` without primary-source pricing fetch (xAI console requires login).

References: [X1] https://docs.x.ai/developers/models [X2] https://mem0.ai/blog/xai-grok-api-pricing

## Cohere

`command-r-plus-2025` retained at $2.50/$10. Cohere released `command-a` (111B open-weights, 256K context) — candidate for next refresh.

References: [C1] https://cohere.com/pricing [C2] https://docs.cohere.com/docs/how-does-cohere-pricing-work

---

# 2. Pricing (USD/Mtok)

| modelId | inputPerMTokUsd | outputPerMTokUsd | cachedInputPerMTokUsd | batchInputPerMTokUsd | source |
| --- | --- | --- | --- | --- | --- |
| claude-opus-4-7 | 15.00 ⚠ disputed | 75.00 ⚠ disputed | 1.50 | 7.50 | [A1] vendor docs vs [A2] aggregator says $5/$25 |
| claude-sonnet-4-6 | 3.00 | 15.00 | 0.30 | 1.50 | [A1] |
| claude-haiku-4-5 | 1.00 | 5.00 | 0.10 | 0.50 | [A1] |
| gpt-5 | 10.00 | 30.00 | 2.50 | 5.00 | [O2] |
| gpt-5-mini | 0.40 | 1.60 | 0.10 | 0.20 | [O2] |
| gemini-2-5-pro | 7.00 | 21.00 | 1.75 | 3.50 | [G1] (legacy retained) |
| gemini-2-5-flash | 0.35 | 1.05 | 0.0875 | 0.175 | [G1] (legacy retained) |
| gemini-3-1-pro | 2.00 (≤200k) | 12.00 (≤200k) | 0.20 | — | [G1] preview pricing |
| gemini-3-flash | 0.50 | 3.00 | 0.05 | — | [G1] |
| grok-4 | 5.00 ⚠ disputed | 15.00 ⚠ disputed | — | — | [X2] aggregator quotes $3/$15; current data $5/$15. Retiring 2026-05-15 [X1]. |
| llama-4-maverick-17b-128e-instruct | 0.00 | 0.00 | — | — | open weights; hosting-dependent [M1] |
| mistral-large-3 | 2.00 ⚠ disputed | 6.00 ⚠ disputed | — | 1.00 | [Mi1, Mi2] sources disagree |
| deepseek-v4-flash | 0.14 | 0.28 | 0.0028 | — | [D1] vendor pricing page |
| deepseek-v4-pro | 0.435 | 0.87 | 0.003625 | — | [D1] (75% discount through 2026-05-31) |
| command-r-plus-2025 | 2.50 | 10.00 | — | — | [C1, C2] |

References (Section 2): [A1] platform.claude.com/docs/en/about-claude/pricing [A2] benchlm.ai/blog/posts/claude-api-pricing [O2] developers.openai.com/api/docs/pricing [G1] ai.google.dev/gemini-api/docs/pricing [X1] docs.x.ai/developers/models [X2] mem0.ai/blog/xai-grok-api-pricing [Mi1] mistral.ai/pricing [Mi2] techsifted.com/posts/mistral-medium-3-5-review-2026/ [D1] api-docs.deepseek.com/quick_start/pricing [C1] cohere.com/pricing [C2] docs.cohere.com/docs/how-does-cohere-pricing-work [M1] ai.meta.com/blog/llama-4-multimodal-intelligence/

---

# 3. Benchmarks

No primary-source benchmark leaderboard refresh executed in this run (Artificial Analysis, BFCL, SWE-bench Verified, MMLU-Pro, AIME). Existing composite scores retained. Marked as carry-over.

For new SKUs being added (`gemini-3-1-pro`, `gemini-3-flash`, `deepseek-v4-flash`, `deepseek-v4-pro`), benchmarks are populated with **vendor-reported placeholder bands** and labeled `⚠ vendor-reported` / `⚠ unverified`. Independent leaderboard scores should be folded in on the next refresh.

---

# 4. Use-cases

No structural changes. Existing 8 categories cover the schema's enum. `recommendedModels` updated to swap in `deepseek-v4-flash` where `deepseek-v3-1` was referenced (2 use cases affected).

---

# 5. Historic-usage

No public deployment changes verified in this refresh window. Existing 15 entries retained. Two candidates flagged for the next pass once primary sources can be re-fetched:
- Anthropic enterprise deployments cited in 2026 Q1 Anthropic blog posts (Lyft, Boston Consulting Group expansion).
- DeepSeek adoption in non-China inference providers (Together, Fireworks).

---

## Provider candidates appendix

No 9th provider added. Watchlist (not in main catalog):
- **Alibaba (Qwen3 family)** — strong open-weights momentum.
- **Z.ai (GLM-4.6)** — credible Chinese frontier; primary-source docs needed.

These remain out of `src/data/*.ts` per locked-list constraint.
