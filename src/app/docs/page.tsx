import { redirect } from "next/navigation";

import { getAllDocMetadata } from "@/lib/docs/mdx";

export default async function DocsIndex(): Promise<never> {
  const docs = await getAllDocMetadata();
  const firstDoc = docs[0];

  if (!firstDoc) {
    redirect("/");
  }

  redirect(`/docs/${firstDoc.slug}`);
}
