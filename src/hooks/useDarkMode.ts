"use client";

import { useEffect, useState } from "react";

export function useDarkMode(defaultValue = true) {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setEnabled(stored ? stored === "dark" : defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return [enabled, setEnabled] as const;
}
