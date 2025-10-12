import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";

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
  const { content } = await getDocBySlug("contributing");

  return <div className="docs-content">{content}</div>;
}
