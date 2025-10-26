"use client";

import { Button } from "@/components/ui";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import usePlatform, { PLATFORM } from "@/hooks/usePlatform";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const platform = usePlatform();
  const isMobile = platform === PLATFORM.MOBILE;

  useEffect(() => setMounted(true), []);

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size={isMobile ? "lg" : "sm"}
      className="p-2"
      aria-label="Toggle theme"
      onClick={handleThemeToggle}
    >
      {mounted && (resolvedTheme === "dark" ? <FaSun aria-hidden /> : <FaMoon aria-hidden />)}
    </Button>
  );
}
