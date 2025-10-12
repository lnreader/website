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
    <div className="flex flex-col gap-4">
      {sections.map(({ title, links }) => (
        <div key={title} className="flex flex-col gap-1.5">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
            {title}
          </span>
          <nav className="flex flex-col gap-1 text-[0.9rem]">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "px-1.5 py-1 transition-colors",
                    isActive
                      ? "font-semibold text-[var(--color-accent-strong)]"
                      : "text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)] hover:text-[var(--color-foreground)]"
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
