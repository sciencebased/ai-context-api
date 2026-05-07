import { Link } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { endpoints } from "../data/endpoints";
import { models } from "../data/models";
import { useCases } from "../data/use-cases";

const StatCard = ({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: "cyan" | "pink" | "lime" | "yellow";
}) => {
  const ring =
    accent === "cyan"
      ? "border-neon-cyan/40 shadow-neon-cyan"
      : accent === "pink"
        ? "border-neon-pink/40 shadow-neon-pink"
        : accent === "lime"
          ? "border-neon-lime/40 shadow-neon-lime"
          : "border-neon-yellow/40";
  const text =
    accent === "cyan"
      ? "text-neon-cyan"
      : accent === "pink"
        ? "text-neon-pink"
        : accent === "lime"
          ? "text-neon-lime"
          : "text-neon-yellow";
  return (
    <div className={`rounded-md border bg-ink-800/60 p-5 ${ring}`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </div>
      <div className={`mt-2 font-display text-3xl font-black ${text}`}>{value}</div>
      <div className="mt-1 text-xs text-zinc-400">{hint}</div>
    </div>
  );
};

export function LandingPage() {
  return (
    <div className="space-y-16">
      <Hero />

      {/* What is this */}
      <section>
        <SectionHeading kicker="// 01" title="WHAT IS THIS" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="ascii-card md:col-span-2">
            <p className="text-zinc-300 leading-relaxed">
              Choosing a model is now an <span className="text-neon-cyan">infrastructure
              decision</span>. Cost, latency, censorship, tone, and tool-use reliability
              all matter — and they change every quarter. <br />
              <br />
              <span className="text-neon-pink">ai-context-api</span> is a tiny,
              opinionated catalog you can query from agent code, dashboards, or
              your own model-router. Mocked for the POC, designed to be
              swappable for a live data source.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">cost-aware</span>
              <span className="chip-pink">tone-aware</span>
              <span className="chip-lime">benchmark-aware</span>
              <span className="chip">modality-aware</span>
            </div>
          </div>
          <div className="ascii-card">
            <pre className="overflow-x-auto text-xs leading-relaxed text-zinc-400">
              {`┌─ pipeline ──────────────┐
│  /api/recommend         │
│       │                 │
│       ▼                 │
│  router (haiku 4.5)     │
│       │                 │
│   easy?─yes─► sonnet 4.6│
│       │                 │
│       no                │
│       ▼                 │
│       opus 4.7          │
└─────────────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <SectionHeading kicker="// 02" title="LIVE STATS" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="models tracked"
            value={String(models.length)}
            hint="across 8 providers"
            accent="cyan"
          />
          <StatCard
            label="use-cases mapped"
            value={String(useCases.length)}
            hint="with cost playbook"
            accent="pink"
          />
          <StatCard
            label="endpoints"
            value={String(endpoints.length)}
            hint="JSON, no auth (POC)"
            accent="lime"
          />
          <StatCard
            label="largest context"
            value="2.0M"
            hint="Gemini 2.5 Pro"
            accent="yellow"
          />
        </div>
      </section>

      {/* Endpoints preview */}
      <section>
        <SectionHeading kicker="// 03" title="ENDPOINTS" />
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Every endpoint returns JSON. Run them straight from the browser dev
          console with{" "}
          <code className="rounded bg-ink-700 px-1.5 py-0.5 text-neon-cyan">
            fetch('/api/...')
          </code>
          .
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {endpoints.slice(0, 6).map((e) => (
            <div key={e.path} className="ascii-card group">
              <div className="flex items-center justify-between">
                <span className="chip">{e.method}</span>
                <Link
                  to="/docs"
                  hash={e.path}
                  className="text-[11px] uppercase tracking-widest text-zinc-500 group-hover:text-neon-pink"
                >
                  details -&gt;
                </Link>
              </div>
              <code className="mt-3 block break-all font-mono text-sm text-neon-cyan">
                {e.path}
              </code>
              <h3 className="mt-2 font-display text-lg text-zinc-100">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{e.describe}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            to="/docs"
            className="text-sm uppercase tracking-widest text-neon-cyan hover:text-neon-pink"
          >
            see all {endpoints.length} endpoints -&gt;
          </Link>
        </div>
      </section>

      {/* Why */}
      <section>
        <SectionHeading kicker="// 04" title="WHY YOU MIGHT WANT THIS" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <WhyCard
            title="Pick by KPI, not vibes"
            body="Filter by cost ceiling, tool-use score, modality, censorship posture. The /api/recommend endpoint encodes the trade-offs explicitly."
            accent="cyan"
          />
          <WhyCard
            title="Wire into agent infra"
            body="Treat model choice as data. A router agent can query /api/recommend on cold start and re-pick monthly when prices drop."
            accent="pink"
          />
          <WhyCard
            title="Steal the playbook"
            body="Each use-case ships with a cost-control strategy. Caching, batch APIs, escalation patterns — the parts no benchmark page tells you."
            accent="lime"
          />
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-neon-pink">{kicker}</span>
      <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider text-zinc-100">
        {title}
      </h2>
      <div className="ml-3 h-px flex-1 bg-gradient-to-r from-neon-cyan/40 to-transparent" />
    </div>
  );
}

function WhyCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: "cyan" | "pink" | "lime";
}) {
  const accentClass =
    accent === "cyan"
      ? "border-neon-cyan/30"
      : accent === "pink"
        ? "border-neon-pink/30"
        : "border-neon-lime/30";
  const titleClass =
    accent === "cyan"
      ? "text-neon-cyan"
      : accent === "pink"
        ? "text-neon-pink"
        : "text-neon-lime";
  return (
    <div className={`rounded-md border bg-ink-800/60 p-5 ${accentClass}`}>
      <h3 className={`font-display text-lg ${titleClass}`}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{body}</p>
    </div>
  );
}
