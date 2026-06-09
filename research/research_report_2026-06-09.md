## 0. Diff & Freshness

- **Report date**: 2026-06-09
- **Prompt version**: v1
- **Prior catalog**: `ai-context-api` `main` at commit `a1d2109` (2026-06-03).

### Delta (verified)

- **Google (Gemini)**: Gemini Developer API pricing page currently shows token pricing as “Free of charge” for Gemini 2.5 Pro / 2.5 Flash / 2.5 Flash-Lite and many Gemini 3.x variants; page does not show the previously tracked paid rates for 2.5 Pro/Flash. This is likely a product change or a rendering/segment issue; treat as **⚠ disputed/unclear** until corroborated elsewhere. [1]
- **OpenAI**: OpenAI pricing page lists `gpt-5.4-nano` at $0.20 input / $1.25 output per 1M tokens, and also lists `gpt-5.5-pro` and `gpt-5.4-pro` tiers. Dataset currently tracks `gpt-5-4-nano` but at placeholders, and does not include `gpt-5.5-pro` / `gpt-5.4-pro`. [2]
- **DeepSeek**: DeepSeek pricing page documents that `deepseek-chat` and `deepseek-reasoner` will be deprecated on 2026-07-24 15:59 UTC, mapping to non-thinking and thinking modes of `deepseek-v4-flash`. Dataset does not currently record these deprecated aliases. [3]
- **Mistral**: Official pricing page lists “Mistral Large 3” at $0.5 input / $1.5 output per 1M tokens, not $2/$6 currently in `main`. (There is an open PR #9 that already includes this fix, but it is not merged into `main` yet.) [4]

No other provider changes were found from today’s primary pricing pages.

---

# 1. Models catalog (`Model`)

## Anthropic

No changes found vs current catalog.

## OpenAI

No verified changes to model *catalog* (IDs in dataset) from the pricing page alone; however, the pricing page includes additional SKUs (`gpt-5.5-pro`, `gpt-5.4-pro`) that the dataset does not track. [2]

## Google

Gemini pricing page appears to show “Free of charge” for many models; no reliable paid-tier numbers were visible today, so model catalog changes are held back. [1]

## Meta

No changes (insufficient primary source access for Llama model metadata today).

## Mistral

No model list changes; pricing-only discrepancy captured in §2. [4]

## DeepSeek

No new model IDs; deprecation note for legacy aliases in §2. [3]

## xAI

No model list changes.

## Cohere

No model list changes.

**References (Models)**

[1] https://ai.google.dev/gemini-api/docs/pricing

[2] https://platform.openai.com/docs/pricing

[3] https://api-docs.deepseek.com/quick_start/pricing

[4] https://mistral.ai/pricing

---

# 2. Pricing (`Pricing`)

## Confirmed pricing deltas

### Mistral

- `mistral-large-3`: official list rate shown as **$0.50 input / $1.50 output per 1M tokens**, vs **$2.00 / $6.00** in `main`. [1]

### OpenAI

- `gpt-5.4-nano`: OpenAI pricing table shows **$0.20 input / $0.02 cached input / $1.25 output per 1M tokens**; dataset currently has placeholder values for nano. [2]

## Non-deltas (re-verified)

### Anthropic

Anthropic pricing table still lists:
- Claude Opus 4.8 and 4.7: $5 input / $0.50 cache hit / $25 output, and batch input $2.50 / batch output $12.50. [3]
- Claude Sonnet 4.6: $3 input / $0.30 cache hit / $15 output, batch input $1.50 / batch output $7.50. [3]
- Claude Haiku 4.5: $1 input / $0.10 cache hit / $5 output, batch input $0.50 / batch output $2.50. [3]

### DeepSeek

DeepSeek pricing table still lists:
- `deepseek-v4-flash`: $0.14 input (cache miss) / $0.0028 input (cache hit) / $0.28 output per 1M tokens. [4]
- `deepseek-v4-pro`: $0.435 input / $0.87 output per 1M tokens. [4]
Also notes `deepseek-chat` and `deepseek-reasoner` will be deprecated on 2026/07/24 15:59 UTC. [4]

### Google (Gemini)

Gemini pricing page did not show consistent paid-tier token prices today (most rows show “Free of charge”). Hold changes until a stable paid-tier table is accessible. [5]

### Cohere

Cohere pricing page still states “Command R+ 04-2024 pricing is $3.00 / $15.00” and “Command R+ 08-2024 pricing is $2.50 / $10.00” (existing customers FAQ). [6]

### xAI

xAI models page still lists Grok 4.3 at $1.25 input / $2.50 output per 1M tokens (1M context). [7]

**References (Pricing)**

[1] https://mistral.ai/pricing

[2] https://platform.openai.com/docs/pricing

[3] https://docs.anthropic.com/en/docs/about-claude/pricing

[4] https://api-docs.deepseek.com/quick_start/pricing

[5] https://ai.google.dev/gemini-api/docs/pricing

[6] https://cohere.com/pricing

[7] https://docs.x.ai/docs/models

---

# 3. Benchmarks (`Benchmark`)

No benchmark refresh performed today (no new independent leaderboard snapshot collected in this run).

---

# 4. Use-cases (`UseCase`)

No changes.

---

# 5. Historic-usage (`HistoricUsageCase`)

No changes.
