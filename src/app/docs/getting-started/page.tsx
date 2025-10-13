import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";
import DocArticle from "../_components/doc-article";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getDocBySlug("getting-started");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function GettingStartedPage(): Promise<ReactElement> {
  const { content, headings } = await getDocBySlug("getting-started");

  return <DocArticle content={content} headings={headings} />;
}
