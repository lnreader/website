import type { Metadata } from "next";
import type { ReactElement } from "react";

import PageChrome from "@/app/(features)/components/page-chrome";

import BackupUpgraderClient from "./backup-upgrader.client";

export const metadata: Metadata = {
  title: "Backup Upgrader",
  description:
    "Convert 1.x backups to the new 2.x format and identify the plugins you need.",
};

export default function BackupUpgraderPage(): ReactElement {
  return (
    <PageChrome containerClassName="!max-w-[1232px] !px-0 !pt-0 !pb-0">
      <BackupUpgraderClient />
    </PageChrome>
  );
}
