import type { FC, ReactNode } from "react";

import type { DocHeading } from "@/lib/docs/mdx";
import TableOfContents from "./table-of-contents";

interface DocArticleProps {
  readonly content: ReactNode;
  readonly headings: ReadonlyArray<DocHeading>;
}

const DocArticle: FC<DocArticleProps> = ({ content, headings }) => {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full max-w-[1340px] gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] xl:gap-20">
        <article className="docs-content max-w-[1040px]">{content}</article>
        <TableOfContents headings={headings} />
      </div>
    </div>
  );
};

export default DocArticle;
