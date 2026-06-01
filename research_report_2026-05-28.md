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

---

## Addendum — 2026-05-30 (escalation follow-up)

Escalation run 4753e843 flagged a new Anthropic flagship. Verified against the live Anthropic model docs and pricing page (redirects to https://platform.claude.com/docs/en/docs/about-claude/models and .../pricing).

### Added
- **Claude Opus 4.8** (`claude-opus-4-8`): now Anthropic's most capable model ("NextOpus" in docs); 1M-token context, 128K max output. Pricing $5 input / $25 output per MTok, cache read (hit) $0.50/MTok, Batch API $2.50 in / $12.50 out. Knowledge cutoff Jan 2026. The migration anchor `#migrating-to-claude-opus-4-8` and `NextOpusId` confirm the API ID `claude-opus-4-8`. Sources: https://platform.claude.com/docs/en/docs/about-claude/models , https://platform.claude.com/docs/en/docs/about-claude/pricing

### Verified unchanged (Anthropic)
- Opus 4.7 is now listed under "Legacy models" at the same $5/$25; its 128K max-output value (set above) remains correct. Opus 4.6/4.5 are also $5/$25 but are legacy SKUs the dataset does not track — not added (avoids dataset bloat; no schema need).
- Sonnet 4.6 (1M ctx / 64K max output) and Haiku 4.5 ($1/$5) confirmed against the same docs.

---

## Addendum — 2026-06-01 (escalation 4753e843 re-verification)

Re-checked the live Anthropic model docs for escalation run 4753e843. **No data changes** to this PR.

- **Claude Opus 4.8** (`claude-opus-4-8`): re-confirmed as the current "NextOpus" flagship — 1M context, 128K max output, $5 in / $25 out per MTok. The values already added in this PR match the live docs exactly.
- **releaseDate held conservative**: the model docs do **not** state an explicit GA/release date for Opus 4.8 (the page uses templated `<NextOpus />` placeholders). The `releaseDate: "2026-05-28"` in this PR is a first-seen-on-page date, consistent with the repo's existing convention for GPT-5.5 / GPT-5.4 nano. Left unchanged; not represented as a vendor-disclosed date.
- Source: https://platform.claude.com/docs/en/docs/about-claude/models (301 from docs.anthropic.com)
