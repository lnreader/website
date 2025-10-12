"use client";

import Link from "next/link";
import type { ReactElement } from "react";

const metricCards = [
  {
    label: "Extensions",
    value: "200+",
    description: "Community-maintained sources ready to install",
  },
  {
    label: "Downloads",
    value: "500k+",
    description: "Readers switching from proprietary apps",
  },
  {
    label: "Contributors",
    value: "33",
    description: "Developers improving LNReader together",
  },
];

const featureBullets = [
  "Offline chapters and synced reading progress",
  "Reader themes with fine-grained typography controls",
  "Extension APIs shared with Tachiyomi & Mihon",
];

export default function FeatureHero(): ReactElement {
  return (
    <section className="flex flex-col gap-20 pt-6">
      <div className="hero-grid">
        <div className="flex flex-col gap-8">
          <span className="badge">Open source · Android</span>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-[3rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
              A light novel reader with the craft of a native IDE
            </h1>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]">
              LNReader brings a polished reading workflow to Android. Curate
              sources, tune the reader, and keep everything synced locally—no
              ads, no lock-in, just community-built features.
            </p>
            <ul className="grid gap-3 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
              {featureBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-sm bg-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="https://github.com/LNReader/lnreader/releases"
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)] hover:text-white"
            >
              Download
            </Link>
            <Link
              href="https://github.com/LNReader/lnreader"
              className="inline-flex items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold tracking-tight text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)] hover:text-[var(--color-foreground)] transition-colors"
            >
              View source on GitHub
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-sm bg-[var(--color-background-soft)] px-5 py-4">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
              Overview
            </span>
            <h2 className="text-[1.05rem] font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_92%,_transparent)]">
              Built like a coding tool, tuned for novels
            </h2>
          </div>
          <div className="rounded-sm bg-[var(--color-background-soft)] px-5 py-4">
            <div className="grid">
              {metricCards.map(({ label, value, description }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-2 border-b border-[rgba(18,41,60,0.08)] last:border-b-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_62%,_transparent)]">
                      {label}
                    </span>
                    <span className="text-[0.68rem] text-[color-mix(in_srgb,_var(--color-foreground)_58%,_transparent)]">
                      {description}
                    </span>
                  </div>
                  <span className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_86%,_transparent)]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
