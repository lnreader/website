"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, ReactElement } from "react";

import {
  createDownloadBlob,
  fetchPlugins,
  migrateBackup,
  pluginsSourceUrl,
  serializeMigratedBackup,
} from "./utils";
import type {
  BackupMigrationResult,
  MigratedNovel,
  OldBackupEntry,
  PluginInfo,
} from "./types";

interface UploadState {
  readonly status: "idle" | "loading" | "ready" | "error";
  readonly message?: string;
}

const resetDelayMs = 2000;

const formatCount = (count: number): string =>
  new Intl.NumberFormat().format(count);

export default function BackupUpgraderClient(): ReactElement {
  const [plugins, setPlugins] = useState<ReadonlyArray<PluginInfo>>([]);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
  });
  const [migrationResult, setMigrationResult] =
    useState<BackupMigrationResult>();
  const [copied, setCopied] = useState(false);

  const downloadPayload = useMemo(() => {
    if (!migrationResult || migrationResult.migratedNovels.length === 0) {
      return undefined;
    }

    const content = serializeMigratedBackup(migrationResult.migratedNovels);
    return createDownloadBlob(content);
  }, [migrationResult]);

  useEffect(() => {
    if (!downloadPayload) {
      return undefined;
    }

    return () => {
      downloadPayload.release();
    };
  }, [downloadPayload]);

  useEffect(() => {
    let active = true;
    setUploadState({ status: "loading", message: "Loading plugin catalog…" });

    fetchPlugins()
      .then((catalog) => {
        if (!active) {
          return;
        }
        setPlugins(catalog);
        setUploadState({ status: "idle" });
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }
        setUploadState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to load plugins. Try reloading the page.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      setUploadState({ status: "loading", message: "Parsing backup…" });

      try {
        const payload = await file.text();
        const parsed = JSON.parse(payload) as OldBackupEntry[];
        const result = migrateBackup(parsed, plugins);
        setMigrationResult(result);
        setUploadState({
          status: "ready",
          message: result.migratedNovels.length
            ? `${formatCount(result.migratedNovels.length)} novels migrated`
            : "No matching novels found",
        });
      } catch (error) {
        setMigrationResult(undefined);
        setUploadState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to parse the provided backup.",
        });
      } finally {
        event.target.value = "";
      }
    },
    [plugins]
  );

  const handleCopyPlugin = useCallback((plugin: PluginInfo) => {
    navigator.clipboard
      .writeText(plugin.name)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }, []);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), resetDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const migratedCount = migrationResult?.migratedNovels.length ?? 0;
  const missingCount = migrationResult?.unmatchedEntries.length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-[1.95rem] font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
          Upgrade 1.x Backups
        </h1>
        <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
          Upload your 1.x backup JSON file and we will generate a 2.x compatible
          library along with the plugins you need to reinstall.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-md bg-[var(--color-background-soft)] px-5 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="inline-flex items-center gap-3 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)] cursor-pointer">
            Upload 1.x backup JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleUpload}
              disabled={
                uploadState.status === "loading" || plugins.length === 0
              }
            />
          </label>

          {downloadPayload && migratedCount > 0 ? (
            <a
              href={downloadPayload.url}
              download="migrated-backup.json"
              className="inline-flex items-center gap-3 rounded-md bg-[color-mix(in_srgb,_var(--color-accent)_86%,_transparent)] px-4 py-2 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              Download ({formatCount(migratedCount)} novels)
            </a>
          ) : (
            <div className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
              {uploadState.message ?? "No backup processed yet."}
            </div>
          )}
        </div>

        {uploadState.status === "error" ? (
          <div className="rounded-md border border-[color-mix(in_srgb,_var(--color-accent)_30%,_transparent)] bg-[color-mix(in_srgb,_var(--color-accent)_12%,_transparent)] px-4 py-3 text-sm text-[color-mix(in_srgb,_var(--color-accent)_75%,_transparent)]">
            {uploadState.message}
          </div>
        ) : null}
      </section>

      {copied ? (
        <div className="fixed right-6 top-20 z-50 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Plugin name copied
        </div>
      ) : null}

      {migrationResult ? (
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <header className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                Required plugins
              </h2>
              <p className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                Tap a plugin to copy its name. Use the repository link below to
                reinstall them in LNReader.
              </p>
            </header>

            {migrationResult.requiredPlugins.length === 0 ? (
              <div className="rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] px-4 py-3 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
                No matching plugins were detected in your backup.
              </div>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {migrationResult.requiredPlugins.map((plugin) => (
                  <li key={plugin.id}>
                    <button
                      type="button"
                      onClick={() => handleCopyPlugin(plugin)}
                      className="group flex w-full items-center gap-3 rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_92%,_transparent)] px-4 py-3 text-left transition-colors hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,_var(--color-accent)_12%,_transparent)]"
                    >
                      <img
                        src={plugin.iconUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">
                          {plugin.name}
                        </span>
                        <span className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                          {plugin.id}
                        </span>
                      </div>
                      <div className="ml-auto text-xs text-[color-mix(in_srgb,_var(--color-foreground)_55%,_transparent)]">
                        {plugin.lang ?? "Unknown language"}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="flex flex-col gap-3">
            <header className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                Reinstall the catalog
              </h2>
              <p className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                Add the official plugin repository back into LNReader.
              </p>
            </header>

            <a
              href={`lnreader://repo/add?url=${encodeURIComponent(
                pluginsSourceUrl
              )}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)] md:w-auto"
            >
              Add repository in LNReader
            </a>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(pluginsSourceUrl)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] px-5 py-3 text-sm font-medium text-[color-mix(in_srgb,_var(--color-foreground)_80%,_transparent)] transition-colors hover:border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] hover:text-[var(--color-foreground)] md:w-auto"
            >
              Copy repository link
            </button>
          </section>

          {missingCount > 0 ? (
            <section className="flex flex-col gap-3">
              <header className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Unmatched entries
                </h2>
                <p className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                  These items did not match any plugin in the current catalog.
                  You may need to reinstall them manually.
                </p>
              </header>

              <ul className="flex flex-col gap-2 rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] px-4 py-3">
                {migrationResult.unmatchedEntries.map((entry) => (
                  <li key={`${entry.novelName}-${entry.sourceUrl}`}>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[var(--color-foreground)]">
                        {entry.novelName}
                      </span>
                      <span className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                        {entry.sourceUrl}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {migrationResult.migratedNovels.length > 0 ? (
            <section className="flex flex-col gap-3">
              <header className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Migration preview
                </h2>
                <p className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                  A quick overview of the first few migrated novels.
                </p>
              </header>

              <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)]">
                <thead>
                  <tr>
                    <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] px-4 py-2 text-left text-xs uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                      Title
                    </th>
                    <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] px-4 py-2 text-left text-xs uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                      Plugin
                    </th>
                    <th className="border-b border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] px-4 py-2 text-left text-xs uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                      Path
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_82%,_transparent)]">
                  {migrationResult.migratedNovels
                    .slice(0, 10)
                    .map((novel: MigratedNovel) => (
                      <tr key={`${novel.pluginId}-${novel.id}`}>
                        <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-4 py-2 font-medium">
                          {novel.name}
                        </td>
                        <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-4 py-2 text-xs uppercase tracking-wide text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)]">
                          {novel.pluginId}
                        </td>
                        <td className="border-b border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] px-4 py-2 text-xs font-mono text-[color-mix(in_srgb,_var(--color-foreground)_65%,_transparent)]">
                          {novel.path}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
