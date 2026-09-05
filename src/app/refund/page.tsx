import type { Metadata } from "next";

import SiteShell from "@/app/(features)/components/site-shell";
import RefundDesk from "./refund-desk";

export const metadata: Metadata = {
  title: "Request a Refund",
  description:
    "Request a complete refund for every dollar ever spent on LNReader.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RefundPage() {
  return (
    <SiteShell
      className="bg-[#edf3f3] font-[family-name:var(--font-display)] text-[#172331] [&_*]:rounded-none"
      mainClassName="overflow-x-clip"
    >
      <RefundDesk />
    </SiteShell>
  );
}
