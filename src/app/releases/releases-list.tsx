"use client";

import { Download } from "lucide-react";
import { useState } from "react";

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
  const [selectedId, setSelectedId] = useState(releases[0]?.id);
  const latestRelease = releases[0];
  const selectedRelease =
    releases.find((release) => release.id === selectedId) ?? latestRelease;
  const latestAsset = latestRelease?.assets[0];

  if (!latestRelease || !selectedRelease) {
    return (
      <section className="grid min-h-[60vh] place-items-center border-x border-[var(--color-border)] bg-[#f5f8f7] px-5 text-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Release log unavailable
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-sm text-[var(--color-muted)]">
            GitHub did not return any releases. Please try again shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-x border-[var(--color-border)] bg-[#f5f8f7]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5 sm:px-9">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Release log
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          [ 01 / 02 ]
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        <div
          className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[460px]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="relative flex h-full flex-col">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.19em]">
              ↻ &nbsp; Shipped weekly
            </p>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Releases.
            </h1>
            <p className="mt-5 max-w-[480px] font-[family-name:var(--font-display)] text-base leading-7 text-white/80">
              Keep up with LNReader releases. Every build is signed by
              maintainers and published straight to GitHub.
            </p>
            <div className="mt-9 grid grid-cols-3 border border-dashed border-white/35">
              {[
                [latestRelease.tagName.replace(/^v/u, ""), "Latest"],
                [String(releases.length).padStart(2, "0"), "Releases"],
                ["~7d", "Cadence"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-r border-dashed border-white/30 px-4 py-5 last:border-r-0 sm:px-5"
                >
                  <strong className="block font-mono text-xl font-medium sm:text-2xl">
                    {value}
                  </strong>
                  <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              {latestAsset ? (
                <a
                  href={latestAsset.url}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-white px-5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-accent)] no-underline"
                >
                  <Download size={15} strokeWidth={1.8} /> Latest APK
                </a>
              ) : null}
              <a
                href="https://github.com/LNReader/lnreader/releases"
                className="inline-flex min-h-12 items-center justify-center border border-white/45 bg-white/5 px-6 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white no-underline"
              >
                ↗ All builds
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-[var(--color-border)] px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-foreground)]">
              <span className="mr-3 inline-grid h-7 w-7 place-items-center bg-[var(--color-accent)] text-white">
                ◆
              </span>
              Latest build
            </p>
            <time className="font-mono text-[10px] uppercase text-[#84959f]">
              {latestRelease.publishedAt}
            </time>
          </div>
          <div className="mt-7 flex flex-wrap items-end gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.055em]">
              {latestRelease.tagName}
            </h2>
            <span className="mb-1 border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Stable
            </span>
          </div>
          <p className="mt-4 font-[family-name:var(--font-display)] text-sm leading-6 text-[var(--color-muted)]">
            {latestRelease.name}
          </p>
          {latestRelease.assets.length > 0 ? (
            <div className="relative mt-8 border border-[var(--color-border)] bg-white">
              <span className="absolute -top-1.5 -left-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
              <span className="absolute -right-1.5 -bottom-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
              {latestRelease.assets.map((asset) => (
                <a
                  key={asset.url}
                  href={asset.url}
                  className="flex min-h-14 items-center gap-3 border-b border-[var(--color-border)] px-5 font-mono text-[11px] font-medium text-[var(--color-foreground)] no-underline last:border-b-0"
                >
                  <Download size={16} strokeWidth={1.8} />
                  <span className="truncate">{asset.label}</span>
                </a>
              ))}
            </div>
          ) : null}
          <p className="mt-7 font-mono text-[10px] leading-5 text-[var(--color-muted)]">
            <span className="mr-2 inline-block h-2 w-2 bg-[var(--color-accent)]" />
            Updated {updatedAt ?? latestRelease.publishedAt} · signed by
            maintainers.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-[var(--color-border)] px-5 py-5 sm:px-9">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Changelog
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          [ 02 / 02 ]
        </span>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[280px_1fr]">
        <aside className="min-w-0 overflow-hidden border-b border-[var(--color-border)] bg-white lg:border-r lg:border-b-0">
          <div className="border-b border-[var(--color-border)] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#84959f]">
            Versions · {releases.length}
          </div>
          <nav
            aria-label="Release versions"
            className="flex max-h-56 overflow-x-auto lg:max-h-[680px] lg:flex-col lg:overflow-y-auto"
          >
          {releases.map((release) => (
            <button
              type="button"
              key={release.id}
              onClick={() => setSelectedId(release.id)}
              aria-pressed={selectedRelease.id === release.id}
              className={`flex min-w-36 items-center gap-3 border-r border-b border-[var(--color-border)] px-6 py-4 text-left font-mono text-[11px] font-medium whitespace-nowrap transition-colors last:border-b-0 lg:w-full lg:border-r-0 ${
                selectedRelease.id === release.id
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-white text-[var(--color-foreground)] hover:bg-[var(--color-accent-soft)]"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 ${selectedRelease.id === release.id ? "bg-white" : "bg-[#cfdbdf]"}`}
              />
              <span className="flex-1">{release.tagName}</span>
              <span className="text-[9px] text-[#84959f]">
                {release.publishedAt.replace(/, \d{4}$/u, "")}
              </span>
            </button>
          ))}
          </nav>
          <a
            href="https://github.com/LNReader/lnreader/releases"
            className="hidden px-6 py-5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-foreground)] no-underline lg:block"
          >
            View all on GitHub ↗
          </a>
        </aside>

        <article
          id={selectedRelease.anchor}
          className="min-w-0 px-6 py-9 sm:px-10 sm:py-11"
        >
          <header className="border-b border-[var(--color-border)] pb-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  〉 LNReader · {selectedRelease.tagName}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  {selectedRelease.publishedAt}
                </h2>
                <p className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-base leading-7 text-[var(--color-muted)]">
                  {selectedRelease.name}
                </p>
              </div>
              {selectedRelease.assets[0] ? (
                <a
                  href={selectedRelease.assets[0].url}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-[var(--color-border)] px-4 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)] no-underline"
                >
                  <Download size={14} /> APK
                </a>
              ) : null}
            </div>
          </header>
          <Markdown
            markdown={selectedRelease.notes}
            className="mt-7 font-[family-name:var(--font-display)] text-[15px] leading-7 text-[var(--color-foreground)] [&_a]:font-mono [&_a]:text-[var(--color-accent)] [&_code]:break-all [&_code]:bg-[#e5edef] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h1]:mt-9 [&_h1]:border-b [&_h1]:border-[var(--color-border)] [&_h1]:pb-3 [&_h1]:font-mono [&_h1]:text-[11px] [&_h1]:font-medium [&_h1]:uppercase [&_h1]:tracking-[0.16em] [&_h2]:mt-9 [&_h2]:border-b [&_h2]:border-[var(--color-border)] [&_h2]:pb-3 [&_h2]:font-mono [&_h2]:text-[11px] [&_h2]:font-medium [&_h2]:uppercase [&_h2]:tracking-[0.16em] [&_h3]:mt-7 [&_h3]:font-mono [&_h3]:text-[11px] [&_h3]:uppercase [&_h3]:tracking-[0.14em] [&_h4]:mt-8 [&_h4]:border-b [&_h4]:border-[var(--color-border)] [&_h4]:pb-3 [&_h4]:font-mono [&_h4]:text-[11px] [&_h4]:font-medium [&_h4]:uppercase [&_h4]:tracking-[0.14em] [&_li]:border-b [&_li]:border-dotted [&_li]:border-[var(--color-border)] [&_li]:py-2.5 [&_ol]:!list-none [&_ol]:!pl-0 [&_p]:text-[var(--color-muted)] [&_ul]:!list-none [&_ul]:!pl-0 [&_ul_li]:before:mr-3 [&_ul_li]:before:text-[#bdcdd2] [&_ul_li]:before:content-['▪']"
          />
          <footer className="mt-9 flex flex-col justify-between gap-3 border-t border-[var(--color-border)] pt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#84959f] sm:flex-row">
            <span>{selectedRelease.assets.length} downloadable assets</span>
            <a
              href={`https://github.com/LNReader/lnreader/releases/tag/${encodeURIComponent(selectedRelease.tagName)}`}
              className="text-[var(--color-foreground)] no-underline"
            >
              Full release on GitHub ↗
            </a>
          </footer>
        </article>
      </div>
    </section>
  );
}
