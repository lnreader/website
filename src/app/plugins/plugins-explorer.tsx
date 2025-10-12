"use client";

import { useMemo, useState } from "react";
import type { FC } from "react";

import AddRepositoryActions from "@/app/plugins/add-repository-actions";
import type { PluginSummary } from "@/app/plugins/types";

interface PluginsExplorerProps {
  readonly repositoryUrl: string;
  readonly plugins: readonly PluginSummary[];
}

const normalize = (value: string) => value.trim().toLowerCase();

const PluginsTable: FC<{ readonly plugins: readonly PluginSummary[] }> = ({
  plugins,
}) => {
  if (plugins.length === 0) {
    return (
      <div className="rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_80%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_92%,_transparent)] px-4 py-5 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
        No plugins match the selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
              Name
            </th>
            <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
              Version
            </th>
            <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
              Language
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_82%,_transparent)]">
          {plugins.map(({ id, name, version, lang }) => (
            <tr key={id}>
              <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 font-medium text-[color-mix(in_srgb,_var(--color-foreground)_92%,_transparent)]">
                {name}
              </td>
              <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 tabular-nums text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)]">
                {version}
              </td>
              <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-5 py-3 text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)]">
                {lang}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PluginsExplorer: FC<PluginsExplorerProps> = ({
  repositoryUrl,
  plugins,
}) => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");

  const availableLanguages = useMemo(() => {
    const unique = new Set<string>();

    for (const plugin of plugins) {
      if (plugin.lang) {
        unique.add(plugin.lang);
      }
    }

    return Array.from(unique).sort((langA, langB) =>
      langA.localeCompare(langB)
    );
  }, [plugins]);

  const filteredPlugins = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedLanguage = normalize(language);

    return plugins.filter((plugin) => {
      const matchesLanguage =
        normalizedLanguage.length === 0
          ? true
          : normalize(plugin.lang) === normalizedLanguage;

      if (!matchesLanguage) {
        return false;
      }

      if (normalizedQuery.length === 0) {
        return true;
      }

      const haystack =
        `${plugin.name} ${plugin.version} ${plugin.lang}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [language, plugins, query]);

  return (
    <div className="flex flex-col gap-6">
      <AddRepositoryActions repositoryUrl={repositoryUrl} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search plugins"
          className="w-full rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[color-mix(in_srgb,_var(--color-accent)_75%,_transparent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,_var(--color-accent)_45%,_transparent)]"
        />

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="w-full appearance-none rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[color-mix(in_srgb,_var(--color-accent)_75%,_transparent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,_var(--color-accent)_45%,_transparent)] lg:w-56"
        >
          <option value="">All languages</option>
          {availableLanguages.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <PluginsTable plugins={filteredPlugins} />
    </div>
  );
};

export default PluginsExplorer;
