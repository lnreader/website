import React from "react";
import { clsx } from "clsx";

interface DevicePreviewProps {
  readonly title: string;
  readonly subtitle: string;
  readonly footer: string;
  readonly accent: "indigo" | "cyan" | "violet";
  readonly items: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
}

const themeByAccent: Record<DevicePreviewProps["accent"], string> = {
  indigo:
    "bg-[linear-gradient(140deg,_rgba(64,84,255,0.9),_rgba(19,28,69,0.95))] border-[rgba(76,94,255,0.35)]",
  cyan: "bg-[linear-gradient(140deg,_rgba(20,216,255,0.8),_rgba(9,38,64,0.92))] border-[rgba(12,182,219,0.35)]",
  violet:
    "bg-[linear-gradient(140deg,_rgba(148,132,255,0.85),_rgba(45,30,104,0.92))] border-[rgba(142,126,255,0.4)]",
};

export default function DevicePreview({
  title,
  subtitle,
  footer,
  accent,
  items,
}: DevicePreviewProps): React.ReactElement {
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="absolute -inset-8 rounded-[2.2rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(20,216,255,0.1),rgba(64,84,255,0.35),transparent_70%)] blur-3xl opacity-80" />
      <div
        className={clsx(
          "relative overflow-hidden rounded-[2.1rem] border backdrop-blur-xl p-6 flex flex-col gap-4 text-white shadow-[0_32px_60px_rgba(5,10,26,0.5)]",
          themeByAccent[accent]
        )}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium uppercase tracking-[0.22em] opacity-85">
            {subtitle}
          </span>
          <span className="text-2xl font-semibold tracking-tight text-white/95">
            {title}
          </span>
        </div>

        <div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 flex flex-col gap-3">
          {items.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-white/70">{label}</span>
              <span className="font-semibold text-white/95">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-white/70">
          <span>{footer}</span>
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}
