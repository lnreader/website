"use client";

import Link from "next/link";
import type { ReactElement } from "react";

const metricCards = [
  {
    label: "Plugins",
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

export default function FeatureHero(): ReactElement {
  return (
    <section className="flex flex-col gap-16 pt-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-4xl sm:text-[3rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            A light novel reader with the craft of a native IDE
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]">
            LNReader brings a polished reading workflow to Android. Curate
            sources, tune the reader, and keep everything synced locally—no ads,
            no lock-in, just community-built features.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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

      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        {metricCards.map(({ label, value, description }) => (
          <div
            key={label}
            className="flex min-w-[200px] flex-1 flex-col items-center gap-2 rounded-sm bg-[var(--color-background-soft)] px-5 py-4 text-center"
          >
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_62%,_transparent)]">
              {label}
            </span>
            <span className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_86%,_transparent)]">
              {value}
            </span>
            <span className="text-[0.7rem] leading-5 text-[color-mix(in_srgb,_var(--color-foreground)_58%,_transparent)]">
              {description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
