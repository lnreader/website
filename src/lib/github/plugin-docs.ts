import "server-only";

import path from "node:path";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { compileExternalMarkdown } from "@/lib/docs/external-markdown";
import type { DocHeading } from "@/lib/docs/heading-collector";
import type { DocMetadata } from "@/lib/docs/mdx";

const REPO = "LNReader/lnreader-plugins";
const BRANCH = "master";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`;
const BLOB_BASE = `https://github.com/${REPO}/blob/${BRANCH}/`;
const EDIT_BASE = `https://github.com/${REPO}/edit/${BRANCH}/`;

export const PLUGIN_DEV_SECTION = "Plugin Development";
const PLUGIN_DEV_SECTION_ORDER = 300;
const REVALIDATE_SECONDS = 60 * 60 * 24;

const TEMPLATE_REPO_PATH = "docs/plugin-template.ts";
const TEMPLATE_ANCHOR_HREF = "#plugin-template";

interface PluginDevDocConfig {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly repoPath: string;
  readonly headingShift: number;
}

const PLUGIN_DEV_DOCS: ReadonlyArray<PluginDevDocConfig> = [
  {
    slug: "plugin-dev/quickstart",
    title: "Quick Start",
    description: "Requirements, single-plugin and multi-source guides, and the starter template.",
    order: 1,
    repoPath: "docs/quickstart.md",
    headingShift: -1,
  },
  {
    slug: "plugin-dev/api-reference",
    title: "Plugin API Reference",
    description: "The full Plugin.PluginBase interface, filters, settings, and Cheerio usage.",
    order: 2,
    repoPath: "docs/docs.md",
    headingShift: -1,
  },
  {
    slug: "plugin-dev/testing",
    title: "Testing Your Plugin",
    description: "The npm run check:plugin live check required before opening a PR.",
    order: 3,
    repoPath: "docs/testing.md",
    headingShift: 0,
  },
  {
    slug: "plugin-dev/website-tutorial",
    title: "Testing With the Website",
    description: "Test your plugin interactively with the local web UI.",
    order: 4,
    repoPath: "docs/website-tutorial.md",
    headingShift: 0,
  },
  {
    slug: "plugin-dev/hosting-your-repo",
    title: "Hosting Your Plugin Repo",
    description: "Publish your own plugin repository so the app can install from it.",
    order: 5,
    repoPath: "README.md",
    headingShift: 0,
  },
  {
    slug: "plugin-dev/komga",
    title: "Komga Plugin",
    description: "Connect the Komga plugin to your own self-hosted server.",
    order: 6,
    repoPath: "docs/komga-plugin.md",
    headingShift: 0,
  },
];

const SLUG_BY_REPO_PATH = new Map(
  PLUGIN_DEV_DOCS.filter((doc) => doc.repoPath !== "README.md").map((doc) => [
    doc.repoPath,
    doc.slug,
  ])
);

export function getExternalDocsMetadata(): ReadonlyArray<DocMetadata> {
  return PLUGIN_DEV_DOCS.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    section: PLUGIN_DEV_SECTION,
    order: doc.order,
    sectionOrder: PLUGIN_DEV_SECTION_ORDER,
    editUrl: `${EDIT_BASE}${doc.repoPath}`,
  }));
}

export async function getPluginDevDocBySlug(slug: string): Promise<{
  readonly metadata: DocMetadata;
  readonly content: ReactNode;
  readonly headings: ReadonlyArray<DocHeading>;
}> {
  const config = PLUGIN_DEV_DOCS.find((doc) => doc.slug === slug);

  if (!config) {
    notFound();
  }

  const markdown =
    config.repoPath === "README.md"
      ? await buildHostingRepoDoc()
      : await fetchRaw(config.repoPath);

  const withTemplate =
    config.slug === "plugin-dev/quickstart" ? await appendPluginTemplate(markdown) : markdown;

  const { content, headings } = compileExternalMarkdown(withTemplate, {
    headingShift: config.headingShift,
    resolveLink: (href) => resolveLink(href, config.repoPath),
  });

  const metadata: DocMetadata = {
    slug: config.slug,
    title: config.title,
    description: config.description,
    section: PLUGIN_DEV_SECTION,
    order: config.order,
    sectionOrder: PLUGIN_DEV_SECTION_ORDER,
    editUrl: `${EDIT_BASE}${config.repoPath}`,
  };

  return { metadata, content, headings };
}

async function fetchRaw(repoPath: string): Promise<string> {
  const response = await fetch(`${RAW_BASE}${repoPath}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${repoPath} from ${REPO} (${response.status})`);
  }

  return response.text();
}

async function appendPluginTemplate(markdown: string): Promise<string> {
  const template = await fetchRaw(TEMPLATE_REPO_PATH);

  return `${markdown}\n\n## Plugin template\n\nThe full starter file referenced above, kept here for quick copy-pasting:\n\n\`\`\`ts\n${template}\n\`\`\`\n`;
}

async function buildHostingRepoDoc(): Promise<string> {
  const readme = await fetchRaw("README.md");
  const section = extractMarkdownSection(readme, "Mobile App");

  const intro =
    "Once your plugin passes local testing, publish it as its own repository so the app (and others) can install it.\n\n";

  return `# Hosting Your Plugin Repo\n\n${intro}${section}`;
}

function extractMarkdownSection(markdown: string, headingText: string): string {
  const lines = markdown.split("\n");
  const headingPattern = /^(#{1,6})\s+(.*)$/u;

  let startIndex = -1;
  let level = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(headingPattern);

    if (match && match[2].trim().toLowerCase() === headingText.toLowerCase()) {
      startIndex = i + 1;
      level = match[1].length;
      break;
    }
  }

  if (startIndex === -1) {
    throw new Error(`Section "${headingText}" not found in README.md`);
  }

  let endIndex = lines.length;

  for (let i = startIndex; i < lines.length; i += 1) {
    const match = lines[i].match(headingPattern);

    if (match && match[1].length <= level) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join("\n").trim();
}

function resolveLink(rawHref: string, sourceRepoPath: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//iu.test(rawHref) || rawHref.startsWith("mailto:") || rawHref.startsWith("#")) {
    return rawHref;
  }

  const hashIndex = rawHref.indexOf("#");
  const pathPart = hashIndex === -1 ? rawHref : rawHref.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : rawHref.slice(hashIndex);

  if (!pathPart) {
    return rawHref;
  }

  const resolvedRepoPath = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourceRepoPath), pathPart)
  );

  if (resolvedRepoPath === TEMPLATE_REPO_PATH) {
    return TEMPLATE_ANCHOR_HREF;
  }

  const mappedSlug = SLUG_BY_REPO_PATH.get(resolvedRepoPath);

  if (mappedSlug) {
    return `/docs/${mappedSlug}${hash}`;
  }

  return `${BLOB_BASE}${resolvedRepoPath}${hash}`;
}
