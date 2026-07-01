"use client";

import { ArrowDownToLine, Circle, Copy, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, ReactElement } from "react";

import type { BackupMigrationResult, OldBackupEntry, PluginInfo } from "./types";
import {
  createDownloadBlob,
  fetchPlugins,
  migrateBackup,
  pluginsSourceUrl,
  serializeMigratedBackup,
} from "./utils";

interface UploadState {
  readonly status: "idle" | "loading" | "ready" | "error";
  readonly message?: string;
}

const formatCount = (count: number): string =>
  new Intl.NumberFormat().format(count);

const SectionTitle = ({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) => (
  <header>
    <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
      {children}
    </h2>
    <p className="mt-1 font-[family-name:var(--font-display)] text-sm leading-6 text-[var(--color-muted)]">
      {description}
    </p>
  </header>
);

export default function BackupUpgraderClient(): ReactElement {
  const [plugins, setPlugins] = useState<ReadonlyArray<PluginInfo>>([]);
  const [uploadState, setUploadState] = useState<UploadState>({ status: "idle" });
  const [migrationResult, setMigrationResult] =
    useState<BackupMigrationResult>();
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadPayload = useMemo(() => {
    if (!migrationResult?.migratedNovels.length) return undefined;
    return createDownloadBlob(
      serializeMigratedBackup(migrationResult.migratedNovels),
    );
  }, [migrationResult]);

  useEffect(() => {
    if (!downloadPayload) return undefined;
    return () => downloadPayload.release();
  }, [downloadPayload]);

  useEffect(() => {
    let active = true;
    setUploadState({ status: "loading", message: "Loading plugin catalog…" });
    fetchPlugins()
      .then((catalog) => {
        if (!active) return;
        setPlugins(catalog);
        setUploadState({ status: "idle" });
      })
      .catch((error: unknown) => {
        if (!active) return;
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

  const processFile = useCallback(
    async (file?: File) => {
      if (!file) return;
      if (file.size > 50 * 1024 * 1024) {
        setUploadState({
          status: "error",
          message: "The selected backup is larger than 50 MB.",
        });
        return;
      }
      setUploadState({ status: "loading", message: "Parsing backup…" });
      try {
        const parsed = JSON.parse(await file.text()) as OldBackupEntry[];
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
      }
    },
    [plugins],
  );

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await processFile(event.target.files?.[0]);
      event.target.value = "";
    },
    [processFile],
  );

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      if (uploadState.status !== "loading" && plugins.length) {
        await processFile(event.dataTransfer.files?.[0]);
      }
    },
    [plugins.length, processFile, uploadState.status],
  );

  const copyPlugin = useCallback((plugin: PluginInfo) => {
    navigator.clipboard
      .writeText(plugin.name)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const migratedCount = migrationResult?.migratedNovels.length ?? 0;
  const missingCount = migrationResult?.unmatchedEntries.length ?? 0;
  const uploadDisabled =
    uploadState.status === "loading" || plugins.length === 0;

  return (
    <section className="border-x border-[var(--color-border)] bg-[#f5f8f7]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5 sm:px-9">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Tools · browser utilities
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          [ 01 / 01 ]
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        <div
          className="bg-[var(--color-accent)] px-6 py-10 text-white sm:px-10 sm:py-12"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.16) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.19em]">
            ◉ &nbsp; Utilities & migrations
          </p>
          <h1 className="mt-8 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
            Tools.
          </h1>
          <p className="mt-5 max-w-[470px] font-[family-name:var(--font-display)] text-base leading-7 text-white/80">
            A small set of utilities that run entirely in your browser. Nothing
            is uploaded to a server — your backup never leaves your device.
          </p>
          <p className="mt-4 max-w-[470px] font-[family-name:var(--font-display)] text-sm leading-6 text-white/70">
            There&apos;s just one tool for now: a migrator for legacy 1.x
            backups. If you&apos;re already on 2.x, you don&apos;t need anything
            here.
          </p>
          <div className="mt-8 grid grid-cols-3 border border-dashed border-white/35">
            {[
              ["01", "Tool"],
              ["100%", "Local"],
              ["0", "Uploads"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-r border-dashed border-white/30 px-3 py-5 last:border-r-0 sm:px-5"
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
          <p className="mt-6 font-mono text-[10px] font-medium text-white/80">
            <span className="mr-3 inline-block h-2.5 w-2.5 bg-white" />
            Runs offline once the page has loaded.
          </p>
        </div>

        <div className="flex flex-col justify-center border-t border-[var(--color-border)] px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="mr-3 inline-grid h-7 w-7 place-items-center bg-[var(--color-accent)] text-white">
              ◆
            </span>
            Available tools
          </p>
          <a
            href="#backup-upgrader"
            className="mt-7 block border border-[var(--color-border)] bg-white text-inherit no-underline transition-colors hover:bg-[var(--color-accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            <div className="px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.025em]">
                  Backup Upgrader
                  <span className="ml-3 bg-[#f3e7d3] px-2 py-1 align-middle font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#9a6819]">
                    Legacy
                  </span>
                </h2>
                <span className="font-mono text-[var(--color-accent)]">→</span>
              </div>
              <p className="mt-2 max-w-[430px] font-[family-name:var(--font-display)] text-sm leading-6 text-[var(--color-muted)]">
                Converts a 1.x backup into a 2.x-compatible library and lists
                the plugins you&apos;ll need to reinstall.
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-dotted border-[var(--color-border)]">
              <div className="border-r border-[var(--color-border)] px-5 py-4 sm:px-6">
                <b className="block font-mono text-sm text-[var(--color-accent)]">
                  1.x → 2.x
                </b>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#84959f]">
                  Converts
                </span>
              </div>
              <div className="px-5 py-4 sm:px-6">
                <b className="block font-mono text-sm">JSON</b>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#84959f]">
                  Input format
                </span>
              </div>
            </div>
          </a>
          <div className="mt-6 flex gap-4 border border-dashed border-[#b9c7cc] p-5">
            <span className="h-fit bg-[#a86d13] px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white">
              EOL
            </span>
            <p className="font-[family-name:var(--font-display)] text-sm leading-6 text-[var(--color-muted)]">
              LNReader 1.x reached end of life. This migrator is kept around for
              users still restoring old backups — most people can skip it.
            </p>
          </div>
          <p className="mt-5 font-mono text-[10px] font-medium text-[var(--color-muted)]">
            <span className="mr-3 inline-block h-2.5 w-2.5 bg-[var(--color-accent)]" />
            More tools may land here over time.
          </p>
        </div>
      </div>

      <div
        id="backup-upgrader"
        className="flex items-center justify-between border-y border-[var(--color-border)] px-5 py-5 sm:px-9"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          〉 Backup upgrader
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a9ba5]">
          Workbench / local
        </span>
      </div>

      <div className="grid bg-white sm:grid-cols-3">
        {[
          ["1.x backup.json", "Input"],
          ["2.x library", "Output"],
          ["In-browser", "Processing"],
        ].map(([value, label], index) => (
          <div
            key={label}
            className="border-b border-[var(--color-border)] px-6 py-5 sm:border-r sm:last:border-r-0"
          >
            <b
              className={`block font-mono text-base ${index === 1 ? "text-[var(--color-accent)]" : ""}`}
            >
              {value}
            </b>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#84959f]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="bg-[#f2f6f6] px-5 py-9 sm:px-9 sm:py-10">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#84959f]">
            Step 01 — Upload
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={handleUpload}
            disabled={uploadDisabled}
            aria-label="Choose a 1.x backup JSON file"
          />
          <div className="relative mt-7">
            <span className="absolute -top-1.5 -left-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
            <span className="absolute -right-1.5 -bottom-1.5 h-2.5 w-2.5 bg-[var(--color-accent)]" />
            <div
              onClick={() => !uploadDisabled && fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if (
                  !uploadDisabled &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={uploadDisabled ? -1 : 0}
              aria-disabled={uploadDisabled}
              onDragEnter={(event) => {
                event.preventDefault();
                if (!uploadDisabled) setDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`grid min-h-[205px] place-items-center border border-dashed p-6 text-center transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] sm:min-h-[250px] ${
                dragging
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                  : "border-[#aebdc3] bg-white"
              } ${uploadDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            >
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center border border-[#acd0d9] text-[var(--color-accent)]">
                  <Upload size={18} strokeWidth={2} />
                </span>
                <p className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold">
                  Drop your{" "}
                  <span className="bg-[#e1f1f4] px-2 py-1 font-mono text-sm text-[var(--color-accent)]">
                    backup.json
                  </span>{" "}
                  here
                </p>
                <p className="mt-3 font-mono text-[10px] text-[#84959f]">
                  or click to browse — max 50 MB
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={uploadDisabled}
            onClick={() => fileInputRef.current?.click()}
            className="mt-7 min-h-12 w-full bg-[var(--color-accent)] px-5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--color-accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploadState.status === "loading"
              ? uploadState.message
              : "Upload 1.x backup JSON →"}
          </button>
          {uploadState.status === "error" ? (
            <div
              role="alert"
              className="mt-4 border border-dashed border-[#b9802d] bg-[#fff8ea] px-4 py-3 font-[family-name:var(--font-display)] text-sm text-[#7c571f]"
            >
              {uploadState.message}
            </div>
          ) : null}
          <div className="mt-8">
            <p className="border-b border-dotted border-[var(--color-border)] pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#84959f]">
              How it works
            </p>
            {[
              "Reads your 1.x export and maps old plugin IDs to their 2.x equivalents.",
              "Rebuilds the library file — novels, chapters, categories and progress carry over.",
              "Download the 2.x file and reinstall the listed plugins, then restore in-app.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex gap-4 border-b border-dotted border-[var(--color-border)] py-4"
              >
                <b className="font-mono text-[11px] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </b>
                <p className="font-[family-name:var(--font-display)] text-sm leading-6">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] bg-white px-5 py-9 sm:px-9 sm:py-10 lg:border-t-0 lg:border-l">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#84959f]">
            Step 02 — Result
          </p>
          {copied ? (
            <div
              role="status"
              className="fixed top-24 right-6 z-50 bg-[var(--color-accent)] px-4 py-3 font-mono text-[10px] font-medium uppercase text-white"
            >
              Plugin name copied
            </div>
          ) : null}

          {migrationResult ? (
            <div className="mt-7 flex flex-col gap-8">
              <div className="border border-[var(--color-border)] bg-[#f5f8f7] p-5">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {uploadState.message}
                </p>
                <p className="mt-1 font-mono text-[10px] text-[var(--color-muted)]">
                  {formatCount(migratedCount)} converted ·{" "}
                  {formatCount(missingCount)} unmatched
                </p>
                {downloadPayload && migratedCount > 0 ? (
                  <a
                    href={downloadPayload.url}
                    download="migrated-backup.json"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--color-accent)] px-5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-white no-underline"
                  >
                    <ArrowDownToLine size={15} /> Download 2.x library
                  </a>
                ) : null}
              </div>

              <section>
                <SectionTitle description="Tap a plugin to copy its name, then reinstall it in LNReader.">
                  Required plugins
                </SectionTitle>
                {migrationResult.requiredPlugins.length ? (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {migrationResult.requiredPlugins.map((plugin) => (
                      <li key={plugin.id}>
                        <button
                          type="button"
                          onClick={() => copyPlugin(plugin)}
                          className="flex min-h-14 w-full items-center gap-3 border border-[var(--color-border)] bg-white px-3 py-2 text-left hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                        >
                          <img
                            src={plugin.iconUrl}
                            alt=""
                            width={38}
                            height={38}
                            className="border border-[var(--color-border)] object-cover"
                          />
                          <span className="min-w-0">
                            <b className="block truncate font-[family-name:var(--font-display)] text-sm">
                              {plugin.name}
                            </b>
                            <span className="block truncate font-mono text-[9px] text-[var(--color-muted)]">
                              {plugin.id} · {plugin.lang ?? "Unknown"}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
                    No matching plugins were detected in your backup.
                  </p>
                )}
              </section>

              <section className="space-y-3">
                <SectionTitle description="Add the official plugin repository back into LNReader.">
                  Reinstall the catalog
                </SectionTitle>
                <a
                  href={`lnreader://repo/add?url=${encodeURIComponent(pluginsSourceUrl)}`}
                  className="inline-flex min-h-11 w-full items-center justify-center bg-[var(--color-accent)] px-5 font-mono text-[10px] font-medium uppercase text-white no-underline"
                >
                  Add repository in LNReader
                </a>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(pluginsSourceUrl)}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[var(--color-border)] px-5 font-mono text-[10px] font-medium uppercase hover:border-[var(--color-accent)]"
                >
                  <Copy size={13} /> Copy repository link
                </button>
              </section>

              {missingCount > 0 ? (
                <section>
                  <SectionTitle description="These items did not match the current plugin catalog.">
                    Unmatched entries
                  </SectionTitle>
                  <ul className="mt-4 border border-[var(--color-border)] px-4">
                    {migrationResult.unmatchedEntries.map((entry) => (
                      <li
                        key={`${entry.novelName}-${entry.sourceUrl}`}
                        className="border-b border-dotted border-[var(--color-border)] py-3 last:border-0"
                      >
                        <b className="block font-[family-name:var(--font-display)] text-sm">
                          {entry.novelName}
                        </b>
                        <span className="block break-all font-mono text-[9px] text-[var(--color-muted)]">
                          {entry.sourceUrl}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {migratedCount > 0 ? (
                <section>
                  <SectionTitle description="A quick overview of the first few migrated novels.">
                    Migration preview
                  </SectionTitle>
                  <div className="mt-4 overflow-x-auto border border-[var(--color-border)]">
                    <table className="min-w-full border-separate border-spacing-0 text-left">
                      <thead>
                        <tr>
                          {["Title", "Plugin", "Path"].map((heading) => (
                            <th
                              key={heading}
                              className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-[9px] uppercase text-[var(--color-muted)]"
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {migrationResult.migratedNovels
                          .slice(0, 10)
                          .map((novel) => (
                            <tr key={`${novel.pluginId}-${novel.id}`}>
                              <td className="border-b border-[var(--color-border)] px-4 py-2 font-[family-name:var(--font-display)] text-sm font-medium">
                                {novel.name}
                              </td>
                              <td className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-[9px] text-[var(--color-muted)]">
                                {novel.pluginId}
                              </td>
                              <td className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-[9px] text-[var(--color-muted)]">
                                {novel.path}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}
            </div>
          ) : (
            <div className="grid min-h-[430px] place-items-center py-12 text-center">
              <div className="max-w-[320px]">
                <span className="mx-auto grid h-14 w-14 place-items-center border border-dotted border-[#aebdc3] text-[#aebdc3]">
                  <Circle size={8} />
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-display)] text-base font-semibold text-[#83959f]">
                  No backup processed yet
                </h2>
                <p className="mt-3 font-mono text-[10px] leading-5 text-[#a2b1b8]">
                  Upload a 1.x{" "}
                  <span className="bg-[#eef2f3] px-1.5">backup.json</span> and
                  the converted library plus plugin list will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
