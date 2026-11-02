import type { ReactNode } from "react";

export default function CopyLabel({ copied, animated, children }: {
  copied: boolean;
  animated: boolean;
  children: ReactNode;
}) {
  return (
    <span className="copy-label" data-copied={copied} data-animated={animated}>
      <span aria-hidden={copied}>{children}</span>
      <span aria-hidden={!copied}>✓ Copied</span>
    </span>
  );
}
