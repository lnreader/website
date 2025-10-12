import type { ReactElement } from "react";

import { getDocBySlug } from "@/lib/docs/mdx";

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
  const { content } = await getDocBySlug("getting-started");

  return <div className="docs-content">{content}</div>;
}
