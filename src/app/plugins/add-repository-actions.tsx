"use client";

import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";

interface AddRepositoryActionsProps {
  readonly repositoryUrl: string;
}

const resetDelayMs = 1500;

const AddRepositoryActions: FC<AddRepositoryActionsProps> = ({
  repositoryUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | undefined>();

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, resetDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(repositoryUrl);
      setCopyError(undefined);
      setCopied(true);
    } catch (error) {
      setCopied(false);
      setCopyError(
        error instanceof Error
          ? error.message
          : "Unable to copy the repository link."
      );
    }
  }, [repositoryUrl]);

  const deepLink = `lnreader://repo/add?url=${encodeURIComponent(
    repositoryUrl
  )}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={deepLink}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)] cursor-pointer"
        >
          Add Repository in LNReader
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] px-4 py-2 text-sm font-medium text-[color-mix(in_srgb,_var(--color-foreground)_80%,_transparent)] transition-colors hover:border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] hover:text-[var(--color-foreground)] cursor-pointer"
        >
          {copied ? "Copied" : "Copy Repository Link"}
        </button>
      </div>

      {copyError ? (
        <div className="text-xs text-[color-mix(in_srgb,_var(--color-accent)_80%,_transparent)]">
          {copyError}
        </div>
      ) : null}
    </div>
  );
};

export default AddRepositoryActions;
