import type { Metadata } from "next";

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
    <PageChrome containerClassName="!max-w-[1232px] !px-0 !pt-0 !pb-0">
      {errorMessage ? (
        <section className="grid min-h-[60vh] place-items-center border-x border-[var(--color-border)] bg-[#f5f8f7] px-5 text-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Plugin registry unavailable
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-sm text-[var(--color-muted)]">
              {errorMessage}
            </p>
          </div>
        </section>
      ) : (
        <PluginsExplorer repositoryUrl={pluginsSourceUrl} plugins={plugins} />
      )}
    </PageChrome>
  );
}
