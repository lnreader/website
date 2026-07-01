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
    <aside className="hidden border-l border-[var(--color-border)] bg-[#f8faf9] xl:block">
      <div className="sticky top-[76px] max-h-[calc(100vh-76px)] overflow-y-auto">
      <div className="flex min-h-12 items-center border-b border-[var(--color-border)] px-6">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#82949e]">On this page</span>
      </div>
      <nav aria-label="On this page" className="py-2">
        {items.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              "flex min-h-11 items-start gap-3 border-l-2 border-transparent px-5 py-3 font-[family-name:var(--font-display)] text-[12px] leading-5 no-underline transition-colors",
              heading.level > 2 && "pl-8",
              activeId === heading.id
                ? "border-[var(--color-accent)] bg-[#e6f0f1] font-semibold text-[var(--color-accent)]"
                : "text-[#60727d] hover:bg-[#edf3f3] hover:text-[var(--color-foreground)]"
            )}
          >
            <span className="font-mono text-[9px] text-[#a1afb6]">
              {String(items.indexOf(heading) + 1).padStart(2, "0")}
            </span>
            <span>{heading.title.replace(/^\d+\.\s*/u, "")}</span>
          </a>
        ))}
      </nav>
      <div className="mx-6 mt-3 border-t border-dotted border-[#b9c6ca] pt-5 pb-6 font-mono text-[10px] leading-8">
        <a href="/releases" className="block text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent)]">Releases ↗</a>
        <a href="/plugins" className="block text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent)]">Plugin registry ↗</a>
        <a href="https://github.com/LNReader/lnreader" className="block text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent)]">Source on GitHub ↗</a>
      </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
