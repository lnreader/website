import type { ReactElement } from "react";

const highlights = [
  {
    title: "Transparent roadmap",
    description:
      "Feature requests and bug triage happen in the open on GitHub discussions and issues.",
  },
  {
    title: "Cross-project bridges",
    description:
      "We collaborate with Tachiyomi, Mihon, and other readers to share fixes and ideas.",
  },
  {
    title: "Inclusive moderation",
    description:
      "Community guidelines ensure support spaces stay welcoming for new readers and contributors.",
  },
];

export default function CommunitySection(): ReactElement {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr] items-start">
      <div className="flex flex-col gap-4">
        <span className="badge">Community</span>
        <h2 className="text-[1.85rem] font-semibold tracking-[-0.02em] text-balance">
          Built together with translators, extension authors, and readers
          worldwide
        </h2>
        <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
          LNReader has been open source since day one. Join the Discord, share
          feedback, and ship your own improvements. Our maintainers review
          contributions quickly and help new contributors succeed.
        </p>
        <div className="grid gap-3">
          {highlights.map(({ title, description }) => (
            <div key={title} className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_84%,_transparent)]">
                {title}
              </h3>
              <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_66%,_transparent)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 text-sm text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
            Contributor stats
          </span>
          <ul className="grid gap-1.5">
            <li>33+ contributors merged in the past year</li>
            <li>2.2k GitHub stars · 36 releases</li>
            <li>Active Discord with source authors &amp; maintainers</li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,_var(--color-muted)_68%,_transparent)]">
            How to participate
          </span>
          <ul className="grid gap-1.5">
            <li>Submit PRs and review code in our GitHub repository</li>
            <li>Help localize UI strings through Crowdin</li>
            <li>Share novel recommendations in the Discord community</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
