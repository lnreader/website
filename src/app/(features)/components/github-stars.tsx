"use client";

import { useSyncExternalStore } from "react";
import { siteStats } from "@/lib/site-stats";

interface StarsCache {
  stars: number;
  expiresAt: number;
}

const storageKey = "lnreader:github-stars:v1";
const cacheDuration = 60 * 60 * 1000;
let cached: StarsCache | undefined;
let pending: Promise<number | null> | undefined;
const listeners = new Set<() => void>();
let storageRead = false;

function isStarsCache(value: unknown): value is StarsCache {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StarsCache>;
  return typeof candidate.stars === "number" &&
    Number.isSafeInteger(candidate.stars) && candidate.stars >= 0 &&
    typeof candidate.expiresAt === "number" && Number.isFinite(candidate.expiresAt);
}

function readCache() {
  if (cached || storageRead) return cached;
  storageRead = true;
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (isStarsCache(stored)) cached = stored;
  } catch {
    // Storage may be unavailable; the in-memory cache still works.
  }
  return cached;
}

function loadStars(): Promise<number | null> {
  if (cached && cached.expiresAt > Date.now()) return Promise.resolve(cached.stars);
  if (pending) return pending;

  // Share one request across header remounts and keep stale data on failure.
  pending = (async () => {
    try {
      const response = await fetch("/api/github-stars");
      if (!response.ok) return null;
      const data = await response.json();
      if (typeof data.stars !== "number" || !Number.isSafeInteger(data.stars) || data.stars < 0) return null;
      cached = { stars: data.stars, expiresAt: Date.now() + cacheDuration };
      listeners.forEach((listener) => listener());
      try {
        localStorage.setItem(storageKey, JSON.stringify(cached));
      } catch {
        // Caching in memory is sufficient when storage is blocked or full.
      }
      return cached.stars;
    } catch {
      return null;
    } finally {
      pending = undefined;
    }
  })();
  return pending;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  readCache();
  void loadStars();
  return () => { listeners.delete(listener); };
}

function getSnapshot() {
  return readCache()?.stars ?? null;
}

function getServerSnapshot() {
  return null;
}

export default function GitHubStars() {
  // Route remounts read the shared snapshot immediately, without a placeholder render.
  const stars = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const count = stars === null ? siteStats.stars : new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stars);
  const label = stars === null ? `Approximately ${siteStats.stars} GitHub stars` : `${stars.toLocaleString("en-US")} GitHub stars`;

  return (
    <span
      className="inline-flex w-[8ch] shrink-0 items-center justify-center gap-1.5 bg-[var(--color-accent-soft)] px-1.5 py-0.5 text-[var(--color-accent-strong)] tabular-nums"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">{count}</span>
    </span>
  );
}
