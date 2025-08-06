import { useEffect, useState, useRef } from "react";

export function useClientLocale(defaultLocale = "en-US") {
  const [locale, setLocale] = useState(defaultLocale);
  const mounted = useRef(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const detectedLocale = navigator.languages?.[0] || navigator.language;
      if (detectedLocale && mounted.current) {
        setLocale(detectedLocale);
      }
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  return locale;
}