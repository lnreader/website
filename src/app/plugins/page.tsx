import type { Metadata } from "next";
import type { FC } from "react";

import PageChrome from "@/app/(features)/components/page-chrome";
import PluginsExplorer from "@/app/plugins/plugins-explorer";
import type { PluginSummary } from "@/app/plugins/types";

const pluginsSourceUrl =
  "https://raw.githubusercontent.com/LNReader/lnreader-plugins/plugins/v3.0.0/.dist/plugins.min.json" as const;

const parsePlugins = (payload: unknown): PluginSummary[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((entry) => {
      if (entry === null || typeof entry !== "object") {
        return undefined;
      }

      const record = entry as Record<string, unknown>;
      const id = typeof record.id === "string" ? record.id.trim() : undefined;
      const name =
        typeof record.name === "string" ? record.name.trim() : undefined;
      const version =
        typeof record.version === "string" ? record.version.trim() : undefined;
      const lang =
        typeof record.lang === "string" ? record.lang.trim() : undefined;
      if (!id || !name || !version || !lang) {
        return undefined;
      }

      return { id, name, version, lang } satisfies PluginSummary;
    })
    .filter((plugin): plugin is PluginSummary => Boolean(plugin))
    .sort((pluginA, pluginB) => pluginA.name.localeCompare(pluginB.name));
};

const fetchPlugins = async (): Promise<PluginSummary[]> => {
  const response = await fetch(pluginsSourceUrl, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch plugins (${response.status})`);
  }

  const payload = (await response.json()) as unknown;
  return parsePlugins(payload);
};

export const metadata: Metadata = {
  title: "Plugins",
  description:
    "Browse the official LNReader plugin repository and review available languages.",
};

export default async function PluginsPage() {
  let plugins: PluginSummary[] = [];
  let errorMessage: string | undefined;

  try {
    plugins = await fetchPlugins();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while loading plugins.";
  }

  return (
    <PageChrome containerClassName="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-20 pb-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-[1.95rem] font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
          Plugins
        </h1>
        <div className="flex flex-col gap-2 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
          <p>
            By default, LNReader comes without any plugins. You can choose to
            read local content or include an external repository.
          </p>
          <p>
            LNReader maintains only one official repository; any other
            repositories are unofficial and have no affiliation with us.
          </p>
        </div>
      </header>

      {errorMessage ? (
        <div className="rounded-md border border-[var(--color-border)] bg-[color-mix(in_srgb,_var(--color-surface)_90%,_transparent)] px-4 py-5 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
          {errorMessage}
        </div>
      ) : (
        <PluginsExplorer repositoryUrl={pluginsSourceUrl} plugins={plugins} />
      )}
    </PageChrome>
  );
}
