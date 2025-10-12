import type { ReactElement } from "react";
import PageChrome from "@/app/(features)/components/page-chrome";

import DocsSidebar from "./_components/sidebar";

const docsNavigation = [
  {
    title: "Guides",
    links: [
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/importing-backups", label: "Importing backups" },
    ],
  },
  {
    title: "FAQ",
    links: [{ href: "/docs/faq", label: "Frequently asked questions" }],
  },
];

export default function DocsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): ReactElement {
  return (
    <PageChrome>
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_18px_40px_var(--shadow-soft)]">
          <DocsSidebar sections={docsNavigation} />
        </aside>

        <article className="rounded-[var(--radius-xxl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-12 shadow-[0_30px_60px_var(--shadow-soft)] docs-content">
          {children}
        </article>
      </div>
    </PageChrome>
  );
}
