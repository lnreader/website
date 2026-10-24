"use client";

import { useEffect, useState } from "react";

export default function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStars() {
      try {
        const response = await fetch("/api/github-stars", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        if (typeof data.stars === "number" && Number.isInteger(data.stars) && data.stars >= 0) {
          setStars(data.stars);
        }
      } catch {
        // Keep the GitHub link usable when the count is unavailable.
      }
    }

    void loadStars();
    return () => controller.abort();
  }, []);

  if (stars === null) return null;

  const count = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stars);

  return (
    <span
      className="inline-flex items-center gap-1.5 bg-[var(--color-accent-soft)] px-1.5 py-0.5 text-[var(--color-accent-strong)]"
      aria-label={`${stars.toLocaleString("en-US")} GitHub stars`}
      title={`${stars.toLocaleString("en-US")} GitHub stars`}
    >
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">{count}</span>
    </span>
  );
}
