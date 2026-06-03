# Daily AI vendor refresh — 2026-05-30 (escalation 4753e843)

Locked providers: Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek, xAI, Cohere.

Escalation run 4753e843 flagged potential material updates across five vendors. Each candidate was re-verified against primary / authoritative official sources before any change. This report covers the **Cohere** correction made on this branch; the **Anthropic** (Opus 4.8) and **xAI** (grok-4 → grok-4.3) changes were folded into the existing open PRs (#7 and #8 respectively) to avoid duplicate PRs.

## Diff & Freshness

### Cohere — corrected (this branch)
- The dataset tracked a non-existent SKU `command-r-plus-2025` ($3 / $15). Cohere's pricing page lists **no "2025" Command R+**. The real, current SKUs are **Command R+ 08-2024 ($2.50 in / $10 out)** and the older **Command R+ 04-2024 ($3 in / $15 out)**. Source: https://cohere.com/pricing
- Decision: migrate the entry to the canonical latest **`command-r-plus-08-2024`** at **$2.50 / $10** (release 2024-08-30). Cross-references in benchmarks and use-cases updated to the new id. The old $3/$15 value matched the older 04-2024 SKU, confirming the stored id/price pairing was stale/inconsistent.

### Anthropic — handled in PR #7 (data-refresh-2026-05-28)
- Added **Claude Opus 4.8** (`claude-opus-4-8`): 1M ctx, 128K max output, $5/$25, cache read $0.50, batch $2.50/$12.50. It is now Anthropic's flagship ("NextOpus"); Opus 4.7 is legacy. Opus 4.6/4.5 (also $5/$25) are legacy SKUs not tracked — not added to avoid dataset bloat. Sources: https://platform.claude.com/docs/en/docs/about-claude/models , .../pricing

### xAI — handled in PR #8 (data-refresh-2026-05-29)
- `grok-4` was **retired 2026-05-15** and now redirects to **`grok-4.3`** at standard rates ($1.25 / $2.50, $0.20 cached, 1M ctx). The proposed $3/$15 change (from the x.ai/api marketing page) was rejected as a stale secondary source; the entry was migrated to the live `grok-4-3` id. Source: https://docs.x.ai/docs/models

### Google — inconclusive earlier, now confirmed UNCHANGED
- The escalation noted absent paid-tier prices in a prior fetch. Re-fetch of https://ai.google.dev/gemini-api/docs/pricing shows paid-tier prices that **match the current dataset exactly**: Gemini 2.5 Pro $1.25 in / $10 out (≤200k), Gemini 2.5 Flash $0.30 in / $2.50 out. **No change.**

### Meta — held back (no clean primary metadata)
- Official Meta (llama.com) remains robots-blocked. Azure AI Foundry's model catalog confirms Llama 4 Maverick exists as a natively-multimodal MoE but **does not publish numeric context window / max output** values. No reliable primary number found, so Llama 4 Maverick metadata is **left unchanged**. Source checked: https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/models-featured

## Models

### Cohere
- `command-r-plus-08-2024` (Command R+ 08-2024): 128K context; $2.50 input / $10 output per 1M tokens. Source: https://cohere.com/pricing

## Pricing

### Cohere
- `command-r-plus-08-2024`: $2.50 input / $10.00 output per 1M tokens (list). Source: https://cohere.com/pricing

## Benchmarks
- No new benchmark source integrated; existing Command R+ row re-pointed to `command-r-plus-08-2024` (scores carried over).

## Use-cases
- Enterprise-RAG and regulated-EU use cases re-pointed from `command-r-plus-2025` to `command-r-plus-08-2024`.

## Historic-usage
- No dataset changes made today.

---

## Addendum — 2026-06-01 (escalation 4753e843 re-verification)

Closing out the remaining escalation items. **No data changes** to this PR (Cohere correction stands as-is).

### DeepSeek V4 Pro post-promo — held back (no explicit rate published)
- The DeepSeek pricing page (https://api-docs.deepseek.com/quick_start/pricing) states the 75% promotional discount for `deepseek-v4-pro` ends **2026-05-31 15:59 UTC** and that pricing "will be officially adjusted to **1/4 of the original price** after the promotion ends."
- The page does **not list explicit post-promo dollar amounts**. Critically, "75% discount" and "1/4 of the original price" are arithmetically the same multiplier (×0.25), so the snippet is self-contradictory about whether the rate actually changes. The current stored values ($0.435 in / $0.87 out / $0.003625 cache-hit) already equal 1/4 of the implied original.
- **Decision: dataset left unchanged.** Per the conservative source-backed policy, we do not infer a new post-promo number that the primary source does not explicitly state. No DeepSeek PR was opened (no existing PR touches DeepSeek, and the bar for a new PR — primary docs explicitly listing current rates — is not met).
- Follow-up: once the promo window has fully lapsed and DeepSeek publishes explicit standard rates, update `deepseek-v4-pro` pricing and refresh its model blurb (which still reads "discounted 75% through 2026-05-31"). Tracked as a held-back item, not actioned today.

### Grok Build 0.1 — held back
- Documented in PR #8's report (research/research_report_2026-05-29.md): specialty xAI coding SKU, outside the locked one-flagship-per-provider strategy and missing schema-required metadata. Not added.

---

## Addendum — 2026-06-03 (escalation 4753e843 — Mistral Large 3 repricing)

### Mistral — corrected (this branch)
- The dataset tracked `mistral-large-3` at **$2.00 in / $6.00 out** (batch $1.00). The official Mistral pricing page now lists **Mistral Large 3 at $0.5 input / $1.5 output per 1M tokens** ("Open-weight, general-purpose, flagship multimodal and multilingual model"). Source: https://mistral.ai/pricing/ (verified 2026-06-03).
- **Decision: updated** `mistral-large-3` to **$0.5 / $1.5**. The change maps cleanly to the existing `Pricing` schema and model id — no new id, no schema change required.
- **Batch discount:** Mistral's page states batch processing gets a general **50% discount** but does not enumerate a per-model batch line for Large 3. The schema has an optional `batchInputPerMTokUsd` field; the prior entry carried batch = 50% of input. To stay consistent and conservative, `batchInputPerMTokUsd` was updated to **$0.25** (50% of the new $0.5 input). This is a derived value from the stated general discount, not an explicit per-model figure from Mistral; noted here per the source-backed policy.
- **No new PR opened.** Per the daily-refresh duplicate-avoidance strategy, this correction was folded into the existing open PR #9 (branch `data-refresh-2026-05-30`) rather than opening a new daily-refresh PR. PRs #6/#7/#8 left unmodified.

### Other Mistral SKUs on the pricing page — not added
- The page also lists Mistral Medium 3.5 ($1.5/$7.5), Small 4 ($0.1/$0.3), Devstral 2 ($0.4/$2), Codestral ($0.3/$0.9). These are outside the locked one-flagship-per-provider dataset strategy and were **not** added to avoid dataset bloat.
