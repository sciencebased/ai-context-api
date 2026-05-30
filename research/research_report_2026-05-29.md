# Daily AI vendor refresh — 2026-05-29 (corrected 2026-05-30)

Locked providers: Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek, xAI, Cohere.

## Diff & Freshness

### xAI — corrected after primary-source verification (2026-05-30)
An earlier draft of this report proposed setting the stored `grok-4` SKU to **$3.00 / $15.00** based on the **x.ai/api** marketing page. On re-verification against the authoritative xAI API docs, that change was **rejected** and reverted:

- The xAI API docs (https://docs.x.ai/docs/models) **no longer list `grok-4`**. Several older slugs — `grok-4`, `grok-4-fast`, `grok-4-1-fast`, `grok-code-fast-1` — were **retired on 2026-05-15 12:00 PM PT**. Per the docs, "Requests to deprecated text model slugs will redirect to `grok-4.3` and will be charged at the standard `grok-4.3` pricing."
- Standard `grok-4.3` pricing per the docs: **$1.25 input / $2.50 output per 1M tokens**, cached input **$0.20 / 1M**, **1M-token context**.
- Therefore the effective rate for any request today (the retirement date has passed) is **$1.25 / $2.50**, not $3 / $15. The previously stored value of $1.25/$2.50 was already correct; the marketing-page $3/$15 figure was a secondary/stale source.

### Decision
- Migrate the locked xAI model entry from the retired `grok-4` slug to the live **`grok-4-3`** SKU (real, documented ID): 1M context, $1.25 / $2.50, cached input $0.20. Cross-references in benchmarks and use-cases updated to the new id.
- **DeepSeek (unchanged)**: V4 Flash/Pro pricing confirmed unchanged; V4-Pro's 75% discount steps up after 2026-05-31 15:59 UTC.

## Models

### xAI
- `grok-4-3` (Grok 4.3): 1M context; $1.25 input / $0.20 cached input / $2.50 output per 1M tokens. xAI's current default chat model. Source: https://docs.x.ai/docs/models
- Retired slugs (`grok-4`, `grok-4-fast`, `grok-4-1-fast`, `grok-code-fast-1`) redirect to `grok-4.3` at standard rates as of 2026-05-15. Source: https://docs.x.ai/docs/models

## Pricing

### xAI
- `grok-4-3`: $1.25 input / $2.50 output / $0.20 cached input per 1M tokens. Source: https://docs.x.ai/docs/models

### DeepSeek (unchanged)
- deepseek-v4-flash: $0.0028 cache-hit input / $0.14 cache-miss input / $0.28 output per 1M tokens. Source: https://api-docs.deepseek.com/quick_start/pricing
- deepseek-v4-pro: $0.003625 cache-hit input / $0.435 cache-miss input / $0.87 output per 1M tokens. Source: https://api-docs.deepseek.com/quick_start/pricing

## Benchmarks
- No new benchmark source integrated; existing Grok benchmark row re-pointed to `grok-4-3` (scores carried over).

## Use-cases
- Creative-writing use case re-pointed from `grok-4` to `grok-4-3`.

## Historic-usage
- No dataset changes made today.
