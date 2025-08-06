"use client";

import { Button } from "@/components/ui";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function ThemeSwitch() {
  const [isDark, toggle] = useDarkMode();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 hidden"
      ariaLabel="Toggle theme"
      onClick={() => toggle(!isDark)}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </Button>
  );
}
