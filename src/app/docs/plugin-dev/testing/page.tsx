import type { ReactElement } from "react";

import { getPluginDevDocBySlug } from "@/lib/github/plugin-docs";
import DocArticle from "@/app/docs/_components/doc-article";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getPluginDevDocBySlug("plugin-dev/testing");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function PluginDevTestingPage(): Promise<ReactElement> {
  const { content, headings, metadata } = await getPluginDevDocBySlug("plugin-dev/testing");

  return <DocArticle content={content} headings={headings} metadata={metadata} />;
}
