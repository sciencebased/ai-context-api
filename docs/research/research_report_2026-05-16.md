## 0. Diff & Freshness
- Report date: 2026-05-16
- Prompt version: v1

### Delta vs prior catalog (repo main branch as of 2026-05-16)
- OpenAI pricing page `openai.com/pricing` failed to load today (404/incomplete) so pricing was verified against OpenAI API docs pricing page instead; that page adds additional SKUs (gpt-5.4-nano, -pro variants) not yet represented in `src/data/models.ts`/`src/data/pricing.ts`.
- xAI pricing/model doc `docs.x.ai/docs/models` is now fetchable and includes Grok 4.3 pricing/context that is referenced in the dataset notes but not represented as a modelId.
- No other vendor pricing pages returned material text changes vs yesterday’s fetched copies.

# 1. Models (Model)
## OpenAI
- gpt-5.4-nano (NEW on pricing table; model metadata not yet in repo): listed on OpenAI API Pricing page as a flagship model variant.[1]
- gpt-5.5-pro / gpt-5.4-pro (NEW on pricing table; model metadata not yet in repo): listed on OpenAI API Pricing page.[1]

## xAI
- grok-4.3 (successor to grok-4; referenced in repo notes but not in models list): listed on xAI docs models page, with 1M context and pricing.[2]

# 2. Pricing (Pricing)
## OpenAI (prices per 1M tokens)
From OpenAI API pricing table (Standard / Short context, unless noted):[1]
- gpt-5.5: input $5.00, cached input $0.50, output $30.00; Long context: input $10.00, cached $1.00, output $45.00.[1]
- gpt-5.4: input $2.50, cached input $0.25, output $15.00; Long context: input $5.00, cached $0.50, output $22.50.[1]
- gpt-5.4-mini: input $0.75, cached input $0.075, output $4.50.[1]
- gpt-5.4-nano: input $0.20, cached input $0.02, output $1.25.[1]
- gpt-5.5-pro: input $30.00, output $180.00; Long context: input $60.00, output $270.00.[1]
- gpt-5.4-pro: input $30.00, output $180.00; Long context: input $60.00, output $270.00.[1]

## xAI
- grok-4.3: input $1.25 / 1M tokens, output $2.50 / 1M tokens; context 1 million tokens.[2]

# 3. Benchmarks (Benchmark)
No new benchmark refresh performed in this run (pricing/doc-only verification). Existing benchmark rows in `src/data/benchmarks.ts` remain marked with placeholders for several models.

# 4. Use-cases (UseCase)
No updates in this run.

# 5. Historic-usage (HistoricUsageCase)
No updates in this run.

## References
### §1
[1] https://platform.openai.com/docs/pricing
[2] https://docs.x.ai/docs/models

### §2
[1] https://platform.openai.com/docs/pricing
[2] https://docs.x.ai/docs/models
