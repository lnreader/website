import fs from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const docsDirectory = path.join(process.cwd(), "src/content/docs");

export interface DocFrontmatter {
  readonly title: string;
  readonly description?: string;
  readonly section?: string;
  readonly order?: number;
  readonly sectionOrder?: number;
}

export interface DocMetadata {
  readonly slug: string;
  readonly title: string;
  readonly description?: string;
  readonly section: string;
  readonly order: number;
  readonly sectionOrder: number;
}

export interface DocNavigationSection {
  readonly title: string;
  readonly links: ReadonlyArray<DocNavigationLink>;
}

export interface DocNavigationLink {
  readonly href: string;
  readonly label: string;
}

const DEFAULT_SECTION = "Guides";
const DEFAULT_SECTION_ORDER = 100;
const DEFAULT_DOC_ORDER = 100;

export async function getDocBySlug(slug: string): Promise<{
  readonly metadata: DocMetadata;
  readonly content: ReactNode;
}> {
  const filePath = path.join(docsDirectory, `${slug}.mdx`);
  const source = await readFileOrNotFound(filePath);

  const { content, frontmatter } = await compileMDX<DocFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
    components: mdxComponents,
  });

  const metadata = normalizeFrontmatter(frontmatter, slug);

  return { metadata, content };
}

export async function getDocMetadata(slug: string): Promise<DocMetadata> {
  const filePath = path.join(docsDirectory, `${slug}.mdx`);
  const source = await readFileOrNotFound(filePath);
  const { data } = matter(source) as { data: Partial<DocFrontmatter> };

  return normalizeFrontmatter(data, slug);
}

export async function getAllDocMetadata(): Promise<ReadonlyArray<DocMetadata>> {
  const fileNames = await getDocFileNames();

  const docs = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/u, "");
      return getDocMetadata(slug);
    })
  );

  return docs.sort((a, b) => {
    if (a.sectionOrder !== b.sectionOrder) {
      return a.sectionOrder - b.sectionOrder;
    }

    if (a.section !== b.section) {
      return a.section.localeCompare(b.section);
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });
}

export async function getDocsNavigation(): Promise<
  ReadonlyArray<DocNavigationSection>
> {
  const docs = await getAllDocMetadata();
  const sections = new Map<
    string,
    { order: number; links: Array<DocNavigationLink & { order: number }> }
  >();

  docs.forEach(({ section, sectionOrder, order, title, slug }) => {
    const key = section;
    const existing = sections.get(key);
    const href = `/docs/${slug}`;

    if (!existing) {
      sections.set(key, {
        order: sectionOrder,
        links: [{ href, label: title, order }],
      });
      return;
    }

    existing.links.push({ href, label: title, order });
    existing.order = Math.min(existing.order, sectionOrder);
  });

  const sortedSections = Array.from(sections.entries())
    .map(([title, value]) => ({
      title,
      order: value.order,
      links: value.links
        .sort((a, b) => a.order - b.order)
        .map(({ href, label }) => ({ href, label })),
    }))
    .sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }

      return a.title.localeCompare(b.title);
    });

  return sortedSections;
}

async function getDocFileNames(): Promise<ReadonlyArray<string>> {
  const entries = await fs.readdir(docsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

async function readFileOrNotFound(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      notFound();
    }

    throw error;
  }
}

function normalizeFrontmatter(
  frontmatter: Partial<DocFrontmatter>,
  slug: string
): DocMetadata {
  const title = frontmatter.title;

  if (!title) {
    throw new Error(
      `Missing required frontmatter property "title" in docs/${slug}.mdx`
    );
  }

  const section = frontmatter.section ?? DEFAULT_SECTION;
  const order =
    typeof frontmatter.order === "number"
      ? frontmatter.order
      : DEFAULT_DOC_ORDER;
  const sectionOrder =
    typeof frontmatter.sectionOrder === "number"
      ? frontmatter.sectionOrder
      : typeof frontmatter.order === "number"
      ? frontmatter.order
      : DEFAULT_SECTION_ORDER;

  return {
    slug,
    title,
    description: frontmatter.description,
    section,
    order,
    sectionOrder,
  };
}

const mdxComponents: MDXComponents = {};
