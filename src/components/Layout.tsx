import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="text-zinc-400 hover:text-neon-cyan transition-colors text-sm uppercase tracking-widest"
    activeProps={{ className: "text-neon-cyan" }}
  >
    {label}
  </Link>
);

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="scanline-overlay min-h-full">
      <header className="sticky top-0 z-40 border-b border-neon-cyan/15 bg-ink-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-base font-bold text-neon-cyan">
              ai-context-api
            </span>
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.3em] text-neon-pink">
              // model intel
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/docs" label="Docs" />
            <NavLink to="/models" label="Models" />
            <NavLink to="/playground" label="Playground" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-widest text-neon-lime hover:text-neon-cyan"
            >
              git
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">{children}</main>
      <footer className="border-t border-neon-cyan/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>
            <span className="text-neon-cyan">ai-context-api</span> /// developer-oriented model intelligence.
          </span>
          <span>
            data is mocked for the POC. last sync:{" "}
            <span className="text-neon-lime">2026-05-07T00:00:00Z</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
