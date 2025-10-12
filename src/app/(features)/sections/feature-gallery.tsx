import type { ReactElement } from "react";

const galleryItems: Array<{
  readonly title: string;
  readonly description: string;
}> = [
  {
    title: "Focused reading surface",
    description:
      "Choose paged or continuous layouts, adjust margins, and enable distraction-free mode.",
  },
  {
    title: "Adaptive color schemes",
    description:
      "Switch between preset themes or build your own palette with per-source overrides.",
  },
  {
    title: "Library organization",
    description:
      "Pin favourites, create smart shelves, and track reading progress in one place.",
  },
];

export default function FeatureGallery(): ReactElement {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 max-w-2xl">
        <span className="badge">Experience</span>
        <h2 className="text-[1.85rem] font-semibold tracking-[-0.02em]">
          Designed like an editor, tuned for long-form reading
        </h2>
        <p className="text-sm sm:text-base text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] leading-relaxed">
          LNReader is a focused light novel reader—quick shortcuts and
          automation stay lightweight on mobile.
        </p>
      </div>

      <ul className="grid gap-3 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
        {galleryItems.map(({ title, description }) => (
          <li key={title} className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
              {title}
            </span>
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
