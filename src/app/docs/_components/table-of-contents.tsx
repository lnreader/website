"use client";

import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

import type { DocHeading } from "@/lib/docs/mdx";

interface TableOfContentsProps {
  readonly headings: ReadonlyArray<DocHeading>;
}

const SCROLL_OFFSET = 80;

const TableOfContents: FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.level > 1),
    [headings]
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) {
    return <div className="hidden xl:block" />;
  }

  return (
    <aside className="sticky top-28 hidden h-fit max-h-[80vh] overflow-y-auto border-l border-[color-mix(in_srgb,_var(--color-border)_60%,_transparent)] pl-6 xl:block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_72%,_transparent)]">
        On this page
      </span>
      <nav className="mt-4 flex flex-col gap-2 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_62%,_transparent)]">
        {items.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              "block border-l border-transparent transition-colors",
              heading.level > 2 ? "ml-3" : "ml-0",
              activeId === heading.id
                ? "border-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-strong)]"
                : "hover:text-[var(--color-foreground)]"
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default TableOfContents;
