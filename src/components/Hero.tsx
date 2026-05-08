import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { apiUrl } from "../lib/apiUrl";

const PROMPTS = [
  "GET /api/recommend?modality=tool-use&maxInputUsdPerMtok=5",
  "GET /api/model-pricing?modelId=claude-sonnet-4-6",
  "GET /api/model-benchmark?modelId=gpt-5",
  "GET /api/historic-usage-cases?type=enterprise",
  "GET /api/compare?ids=claude-opus-4-7,gpt-5,gemini-2-5-pro",
];

function useTypewriter(strings: string[], typingMs = 38, holdMs = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const t = useRef<number | null>(null);

  useEffect(() => {
    const target = strings[i % strings.length];
    if (phase === "typing") {
      if (text.length < target.length) {
        t.current = window.setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          typingMs,
        );
      } else {
        t.current = window.setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      t.current = window.setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t.current = window.setTimeout(
          () => setText(target.slice(0, text.length - 1)),
          typingMs / 2,
        );
      } else {
        setI((n) => n + 1);
        setPhase("typing");
      }
    }
    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [text, phase, i, strings, typingMs, holdMs]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(PROMPTS);

  return (
    <section className="relative overflow-hidden rounded-lg border border-neon-cyan/20 bg-ink-800/50">
      {/* animated grid */}
      <div className="absolute inset-0 grid-bg animate-grid-pan opacity-60" />
      {/* horizon glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-neon-pink/30 to-transparent blur-3xl" />
      {/* scanline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-cyan/10 to-transparent animate-scanline" />

      <div className="relative z-10 px-8 py-16 md:py-24">
        <div className="mb-6 flex items-center gap-3">
          <span className="chip-pink animate-tick">// 2026.05.07</span>
          <span className="chip">v0.1.0 // POC</span>
          <span className="chip-lime">12 models // 8 use-cases</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
          <span className="block animate-glitch glitch-text">
            MODEL INTEL
          </span>
          <span className="block bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-yellow bg-clip-text text-transparent">
            FOR AGENT ARCHITECTS
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-zinc-300 text-base md:text-lg">
          A live, developer-oriented context layer for LLMs. Pricing, benchmarks,
          tone, modalities, real-world deployments — queried like an API,
          designed for the moment you're choosing between{" "}
          <span className="text-neon-cyan">Opus</span>,{" "}
          <span className="text-neon-pink">GPT-5</span>, and{" "}
          <span className="text-neon-lime">Gemini 2.5</span> for a critical
          agent loop.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <Link
            to="/docs"
            className="group inline-flex items-center justify-center rounded-md border border-neon-cyan bg-neon-cyan/10 px-5 py-3 text-sm uppercase tracking-widest text-neon-cyan shadow-neon-cyan transition hover:bg-neon-cyan/20"
          >
            <span>read the docs</span>
            <span className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center justify-center rounded-md border border-neon-pink/60 bg-neon-pink/5 px-5 py-3 text-sm uppercase tracking-widest text-neon-pink shadow-neon-pink transition hover:bg-neon-pink/10"
          >
            try /api/recommend
          </Link>
          <a
            href={apiUrl("api")}
            className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-5 py-3 text-sm uppercase tracking-widest text-zinc-300 transition hover:border-neon-lime hover:text-neon-lime"
          >
            curl /api
          </a>
        </div>

        {/* terminal */}
        <div className="mt-12 max-w-3xl rounded-md border border-neon-cyan/30 bg-ink-900/80 shadow-neon-cyan">
          <div className="flex items-center justify-between border-b border-neon-cyan/20 px-3 py-2 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neon-pink" />
              <span className="h-2 w-2 rounded-full bg-neon-yellow" />
              <span className="h-2 w-2 rounded-full bg-neon-lime" />
              <span className="ml-3">~/agent-infra</span>
            </div>
            <span className="text-neon-cyan animate-blink">●REC</span>
          </div>
          <div className="px-4 py-4 font-mono text-sm">
            <div className="text-neon-lime">$ curl https://ai-context-api.local{" "}</div>
            <div className="mt-1 text-zinc-200">
              <span className="text-neon-pink">{">"}</span>{" "}
              <span className="caret">{typed}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
