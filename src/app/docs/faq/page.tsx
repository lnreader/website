import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";

export async function generateMetadata(): Promise<{
  readonly title: string;
  readonly description?: string;
}> {
  const { metadata } = await getDocBySlug("faq");

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function FaqPage(): Promise<ReactElement> {
  const { content } = await getDocBySlug("faq");

  return <div className="docs-content">{content}</div>;
}
