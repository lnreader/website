import type { ReactElement } from "react";

import { getPluginDevDocBySlug } from "@/lib/github/plugin-docs";
import DocArticle from "@/app/docs/_components/doc-article";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getPluginDevDocBySlug("plugin-dev/api-reference");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function PluginDevApiReferencePage(): Promise<ReactElement> {
  const { content, headings, metadata } = await getPluginDevDocBySlug("plugin-dev/api-reference");

  return <DocArticle content={content} headings={headings} metadata={metadata} />;
}
