## 0. Diff & Freshness

- **Report date**: 2026-06-12
- **Prompt version**: v1
- **Prior catalog**: present in-repo (`src/data/*.ts`) as of main branch HEAD on 2026-06-12.

### Delta (material)

- **Price changes**
  - `mistral-large-3`: input/output **$2.00/$6.00 → $0.50/$1.50** USD/Mtok (Mistral pricing page table).
  - `command-r-plus-2025`: input/output **$3.00/$15.00 → $2.50/$10.00** USD/Mtok (Cohere pricing page, “Command R+ 08-2024”).

- **No new providers** (locked list honored).
- **No verified new model IDs** found today for the locked provider list beyond what is already in repo.

---

# 1. Models (Model)

## Anthropic
- No verified new GA model IDs found on the pricing page today; pricing page lists Opus 4.5–4.8, Sonnet 4–4.6, Haiku 4.5, plus “Claude Fable 5” and “Claude Mythos 5 (limited availability)” (not currently represented in repo; unclear GA status). [1]

References:
1. https://docs.anthropic.com/en/docs/about-claude/pricing

## OpenAI
- No verified new model IDs beyond what is already in repo; the OpenAI API pricing page currently lists GPT-5.5, GPT-5.4, GPT-5.4 mini, plus “GPT-Realtime-2” variants and “GPT-Image-2” entries. [1]

References:
1. https://openai.com/api/pricing/

## Google
- No new model IDs beyond what is already in repo are required for material pricing changes today; Google’s Gemini API pricing page includes Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, Gemini 3 Flash Preview, plus additional preview IDs. [1]

References:
1. https://ai.google.dev/gemini-api/docs/pricing

## Meta
- No update performed today (no primary-source change retrieved).

## Mistral
- Pricing page lists “Mistral Large 3” with API price $0.50 input / $1.50 output per 1M tokens (model already exists in repo). [1]

References:
1. https://docs.mistral.ai/getting-started/pricing/

## DeepSeek
- DeepSeek API pricing table lists `deepseek-v4-flash` and `deepseek-v4-pro` with 1M context length and max output 384K (these models already exist in repo). [1]

References:
1. https://api-docs.deepseek.com/quick_start/pricing

## xAI
- xAI “Models” page lists Grok 4.3 and Grok Build 0.1 with pricing and context windows (repo currently tracks Grok 4.3 only). [1]

References:
1. https://docs.x.ai/developers/models

## Cohere
- Cohere pricing page lists “Command R+ 08-2024” at $2.50 input / $10.00 output per 1M tokens (repo currently tracks a single `command-r-plus-2025` entry). [1]

References:
1. https://cohere.com/pricing

---

# 2. Pricing (Pricing)

## Verified pricing rows (USD per 1M tokens)

| modelId | inputPerMTokUsd | outputPerMTokUsd | cachedInputPerMTokUsd | batchInputPerMTokUsd | notes | Evidence |
|---|---:|---:|---:|---:|---|---|
| mistral-large-3 | 0.5 | 1.5 |  |  | Mistral pricing page also notes batch processing gets a 50% discount (no explicit per-model batch row). | [Mistral pricing page](https://docs.mistral.ai/getting-started/pricing/) |
| command-r-plus-2025 | 2.5 | 10.0 |  |  | Cohere page lists “Command R+ 08-2024” at $2.50/$10.00 (existing customers). | [Cohere pricing page](https://cohere.com/pricing) |

References:
1. https://docs.mistral.ai/getting-started/pricing/
2. https://cohere.com/pricing

---

# 3. Benchmarks (Benchmark)

- No benchmark refresh performed today (only pricing deltas were material/verified).

---

# 4. Use-cases (UseCase)

- No use-case refresh performed today.

---

# 5. Historic-usage (HistoricUsageCase)

- No historic-usage refresh performed today.
