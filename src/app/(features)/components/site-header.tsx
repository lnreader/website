"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Features" },
  { href: "/plugins", label: "Plugins" },
  { href: "/releases", label: "Releases" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/tools/backup-upgrader", label: "Tools" },
];

const githubUrl = "https://github.com/LNReader/lnreader";
const releasesUrl = `${githubUrl}/releases`;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <header className="min-h-[76px] border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_95%,transparent)] px-[clamp(20px,3vw,36px)] backdrop-blur-[12px]">
        <div className="mx-auto flex min-h-[76px] w-full max-w-[1232px] items-center justify-between">
          <Link href="/" className="flex items-center gap-[11px] text-inherit! no-underline!">
            <span className="grid h-[34px] w-[34px] place-items-center bg-[var(--color-accent)] font-mono text-white">読</span>
            <b className="font-[family-name:var(--font-display)] text-[17px] tracking-[-0.02em]">LNReader</b>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-[27px] font-[family-name:var(--font-display)] text-sm font-medium tracking-[-0.01em] md:flex">
            {navigation.map(({ href, label }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "text-[color-mix(in_srgb,var(--color-foreground)_72%,transparent)]! no-underline! transition-colors hover:text-[var(--color-foreground)]!",
                    active && "text-[var(--color-foreground)]!",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex gap-2.5">
            <a
              href={githubUrl}
              className="hidden min-h-10 items-center border border-[var(--color-border)] bg-[#f7faf9] px-[18px] py-2.5 font-mono text-xs font-medium uppercase text-[var(--color-foreground)]! no-underline! transition-colors hover:bg-[#dfeaea] md:inline-flex"
            >
              GitHub
            </a>
            <a
              href={releasesUrl}
              className="hidden min-h-10 items-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-[18px] py-2.5 font-mono text-xs font-medium uppercase text-white! no-underline! transition-colors hover:bg-[#0a6179] md:inline-flex"
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
        <nav aria-label="Mobile navigation" className="grid grid-cols-2 border-b border-[var(--color-border)] bg-[#f5f8f7] md:hidden">
          {[...navigation, { href: githubUrl, label: "GitHub" }].map(
            ({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-r border-b border-[var(--color-border)] px-5 py-3.5 font-[family-name:var(--font-display)] text-[13px] font-medium text-[var(--color-foreground)]! no-underline!"
              >
                {label}
              </Link>
            ),
          )}
        </nav>
      )}
    </div>
  );
}
