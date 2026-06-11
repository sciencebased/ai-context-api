## 0. Diff & Freshness

- **Report date**: 2026-06-11
- **Prompt version**: v1
- **Branch / PR**: `data-refresh-2026-06-09` (PR #10).
- **Prior catalog**: `ai-context-api` `main` at commit `a1d2109` (2026-06-03), plus the data edits already staged on this branch (`pricing.ts`).
- **Purpose**: Re-verify the pricing deltas already carried by PR #10 against today's primary vendor pages, and record OpenAI mapping items deliberately held back. No new data rows were added in this run beyond what PR #10 already contains.

### Re-verification summary (2026-06-11)

- **Mistral — confirmed, no change needed.** `mistral.ai/pricing` continues to list **Mistral Large 3** at **$0.50 input / $1.50 output per 1M tokens** with a stated **50% batch discount** (→ $0.25 batch input). This matches the values already on the branch for `mistral-large-3` (`inputPerMTokUsd: 0.5`, `outputPerMTokUsd: 1.5`, `batchInputPerMTokUsd: 0.25`). "Mistral Large 3" maps to the existing dataset ID `mistral-large-3`. [1]
- **OpenAI — confirmed for the tracked SKU, no change needed.** The OpenAI API pricing page (`platform.openai.com/docs/pricing`, now serving from `developers.openai.com/api/docs/pricing`) lists **gpt-5.4-nano** at **$0.20 input / $0.02 cached input / $1.25 output per 1M tokens**. This matches the row already on the branch for the existing dataset ID `gpt-5-4-nano`. The dataset's dash-normalized ID `gpt-5-4-nano` corresponds to OpenAI's `gpt-5.4-nano`. [2]

### OpenAI items held back (mapping ambiguity)

The same OpenAI pricing table lists two additional SKUs that the dataset does **not** track:

- **gpt-5.5-pro**: $30.00 input / $180.00 output per 1M tokens. [2]
- **gpt-5.4-pro**: $30.00 input / $180.00 output per 1M tokens. [2]

These are **held back** and intentionally not added, because:

1. There is no corresponding model entry in `src/data/models.ts` (the dataset tracks `gpt-5-5`, `gpt-5-4`, `gpt-5-4-mini`, `gpt-5-4-nano`). A `Pricing` row references a `modelId`; adding a price row without a matching `Model` would introduce a dangling ID.
2. The pricing page alone does not establish stable model metadata (context window, max output, modalities, release date) needed for a conservative `Model` row.
3. Adding "pro" tiers is a catalog expansion, not a pricing correction, and is outside the conservative scope of this refresh.

Recommendation: defer `gpt-5.5-pro` / `gpt-5.4-pro` to a dedicated catalog-expansion change once primary model docs (not just the pricing table) confirm metadata and a stable ID convention.

### Other providers (re-verified, no change)

- **Cohere**: Command R+ SKU reconciliation (Command R+ 08-2024 at $2.50/$10.00) is handled separately in PR #9 and is **not** touched here to avoid duplicate edits. PR #10 leaves `command-r-plus-2025` ($3.00/$15.00) unchanged. [3]
- **xAI**: `docs.x.ai/docs/models` still lists Grok 4.3 at $1.25 input / $2.50 output. Grok Build 0.1 is **held back** — it does not yet fit the repo's locked canonical provider/model strategy and lacks the required catalog metadata. [4]
- **Google (Gemini)**: pricing page continues to render inconsistent paid-tier numbers ("Free of charge" rows). No change; held until a stable paid-tier table is accessible.
- **DeepSeek / Anthropic / Meta**: no verified deltas vs. current dataset today.

---

# 1. Models catalog (`Model`)

No model catalog changes in this run. Held-back OpenAI "pro" SKUs documented in §0.

---

# 2. Pricing (`Pricing`)

No new pricing rows added on 2026-06-11. The two pricing edits already present on branch `data-refresh-2026-06-09` were re-verified against primary sources today and remain correct:

- `gpt-5-4-nano`: $0.20 input / $0.02 cached / $1.25 output per 1M tokens. [2]
- `mistral-large-3`: $0.50 input / $1.50 output per 1M tokens; batch input $0.25 (50% discount). [1]

---

# 3. Benchmarks (`Benchmark`)

No benchmark refresh in this run.

---

# 4. Use-cases (`UseCase`)

No changes.

---

# 5. Historic-usage (`HistoricUsageCase`)

No changes.

---

**References**

[1] https://mistral.ai/pricing

[2] https://platform.openai.com/docs/pricing (redirects to https://developers.openai.com/api/docs/pricing)

[3] https://cohere.com/pricing

[4] https://docs.x.ai/docs/models
