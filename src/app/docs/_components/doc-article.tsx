import Link from "next/link";
import type { ReactNode } from "react";

import { getAllDocMetadata, type DocHeading, type DocMetadata } from "@/lib/docs/mdx";
import TableOfContents from "./table-of-contents";

interface DocArticleProps {
  readonly content: ReactNode;
  readonly headings: ReadonlyArray<DocHeading>;
  readonly metadata: DocMetadata;
}

const DocArticle = async ({ content, headings, metadata }: DocArticleProps) => {
  const docs = await getAllDocMetadata();
  const currentIndex = docs.findIndex((doc) => doc.slug === metadata.slug);
  const nextDoc = currentIndex >= 0 ? docs[currentIndex + 1] : undefined;
  const sectionNumber = String(metadata.order).padStart(2, "0");

  return (
    <>
      <article className="min-w-0 bg-[#f1f4f4] px-5 py-9 sm:px-9 sm:py-12 lg:px-12 xl:px-11">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="mb-7 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            〉 {metadata.section.slice(0, -1) || metadata.section} · {sectionNumber}
          </div>
          <div className="md">
            {content}
          </div>

          {nextDoc && (
            <Link href={`/docs/${nextDoc.slug}`} className="mt-12 flex min-h-[86px] items-center justify-between border border-[var(--color-border)] bg-white px-5 no-underline transition-colors hover:bg-[#e7eeee] sm:px-6">
              <span>
                <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[#82949e]">Next guide →</span>
                <strong className="mt-1 block font-[family-name:var(--font-display)] text-lg text-[var(--color-foreground)]">{nextDoc.title}</strong>
              </span>
              <span className="font-mono text-lg text-[var(--color-accent)]">→</span>
            </Link>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-[#82949e] sm:flex-row sm:items-center sm:justify-between">
            <span>{metadata.section} · {sectionNumber}</span>
            <a href={`https://github.com/LNReader/lnreader-web/edit/main/src/content/docs/${metadata.slug}.mdx`} className="text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent)]">Edit this page on GitHub ↗</a>
          </div>
        </div>
      </article>
      <TableOfContents headings={headings} />
    </>
  );
};

export default DocArticle;
