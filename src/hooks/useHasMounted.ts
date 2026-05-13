"use client";

import { useEffect, useState } from "react";

export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      setMounted(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return mounted;
}
