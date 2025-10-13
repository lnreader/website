import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";
import DocArticle from "../_components/doc-article";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getDocBySlug("contributing");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function ContributingPage(): Promise<ReactElement> {
  const { content, headings } = await getDocBySlug("contributing");

  return <DocArticle content={content} headings={headings} />;
}
