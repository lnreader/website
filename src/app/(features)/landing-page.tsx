"use client";

import Link from "next/link";
import { useState } from "react";
import { Braces, FolderGit2 } from "lucide-react";


const links = {
  app: "https://github.com/LNReader/lnreader",
  releases: "https://github.com/LNReader/lnreader/releases",
  nightly: "https://github.com/LNReader/lnreader/actions",
  sources: "https://github.com/LNReader/lnreader-sources",
};

const capabilities = [
  "Offline downloads & progress sync",
  "Personal themes & immersive mode",
  "Custom categories & flexible sorting",
  "Privacy first — no analytics, no ads",
  "Batch updates across your library",
  "Backup, restore & migration tools",
];

function Band({ label, index }: { label: string; index: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(20,40,55,.14)] px-9 py-4 font-mono text-[10px] font-semibold tracking-[.16em] text-[#8a9aa3] max-[680px]:px-5 max-[680px]:py-[13px] max-[680px]:text-[9px] [&>span:first-child]:text-[#0e7490]">
      <span>⟩ {label}</span>
      <span>[ {index} / 06 ]</span>
    </div>
  );
}

function CopyControl({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button type="button" className={className} onClick={copy}>
      {copied ? "Copied ✓" : children}
    </button>
  );
}

function CropMarks() {
  return (
    <>
      <i className="absolute -top-1 -left-1 h-2 w-2 bg-current" />
      <i className="absolute -top-1 -right-1 h-2 w-2 bg-current" />
      <i className="absolute -bottom-1 -left-1 h-2 w-2 bg-current" />
      <i className="absolute -right-1 -bottom-1 h-2 w-2 bg-current" />
    </>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e8efef] font-[family-name:var(--font-display)] text-[#16242e] [&_*]:rounded-none [&_a]:text-inherit [&_a]:no-underline">
      <div className="min-h-screen w-full overflow-x-clip bg-[#eff4f4]">
        <header className="sticky top-0 z-50 min-h-[76px] border-b border-[rgba(20,40,55,.14)] bg-[color-mix(in_srgb,#edf3f3_95%,transparent)] px-[clamp(20px,3vw,36px)] backdrop-blur-[12px]">
          <div className="mx-auto flex min-h-[76px] w-full max-w-[1232px] items-center justify-between max-[680px]:min-h-[68px]">
            <Link href="/" className="flex items-center gap-[11px] text-[17px] font-bold tracking-[-.02em]">
              <span className="grid h-[34px] w-[34px] place-items-center bg-[#0e7490] font-mono text-white">読</span>
              <span>LNReader</span>
            </Link>
            <nav className="hidden items-center gap-[27px] font-[family-name:var(--font-display)] text-sm font-medium tracking-[-.01em] text-[#41545f] min-[981px]:flex [&_a:hover]:text-[#16242e]" aria-label="Primary navigation">
              <Link className="text-[#16242e]" href="/">
                Features
              </Link>
              <Link href="/plugins">Plugins</Link>
              <Link href="/releases">Releases</Link>
              <Link href="/docs/getting-started">Docs</Link>
              <Link href="/tools/backup-upgrader">Tools</Link>
            </nav>
            <div className="flex items-center gap-2.5 [&>a]:hidden min-[981px]:[&>a]:inline-flex">
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors bg-[#f7faf9] hover:bg-[#dfeaea]" href={links.app}>
                GitHub
              </a>
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors border-[#0e7490] bg-[#0e7490] text-white! hover:bg-[#0a6179]" href={links.releases}>
                Download <span>→</span>
              </a>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center border border-[rgba(20,40,55,.14)] bg-[#f7faf9] font-mono text-[21px] font-bold min-[981px]:hidden"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? "×" : "≡"}
              </button>
            </div>
          </div>
        </header>
        {menuOpen && (
          <nav className="grid grid-cols-3 border-b border-[rgba(20,40,55,.14)] bg-[#f5f8f7] min-[981px]:hidden max-[680px]:grid-cols-2 [&_a]:border-r [&_a]:border-b [&_a]:border-[rgba(20,40,55,.14)] [&_a]:px-5 [&_a]:py-3.5 [&_a]:font-[family-name:var(--font-display)] [&_a]:text-[13px] [&_a]:font-medium">
            <Link href="/">Features</Link>
            <Link href="/plugins">Plugins</Link>
            <Link href="/releases">Releases</Link>
            <Link href="/docs/getting-started">Docs</Link>
            <Link href="/tools/backup-upgrader">Tools</Link>
            <a href={links.app}>GitHub</a>
          </nav>
        )}

        <main className="mx-auto w-full max-w-[1232px] border-x border-[rgba(20,40,55,.14)] max-[680px]:border-x-0">
          <section className="relative isolate flex min-h-[660px] flex-col items-center justify-center overflow-hidden border-b border-[rgba(20,40,55,.14)] px-9 pt-[72px] pb-[58px] text-center max-[680px]:min-h-[630px] max-[680px]:px-[22px] max-[680px]:pt-16 max-[680px]:pb-12 [&>h1]:m-0 [&>h1]:max-w-[980px] [&>h1]:text-[72px] [&>h1]:leading-[.98] [&>h1]:font-medium [&>h1]:tracking-[-.055em] [&>h1]:text-balance max-[680px]:[&>h1]:text-[clamp(45px,13vw,58px)] [&>h1_span]:text-[#0e7490] [&>p]:mx-auto [&>p]:mt-7 [&>p]:max-w-[720px] [&>p]:text-[17px] [&>p]:leading-[1.55] [&>p]:text-[#516470] [&>p]:text-balance max-[680px]:[&>p]:text-[15px]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(14,116,144,.25)_1px,transparent_1.4px)] bg-[length:18px_18px] [mask-image:linear-gradient(to_right,#000_0%,transparent_31%,transparent_69%,#000_100%)] after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(to_bottom,#eff4f4_0%,transparent_28%,transparent_73%,#eff4f4_100%)]" aria-hidden="true" />
            <h1>
              The open-source light novel reader for Android<span>.</span>
            </h1>
            <p>
              Discover novels from community-maintained sources, shape every
              detail of your reading experience, and keep your library where it
              belongs—on your device.
            </p>
            <div className="mt-[34px] flex justify-center gap-3 max-[680px]:w-full max-[680px]:flex-col [&_a]:min-h-[50px] [&_a]:min-w-[190px]">
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors border-[#0e7490] bg-[#0e7490] text-white! hover:bg-[#0a6179]" href={links.releases}>
                Download LNReader <span>→</span>
              </a>
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors bg-[#f7faf9] hover:bg-[#dfeaea]" href={links.app}>
                View source
              </a>
            </div>
            <div className="mt-[58px] flex items-center justify-center gap-[22px] text-[13px] text-[#6a7d88] max-[680px]:mt-[42px] max-[680px]:flex-wrap max-[680px]:gap-x-4 max-[680px]:gap-y-3 [&>span]:flex [&>span]:items-baseline [&>span]:gap-1.5 [&_strong]:font-mono [&_strong]:text-base [&_strong]:font-medium [&_strong]:text-[#16242e] [&>i]:h-[18px] [&>i]:w-px [&>i]:bg-[rgba(20,40,55,.14)] max-[680px]:[&>i]:hidden">
              <span>
                <strong>200+</strong> community plugins
              </span>
              <i />
              <span>
                <strong>500k+</strong> downloads
              </span>
              <i />
              <span>
                <strong>115</strong> contributors
              </span>
            </div>
          </section>

          <Band label="WHAT WE DO" index="01" />
          <section className="grid grid-cols-2 border-b border-[rgba(20,40,55,.14)] max-[980px]:grid-cols-1">
            <div className="relative overflow-hidden border-r border-[rgba(20,40,55,.14)] bg-[#0e7490] p-[38px] text-white max-[980px]:border-r-0 max-[980px]:border-b max-[680px]:p-[30px_22px] [&>h1]:relative [&>h1]:mb-[18px] [&>h1]:max-w-[520px] [&>h1]:text-[clamp(43px,4.2vw,54px)] [&>h1]:leading-[.99] [&>h1]:tracking-[-.045em] max-[680px]:[&>h1]:text-[43px] [&>p]:relative [&>p]:mb-7 [&>p]:max-w-[470px] [&>p]:text-[15.5px] [&>p]:leading-[1.55] [&>p]:text-[#d6eef0] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,.22)_1px,transparent_1.2px)] before:bg-[length:14px_14px] before:opacity-60 before:content-['']">
              <div className="relative mb-[29px] flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] [&>span]:grid [&>span]:h-[26px] [&>span]:w-[26px] [&>span]:shrink-0 [&>span]:place-items-center [&>span]:border [&>span]:border-white/50 [&_svg]:h-3.5 [&_svg]:w-3.5">
                <span>
                  <Braces aria-hidden="true" />
                </span>{" "}
                FOR READERS &amp; TINKERERS
              </div>
              <h1>A light novel reader with the craft of a native IDE.</h1>
              <p>
                Curate sources, tune the reading experience, and keep everything
                on your device—no ads, no lock-in, just community-built
                features.
              </p>
              <div className="relative mb-[25px] grid grid-cols-3 border border-dashed border-white/40 [&>div]:border-r [&>div]:border-dashed [&>div]:border-white/40 [&>div]:p-[17px_13px] max-[680px]:[&>div]:p-[14px_8px] [&>div:last-child]:border-r-0 [&_strong]:block [&_strong]:font-mono [&_strong]:text-[clamp(22px,2.4vw,30px)] max-[680px]:[&_strong]:text-[21px] [&_small]:mt-[7px] [&_small]:block [&_small]:font-mono [&_small]:text-[9px] [&_small]:tracking-[.1em] [&_small]:text-[#bfe6ea] max-[680px]:[&_small]:text-[7px]">
                <div>
                  <strong>200+</strong>
                  <small>PLUGINS</small>
                </div>
                <div>
                  <strong>500k+</strong>
                  <small>DOWNLOADS</small>
                </div>
                <div>
                  <strong>115</strong>
                  <small>CONTRIBUTORS</small>
                </div>
              </div>
              <div className="relative mb-5 font-mono text-xs font-medium text-[#cfeef0]">
                Open source · MIT · built for Android
              </div>
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors relative min-h-[49px] w-full border-0 bg-[#f5f8f7] text-[#0e7490]!" href={links.releases}>
                Download the APK →
              </a>
            </div>
            <div className="p-[38px] max-[680px]:p-[30px_22px] [&>h2]:mb-4 [&>h2]:text-[clamp(39px,3.5vw,45px)] [&>h2]:leading-[1.02] [&>h2]:tracking-[-.04em] [&>p]:mb-7 [&>p]:max-w-[470px] [&>p]:text-[15.5px] [&>p]:leading-[1.55] [&>p]:text-[#516470]">
              <div className="relative mb-[29px] flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] [&>span]:grid [&>span]:h-[26px] [&>span]:w-[26px] [&>span]:shrink-0 [&>span]:place-items-center [&>span]:border [&>span]:border-white/50 [&_svg]:h-3.5 [&_svg]:w-3.5">
                <span className="border-0! bg-[#0e7490] text-white">
                  <FolderGit2 aria-hidden="true" />
                </span>{" "}
                OPEN PLUGINS &amp; LOCAL DATA
              </div>
              <h2>
                Your library,
                <br />
                your rules.
              </h2>
              <p>
                Install only what you need, host your own repository, fork
                existing plugins, or read local EPUBs entirely offline.
              </p>
              <div className="[&>div]:flex [&>div]:justify-between [&>div]:gap-3 [&>div]:border-t [&>div]:border-dotted [&>div]:border-[rgba(20,40,55,.32)] [&>div]:py-[13px] [&>div]:text-sm [&>div:last-child]:border-b [&_b]:text-[#0e7490] [&_b_span]:text-[#16242e] [&_small]:font-mono [&_small]:text-[11px] [&_small]:font-medium [&_small]:text-[#8a9aa3] max-[680px]:[&_small]:hidden">
                <div>
                  <b>
                    ▸ <span>Global catalogue</span>
                  </b>
                  <small>200+ sources</small>
                </div>
                <div>
                  <b>
                    ▸ <span>Self-hosted plugins</span>
                  </b>
                  <small>paste URL</small>
                </div>
                <div>
                  <b>
                    ▸ <span>Local EPUB imports</span>
                  </b>
                  <small>offline</small>
                </div>
                <div>
                  <b>
                    ▸ <span>One-tap updates</span>
                  </b>
                  <small>refresh</small>
                </div>
              </div>
              <div className="my-[22px_18px] flex items-baseline gap-2.5 [&_strong]:font-mono [&_strong]:text-[28px] [&_strong]:font-bold [&_span]:text-[13px] [&_span]:text-[#6a7d88]">
                <strong>500k+</strong>
                <span>downloads from readers worldwide</span>
              </div>
              <CopyControl value={links.sources} className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors w-full bg-transparent hover:bg-[#dfeaea]">
                Copy sources repository
              </CopyControl>
            </div>
          </section>

          <Band label="WHY SWITCH" index="02" />
          <section className="relative grid grid-cols-2 gap-[22px] px-9 pt-11 pb-14 max-[680px]:grid-cols-1 max-[680px]:gap-7 max-[680px]:px-[22px] max-[680px]:pt-[38px] max-[680px]:pb-11">
            <i className="absolute top-[26px] left-1/2 h-[13px] w-px bg-[rgba(20,40,55,.3)] after:absolute after:top-1.5 after:-left-1.5 after:h-px after:w-[13px] after:bg-inherit after:content-[''] max-[680px]:hidden" />
            <article className="relative min-h-[318px] border border-dashed border-[rgba(20,40,55,.28)] p-[34px_36px] max-[680px]:min-h-0 max-[680px]:p-[28px_24px] [&>h2]:my-[23px_25px] [&>h2]:text-[clamp(22px,2.2vw,27px)] [&>h2]:leading-[1.16] [&>h2]:tracking-[-.025em] [&>ul]:grid [&>ul]:list-none [&>ul]:gap-3.5 [&>ul]:p-0 [&>ul]:text-sm text-[#8a9aa3] [&>h2]:line-through [&>h2]:decoration-[rgba(20,40,55,.4)]">
              <CropMarks />
              <div className="flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] [&>span]:grid [&>span]:h-5 [&>span]:w-5 [&>span]:place-items-center [&>span]:border [&>span]:border-[#b3c0c7]">
                <span>×</span> LEGACY · A CLOSED READER APP
              </div>
              <h2>
                Ads between chapters. Locked sources. Your library lives on
                their servers.
              </h2>
              <ul>
                <li>× Trackers and analytics baked in</li>
                <li>× One vendor, one catalogue</li>
                <li>× Limited export and backups</li>
              </ul>
            </article>
            <article className="relative min-h-[318px] border border-dashed border-[rgba(20,40,55,.28)] p-[34px_36px] max-[680px]:min-h-0 max-[680px]:p-[28px_24px] [&>h2]:my-[23px_25px] [&>h2]:text-[clamp(22px,2.2vw,27px)] [&>h2]:leading-[1.16] [&>h2]:tracking-[-.025em] [&>ul]:grid [&>ul]:list-none [&>ul]:gap-3.5 [&>ul]:p-0 [&>ul]:text-sm border-[rgba(14,116,144,.45)] [&>div]:text-[#0e7490] [&>ul>li]:flex [&>ul>li]:gap-3.5 [&>ul>li>i]:mt-[5px] [&>ul>li>i]:h-[11px] [&>ul>li>i]:w-[11px] [&>ul>li>i]:shrink-0 [&>ul>li>i]:bg-[#0e7490]">
              <CropMarks />
              <div className="flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] [&>span]:grid [&>span]:h-5 [&>span]:w-5 [&>span]:place-items-center [&>span]:border [&>span]:border-[#b3c0c7]">
                <span>読</span> LNREADER
              </div>
              <h2>
                No ads. Open plugins. Everything stays on your device—and
                remains yours to move.
              </h2>
              <ul>
                <li>
                  <i /> Privacy-first, zero analytics
                </li>
                <li>
                  <i /> Community-maintained sources
                </li>
                <li>
                  <i /> Backup, restore, and migrate freely
                </li>
              </ul>
            </article>
          </section>

          <Band label="THE READER" index="03" />
          <section className="grid grid-cols-[1fr_1.1fr] border-b border-[rgba(20,40,55,.14)] max-[980px]:grid-cols-1">
            <div className="relative overflow-hidden border-r border-[rgba(20,40,55,.14)] bg-[#eef1f4] p-[34px_36px] max-[980px]:border-r-0 max-[980px]:border-b max-[680px]:p-[30px_22px] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(20,40,55,.14)_1px,transparent_1.2px)] before:bg-[length:14px_14px] before:content-[''] before:[mask-image:radial-gradient(ellipse_65%_80%_at_50%_50%,transparent_25%,#000)]">
              <div className="relative mb-[18px] flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-[#8a9aa3] [&>span]:grid [&>span]:h-[19px] [&>span]:w-[19px] [&>span]:place-items-center [&>span]:border [&>span]:border-[#b3c0c7] [&>span]:text-[#0e7490]">
                <span>◑</span> FIG. 01 — IMMERSIVE READER
              </div>
              <div className="relative p-[11px] text-[#0e7490] max-[680px]:-mx-[11px] [&>pre]:m-0 [&>pre]:overflow-auto [&>pre]:border [&>pre]:border-[rgba(20,40,55,.14)] [&>pre]:bg-[#f4f8f7] [&>pre]:p-5 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:font-medium [&>pre]:leading-[1.55] [&>pre]:text-[#41545f] max-[680px]:[&>pre]:p-[15px_10px] max-[680px]:[&>pre]:text-[10px]">
                <CropMarks />
                <pre>{`+----------------------------+
|  THE LANTERN IN THE EAST   |
|  Vol. 2 · Chapter 14       |
|  · · · · · · · · · · · · |
|  Snow fell on the quiet    |
|  road as Kaede walked      |
|  toward the lantern that   |
|  never seemed to go out.   |
|                            |
|  "You waited," she said.   |
|                            |
|  [#########-------]   61%  |
+----------------------------+
     a prev   d next   t theme`}</pre>
              </div>
              <div className="relative mt-[17px] flex items-center gap-2 font-mono text-[11px] font-medium text-[#0e7490] [&>i]:h-[13px] [&>i]:w-[7px] [&>i]:animate-pulse [&>i]:bg-[#0e7490]">
                ▸ paged · continuous · distraction-free <i />
              </div>
            </div>
            <div className="p-[34px_36px] max-[680px]:p-[30px_22px] [&>h2]:my-[13px_9px] [&>h2]:text-[clamp(30px,3vw,36px)] [&>h2]:leading-[1.05] [&>h2]:tracking-[-.035em] [&>h2_em]:text-[#0e7490] [&>h2_em]:not-italic [&>p]:mb-[21px] [&>p]:text-sm [&>p]:text-[#516470] [&>ol]:m-0 [&>ol]:list-none [&>ol]:p-0 [&>ol>li]:grid [&>ol>li]:grid-cols-[40px_1fr] [&>ol>li]:border-t [&>ol>li]:border-[rgba(20,40,55,.14)] [&>ol>li]:py-[13px] [&>ol>li:last-child]:border-b [&>ol>li>span]:font-mono [&>ol>li>span]:text-xs [&>ol>li>span]:font-semibold [&>ol>li>span]:text-[#b3c0c7] [&>ol>li>b]:text-[15px]">
              <span className="relative flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-[#0e7490]">THE READING EXPERIENCE</span>
              <h2>
                Craft the reader
                <br />
                you <em>wished existed.</em>
              </h2>
              <p>
                Editor-grade control that stays lightweight and purposeful on
                Android.
              </p>
              <ol>
                {capabilities.map((capability, index) => (
                  <li
                    key={capability}
                    className={index === 5 ? "text-[#0e7490]! [&>span]:text-[#0e7490]!" : ""}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{capability}</b>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Band label="OPEN BY DESIGN" index="04" />
          <section className="grid grid-cols-[1.2fr_1fr] gap-[55px] border-b border-[rgba(20,40,55,.14)] px-9 py-11 max-[980px]:grid-cols-1 max-[680px]:gap-7 max-[680px]:p-[30px_22px]">
            <div className="[&>h2]:my-3.5 [&>h2]:text-[clamp(32px,3.5vw,44px)] [&>h2]:tracking-[-.04em] [&>p]:m-0 [&>p]:max-w-[600px] [&>p]:text-[15px] [&>p]:leading-[1.6] [&>p]:text-[#516470]">
              <span className="relative flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-[#0e7490]">SOURCES &amp; COMMUNITY</span>
              <h2>Built together, read anywhere.</h2>
              <p>
                LNReader has been open source since day one. Plugin authors,
                translators, maintainers, and readers shape the roadmap in
                public.
              </p>
              <div className="mt-[25px] font-mono text-xs font-semibold leading-[1.9] text-[#41545f]">
                English · 日本語 · 中文 · Español · Français · 한국어 · Tiếng
                Việt
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-l border-dashed border-[rgba(14,116,144,.45)] [&>div]:flex [&>div]:min-h-[98px] [&>div]:flex-col [&>div]:justify-center [&>div]:border-r [&>div]:border-b [&>div]:border-dashed [&>div]:border-[rgba(14,116,144,.45)] [&>div]:p-[18px] [&_strong]:font-mono [&_strong]:text-[25px] [&_strong]:font-bold [&_strong]:text-[#0e7490] [&_span]:text-[13px] [&_span]:text-[#516470]">
              <div>
                <strong>2.7k</strong>
                <span>GitHub stars</span>
              </div>
              <div>
                <strong>36</strong>
                <span>releases</span>
              </div>
              <div>
                <strong>115</strong>
                <span>contributors</span>
              </div>
              <div>
                <strong>14+</strong>
                <span>languages</span>
              </div>
            </div>
          </section>

          <Band label="GET STARTED" index="05" />
          <section className="relative overflow-hidden border-b border-[rgba(20,40,55,.14)] px-9 pt-14 pb-16 text-center max-[680px]:p-[30px_22px] [&>.miniLabel]:justify-center [&>h2]:my-3.5 [&>h2]:text-[clamp(43px,4.4vw,52px)] [&>h2]:leading-none [&>h2]:tracking-[-.045em] [&>h2_span]:text-[#0e7490] [&>p]:mx-auto [&>p]:mb-7 [&>p]:max-w-[550px] [&>p]:text-base [&>p]:text-[#516470] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(20,40,55,.14)_1px,transparent_1.2px)] before:bg-[length:14px_14px] before:content-[''] before:[mask-image:radial-gradient(ellipse_65%_80%_at_50%_50%,transparent_25%,#000)]">
            <span className="relative flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.14em] text-[#0e7490] justify-center">LATEST STABLE BUILD</span>
            <h2>
              Download LNReader<span>.</span>
            </h2>
            <p>
              Install the latest release, configure your plugins, and start
              reading in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-[11px] max-[680px]:flex-col [&_a]:min-h-[46px] [&_a]:px-[25px]">
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors border-[#0e7490] bg-[#0e7490] text-white! hover:bg-[#0a6179]" href={links.releases}>
                Latest release →
              </a>
              <Link className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors bg-[#f7faf9] hover:bg-[#dfeaea]" href="/docs/getting-started">
                Read the docs
              </Link>
              <a className="inline-flex min-h-10 items-center justify-center border border-[rgba(20,40,55,.22)] px-[18px] py-2.5 font-[family-name:var(--font-display)] text-sm font-medium transition-colors bg-[#f7faf9] hover:bg-[#dfeaea]" href={links.nightly}>
                Nightly builds
              </a>
            </div>
          </section>
        </main>

        <footer className="flex items-center justify-between border-t border-[rgba(20,40,55,.14)] bg-[#f5f8f7] px-9 py-[22px] font-mono text-[11px] font-medium uppercase text-[#6a7d88] max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-5 max-[680px]:p-[22px] [&>div]:flex [&>div]:items-center [&>div]:gap-2.5 [&>nav]:flex [&>nav]:gap-5 max-[680px]:[&>nav]:flex-wrap [&_a:hover]:text-[#0e7490]">
          <div>
            <span className="grid h-6 w-6 place-items-center bg-[#0e7490] font-mono text-white">読</span> BUILT BY THE COMMUNITY
            · {new Date().getFullYear()} · MIT
          </div>
          <nav>
            <a href={links.app}>Contribute</a>
            <a href={links.releases}>Releases</a>
            <a href="https://www.reddit.com/r/LNReader/">Reddit</a>
            <a href="https://discord.com/invite/QdcWN4MD63">Discord</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
