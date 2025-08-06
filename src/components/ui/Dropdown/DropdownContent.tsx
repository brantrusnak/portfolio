"use client";

import {
  forwardRef,
  PropsWithChildren,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropdown } from "@/context/DropdownContext";

interface DropdownContentProps extends PropsWithChildren {
  className?: string;
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className = "" }, ref) => {
    const { isOpen } = useDropdown();
    const [alignment, setAlignment] = useState<"left" | "right">("left");
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => contentRef.current as HTMLDivElement, []);

    useEffect(() => {
      if (!isOpen || !contentRef.current?.parentElement) return;

      requestAnimationFrame(() => {
        const parentRect =
          contentRef.current!.parentElement!.getBoundingClientRect();
        const dropdownWidth = contentRef.current!.offsetWidth;
        const viewportWidth = window.innerWidth;

        setAlignment(
          parentRect.right + dropdownWidth > viewportWidth ? "right" : "left",
        );
      });
    }, [isOpen]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 rounded-md shadow-lg bg-card border border-card-border overflow-hidden ${
              alignment === "right" ? "right-0" : "left-0"
            } ${className}`}
            role="menu"
            aria-hidden={!isOpen}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

DropdownContent.displayName = "DropdownContent";

export { DropdownContent };
