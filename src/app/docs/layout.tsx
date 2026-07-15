import type { ReactElement } from "react";
import PageChrome from "@/app/(features)/components/page-chrome";
import DocsSidebar from "./_components/sidebar";
import { getDocsNavigation } from "@/lib/docs/mdx";

export default async function DocsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): Promise<ReactElement> {
  const docsNavigation = await getDocsNavigation();

  return (
    <PageChrome containerClassName="!max-w-[1440px] !px-0 !pt-0 !pb-0">
      <div className="border-x border-[var(--color-border)] bg-[#f5f8f7] max-sm:border-x-0">
        <div className="flex min-h-12 items-center justify-between border-b border-[var(--color-border)] px-5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#82949e] sm:px-7">
          <span className="text-[var(--color-accent)]">〉 Documentation</span>
          <span className="hidden sm:block">Guides / Reference</span>
        </div>

        <div className="grid min-w-0 overflow-hidden lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_260px]">
          <aside className="min-w-0 border-b border-[var(--color-border)] bg-[#f8faf9] lg:border-r lg:border-b-0">
          <DocsSidebar sections={docsNavigation} />
          </aside>

          {children}
        </div>
      </div>
    </PageChrome>
  );
}
