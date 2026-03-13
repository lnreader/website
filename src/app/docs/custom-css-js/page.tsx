import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";
import DocArticle from "../_components/doc-article";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getDocBySlug("custom-css-js");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function CustomCssJsPage(): Promise<ReactElement> {
  const { content, headings } = await getDocBySlug("custom-css-js");

  return <DocArticle content={content} headings={headings} />;
}
