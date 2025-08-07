"use client";

import { useRef, useEffect, forwardRef, PropsWithChildren } from "react";
import DropdownContext from "@/context/DropdownContext";

export interface DropdownProps extends PropsWithChildren {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { children, className = "", isOpen, setIsOpen },
  ref,
) {
  const internalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(internalRef.current);
    } else if ("current" in ref && ref.current !== internalRef.current) {
      (ref as React.RefObject<HTMLDivElement>).current = internalRef.current!;
    }
  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        internalRef.current &&
        !internalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={`relative ${className}`} ref={internalRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = "Dropdown";

export { Dropdown };
