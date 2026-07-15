import { clsx } from "clsx";
import SiteHeader from "./site-header";

interface SiteShellProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly mainClassName?: string;
}

const footerLinks = [
  { href: "https://github.com/LNReader/lnreader", label: "Contribute" },
  { href: "https://github.com/LNReader/lnreader/releases", label: "Releases" },
  { href: "https://www.reddit.com/r/LNReader/", label: "Reddit" },
  { href: "https://discord.com/invite/QdcWN4MD63", label: "Discord" },
];

export default function SiteShell({
  children,
  className,
  mainClassName,
}: SiteShellProps) {
  return (
    <div
      className={clsx(
        "flex min-h-screen flex-col bg-[#edf3f3] text-[var(--color-foreground)]",
        className,
      )}
    >
      <SiteHeader />

      <main className={clsx("w-full flex-1", mainClassName)}>{children}</main>

      <footer className="flex flex-col items-start gap-6 border-t border-[var(--color-border)] bg-[#f5f8f7] px-5 py-[22px] font-mono text-[11px] font-medium uppercase text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-[clamp(24px,4vw,58px)]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center bg-[var(--color-accent)] text-white">
            読
          </span>
          BUILT BY THE COMMUNITY · {new Date().getFullYear()} · MIT
        </div>
        <nav className="flex flex-wrap gap-5">
          {footerLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-inherit! no-underline! hover:text-[var(--color-accent)]!"
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
