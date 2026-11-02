"use client";

import { useClipboardFeedback } from "@/components/use-clipboard-feedback";
import CopyLabel from "@/components/copy-label";
import type { FC } from "react";

interface AddRepositoryActionsProps {
  readonly repositoryUrl: string;
}

const AddRepositoryActions: FC<AddRepositoryActionsProps> = ({
  repositoryUrl,
}) => {
  const { copied, error: copyError, animated, copy } = useClipboardFeedback();

  const deepLink = `lnreader://repo/add?url=${encodeURIComponent(
    repositoryUrl
  )}`;

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <a
          href={deepLink}
          className="inline-flex min-h-12 items-center justify-center bg-white px-5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-accent)] no-underline transition-colors hover:bg-[#eef7f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Add repository &nbsp;→
        </a>
        <button
          type="button"
          onClick={(event) => copy(repositoryUrl, event.detail > 0)}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-white/45 bg-white/5 px-5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CopyLabel copied={copied} animated={animated}>▣ Copy link</CopyLabel>
        </button>
      </div>
      {copyError ? (
        <div
          role="alert"
          className="mt-2 font-mono text-[10px] text-white"
        >
          {copyError}
        </div>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {copied ? "Repository link copied to clipboard." : ""}
      </span>
    </div>
  );
};

export default AddRepositoryActions;
