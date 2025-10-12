import type { Metadata } from "next";
import PageChrome from "@/app/(features)/components/page-chrome";
import { fetchReleases } from "@/lib/github/releases";
import ReleasesList from "./releases-list";

export const metadata: Metadata = {
  title: "Releases",
  description: "Keep up with the latest LNReader releases pulled from GitHub.",
};

export default async function ReleasesPage() {
  const { releases, updatedAt } = await fetchReleases();

  return (
    <PageChrome containerClassName="releases-shell w-full px-6 md:px-10 lg:px-16 flex flex-col gap-10 pt-20 pb-16">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-[1.95rem] font-semibold tracking-[-0.02em]">
          Releases
        </h1>
        <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_65%,_transparent)]">
          Keep up with the weekly LNReader releases.
        </p>
      </header>

      <ReleasesList releases={releases} updatedAt={updatedAt} />
    </PageChrome>
  );
}
