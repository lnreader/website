"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

import NavigationDrawer from "./navigation-drawer";

interface PageChromeProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
}

interface NavigationLink {
  readonly label: string;
  readonly href?: string;
  readonly children?: ReadonlyArray<{
    readonly href: string;
    readonly label: string;
  }>;
}

const navigationLinks: ReadonlyArray<NavigationLink> = [
  { href: "/", label: "Features" },
  { href: "/plugins", label: "Plugins" },
  { href: "/releases", label: "Releases" },
  { href: "/docs/getting-started", label: "Docs" },
  {
    label: "Tools",
    children: [{ href: "/tools/backup-upgrader", label: "Backup Upgrader" }],
  },
  { href: "https://github.com/LNReader/lnreader", label: "GitHub" },
];

const footerLinks: Array<{ readonly href: string; readonly label: string }> = [
  { href: "https://github.com/LNReader/lnreader", label: "Contribute" },
  { href: "https://github.com/LNReader/lnreader/releases", label: "Releases" },
  { href: "https://www.reddit.com/r/LNReader/", label: "Reddit" },
  { href: "https://discord.gg/u2pTuQ8", label: "Discord" },
];

const stableNavLinks = navigationLinks.filter(
  (link): link is NavigationLink & { readonly href: string } =>
    typeof link.href === "string" && link.href.startsWith("/")
);

const toolsNavLink = navigationLinks.find(
  (
    link
  ): link is NavigationLink & {
    readonly children: NavigationLink["children"];
  } => Array.isArray(link.children) && link.children.length > 0
);

const externalNavLinks = navigationLinks.filter(
  (link): link is NavigationLink & { readonly href: string } =>
    typeof link.href === "string" && link.href.startsWith("http")
);

const currentYear = new Date().getFullYear();

export default function PageChrome({
  children,
  containerClassName,
}: PageChromeProps) {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleToolsBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(nextFocus)) {
      setToolsOpen(false);
    }
  };

  const handleToolsMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(nextTarget)) {
      setToolsOpen(false);
    }
  };

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
          {toolsNavLink ? (
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={handleToolsMouseLeave}
              onBlur={handleToolsBlur}
            >
              <button
                type="button"
                onClick={() => setToolsOpen((current) => !current)}
                className={clsx(
                  "flex items-center gap-1 px-3.5 py-2 rounded-md transition-all duration-150 text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-[rgba(16,110,129,0.08)]",
                  toolsNavLink.children?.some(({ href }) =>
                    pathname.startsWith(`${href}`)
                  ) &&
                    "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                )}
                aria-haspopup="menu"
                aria-expanded={toolsOpen}
              >
                {toolsNavLink.label}
                <ChevronDown
                  size={16}
                  className={clsx(
                    "transition-transform",
                    toolsOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              <div
                className="absolute left-0 right-0 top-full h-3"
                aria-hidden="true"
                onMouseEnter={() => setToolsOpen(true)}
              />
              <div
                className={clsx(
                  "absolute right-0 top-[calc(100%+0.375rem)] z-50 w-56 rounded-md border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] shadow-lg transition-all",
                  toolsOpen
                    ? "opacity-100 visible"
                    : "pointer-events-none opacity-0 invisible"
                )}
                role="menu"
                aria-label="Tools"
              >
                <ul className="flex flex-col py-2">
                  {toolsNavLink.children?.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setToolsOpen(false)}
                        className="block px-4 py-2 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_78%,_transparent)] hover:text-[var(--color-foreground)]"
                        role="menuitem"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
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

          <NavigationDrawer
            links={[
              ...stableNavLinks,
              ...(toolsNavLink?.children ?? []),
              ...externalNavLinks,
            ]
              .filter(
                (
                  link
                ): link is { readonly href: string; readonly label: string } =>
                  typeof link.href === "string"
              )
              .map(({ href, label }) => ({ href, label }))}
          />
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
