"use client";

import type { PropsWithChildren, KeyboardEvent } from "react";
import { useDropdown } from "@/hooks/useDropdown";

interface DropdownTriggerProps extends PropsWithChildren {
  className?: string;
}

function DropdownTrigger({ children, className = "" }: DropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdown();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      e.preventDefault();
      setIsOpen(e.key === "Escape" ? false : !isOpen);
    }
  };

  return (
    <div
      className={`select-none ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      role="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export { DropdownTrigger };
