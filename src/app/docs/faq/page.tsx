import type { ReactElement } from "react";

export const metadata = {
  title: "Frequently asked questions",
  description: "Answers to the most common LNReader setup and usage questions.",
};

export default function FaqPage(): ReactElement {
  const faqs = [
    {
      question: "Is LNReader available on iOS or desktop?",
      answer:
        "Not yet. LNReader focuses on Android, but the codebase is open source—community members can fork it for other platforms.",
    },
    {
      question: "How do I request a new source?",
      answer:
        "Open an issue in the lnreader-sources repository. Include the website URL, language, and any access requirements.",
    },
    {
      question: "Can I use my Tachiyomi backups?",
      answer:
        "Yes. Export a .json backup from Tachiyomi (or forks like TachiyomiSY). Then use Settings → Backup & Restore → Restore backup in LNReader to import.",
    },
    {
      question: "Does the app collect analytics?",
      answer:
        "No. LNReader does not collect telemetry or serve ads. All data stays on your device unless you explicitly opt in to external sync services.",
    },
    {
      question: "Do I need root access?",
      answer:
        "No root required. LNReader works on any modern Android phone or tablet running Android 6.0 (Marshmallow) or newer.",
    },
    {
      question: "How can I help?",
      answer:
        "Submit pull requests to the main repository, join the Crowdin project for translations, or assist readers in Discord.",
    },
  ];

  return (
    <div className="docs-content">
      <h1>Frequently asked questions</h1>
      <div className="grid gap-6">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="flex flex-col gap-2">
            <h2>{question}</h2>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
