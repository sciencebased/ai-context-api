## 0. Diff & Freshness (preamble)

- Report date: 2026-05-11
- Prompt version: v1

### Delta vs repo state at start of run

- Price changes
  - Google
    - gemini-2-5-pro: input 2.00 → 1.25; output 12.00 → 10.00; cached input 0.20 → 0.125; batch input 1.00 → 0.625. [1]
    - gemini-2-5-flash: input 0.50 → 0.30; output 3.00 → 2.50; cached input 0.05 → 0.03; batch input 0.25 → 0.15. [1]
  - OpenAI
    - Renamed/updated tracked SKUs: gpt-5 → gpt-5.4; gpt-5-mini → gpt-5.4 mini. Pricing unchanged vs prior repo numbers for those rows (2.50/15.00 and 0.75/4.50), but model names/IDs were placeholders previously. [2]

- No new providers added (locked list respected).
- Benchmarks: not refreshed (kept existing composites; only modelId rename for OpenAI rows).

#### References (Diff)

[1] https://ai.google.dev/gemini-api/docs/pricing
[2] https://openai.com/api/pricing/

# 1. Models catalog (Model)

## OpenAI (tracked SKUs in repo)

- gpt-5-4
  - name: GPT-5.4 [1]
  - releaseDate: 2026-04-09 (page last updated / published date) [1]
  - contextWindowTokens: pricing page states pricing is for context lengths under 270K (used as proxy; model docs not fetched in this run). [1]
  - ⚠ Needs follow-up: confirm exact context window + max output tokens from OpenAI model docs.

- gpt-5-4-mini
  - name: GPT-5.4 mini [1]
  - releaseDate: 2026-04-09 [1]
  - contextWindowTokens: same under-270K pricing note used as proxy. [1]
  - ⚠ Needs follow-up: confirm exact context window + max output tokens from OpenAI model docs.

## Google (tracked SKUs in repo)

- gemini-2.5-pro / gemini-2.5-flash: pricing refreshed only.

# 2. Pricing (Pricing)

| provider | modelId | inputPerMTokUsd | outputPerMTokUsd | cachedInputPerMTokUsd | batchInputPerMTokUsd | notes |
|---|---:|---:|---:|---:|---:|---|
| OpenAI | gpt-5-4 | 2.50 | 15.00 | 0.25 | 1.25 | Pricing shown is standard processing; page notes prices reflect context lengths under 270K; Batch API saves 50% on inputs and outputs. [1] |
| OpenAI | gpt-5-4-mini | 0.75 | 4.50 | 0.075 | 0.375 | Pricing shown is standard processing; page notes prices reflect context lengths under 270K; Batch API saves 50% on inputs and outputs. [1] |
| Google | gemini-2-5-pro | 1.25 (<=200k) | 10.00 (<=200k) | 0.125 (<=200k) | 0.625 (<=200k) | Standard paid tier; higher rates apply for prompts >200k tokens. [2] |
| Google | gemini-2-5-flash | 0.30 | 2.50 | 0.03 | 0.15 | Standard paid tier. [2] |

#### References (Pricing)

[1] https://openai.com/api/pricing/
[2] https://ai.google.dev/gemini-api/docs/pricing

# 3. Benchmarks (Benchmark)

Not refreshed this run (no independent leaderboard extraction performed for the tracked model IDs).

# 4. Use-cases (UseCase)

Not refreshed this run.

# 5. Historic-usage (HistoricUsageCase)

Not refreshed this run.
