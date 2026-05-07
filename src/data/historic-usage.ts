import type { HistoricUsageCase } from "./types";

export const historicUsage: HistoricUsageCase[] = [
  {
    id: "klarna-customer-service",
    org: "Klarna",
    type: "enterprise",
    domain: "fintech / customer support",
    model: "GPT-4 family (later upgraded)",
    problem:
      "Handling tens of thousands of weekly customer-support tickets across 23 markets without growing the support team.",
    outcome:
      "Reported handling work equivalent to ~700 full-time agents within months of launch, with parity on resolution accuracy and CSAT.",
    yearStarted: 2024,
    reference: "Klarna Q1 2024 update.",
  },
  {
    id: "stripe-docs-agent",
    org: "Stripe",
    type: "enterprise",
    domain: "developer tools",
    model: "Claude Sonnet (Anthropic)",
    problem:
      "Help developers find the right Stripe API by intent rather than keyword, and reduce time-to-first-successful-call.",
    outcome:
      "Public docs assistant reduced support contacts on integration questions and is the canonical first stop for new developer onboarding.",
    yearStarted: 2024,
  },
  {
    id: "github-copilot",
    org: "GitHub / Microsoft",
    type: "enterprise",
    domain: "developer tools",
    model: "OpenAI Codex / GPT family, later multi-model (Claude, Gemini)",
    problem:
      "Inline code suggestions and code-aware chat directly in the IDE for tens of millions of developers.",
    outcome:
      "Public reports of 30-55% productivity gains on bounded tasks; multi-model strategy adopted to let users pick by task.",
    yearStarted: 2021,
  },
  {
    id: "cursor-coding-ide",
    org: "Cursor (Anysphere)",
    type: "startup",
    domain: "developer tools",
    model: "Claude Sonnet / Opus + GPT family routed",
    problem:
      "Build a developer-loved AI-native IDE that out-performs Copilot on agentic, multi-file edits.",
    outcome:
      "One of the fastest-growing dev tools of 2024-2025 by ARR; popularized model routing as a product feature.",
    yearStarted: 2023,
  },
  {
    id: "perplexity-search",
    org: "Perplexity",
    type: "startup",
    domain: "search / answer engine",
    model: "Multi-model (Claude, GPT, Llama, in-house)",
    problem:
      "Replace blue-link search for research-style queries with grounded, cited answers.",
    outcome:
      "Tens of millions of monthly users; pioneered showing models which ones answered which sub-questions.",
    yearStarted: 2022,
  },
  {
    id: "morgan-stanley-advisor",
    org: "Morgan Stanley Wealth Management",
    type: "enterprise",
    domain: "financial services",
    model: "GPT-4 family (private deployment)",
    problem:
      "Give financial advisors instant, sourced retrieval over a 100K+ document internal research library.",
    outcome:
      "Adopted firm-wide as 'AI @ Morgan Stanley Assistant'; flagship example for regulated-industry RAG.",
    yearStarted: 2023,
  },
  {
    id: "duolingo-max",
    org: "Duolingo",
    type: "enterprise",
    domain: "education",
    model: "GPT-4 family",
    problem:
      "Add roleplay conversation and AI-powered explanations to the language-learning experience.",
    outcome:
      "Launched 'Duolingo Max' tier; conversion to paid tiers improved measurably.",
    yearStarted: 2023,
  },
  {
    id: "shopify-sidekick",
    org: "Shopify",
    type: "enterprise",
    domain: "e-commerce",
    model: "Multi-model",
    problem:
      "Give merchants a conversational copilot that can edit storefront, run analytics, and orchestrate marketing.",
    outcome:
      "Shipped 'Sidekick' as part of the merchant admin; reportedly used across the merchant base for repetitive admin work.",
    yearStarted: 2023,
  },
  {
    id: "harvey-legal",
    org: "Harvey",
    type: "startup",
    domain: "legal",
    model: "GPT-4 family + custom fine-tunes",
    problem: "Build a legal-specific copilot for big-law associates and partners.",
    outcome:
      "Adopted by Allen & Overy, PwC, and other top firms; one of the largest vertical AI startups by valuation.",
    yearStarted: 2022,
  },
  {
    id: "intercom-fin",
    org: "Intercom",
    type: "enterprise",
    domain: "customer support SaaS",
    model: "Claude + GPT (multi-model)",
    problem: "Build an AI agent that resolves customer support tickets autonomously.",
    outcome:
      "Resolution rates publicly cited above 50% on enrolled tickets; sold as 'Fin' to Intercom's customer base.",
    yearStarted: 2023,
  },
  {
    id: "canva-magic",
    org: "Canva",
    type: "enterprise",
    domain: "creative tools",
    model: "Multi-model (text + image)",
    problem: "Let non-designers describe what they want and get a usable design, instantly.",
    outcome:
      "Magic Studio shipped to hundreds of millions of users; AI features became a primary differentiator.",
    yearStarted: 2023,
  },
  {
    id: "anysphere-cursor-agent",
    org: "Anysphere (Cursor) Background Agents",
    type: "startup",
    domain: "developer tools / agents",
    model: "Claude Opus + Sonnet routed",
    problem:
      "Let an agent run for minutes-to-hours on real coding tasks (issues, PRs) inside customer repos.",
    outcome:
      "Background-agent product launched and widely adopted as the canonical example of long-running coding agents in 2025.",
    yearStarted: 2025,
  },
  {
    id: "replit-agent",
    org: "Replit",
    type: "startup",
    domain: "developer tools",
    model: "Claude Sonnet + GPT routed",
    problem: "Build apps end-to-end from natural-language prompts in the browser.",
    outcome:
      "Replit Agent reportedly drove a step-change in paid conversion; one of the most-cited 'AI builds the app' demos of 2024.",
    yearStarted: 2024,
  },
  {
    id: "bcg-internal-assistant",
    org: "Boston Consulting Group",
    type: "enterprise",
    domain: "consulting",
    model: "GPT-4 family + Claude",
    problem:
      "Internal knowledge assistant for consultants — slide search, prior-engagement retrieval, drafting.",
    outcome:
      "Public statements cite double-digit % productivity gains on bounded knowledge-work tasks.",
    yearStarted: 2023,
  },
  {
    id: "doordash-ordering",
    org: "DoorDash",
    type: "enterprise",
    domain: "logistics / consumer",
    model: "GPT family + voice models",
    problem: "Voice-driven ordering experience and merchant-facing copilots.",
    outcome:
      "Voice ordering rolled out to selected merchants; cited as a flagship voice-AI deployment in logistics.",
    yearStarted: 2023,
  },
];
