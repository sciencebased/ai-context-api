## 0. Diff & Freshness

- **Report date**: 2026-05-08
- **Prompt version**: v1
- **Prior catalog**: present (repo `src/data/*.ts` at start of run)

### Delta summary (material changes)

- **Price changes (vendor pricing pages)**
  - `claude-opus-4-7`: input 15.0 → 5.0 USD/Mtok; output 75.0 → 25.0; cached input 1.5 → 0.5; batch input 7.5 → 2.5 (notes updated re: cache writes) [1]
  - `gpt-5`: input 10.0 → 2.5; output 30.0 → 15.0; cached input 2.5 → 0.25; batch input 5.0 → 1.25 [2]
  - `gpt-5-mini`: input 0.4 → 0.75; output 1.6 → 4.5; cached input 0.1 → 0.075; batch input 0.2 → 0.375 [2]
  - `gemini-2-5-pro`: input 7.0 → 2.0 (<=200K); output 21.0 → 12.0 (<=200K); cached input 1.75 → 0.2; batch input 3.5 → 1.0 [3]
  - `gemini-2-5-flash`: input 0.35 → 0.5; output 1.05 → 3.0; cached input 0.0875 → 0.05; batch input 0.175 → 0.25 [3]
  - `command-r-plus-2025`: input 2.5 → 3.0; output 10.0 → 15.0 [4]
  - `grok-4`: input 5.0 → 1.25; output 15.0 → 2.5 (note: Grok 4 retires 2026-05-15; successor family on same pricing page) [5]

- **Policy / lifecycle**
  - xAI: Grok 4 family listed for retirement on 2026-05-15 (PT) [5]

Notes:
- DeepSeek pricing entries in the repo were already aligned with current docs (including V4-Pro promo discount end date) [6]

---

# 1. Models

## xAI

- `grok-4`
  - Status: `(deprecated, sunset 2026-05-15)` [5]
  - Successor: Grok 4.3 (same pricing page lists `grok-4.3` at $1.25/$2.50 USD per 1M input/output tokens and 1M context) [5]

References:
1. https://platform.claude.com/docs/en/about-claude/pricing
2. https://openai.com/api/pricing/
3. https://ai.google.dev/gemini-api/docs/pricing
4. https://cohere.com/pricing
5. https://docs.x.ai/developers/models
6. https://api-docs.deepseek.com/quick_start/pricing

# 2. Pricing

(See delta summary; this run focused on correcting mismatches between repo pricing.ts and the current vendor pricing pages.)

References:
1. https://platform.claude.com/docs/en/about-claude/pricing
2. https://openai.com/api/pricing/
3. https://ai.google.dev/gemini-api/docs/pricing
4. https://cohere.com/pricing
5. https://docs.x.ai/developers/models
6. https://api-docs.deepseek.com/quick_start/pricing

# 3. Benchmarks

- Not refreshed in this run (no new independent benchmark snapshot gathered).

# 4. Use-cases

- Not refreshed in this run.

# 5. Historic-usage

- Not refreshed in this run.
