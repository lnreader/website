"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./refund.module.css";

const reasons = [
  "The free app did not meet my premium expectations",
  "A volunteer has not replied in eleven minutes",
  "A website changed and somehow this is LNReader's fault",
  "I would like to speak to the open-source manager",
  "Other (please make it everyone else's problem)",
];

const questions = [
  {
    question: "Can I speak to someone senior?",
    answer:
      "The most senior person is whoever merged a pull request most recently. They are probably asleep.",
  },
  {
    question: "What actually helps?",
    answer:
      "A reproducible issue, a plugin fix, a translation, or answering someone else's question in Discord.",
  },
  {
    question: "A source stopped working. Compensation?",
    answer:
      "The website changed its HTML. A volunteer may fix it faster if you attach the error, not the outrage.",
  },
  {
    question: "Is this page real?",
    answer:
      "The refund is real in the sense that $0.00 has been returned to you with complete sincerity.",
  },
  {
    question: "I demand a service-level agreement.",
    answer:
      "Granted: the app will keep working exactly as well as it did yesterday, for the same price.",
  },
  {
    question: "How did I get here?",
    answer: "You typed the URL. It is linked from nowhere. Enjoy your souvenir.",
  },
];

function FieldLabel({
  index,
  htmlFor,
  children,
}: {
  index: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[10px] font-medium uppercase tracking-[.17em] text-[#879aa5]">
      {index} · {children}
    </label>
  );
}

export default function RefundDesk() {
  const [reason, setReason] = useState(reasons[0]);
  const [chapters, setChapters] = useState("412");
  const [damages, setDamages] = useState("4000");
  const [acknowledged, setAcknowledged] = useState(false);
  const [claim, setClaim] = useState<null | {
    id: string;
    reason: string;
    chapters: string;
    damages: string;
    submittedAt: string;
  }>(null);
  const [notice, setNotice] = useState("");

  const displayedClaim = claim ?? {
    id: "LN-472584",
    reason: reasons[0],
    chapters: "412",
    damages: "4000",
    submittedAt: "14:32:07",
  };

  const formattedDamages = Number(displayedClaim.damages || 0).toLocaleString(
    "en-US",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );

  function processRefund() {
    if (!acknowledged) {
      setNotice("claim paused: please acknowledge objective reality above");
      return;
    }

    const claimId = `LN-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const submittedAt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
    setClaim({ id: claimId, reason, chapters, damages, submittedAt });
    setNotice("");
    window.setTimeout(() => {
      document.getElementById("settlement")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  function escalate() {
    setNotice("escalated to the manager · you are now the manager");
  }

  return (
    <div className="mx-auto w-full max-w-[1232px] border-x border-[rgba(20,40,55,.14)] max-[680px]:border-x-0">
      <div className="flex items-center justify-between border-b border-[rgba(20,40,55,.14)] px-9 py-4 font-mono text-[10px] font-medium uppercase tracking-[.17em] max-[680px]:px-5">
        <span className="text-[#cf711d]">⟩ Refund desk · unlisted page</span>
        <span className="text-[#8a9aa3]">[ 00 / 00 ]</span>
      </div>

      <section className="grid grid-cols-2 border-b border-[rgba(20,40,55,.14)] max-[900px]:grid-cols-1">
        <div className={`${styles.dotGrid} relative overflow-hidden border-r border-[rgba(20,40,55,.14)] bg-[#0e7490] p-[42px_38px_48px] text-white max-[900px]:border-r-0 max-[900px]:border-b max-[680px]:p-[32px_22px_38px]`}>
          <div className="relative flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[.17em]">
            <span className="grid size-7 place-items-center border border-white/45">$</span>
            Billing &amp; disputes
          </div>
          <h1 className="relative mt-9 max-w-[470px] text-[clamp(48px,5.2vw,68px)] leading-[.96] font-semibold tracking-[-.055em]">
            Request a<br />full refund.
          </h1>
          <p className="relative mt-6 max-w-[490px] text-[16px] leading-[1.65] text-[#d4edf0]">
            You paid nothing, so we can refund all of it. Our refund department
            is one volunteer and a spreadsheet, and they have approved every
            claim since 2021.
          </p>

          <div className="relative mt-8 grid grid-cols-3 border border-dashed border-white/40">
            {[
              ["$0.00", "You paid"],
              ["100%", "Approval rate"],
              ["0s", "Processing time"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className="border-r border-dashed border-white/40 p-4 last:border-r-0 max-[480px]:px-2.5"
              >
                <strong className={`block font-mono text-[clamp(22px,3vw,34px)] font-medium ${index === 2 ? "text-[#ffb86a]" : ""}`}>
                  {value}
                </strong>
                <small className="mt-2 block font-mono text-[8px] uppercase tracking-[.13em] text-[#c7e8eb]">
                  {label}
                </small>
              </div>
            ))}
          </div>

          <p className="relative mt-7 font-mono text-[11px] text-[#d4edf0]">
            Covered under the MIT License&apos;s &quot;AS IS&quot; clause.
          </p>
          <aside className="relative mt-5 border border-dashed border-white/40 p-5 text-[14px] leading-[1.6] text-[#d4edf0]">
            <b className="mb-2 block font-mono text-[9px] uppercase tracking-[.15em] text-[#ffd18c]">
              Small print
            </b>
            Refunds are issued in the original currency of purchase: none.
            Volunteers are not obligated to be your customer support, but they
            usually are anyway.
          </aside>
        </div>

        <div className="bg-[#f2f6f5] p-[42px_38px_48px] max-[680px]:p-[32px_22px_38px]">
          <div className="flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[.17em]">
            <span className="grid size-7 place-items-center bg-[#0e7490] text-white">#</span>
            Form RF-001
          </div>
          <h2 className="mt-7 max-w-[460px] text-[clamp(39px,4vw,54px)] leading-[.98] font-semibold tracking-[-.05em]">
            Tell us what<br />went wrong.
          </h2>

          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              processRefund();
            }}
          >
            <div>
              <FieldLabel index="01" htmlFor="refund-reason">Grounds for refund</FieldLabel>
              <div className="relative">
                <select
                  id="refund-reason"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="h-[52px] w-full appearance-none border border-[rgba(20,40,55,.2)] bg-white py-0 pr-12 pl-4 font-mono text-[12px] text-[#273743] outline-none transition focus:border-[#0e7490] focus:ring-2 focus:ring-[#0e7490]/15"
                >
                  {reasons.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-[#273743]"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
              <div>
                <FieldLabel index="02" htmlFor="amount-paid">Amount paid</FieldLabel>
                <input
                  id="amount-paid"
                  value="$0.00"
                  readOnly
                  aria-readonly="true"
                  className="h-[52px] w-full border border-[rgba(20,40,55,.2)] bg-[#f9fbfa] px-4 font-mono text-[13px] text-[#91a0aa]"
                />
              </div>
              <div>
                <FieldLabel index="03" htmlFor="chapters-consumed">Chapters consumed</FieldLabel>
                <input
                  id="chapters-consumed"
                  value={chapters}
                  inputMode="numeric"
                  onChange={(event) => setChapters(event.target.value)}
                  className="h-[52px] w-full border border-[rgba(20,40,55,.2)] bg-white px-4 font-mono text-[13px] text-[#273743] outline-none transition focus:border-[#0e7490] focus:ring-2 focus:ring-[#0e7490]/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <FieldLabel index="04" htmlFor="emotional-damages">Emotional damages claimed (USD)</FieldLabel>
              <input
                id="emotional-damages"
                value={damages}
                inputMode="decimal"
                onChange={(event) => setDamages(event.target.value)}
                className="h-[52px] w-full border border-[rgba(20,40,55,.2)] bg-white px-4 font-mono text-[13px] text-[#273743] outline-none transition focus:border-[#0e7490] focus:ring-2 focus:ring-[#0e7490]/15"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.55] text-[#526774]">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(event) => setAcknowledged(event.target.checked)}
                className="mt-1 size-4 shrink-0 accent-[#0e7490]"
              />
              <span>
                I acknowledge that LNReader is built by unpaid volunteers, that
                I have never sent them a single dollar, and that I am doing
                this anyway.
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 min-h-[54px] w-full bg-[#0e7490] px-5 font-mono text-[11px] font-medium uppercase tracking-[.11em] text-white transition hover:bg-[#0a6179] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7490]"
            >
              Process my refund →
            </button>
            <button
              type="button"
              onClick={escalate}
              className="mt-3 min-h-[48px] border border-[rgba(20,40,55,.22)] bg-transparent px-5 font-mono text-[10px] font-medium uppercase tracking-[.11em] text-[#273743] transition hover:bg-[#e3eceb]"
            >
              Escalate to manager
            </button>
            <p aria-live="polite" className="mt-4 min-h-5 font-mono text-[10px] text-[#cf711d]">
              {notice && `▸ ${notice}`}
            </p>
          </form>
        </div>
      </section>

      <section id="settlement" className="bg-[#edf3f3]">
        <div className="flex items-center justify-between border-b border-[rgba(20,40,55,.14)] px-9 py-4 font-mono text-[10px] font-medium uppercase tracking-[.17em] max-[680px]:px-5">
          <span className="text-[#cf711d]">⟩ Claim #{displayedClaim.id} · tracking</span>
          <span className="text-[#879aa5]">[ settled ]</span>
        </div>

        <div className={`${styles.statusGrid} ${claim ? styles.reveal : ""} px-[58px] pt-12 pb-14 max-[760px]:px-5 max-[760px]:pt-9`}>
          <div className="flex items-start justify-between gap-8 max-[680px]:flex-col max-[680px]:gap-5">
            <div>
              <p className="font-mono text-[9px] font-medium uppercase tracking-[.17em] text-[#cf711d]">
                Claim status · updated 0s ago
              </p>
              <h2 className="mt-3 text-[clamp(35px,4.3vw,53px)] leading-[.98] font-semibold tracking-[-.05em]">
                Refunded in full,<br />
                <span className="text-[#0e7490]">before you finished asking.</span>
              </h2>
            </div>
            <div className="shrink-0 text-right max-[680px]:text-left">
              <strong className="block font-mono text-[clamp(54px,6vw,75px)] leading-none font-medium tracking-[-.06em]">$0.00</strong>
              <span className="mt-2 block font-mono text-[8px] uppercase tracking-[.2em] text-[#8b9ba4]">Returned to source</span>
            </div>
          </div>

          <div className="relative mt-12 grid grid-cols-4 gap-6 max-[820px]:grid-cols-2 max-[520px]:grid-cols-1">
            {[
              ["Claim received", "Form RF-001 submitted with visible conviction."],
              ["Reviewed by a volunteer", "Checked against the MIT License, section “as is”."],
              ["Approved", "No objection raised. There was nothing to object to."],
              ["Refunded — $0.00", "Allow 0 to 0 business days for the funds to not appear."],
            ].map(([title, detail], index) => (
              <article
                key={title}
                className="relative after:absolute after:top-[9px] after:left-[10px] after:z-0 after:w-[calc(100%+24px)] after:border-t-2 after:border-dashed after:border-[#74b9c7] after:content-[''] last:after:hidden max-[820px]:after:hidden"
              >
                <span className={`relative z-10 block size-5 rounded-full! border-4 border-[#edf3f3] ${index === 3 ? "bg-[#d8751b]" : "bg-[#0e819a]"}`} />
                <time className="mt-4 block font-mono text-[9px] tracking-[.13em] text-[#8b9ba4]">{displayedClaim.submittedAt}</time>
                <h3 className={`mt-2 text-[14px] leading-[1.25] font-semibold ${index === 3 ? "text-[#d8751b]" : ""}`}>{title}</h3>
                <p className="mt-1.5 max-w-[220px] text-[12px] leading-[1.55] text-[#627580]">{detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-11 grid grid-cols-3 border border-dashed border-[rgba(20,40,55,.25)] max-[520px]:grid-cols-1">
            {[
              [displayedClaim.chapters || "0", "Chapters read", false],
              [`$${formattedDamages}`, "Damages claimed", false],
              ["$0.00", "Damages awarded", true],
            ].map(([value, label, accent]) => (
              <div key={String(label)} className="border-r border-dashed border-[rgba(20,40,55,.25)] p-6 last:border-r-0 max-[520px]:border-r-0 max-[520px]:border-b max-[520px]:last:border-b-0">
                <strong className={`block font-mono text-[26px] font-medium ${accent ? "text-[#d8751b]" : ""}`}>{value}</strong>
                <small className={`mt-2 block font-mono text-[8px] uppercase tracking-[.17em] ${accent ? "text-[#d8751b]" : "text-[#8b9ba4]"}`}>{label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-[rgba(20,40,55,.14)] max-[760px]:grid-cols-1">
          <div className="border-r border-[rgba(20,40,55,.14)] p-[42px_54px] max-[760px]:border-r-0 max-[760px]:border-b max-[680px]:p-[34px_22px]">
            <p className="font-mono text-[9px] font-medium uppercase tracking-[.17em] text-[#8b9ba4]">Handled by</p>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid size-14 place-items-center bg-[#0e7490] font-mono text-[19px] text-white">#43</span>
              <div>
                <strong className="block text-[15px] font-semibold">volunteer #43</strong>
                <span className="font-mono text-[9px] uppercase tracking-[.1em] text-[#8b9ba4]">Maintainer · unpaid since 2021</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 border border-dashed border-[rgba(20,40,55,.25)]">
              {[["0.4s", "Response"], ["100%", "Approved"], ["$0", "Salary"]].map(([value, label], index) => (
                <div key={label} className="border-r border-dashed border-[rgba(20,40,55,.25)] p-4 last:border-r-0">
                  <strong className={`block font-mono text-[20px] font-medium ${index === 2 ? "text-[#d8751b]" : ""}`}>{value}</strong>
                  <small className={`mt-2 block font-mono text-[7px] uppercase tracking-[.14em] ${index === 2 ? "text-[#d8751b]" : "text-[#8b9ba4]"}`}>{label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="p-[42px_54px] max-[680px]:p-[34px_22px]">
            <p className="font-mono text-[9px] font-medium uppercase tracking-[.17em] text-[#8b9ba4]">What would actually help</p>
            <p className="mt-5 max-w-[460px] text-[19px] leading-[1.35] font-semibold">
              Your refund is settled. Volunteer #43 is still awake, and a good bug report goes further than a demand.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com/LNReader/lnreader" className="inline-flex min-h-[48px] items-center bg-[#0e7490] px-6 font-mono text-[10px] font-medium uppercase tracking-[.12em] text-white! no-underline transition hover:bg-[#0a6179]">★ Star the repo</a>
              <a href="https://github.com/LNReader/lnreader/issues/new/choose" className="inline-flex min-h-[48px] items-center border border-[rgba(20,40,55,.22)] bg-[#f7faf9] px-6 font-mono text-[10px] font-medium uppercase tracking-[.12em] text-[#273743]! no-underline transition hover:bg-[#dfeaea]">File a real bug</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f1f5f4]">
        <div className="flex items-center justify-between border-b border-[rgba(20,40,55,.14)] px-9 py-4 font-mono text-[10px] font-medium uppercase tracking-[.17em] max-[680px]:px-5">
          <span className="text-[#0e7490]">⟩ Dispute FAQ</span>
          <span className="text-[#8a9aa3]">[ also a joke ]</span>
        </div>
        <div className="grid grid-cols-2 gap-x-12 px-9 py-10 max-[760px]:grid-cols-1 max-[680px]:px-5">
          {questions.map(({ question, answer }, index) => (
            <article key={question} className="border-t border-dotted border-[rgba(20,40,55,.25)] py-5">
              <h3 className="text-[15px] font-semibold">{question}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-[#586c78]">
                {answer}{" "}
                {index === questions.length - 1 && (
                  <Link href="/" className="font-medium text-[#0e7490] no-underline hover:underline">
                    Back to the app →
                  </Link>
                )}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
