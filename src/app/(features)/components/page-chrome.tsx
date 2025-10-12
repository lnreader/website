"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import NavigationDrawer from "./navigation-drawer";

interface PageChromeProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
}

const navigationLinks: Array<{
  readonly href: string;
  readonly label: string;
}> = [
  { href: "/", label: "Features" },
  { href: "/releases", label: "Releases" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "https://github.com/LNReader/lnreader", label: "GitHub" },
];

const footerLinks: Array<{ readonly href: string; readonly label: string }> = [
  { href: "https://github.com/LNReader/lnreader", label: "Contribute" },
  { href: "https://github.com/LNReader/lnreader/releases", label: "Releases" },
  { href: "https://discord.gg/u2pTuQ8", label: "Discord" },
];

const stableNavLinks = navigationLinks.filter(({ href }) =>
  href.startsWith("/")
);

const externalNavLinks = navigationLinks.filter(({ href }) =>
  href.startsWith("http")
);

const currentYear = new Date().getFullYear();

export default function PageChrome({
  children,
  containerClassName,
}: PageChromeProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="page-shell pt-9 pb-6 flex items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[var(--color-accent-soft)] text-xl font-semibold text-[var(--color-accent-strong)] transition-colors">
            読
          </span>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              LNReader
            </span>
            <span className="text-xs font-medium text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
              Open source light novel reader for Android
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {stableNavLinks.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "px-3.5 py-2 rounded-md transition-all duration-150",
                  isActive
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                    : "text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-[rgba(16,110,129,0.08)]"
                )}
              >
                {label}
              </Link>
            );
          })}
          {externalNavLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] hover:text-[var(--color-foreground)] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/docs/getting-started"
            className="md:hidden inline-flex items-center justify-center rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_70%,_transparent)] px-4 py-2 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[color-mix(in_srgb,_var(--color-surface)_60%,_transparent)] hover:text-[var(--color-foreground)]"
          >
            Docs
          </Link>

          <Link
            href="https://github.com/LNReader/lnreader/releases"
            className="hidden sm:inline-flex items-center gap-2 rounded-sm bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-[var(--color-accent-strong)] hover:text-white"
          >
            Download
          </Link>

          <NavigationDrawer links={[...stableNavLinks, ...externalNavLinks]} />
        </div>
      </header>

      <main className="flex-1 pb-20">
        <div
          className={clsx(
            "page-shell",
            containerClassName ?? "flex flex-col gap-18 md:gap-20"
          )}
        >
          {children}
        </div>
      </main>

      <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-shell py-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
          <div className="flex flex-col gap-1">
            <span className="text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)]">
              LNReader is built by the community.
            </span>
            <span>{currentYear} · MIT Licensed</span>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="rounded-sm px-1.5 py-0.5 hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent-soft)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
