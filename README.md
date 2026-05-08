# ai-context-api

```
   _____ ___       ______ ____  _   _ _____ ______  __ _____    _    ____ ___
  / __  /_  )___  / ____// __ \/ | / // ___// ____/ |/ //_  /   / |  / __ \_/ /
 / /_/ / / //___// /    / / / /  |/ / \__ \/ __/  /    /  / /   /  | / /_/ / /
/__,_/ /_/      / /___ / /_/ / /|  / ___/ / /___ /    |  / /   /  /||/ ____/ /
                \____//_____/_/ |_/ /____/_____//_/|_| /_/   /__/ |__/_/    /
//  model intel for ai agent architects
```

A cyberpunk-styled, developer-oriented context layer for **picking the right LLM** when designing agent architectures. Treat model selection as data: query pricing, benchmarks, modalities, tone, censorship posture, and real-world adoption from a single API.

> POC. The data is mocked. Replace the files in `src/data/` (or the handlers in `vite-plugins/mock-api.ts`) with a live source when you graduate this past the prototype stage.

---

## Why this exists

When you architect an agent system, model choice is no longer a vibes call — it's an infrastructure decision with concrete KPIs:

- **Cost strategy.** Are you paying $75/Mtok output to classify "is this a refund?"
- **Achievement.** Will the model actually finish a 40-step tool-using loop?
- **Speed.** Is TTFT under 500ms when the user is staring at a chat box?
- **Tone & censorship.** Does the model fit the product's voice and policy?
- **Modality.** Vision? Audio? Long-context? Tool calls?

`ai-context-api` encodes those answers as queryable JSON so a router agent (or a human architect) can decide explicitly — and re-decide every quarter when prices halve and a new frontier model lands.

---

## What's in the box

- A **cyberpunk landing page** at `/` — animated grid, glitch type, neon palette, terminal hero.
- A **documentation section** at `/docs` listing every endpoint, params, sample requests and responses.
- A **models catalog** at `/models` rendering the joined model + pricing + benchmark view.
- A **playground** at `/playground` where you tweak `/api/recommend` filters and watch the ranking change live.
- A set of **mock API endpoints** under `/api/*` served by a tiny Vite middleware plugin.
- A **Claude Code skill** at `.claude/skills/model-selector/SKILL.md` so an AI agent can fetch this API to inform its own model-routing decisions.

---

## Endpoints

| Method | Path | Describes |
| --- | --- | --- |
| GET | `/api` | Index of all endpoints |
| GET | `/api/models` | Full model catalog. `?provider=Anthropic` to filter |
| GET | `/api/models/:id` | Detailed view for one model id |
| GET | `/api/models-uses-cases` | Use-cases mapped to recommended models, with cost playbook |
| GET | `/api/model-pricing` | Per-model pricing in USD/Mtok. `?modelId=...` to filter |
| GET | `/api/model-benchmark` | Composite benchmark scores (0-100) and speed/TTFT |
| GET | `/api/historic-usage-cases` | Real-world enterprise / startup deployments. `?type=enterprise` |
| GET | `/api/recommend` | Decision-helper: filter by tone, modality, max price, min scores |
| GET | `/api/compare` | Side-by-side: `?ids=claude-sonnet-4-6,gpt-5,gemini-2-5-pro` |
| GET | `/api/providers` | Providers tracked, with model counts |

### Example

```sh
# Cheap-ish, tool-using, decent long-context — what should I pick?
curl 'http://localhost:5173/api/recommend?modality=tool-use&maxInputUsdPerMtok=5&minToolUse=85&minLongContext=80'
```

```json
{
  "ranking": "score = reasoning + 0.5*toolUse - 0.5*inputUsdPerMtok (illustrative).",
  "data": [
    {
      "model": { "id": "claude-sonnet-4-6", "name": "Claude Sonnet 4.6", ... },
      "pricing": { "inputPerMTokUsd": 3.0, "outputPerMTokUsd": 15.0, ... },
      "benchmark": { "reasoning": 87, "toolUse": 93, "longContext": 90, ... },
      "score": 130.4
    }
  ]
}
```

---

## Stack

- **Vite** + **React 18** + **TypeScript**
- **TanStack Router** for routing, **TanStack Query** for fetch + cache
- **Tailwind CSS** for the cyberpunk system (custom palette, scanline / glitch / grid keyframes)
- A ~200-line Vite plugin (`vite-plugins/mock-api.ts`) that intercepts `/api/*` and returns JSON from `src/data/*.ts`

No backend. No database. No auth. The whole thing runs from `npm run dev`.

---

## Run it

```sh
npm install
npm run dev
# visit http://localhost:5173
```

Build for production:

```sh
npm run build
npm run preview
```

Type-check:

```sh
npm run typecheck
```

---

## Deploy to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes the site
to GitHub Pages on every push to `main`.

**One-time setup** (after pushing this repo to GitHub):

1. **Enable Pages**: in the repo, go to **Settings → Pages** and set
   **Source** to **GitHub Actions**.
2. Push to `main`. The workflow runs, the deploy job posts the URL.

The workflow derives the `base` path from the repo name automatically
(`/<repo>/`), so you don't have to hardcode it. For local testing of the
exact build that ships, use:

```sh
VITE_BASE=/ai-context-api/ npm run build
npx vite preview --base /ai-context-api/
```

### Live URL

After the first successful deploy: `https://sciencebased.github.io/ai-context-api/`

### How the API works on a static host

GitHub Pages is static-only — there's no Node process to run the Vite mock
middleware. The build step pre-renders **JSON snapshots** of every
non-parameterized endpoint into `dist/api/*`:

| Path on disk             | Served at                                         |
| ------------------------ | ------------------------------------------------- |
| `dist/api/index`         | `/<base>/api/index` — endpoint catalog            |
| `dist/api/models`        | `/<base>/api/models` — full model list            |
| `dist/api/model-pricing` | `/<base>/api/model-pricing`                       |
| `dist/api/model-benchmark` | `/<base>/api/model-benchmark`                   |
| `dist/api/models-uses-cases` | `/<base>/api/models-uses-cases`             |
| `dist/api/historic-usage-cases` | `/<base>/api/historic-usage-cases`       |
| `dist/api/providers`     | `/<base>/api/providers`                          |

Two endpoints behave differently on the static deploy:

- **`/api/recommend`** — query-string filtering can't run on a static host.
  The `/playground` page does the same ranking client-side from the
  catalog snapshots above. The score formula lives in `src/lib/recommend.ts`.
- **`/api/models/:id`** — dev-only. Use `/api/models` and find the row by
  id locally (one extra line of code, zero infrastructure).

Two extras the build also drops into `dist/`:

- `404.html` — copy of `index.html`, so deep links like `/docs` get the
  SPA shell instead of a real 404.
- `.nojekyll` — disables Jekyll on GitHub Pages.

---

## Project layout

```
ai-context-api/
├── public/                       # static assets (favicon)
├── src/
│   ├── main.tsx                  # router + query providers
│   ├── styles.css                # tailwind entry + cyberpunk components
│   ├── components/
│   │   ├── Layout.tsx            # nav + footer + scanline overlay
│   │   └── Hero.tsx              # animated hero + typewriter
│   ├── pages/
│   │   ├── LandingPage.tsx       # /
│   │   ├── DocsPage.tsx          # /docs
│   │   ├── ModelsPage.tsx        # /models
│   │   └── PlaygroundPage.tsx    # /playground
│   └── data/
│       ├── types.ts
│       ├── models.ts             # 12 tracked models
│       ├── pricing.ts
│       ├── benchmarks.ts
│       ├── use-cases.ts          # 8 archetypal agent use-cases
│       ├── historic-usage.ts     # 15 real-world deployments
│       └── endpoints.ts          # endpoint catalog (shared by docs page + plugin)
├── vite-plugins/
│   └── mock-api.ts               # the mock /api/* server
├── .claude/
│   └── skills/
│       └── model-selector/
│           └── SKILL.md          # the Claude skill
└── plan/
    └── app_concept.md            # the original brief
```

---

## Using it from a Claude agent

A skill is included at `.claude/skills/model-selector/SKILL.md`. When loaded into a Claude Code session, Claude will know to query this API before recommending or wiring up a model — so its decision is grounded in the latest pricing/benchmarks rather than its training cutoff.

---

## Roadmap (if this leaves POC)

- Replace the mocks with a live ETL: vendor docs scrapers + benchmark snapshots + a curation layer.
- Add `POST /api/router` — take a prompt + constraints, return the chosen model + cost estimate, log the decision.
- Add a "diff" endpoint showing what changed since last week (price drops, new releases).
- SDKs for Python and TypeScript.

---

## License

Internal POC. Not for redistribution.
