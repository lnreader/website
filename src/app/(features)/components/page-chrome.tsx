"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState } from "react";

interface PageChromeProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
}

const navigation = [
  { href: "/", label: "Features" },
  { href: "/plugins", label: "Plugins" },
  { href: "/releases", label: "Releases" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/tools/backup-upgrader", label: "Tools" },
  { href: "https://github.com/LNReader/lnreader", label: "GitHub" },
];

const footer = [
  { href: "https://github.com/LNReader/lnreader", label: "Contribute" },
  { href: "https://github.com/LNReader/lnreader/releases", label: "Releases" },
  { href: "https://www.reddit.com/r/LNReader/", label: "Reddit" },
  { href: "https://discord.com/invite/QdcWN4MD63", label: "Discord" },
];

export default function PageChrome({
  children,
  containerClassName,
}: PageChromeProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#edf3f3] text-[var(--color-foreground)]">
      <header className="sticky top-0 z-50 min-h-[76px] border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_95%,transparent)] px-[clamp(20px,3vw,36px)] backdrop-blur-[12px]">
        <div className="mx-auto flex min-h-[76px] w-full max-w-[1232px] items-center justify-between">
          <Link href="/" className="flex items-center gap-[11px] text-inherit no-underline">
            <span className="grid h-[34px] w-[34px] place-items-center bg-[var(--color-accent)] font-mono text-white">読</span>
            <b className="font-[family-name:var(--font-display)] text-[17px] tracking-[-0.02em]">LNReader</b>
          </Link>
          <nav className="hidden items-center gap-[27px] font-[family-name:var(--font-display)] text-sm font-medium tracking-[-0.01em] md:flex">
            {navigation.filter(({ label }) => label !== "GitHub").map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "text-[color-mix(in_srgb,var(--color-foreground)_72%,transparent)] no-underline transition-colors hover:text-[var(--color-foreground)]",
                  (pathname === href ||
                    (href !== "/" && pathname.startsWith(href))) &&
                    "text-[var(--color-foreground)]",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2.5">
            <a
              href="https://github.com/LNReader/lnreader"
              className="hidden min-h-10 items-center border border-[var(--color-border)] bg-[#f7faf9] px-[18px] py-2.5 font-mono text-xs font-medium uppercase text-[var(--color-foreground)] no-underline md:inline-flex"
            >
              GitHub
            </a>
            <a
              href="https://github.com/LNReader/lnreader/releases"
              className="hidden min-h-10 items-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-[18px] py-2.5 font-mono text-xs font-medium uppercase text-white no-underline md:inline-flex"
            >
              Download →
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center border border-[var(--color-border)] bg-[#f7faf9] font-mono text-xl text-[var(--color-foreground)] md:hidden"
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav className="grid grid-cols-2 border-b border-[var(--color-border)] bg-[#f5f8f7] md:hidden">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="border-r border-b border-[var(--color-border)] px-5 py-3.5 font-[family-name:var(--font-display)] text-[13px] font-medium text-[var(--color-foreground)] no-underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      <main className="w-full flex-1">
        <div className={clsx("mx-auto w-full max-w-[1232px] px-5 pt-8 pb-[60px] sm:px-[clamp(24px,3vw,36px)] sm:pt-12 sm:pb-20", containerClassName)}>
          {children}
        </div>
      </main>

      <footer className="flex flex-col items-start gap-6 border-t border-[var(--color-border)] bg-[#f5f8f7] px-5 py-[22px] font-mono text-[11px] font-medium uppercase text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-[clamp(24px,4vw,58px)]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center bg-[var(--color-accent)] text-white">読</span> BUILT BY THE COMMUNITY · {new Date().getFullYear()} ·
          MIT
        </div>
        <nav className="flex flex-wrap gap-5">
          {footer.map(({ href, label }) => (
            <a key={href} href={href} className="text-inherit no-underline hover:text-[var(--color-accent)]">
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
