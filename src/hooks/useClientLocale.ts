import { useState } from "react";

export function useClientLocale(defaultLocale = "en-US") {
  const [locale] = useState(() => {
    if (typeof window !== "undefined") {
      return navigator.languages?.[0] || navigator.language || defaultLocale;
    }
    return defaultLocale;
  });

  return locale;
}
