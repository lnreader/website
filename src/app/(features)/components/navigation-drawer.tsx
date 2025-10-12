"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { clsx } from "clsx";

interface NavigationDrawerProps {
  readonly links: Array<{ readonly href: string; readonly label: string }>;
}

export default function NavigationDrawer({
  links,
}: NavigationDrawerProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_70%,_transparent)] text-[var(--color-foreground)]"
      >
        <Menu size={20} />
      </button>
      <div
        className={clsx(
          "absolute right-0 top-12 z-50 w-52 rounded-[var(--radius-md)] border border-[color-mix(in_srgb,_var(--color-border)_75%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_86%,_transparent)]/90 backdrop-blur-xl shadow-[0_24px_40px_rgba(6,10,20,0.55)] transition-all",
          open
            ? "opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        )}
      >
        <ul className="flex flex-col">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_78%,_transparent)] hover:text-[var(--color-foreground)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
