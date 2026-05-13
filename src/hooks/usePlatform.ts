import { useEffect, useState } from "react";

export enum PLATFORM {
  SSR = "ssr",
  MOBILE = "mobile",
  DESKTOP = "desktop",
}

export function usePlatform(breakpoint = 768): PLATFORM {
  const [platform, setPlatform] = useState<PLATFORM>(PLATFORM.SSR);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    let mounted = true;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (event: MediaQueryListEvent) => {
      if (!mounted) return;
      setPlatform(event.matches ? PLATFORM.MOBILE : PLATFORM.DESKTOP);
    };

    queueMicrotask(() => {
      if (!mounted) return;
      setPlatform(mediaQuery.matches ? PLATFORM.MOBILE : PLATFORM.DESKTOP);
    });

    mediaQuery.addEventListener("change", handler);

    return () => {
      mounted = false;
      mediaQuery.removeEventListener("change", handler);
    };
  }, [breakpoint]);

  return platform;
}

export default usePlatform;
