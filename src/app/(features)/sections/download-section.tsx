import Link from "next/link";
import type { ReactElement } from "react";

const downloadLinks = [
  {
    label: "Latest release",
    href: "https://github.com/LNReader/lnreader/releases",
    description: "Grab stable APK builds signed by maintainers.",
  },
  {
    label: "Nightly builds",
    href: "https://github.com/LNReader/lnreader/actions",
    description: "Test upcoming features from GitHub Actions artifacts.",
  },
  {
    label: "Source code",
    href: "https://github.com/LNReader/lnreader",
    description: "Clone, audit, and customize the app to your needs.",
  },
];

export default function DownloadSection(): ReactElement {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="badge">Get started</span>
        <h2 className="text-[1.85rem] font-semibold tracking-[-0.02em]">
          Download LNReader
        </h2>
        <p className="text-sm sm:text-base text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] leading-relaxed max-w-2xl">
          Install the latest build and explore the docs to configure plugins,
          automate backups, and join the community.
        </p>
      </div>

      <ul className="grid gap-2 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
        {downloadLinks.map(({ label, description, href }) => (
          <li
            key={label}
            className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2"
          >
            <Link
              href={href}
              className="text-[var(--color-accent-strong)] hover:text-[var(--color-accent)] font-semibold"
            >
              {label}
            </Link>
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
