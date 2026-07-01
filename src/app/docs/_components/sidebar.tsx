"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import type { ReactElement } from "react";

interface DocsSidebarProps {
  readonly sections: ReadonlyArray<{
    readonly title: string;
    readonly links: ReadonlyArray<{
      readonly href: string;
      readonly label: string;
    }>;
  }>;
}

export default function DocsSidebar({
  sections,
}: DocsSidebarProps): ReactElement {
  const pathname = usePathname();

  return (
    <div className="flex w-full min-w-0 overflow-x-auto lg:block">
      {sections.map(({ title, links }) => (
        <div key={title} className="min-w-max border-r border-[var(--color-border)] lg:border-r-0">
          <div className="hidden min-h-12 items-center border-b border-[var(--color-border)] px-6 lg:flex">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#82949e]">
            {title}
          </span>
          </div>
          <nav aria-label={`${title} documentation`} className="flex lg:block">
            {links.map(({ href, label }, index) => {
              const isActive = pathname === href;
              const itemNumber = String(index + 1).padStart(2, "0");

              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex min-h-12 items-center gap-3 border-r border-[var(--color-border)] px-5 font-[family-name:var(--font-display)] text-[13px] font-medium no-underline transition-colors last:border-r-0 lg:min-h-[51px] lg:border-r-0 lg:border-b lg:px-6",
                    isActive
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[#526570] hover:bg-[#e7eeee] hover:text-[var(--color-foreground)]"
                  )}
                >
                  <span className={clsx("font-mono text-[10px]", isActive ? "text-white" : "text-[#a1afb6]")}>
                    {title === "FAQ" ? "?" : itemNumber}
                  </span>
                  <span>{label}</span>
                  {isActive && <span aria-hidden="true" className="ml-auto text-[9px]">◆</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
      <div className="hidden p-5 lg:block">
        <div className="border border-dashed border-[#b9c6ca] p-4">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">Need help?</p>
          <p className="mt-2 text-[12px] leading-5 text-[#60727d]">Ask the community on Discord or open an issue on GitHub.</p>
          <a href="https://discord.com/invite/QdcWN4MD63" className="mt-4 flex min-h-10 items-center justify-center border border-[var(--color-border)] bg-white font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-foreground)] no-underline hover:bg-[#e7eeee]">
            Join Discord ↗
          </a>
        </div>
      </div>
    </div>
  );
}
