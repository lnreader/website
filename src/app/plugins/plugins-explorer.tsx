"use client";

import { ChevronDown, Copy, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FC } from "react";

import AddRepositoryActions from "@/app/plugins/add-repository-actions";
import type { PluginSummary } from "@/app/plugins/types";

interface PluginsExplorerProps {
  readonly repositoryUrl: string;
  readonly plugins: readonly PluginSummary[];
}

const pageSize = 14;
const normalize = (value: string) => value.trim().toLowerCase();

const PluginsExplorer: FC<PluginsExplorerProps> = ({
  repositoryUrl,
  plugins,
}) => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const plugin of plugins) {
      counts.set(plugin.lang, (counts.get(plugin.lang) ?? 0) + 1);
    }
    return Array.from(counts, ([code, count]) => ({ code, count })).sort(
      (a, b) => b.count - a.count || a.code.localeCompare(b.code),
    );
  }, [plugins]);

  const filteredPlugins = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedLanguage = normalize(language);

    return plugins.filter((plugin) => {
      if (
        normalizedLanguage &&
        normalize(plugin.lang) !== normalizedLanguage
      ) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return normalize(
        `${plugin.name} ${plugin.version} ${plugin.lang}`,
      ).includes(normalizedQuery);
    });
  }, [language, plugins, query]);

  const visiblePlugins = filteredPlugins.slice(0, visibleCount);
  const resetVisibleCount = () => setVisibleCount(pageSize);

  return (
    <section className="overflow-hidden border-x border-[var(--color-border)] bg-[#f5f8f7]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5 sm:px-9">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Plugin registry
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          [ 01 / 02 ]
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        <div
          className="min-w-0 bg-[var(--color-accent)] px-6 py-10 text-white sm:px-10 sm:py-12"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.19em]">
            {"{}"} &nbsp; Sources & repositories
          </p>
          <h1 className="mt-8 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
            Plugins.
          </h1>
          <div className="mt-5 max-w-[500px] space-y-3 font-[family-name:var(--font-display)] text-base leading-7 text-white/80">
            <p>
              By default, LNReader comes without any plugins. You can choose to
              read local content or include an external repository.
            </p>
            <p>
              LNReader maintains only one official repository; any other
              repositories are unofficial and have no affiliation with us.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-3 border border-dashed border-white/35">
            {[
              [String(plugins.length), "Plugins"],
              [String(languages.length), "Languages"],
              ["01", "Official repo"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-r border-dashed border-white/30 px-3 py-5 last:border-r-0 sm:px-5"
              >
                <strong className="block font-mono text-xl font-medium sm:text-2xl">
                  {value}
                </strong>
                <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-white/65 sm:text-[9px] sm:tracking-[0.18em]">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <AddRepositoryActions repositoryUrl={repositoryUrl} />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center border-t border-[var(--color-border)] px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="mr-3 inline-grid h-7 w-7 place-items-center bg-[var(--color-accent)] text-white">
              ◆
            </span>
            Official manifest
          </p>
          <div className="relative mt-7 flex min-w-0 items-center gap-3 border border-[var(--color-border)] bg-white px-5 py-4 font-mono text-[11px] text-[var(--color-muted)] sm:text-xs">
            <span className="text-[var(--color-accent)]">$</span>
            <span className="min-w-0 flex-1 truncate">{repositoryUrl}</span>
            <Copy size={14} className="shrink-0 text-[#8a9ba5]" aria-hidden />
            <span className="absolute -top-1.5 -left-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
            <span className="absolute -right-1.5 -bottom-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
          </div>
          <p className="mt-9 border-b border-dotted border-[var(--color-border)] pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#84959f]">
            How to add a repository
          </p>
          <ol className="font-[family-name:var(--font-display)] text-sm font-medium">
            {[
              "Copy the repository link",
              "Open LNReader → Settings → Repos",
              "Paste the URL & refresh sources",
              "Browse & install per source",
            ].map((step, index) => (
              <li
                key={step}
                className="flex min-h-12 items-center gap-4 border-b border-dotted border-[var(--color-border)]"
              >
                <span className="font-mono text-[10px] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-7 font-mono text-[10px] leading-5 text-[var(--color-muted)]">
            <span className="mr-2 inline-block h-2 w-2 bg-[var(--color-accent)]" />
            Plugins update independently — refresh anytime.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-[var(--color-border)] px-5 py-5 sm:px-9">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Browse sources
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          [ 02 / 02 ]
        </span>
      </div>

      <div className="grid border-b border-[var(--color-border)] bg-white md:grid-cols-[1fr_220px]">
        <label className="flex min-h-16 items-center gap-4 px-5 sm:px-9">
          <Search size={14} className="text-[var(--color-accent)]" aria-hidden />
          <span className="sr-only">Search plugins</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetVisibleCount();
            }}
            placeholder="Search plugins"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[var(--color-foreground)] outline-none placeholder:text-[#91a2ab] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          />
        </label>
        <label className="relative flex min-h-14 items-center border-t border-[var(--color-border)] px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#84959f] md:min-h-16 md:border-t-0 md:border-l">
          <span className="mr-3">Lang</span>
          <span className="sr-only">Filter by language</span>
          <select
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
              resetVisibleCount();
            }}
            className="min-h-11 flex-1 appearance-none bg-transparent font-mono text-[11px] font-medium uppercase text-[var(--color-foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <option value="">All</option>
            {languages.map(({ code }) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none" aria-hidden />
        </label>
      </div>

      <div
        className="flex gap-2 overflow-x-auto border-b border-[var(--color-border)] bg-[#eaf0f0] px-5 py-4 sm:px-7"
        aria-label="Popular language filters"
      >
        <button
          type="button"
          onClick={() => {
            setLanguage("");
            resetVisibleCount();
          }}
          aria-pressed={!language}
          className={`min-h-9 shrink-0 px-4 font-mono text-[10px] font-medium uppercase tracking-[0.1em] ${
            !language
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-muted)]"
          }`}
        >
          All · {plugins.length}
        </button>
        {languages.slice(0, 8).map(({ code, count }) => (
          <button
            type="button"
            key={code}
            onClick={() => {
              setLanguage(code);
              resetVisibleCount();
            }}
            aria-pressed={language === code}
            className={`min-h-9 shrink-0 px-4 font-mono text-[10px] font-medium uppercase tracking-[0.1em] ${
              language === code
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-muted)]"
            }`}
          >
            {code} · {count}
          </button>
        ))}
        {languages.length > 8 ? (
          <span className="flex shrink-0 items-center px-4 font-mono text-[10px] uppercase text-[#84959f]">
            + {languages.length - 8} more
          </span>
        ) : null}
      </div>

      {visiblePlugins.length === 0 ? (
        <div className="grid min-h-40 place-items-center px-5 text-center font-mono text-xs text-[var(--color-muted)]">
          No plugins match the selected filters.
        </div>
      ) : (
        <>
          <div className="hidden grid-cols-[100px_1fr_180px_260px] border-b border-[var(--color-border)] bg-white px-7 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#84959f] md:grid">
            <span>Index</span>
            <span>Name</span>
            <span>Version</span>
            <span>Language</span>
          </div>
          <ol>
            {visiblePlugins.map(({ id, name, version, lang }, index) => (
              <li
                key={id}
                className="grid min-h-[76px] grid-cols-[56px_1fr] items-center gap-x-3 border-b border-[var(--color-border)] px-5 py-4 sm:px-7 md:grid-cols-[100px_1fr_180px_260px]"
              >
                <span className="font-mono text-[10px] text-[#a6b7bf]">
                  [{String(index + 1).padStart(3, "0")}]
                </span>
                <strong className="min-w-0 font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-[-0.02em]">
                  {name}
                </strong>
                <span className="col-start-2 mt-1 font-mono text-[10px] text-[var(--color-muted)] md:col-start-auto md:mt-0 md:text-xs">
                  v{version.replace(/^v/u, "")}
                </span>
                <span className="col-start-2 mt-1 font-mono text-[10px] text-[var(--color-muted)] md:col-start-auto md:mt-0 md:text-xs">
                  {lang}
                </span>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-start justify-between gap-4 bg-white px-5 py-6 sm:flex-row sm:items-center sm:px-9">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#84959f]">
              Showing 001–{String(visiblePlugins.length).padStart(3, "0")} of{" "}
              {filteredPlugins.length}
            </span>
            {visiblePlugins.length < filteredPlugins.length ? (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + pageSize)}
                className="inline-flex min-h-11 items-center gap-3 border border-[var(--color-border)] px-5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Load more <ChevronDown size={14} aria-hidden />
              </button>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
};

export default PluginsExplorer;
