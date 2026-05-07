---
name: model-selector
description: Query the local ai-context-api (running at http://localhost:5173) to ground LLM model-selection decisions in current pricing, benchmarks, modalities, tone, and real-world adoption. Trigger when the user asks "which model should I use", is wiring up a Claude/OpenAI/Gemini SDK, designing an agent router, comparing model cost vs. capability, or planning AI infrastructure. Always fetch live data — do not rely on training-cutoff knowledge for prices or scores.
---

# model-selector

This skill lets you advise on AI model selection by querying a small local API
(`ai-context-api`) that exposes structured intelligence about LLMs: pricing,
benchmarks, modalities, tone, censorship posture, archetypal use-cases, and
real-world deployments.

## When to use this skill

- The user asks "which model should I use for X?"
- The user is building an agent router and needs cost/capability trade-offs
- The user is wiring up an SDK (`anthropic`, `openai`, `@google/generative-ai`,
  `mistral`, etc.) and needs to pick a specific model id
- The user mentions cost ceilings, tool-use reliability, long-context needs,
  modality requirements, or censorship constraints
- The user asks "what's a real example of company X using model Y?"

Skip this skill for:
- Code unrelated to LLM SDKs
- General programming questions

## Where the API lives

By default: `http://localhost:5173` (Vite dev server). If the user is running a
different port, ask once and remember.

If the API is unreachable (`ECONNREFUSED` or 404 at `/api`), fall back to
reading `src/data/*.ts` directly and tell the user the dev server isn't up.

## How to query

Start with `GET /api` to enumerate endpoints. Then pick the relevant one(s):

| Question the user asked | Endpoint to call |
| --- | --- |
| "What models are out there?" | `GET /api/models` |
| "Tell me about model X" | `GET /api/models/:id` |
| "How much does X cost?" | `GET /api/model-pricing?modelId=:id` |
| "How does X benchmark?" | `GET /api/model-benchmark?modelId=:id` |
| "Compare X and Y" | `GET /api/compare?ids=x,y` |
| "Which model for use-case Z?" | `GET /api/models-uses-cases` |
| "Has anyone deployed X in production?" | `GET /api/historic-usage-cases` |
| "Recommend a model under $5/Mtok with strong tool-use" | `GET /api/recommend?maxInputUsdPerMtok=5&minToolUse=85` |

### Example: end-to-end flow

User: *"I'm building a customer support agent that needs tool calls and EU data residency, budget is $3/Mtok input. What's my best option?"*

1. Call `GET /api/recommend?maxInputUsdPerMtok=3&minToolUse=85&modality=tool-use`
2. Look at the top candidates returned.
3. For the EU-residency constraint, cross-reference `bestFor` arrays in
   `GET /api/models` — Mistral and Cohere both call out EU/regulated industries.
4. Optionally pull `GET /api/historic-usage-cases?type=enterprise` to find
   precedents.
5. Recommend a primary + a fallback. Cite the prices and benchmark scores you
   read from the API. Note explicitly that the data is current as of the API's
   `last sync` date.

## How to present recommendations

Always include, when recommending a model:

- **Model id** (the exact string the user will pass to their SDK)
- **Provider**
- **Input / output price per Mtok** (from `/api/model-pricing`)
- **Why it fits** — pick 1-2 lines from the `bestFor` array and the relevant
  benchmark scores
- **The cost-control playbook** — if the use-case matches one in
  `/api/models-uses-cases`, quote the `costStrategy` field
- **A fallback** — a cheaper or higher-tier alternative to escalate/de-escalate
  to, with the price delta

## Caveats to surface

- This API's data is curated, not live-scraped. Treat it as the team's
  *opinion*, not the ground truth — when prices have likely moved, recommend
  the user double-check the vendor's pricing page before committing.
- The `/api/recommend` ranking score is illustrative, not a real benchmark.
- Modalities and censorship are simplified — when the use-case is regulated
  (legal, medical, financial), recommend the user run their own evals.

## Anti-patterns

- Don't recommend a model id without first calling the API to confirm it
  exists in the catalog and getting its current price.
- Don't make up benchmark numbers — quote what's returned.
- Don't cache responses across sessions; the data is mocked locally and
  cheap to re-fetch.
