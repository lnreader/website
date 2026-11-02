"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useClipboardFeedback(resetDelay = 1500) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>();
  const [animated, setAnimated] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const request = useRef(0);

  useEffect(() => () => {
    request.current += 1;
    clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async (value: string, animate: boolean) => {
    const currentRequest = ++request.current;
    clearTimeout(timer.current);
    setAnimated(animate);
    setError(undefined);
    try {
      await navigator.clipboard.writeText(value);
      if (currentRequest !== request.current) return;
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), resetDelay);
    } catch {
      if (currentRequest !== request.current) return;
      setCopied(false);
      setError("Unable to copy. Please select and copy the link or name manually.");
    }
  }, [resetDelay]);

  return { copied, error, animated, copy };
}
