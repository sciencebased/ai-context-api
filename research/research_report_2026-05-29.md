# Daily AI vendor refresh — 2026-05-29

Locked providers: Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek, xAI, Cohere.

## Diff & Freshness

### Potential data changes found
- **xAI**: The repo currently records `grok-4` at **$1.25 / $2.50 per 1M input/output tokens**, but the current **x.ai/api** pricing table shows `grok-4` at **$3.00 input / $15.00 output per 1M tokens** with **256k context** ([xAI API page](https://x.ai/api)).
- **xAI**: xAI docs show newer `grok-4.3` pricing at **$1.25 input / $0.20 cached input / $2.50 output** with **1M context**, which likely corresponds to the post-retirement routing for older slugs and/or newer model SKUs ([xAI Docs pricing](https://docs.x.ai/developers/pricing)).

### Conclusion
- **Material change**: Yes — the stored `grok-4` pricing was inconsistent with x.ai’s own pricing table, so the dataset was updated to match **x.ai/api** for the `grok-4` SKU.
- **Not changed (today)**: DeepSeek V4 Flash/Pro pricing confirmed unchanged vs prior dataset, including the note that V4-Pro’s 75% discount becomes the official 1/4-of-original price after 2026-05-31 15:59 UTC ([DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)).

## Models

### xAI
- `grok-4` (legacy SKU): 256k context; $3.00 input / $15.00 output per 1M tokens ([xAI API page](https://x.ai/api)).
- `grok-4.3` (current docs): 1M context; $1.25 input / $0.20 cached input / $2.50 output per 1M tokens ([xAI Docs pricing](https://docs.x.ai/developers/pricing)).

## Pricing

### xAI
- Updated stored `grok-4` pricing to match x.ai API table: $3.00 input / $15.00 output per 1M tokens ([xAI API page](https://x.ai/api)).

### DeepSeek (unchanged)
- deepseek-v4-flash: $0.0028 cache-hit input / $0.14 cache-miss input / $0.28 output per 1M tokens ([DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)).
- deepseek-v4-pro: $0.003625 cache-hit input / $0.435 cache-miss input / $0.87 output per 1M tokens ([DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)).

## Benchmarks
- No dataset changes made today (no new verified benchmark source was integrated).

## Use-cases
- No dataset changes made today.

## Historic-usage
- No dataset changes made today.
