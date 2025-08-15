"use client";

import { useRef, useEffect, forwardRef, PropsWithChildren } from "react";
import DropdownContext from "@/context/DropdownContext";
import { useModal } from "@/hooks/useModal";

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
  const { addModal, removeModal } = useModal();
  const prevOpenRef = useRef(isOpen);
  const openRef = useRef(isOpen);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(internalRef.current);
    } else if ("current" in ref && ref.current !== internalRef.current) {
      (ref as React.RefObject<HTMLDivElement>).current = internalRef.current!;
    }
  }, [ref]);

  useEffect(() => {
    const prev = prevOpenRef.current;
    if (prev !== isOpen) {
      if (isOpen) addModal();
      else removeModal();
      prevOpenRef.current = isOpen;
      openRef.current = isOpen;
    } else {
      openRef.current = isOpen;
    }
  }, [isOpen, addModal, removeModal]);

  useEffect(() => {
    return () => {
      if (openRef.current) removeModal();
    };
  }, [removeModal]);

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
