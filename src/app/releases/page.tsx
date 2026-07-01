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
    <PageChrome containerClassName="!max-w-[1232px] !px-0 !pt-0 !pb-0">
      <ReleasesList releases={releases} updatedAt={updatedAt} />
    </PageChrome>
  );
}
