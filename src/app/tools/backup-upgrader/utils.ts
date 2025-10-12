import type {
  BackupMigrationResult,
  MigratedNovel,
  OldBackupEntry,
  PluginInfo,
  UnmatchedEntry,
} from "./types";

export const pluginsSourceUrl =
  "https://raw.githubusercontent.com/LNReader/lnreader-plugins/plugins/v3.0.0/.dist/plugins.min.json" as const;

const domainReplacements: ReadonlyArray<[string, string]> = [
  ["https://www.wuxiap.com/", "https://www.wuxiabox.com/"],
  ["https://allnovelfull.com/", "https://allnovelfull.net/"],
];

const specialPathPrefixes: Record<string, string> = {
  boxnovel: "novel/",
  "1stkissnovel": "novel/",
  royalroad: "fiction/",
};

export const fetchPlugins = async (): Promise<ReadonlyArray<PluginInfo>> => {
  const response = await fetch(pluginsSourceUrl, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Unable to load plugins (${response.status})`);
  }

  const payload = (await response.json()) as ReadonlyArray<Partial<PluginInfo>>;

  return payload
    .map((entry) =>
      entry && typeof entry === "object"
        ? {
            id: sanitizeString(entry.id),
            name: sanitizeString(entry.name),
            site: sanitizeString(entry.site),
            iconUrl: sanitizeString(entry.iconUrl),
            lang: sanitizeString(entry.lang) ?? undefined,
          }
        : undefined
    )
    .filter((plugin): plugin is PluginInfo =>
      Boolean(plugin?.id && plugin?.name && plugin?.site && plugin?.iconUrl)
    )
    .filter((plugin) => plugin.id !== "komga");
};

const sanitizeString = (value: unknown): string | undefined =>
  typeof value === "string" ? value.trim() : undefined;

const normalizeUrl = (url: string): string =>
  domainReplacements.reduce(
    (acc, [search, replacement]) => acc.replace(search, replacement),
    url
  );

const removeTrailingSlash = (value: string): string =>
  value.replace(/\/+$/u, "");

export const migrateBackup = (
  oldNovels: ReadonlyArray<OldBackupEntry>,
  plugins: ReadonlyArray<PluginInfo>
): BackupMigrationResult => {
  const migratedNovels: MigratedNovel[] = [];
  const requiredPlugins = new Map<string, PluginInfo>();
  const unmatchedEntries: UnmatchedEntry[] = [];

  for (const entry of oldNovels) {
    const cleaned: OldBackupEntry = {
      ...entry,
      sourceUrl: normalizeUrl(entry.sourceUrl),
      novelUrl: normalizeUrl(entry.novelUrl),
      novelCover: entry.novelCover ? normalizeUrl(entry.novelCover) : undefined,
    };

    const plugin = matchPlugin(cleaned, plugins);

    if (!plugin) {
      unmatchedEntries.push({
        novelName: cleaned.novelName,
        sourceUrl: cleaned.sourceUrl,
        reason: "No matching plugin",
      });
      continue;
    }

    const path = buildNovelPath(cleaned.novelUrl, plugin);

    migratedNovels.push({
      id: cleaned.novelId,
      path,
      pluginId: plugin.id,
      name: cleaned.novelName,
      cover: cleaned.novelCover,
      summary: cleaned.novelSummary,
      author: cleaned.author,
      status: cleaned.status,
      genres: cleaned.genre,
      inLibrary: Boolean(cleaned.followed),
      isLocal: false,
      totalPages: 0,
    });

    requiredPlugins.set(plugin.id, plugin);
  }

  return {
    migratedNovels,
    requiredPlugins: Array.from(requiredPlugins.values()),
    unmatchedEntries,
  };
};

const matchPlugin = (
  novel: OldBackupEntry,
  plugins: ReadonlyArray<PluginInfo>
): PluginInfo | undefined => {
  try {
    const novelDomain = new URL(novel.sourceUrl).hostname.replace(
      /^www\./u,
      ""
    );

    return plugins.find((plugin) => {
      try {
        const pluginDomain = new URL(plugin.site).hostname.replace(
          /^www\./u,
          ""
        );
        return pluginDomain === novelDomain;
      } catch {
        return false;
      }
    });
  } catch {
    return undefined;
  }
};

const buildNovelPath = (novelUrl: string, plugin: PluginInfo): string => {
  let normalized = novelUrl;

  if (isAbsoluteUrl(normalized)) {
    const pluginBase = removeTrailingSlash(plugin.site);
    normalized = normalized.replace(pluginBase, "");
  }

  const prefix = specialPathPrefixes[plugin.id];

  if (prefix && !normalized.startsWith(prefix)) {
    normalized = `${prefix}${normalized}`;
  }

  return normalized.replace(/\/\/+/gu, "/");
};

const isAbsoluteUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

export const serializeMigratedBackup = (
  novels: ReadonlyArray<MigratedNovel>
): string => {
  return JSON.stringify(novels, null, 2);
};

export const createDownloadBlob = (
  content: string
): { readonly url: string; readonly release: () => void } => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  return {
    url,
    release: () => URL.revokeObjectURL(url),
  };
};
