import Link from "next/link";
import type { ReactElement } from "react";

const sourceHighlights: Array<{
  readonly title: string;
  readonly detail: string;
}> = [
  {
    title: "Global catalogue",
    detail:
      "200+ community-maintained extensions covering EN, JP, VN, FR, ES, and more.",
  },
  {
    title: "Self-host options",
    detail:
      "Run your own parser or connect to Tachiyomi sources using the shared spec.",
  },
  {
    title: "One-tap updates",
    detail:
      "Refresh entire lists to fetch new chapters and track release schedules instantly.",
  },
];

export default function FeatureSources(): ReactElement {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="badge">Sources</span>
        <h2 className="text-[1.85rem] font-semibold tracking-[-0.02em] text-balance">
          Powered by open connectors maintained by the LNReader community
        </h2>
        <p className="text-sm sm:text-base text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] leading-relaxed">
          Source connectors are shared with the Tachiyomi ecosystem while
          respecting each provider’s terms. Install only what you need, audit
          the code, and contribute improvements back.
        </p>
      </div>

      <div className="grid gap-3">
        {sourceHighlights.map(({ title, detail }) => (
          <div key={title} className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_85%,_transparent)]">
              {title}
            </span>
            <span className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]">
              {detail}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[color-mix(in_srgb,_var(--color-muted)_62%,_transparent)]">
        <div>
          Maintained at
          <Link
            href="https://github.com/LNReader/lnreader-sources"
            className="ml-2 font-semibold text-[var(--color-accent-strong)] hover:text-[var(--color-accent)] transition-colors"
          >
            LNReader/lnreader-sources
          </Link>
        </div>
        <Link
          href="https://github.com/LNReader/lnreader-sources/issues"
          className="inline-flex items-center justify-center rounded-sm border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent-strong)] hover:bg-[var(--color-accent-soft)] transition-colors"
        >
          Request a source
        </Link>
      </div>
    </section>
  );
}
