import type { ReactElement } from "react";
import {
  CloudDownload,
  Palette,
  Sparkles,
  FolderCog,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface Highlight {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
}

const highlights: Highlight[] = [
  {
    icon: CloudDownload,
    title: "Offline caching",
    description:
      "Preload chapters and sync reading history across sources so you never lose your spot.",
  },
  {
    icon: Palette,
    title: "Personal themes",
    description:
      "Create theme presets with custom fonts, spacing, and immersive reader modes.",
  },
  {
    icon: FolderCog,
    title: "Library rules",
    description:
      "Group light novels by status, tags, or custom filters with automatic updates.",
  },
  {
    icon: Zap,
    title: "Fast updates",
    description:
      "Batch refresh entire libraries and jump straight into newly released chapters.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    description:
      "No analytics, no ads. You control your data—everything runs locally on device.",
  },
  {
    icon: Sparkles,
    title: "Automation hooks",
    description:
      "Backup, restore, or migrate between devices using community-maintained scripts.",
  },
];

export default function FeatureHighlights(): ReactElement {
  return (
    <section className="relative flex flex-col gap-12">
      <div className="absolute right-[-12%] top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(16,110,129,0.18),transparent_70%)] blur-2xl" />
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="badge">Capability</span>
        <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
          Crafting the reader you wished existed
        </h2>
        <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
          LNReader ships with tooling you usually find in modern
          editors—automation, theming, fast search—while staying small and
          purposeful on Android.
        </p>
      </div>

      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article key={title} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] shrink-0">
              <Icon strokeWidth={1.5} className="h-4 w-4" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                {title}
              </h3>
              <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
