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
    <div className="flex flex-col gap-7">
      {sections.map(({ title, links }) => (
        <div key={title} className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
            {title}
          </span>
          <nav className="flex flex-col gap-1.5 text-sm">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "rounded-[var(--radius-sm)] px-3 py-2 transition-colors",
                    isActive
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] border border-[var(--color-border)]"
                      : "text-[color-mix(in_srgb,_var(--color-foreground)_65%,_transparent)] hover:text-[var(--color-foreground)]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
