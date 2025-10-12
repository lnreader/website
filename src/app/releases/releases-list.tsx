import { Download } from "lucide-react";

import { Markdown } from "@/components/markdown";
import type { GitHubRelease } from "@/lib/github/releases";

interface ReleasesListProps {
  readonly releases: GitHubRelease[];
  readonly updatedAt: string | null;
}

export default function ReleasesList({
  releases,
  updatedAt,
}: ReleasesListProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[200px_1fr]">
      <aside className="flex flex-col gap-2 self-start border-r border-[var(--color-border)] pr-4 text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
        <span className="px-1 font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
          Versions
        </span>
        <nav className="flex flex-col gap-1">
          {releases.map((release) => (
            <a
              key={release.id}
              href={`#${release.anchor}`}
              className="rounded-sm px-1.5 py-1 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent-strong)]"
            >
              {release.tagName}
            </a>
          ))}
        </nav>
      </aside>

      <div className="grid gap-6">
        {updatedAt ? (
          <p className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
            Updated {updatedAt}
          </p>
        ) : null}

        <div className="grid gap-6">
          {releases.map((release) => (
            <article
              key={release.id}
              id={release.anchor}
              className="flex flex-col gap-3 rounded-sm bg-[var(--color-background-soft)] px-5 py-5"
            >
              <header className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_82%,_transparent)]">
                    {release.name}
                  </span>
                  <time className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                    {release.publishedAt}
                  </time>
                </div>
                <span className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                  {release.tagName}
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
                  {release.assets.map((asset) => (
                    <a
                      key={asset.url}
                      href={asset.url}
                      className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-border)] px-2 py-1 hover:bg-[var(--color-accent-soft)]"
                    >
                      <Download size={12} strokeWidth={1.5} />
                      {asset.label}
                    </a>
                  ))}
                </div>
              </header>

              <Markdown
                markdown={release.notes}
                className="text-xs leading-6"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
