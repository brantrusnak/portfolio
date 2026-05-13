"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    let mounted = true;

    const media = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      if (!mounted) return;
      setMatches(event.matches);
    };

    queueMicrotask(() => {
      if (!mounted) return;
      setMatches(media.matches);
    });

    media.addEventListener("change", listener);

    return () => {
      mounted = false;
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
