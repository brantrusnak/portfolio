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

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setPlatform(mediaQuery.matches ? PLATFORM.MOBILE : PLATFORM.DESKTOP);

    const handler = (event: MediaQueryListEvent) => {
      setPlatform(event.matches ? PLATFORM.MOBILE : PLATFORM.DESKTOP);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [breakpoint]);

  return platform;
}

export default usePlatform;
