import "server-only";

import type { ReactNode } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeReact from "rehype-react";
import type { Root as MdastRoot, Nodes as MdastNodes } from "mdast";

import { docsMdxComponents } from "@/app/docs/_components/markdown-components";
import { createHeadingCollector, type DocHeading } from "@/lib/docs/heading-collector";

export type { DocHeading } from "@/lib/docs/heading-collector";

interface CompileOptions {
  /** Applied to every heading's depth before rendering (floored at h1), so pages whose upstream markdown starts at h2/h3 still get this site's numbered h2 sections. */
  readonly headingShift?: number;
  /** Rewrites relative link/image URLs from the upstream repo into site routes or GitHub blob URLs. */
  readonly resolveLink?: (href: string) => string;
}

export function compileExternalMarkdown(
  markdown: string,
  { headingShift = 0, resolveLink }: CompileOptions = {}
): { readonly content: ReactNode; readonly headings: ReadonlyArray<DocHeading> } {
  const headings: Array<DocHeading> = [];

  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: MdastRoot) => {
      if (headingShift !== 0) {
        shiftHeadings(tree, headingShift);
      }
      if (resolveLink) {
        rewriteLinks(tree, resolveLink);
      }
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(createHeadingCollector(headings))
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(rehypeReact as any, {
      Fragment,
      jsx,
      jsxs,
      components: docsMdxComponents,
    })
    .processSync(markdown);

  return { content: file.result as ReactNode, headings };
}

function shiftHeadings(tree: MdastRoot, shift: number): void {
  walk(tree, (node) => {
    if (node.type === "heading") {
      node.depth = Math.min(6, Math.max(1, node.depth + shift)) as typeof node.depth;
    }
  });
}

function rewriteLinks(tree: MdastRoot, resolveLink: (href: string) => string): void {
  walk(tree, (node) => {
    if (node.type === "link" || node.type === "definition") {
      node.url = resolveLink(node.url);
    }
  });
}

function walk(node: MdastNodes, visit: (node: MdastNodes) => void): void {
  visit(node);
  if ("children" in node) {
    node.children.forEach((child) => walk(child, visit));
  }
}
