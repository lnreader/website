"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Braces,
  FolderGit2,
  List,
  MoreVertical,
  Search,
  Settings2,
  SunMedium,
  Type,
} from "lucide-react";
import SiteShell from "@/app/(features)/components/site-shell";


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
  return (
    <SiteShell
      className="bg-[#e8efef] font-[family-name:var(--font-display)] text-[#16242e] [&_*]:rounded-none [&_a]:text-inherit [&_a]:no-underline"
      mainClassName="overflow-x-clip bg-[#eff4f4]"
    >
        <div className="mx-auto w-full max-w-[1232px] border-x border-[rgba(20,40,55,.14)] max-[680px]:border-x-0">
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
              <div className="relative mx-auto h-[430px] w-full max-w-[320px] overflow-hidden p-[10px] text-[#0e7490] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-16 after:bg-gradient-to-b after:from-transparent after:to-[#eef1f4] after:content-[''] [&>i]:z-20">
                <CropMarks />
                <div className="!rounded-[42px] border border-[#9eb4b8] bg-[#d5e2e2] p-[7px] shadow-[0_24px_48px_-34px_rgba(20,40,55,.55)]">
                  <div className="relative h-[590px] overflow-hidden !rounded-[35px] border border-[rgba(20,40,55,.16)] bg-[#f5f8f7] text-[#24343a]">
                    <div className="flex h-9 items-center justify-between px-5 font-mono text-[9px] font-semibold text-[#516470]">
                      <span>09:41</span>
                      <span className="flex items-center gap-1.5">
                        <i className="h-2 w-3 border border-[#24343a] before:block before:h-full before:w-2/3 before:bg-[#24343a] before:content-['']" />
                        87%
                      </span>
                    </div>

                    <div className="flex h-[50px] items-center justify-between border-y border-[rgba(20,40,55,.14)] bg-[#eef4f3] px-3">
                      <button type="button" aria-label="Back to library" className="grid h-8 w-8 place-items-center text-[#516470]">
                        <ArrowLeft size={17} strokeWidth={1.8} />
                      </button>
                      <div className="min-w-0 text-center">
                        <strong className="block truncate text-[11px] font-semibold">The Lantern in the East</strong>
                        <span className="font-mono text-[7px] uppercase tracking-[.12em] text-[#7d898d]">Chapter 14 · The Long Road</span>
                      </div>
                      <button type="button" aria-label="Reader menu" className="grid h-8 w-8 place-items-center text-[#516470]">
                        <MoreVertical size={17} strokeWidth={1.8} />
                      </button>
                    </div>

                    <article className="h-[414px] overflow-hidden px-7 pt-8 text-left">
                      <div className="mb-6 flex items-center gap-2 font-mono text-[7px] font-medium uppercase tracking-[.16em] text-[#0e7490]">
                        <span className="h-px w-5 bg-[#0e7490]" />
                        14 / The long road
                      </div>
                      <h3 className="mb-6 font-[family-name:var(--font-display)] text-[21px] font-medium leading-[1.08] tracking-[-.035em]">
                        A light that never went out.
                      </h3>
                      <div className="space-y-4 font-serif text-[12px] leading-[1.72] text-[#39484d]">
                        <p>
                          Snow fell on the quiet road as Kaede walked toward
                          the lantern at the edge of town.
                        </p>
                        <p>
                          It had burned through every winter she could
                          remember, steady against the dark.
                        </p>
                        <p className="border-l-2 border-[#0e7490] pl-3 italic text-[#536268]">
                          “You waited,” she said.
                        </p>
                      </div>
                    </article>

                    <div className="border-t border-[rgba(20,40,55,.14)] bg-[#e8efef] px-4 pt-3 pb-2">
                      <div className="mb-2.5 flex items-center gap-3">
                        <span className="font-mono text-[7px] text-[#7d898d]">61%</span>
                        <div className="h-1 flex-1 bg-[#cbd9da]">
                          <div className="h-full w-[61%] bg-[#0e7490]" />
                        </div>
                        <span className="font-mono text-[7px] text-[#7d898d]">18 min</span>
                      </div>
                      <nav aria-label="Reader controls" className="grid grid-cols-5 text-[#617176]">
                        {[
                          { icon: List, label: "Chapters" },
                          { icon: Search, label: "Search" },
                          { icon: Type, label: "Text" },
                          { icon: SunMedium, label: "Theme" },
                          { icon: Settings2, label: "More" },
                        ].map(({ icon: Icon, label }) => (
                          <button key={label} type="button" className="flex flex-col items-center gap-1 py-1 text-[7px]">
                            <Icon size={14} strokeWidth={1.7} />
                            <span>{label}</span>
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-[17px] flex items-center gap-2 font-mono text-[11px] font-medium text-[#0e7490] [&>i]:h-[13px] [&>i]:w-[7px] [&>i]:animate-pulse [&>i]:bg-[#0e7490]">
                ▸ paged · continuous · distraction-free <i />
              </div>
            </div>
            <div className="p-[34px_36px] max-[680px]:p-[30px_22px] [&>h2]:my-[13px_9px] [&>h2]:text-[clamp(30px,3vw,36px)] [&>h2]:leading-[1.05] [&>h2]:tracking-[-.035em] [&>h2_em]:text-[#0e7490] [&>h2_em]:not-italic [&>p]:mb-[21px] [&>p]:text-sm [&>p]:text-[#516470] [&>ol]:m-0 [&>ol]:list-none [&>ol]:p-0 [&>ol>li]:grid [&>ol>li]:grid-cols-[40px_1fr] [&>ol>li]:items-center [&>ol>li]:border-t [&>ol>li]:border-[rgba(20,40,55,.14)] [&>ol>li]:py-[13px] [&>ol>li:last-child]:border-b [&>ol>li>span]:font-mono [&>ol>li>span]:text-xs [&>ol>li>span]:font-semibold [&>ol>li>span]:text-[#b3c0c7] [&>ol>li>b]:text-[15px]">
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
        </div>
    </SiteShell>
  );
}
