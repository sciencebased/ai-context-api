# Daily AI vendor refresh — 2026-05-28

Locked providers: Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek, xAI, Cohere.

## Diff & Freshness

### Material diffs found (requires repo update)
- **Anthropic**
  - **Claude Opus 4.7**: Anthropic docs list **max output 128K** (dataset currently 64K). Source: https://docs.anthropic.com/en/docs/about-claude/models
  - **Claude Sonnet 4.6**: Anthropic docs list **context window 1M** and **max output 64K** (dataset currently 400K / 32K). Source: https://docs.anthropic.com/en/docs/about-claude/models

### No material diffs detected (checked, but data likely unchanged or unparseable today)
- **OpenAI**: API pricing page still shows GPT-5.5 $5/$30 and GPT-5.4 $2.5/$15 per 1M tokens (cached input also listed). Source: https://openai.com/api/pricing/
- **DeepSeek**: pricing still lists deepseek-v4-flash and deepseek-v4-pro with 1M context and 384K max output; promotional discount on v4-pro noted. Source: https://api-docs.deepseek.com/quick_start/pricing
- **xAI**: docs show Grok 4.3 1M context and list token pricing ($1.25/$2.50). Source: https://docs.x.ai/docs/models
- **Google**: Gemini API pricing page content returned mostly “Free of charge / Not stated” for token prices today; page still notes Gemini 2.5 Flash supports 1M context. Source: https://ai.google.dev/pricing
- **Meta**: llama.com downloads page does not include model metadata in retrieved content today. Source: https://www.llama.com/llama-downloads/
- **Mistral**: docs URL used previously returned unavailable today. Attempted: https://docs.mistral.ai/getting-started/models/pricing/
- **Cohere**: models overview page does not include token pricing; no pricing URL referenced on-page. Source: https://docs.cohere.com/docs/models

## Models

### Anthropic
- Claude Opus 4.7 (`claude-opus-4-7`): context 1M; max output 128K. Source: https://docs.anthropic.com/en/docs/about-claude/models
- Claude Sonnet 4.6 (`claude-sonnet-4-6`): context 1M; max output 64K. Source: https://docs.anthropic.com/en/docs/about-claude/models
- Claude Haiku 4.5 (`claude-haiku-4-5-20251001` / alias `claude-haiku-4-5`): context 200K; max output 64K. Source: https://docs.anthropic.com/en/docs/about-claude/models

## Pricing

No pricing changes verified today for the locked provider list.

## Benchmarks

No benchmark updates collected today.

## Use-cases

No use-case updates collected today.

## Historic-usage

No historic-usage updates collected today.
