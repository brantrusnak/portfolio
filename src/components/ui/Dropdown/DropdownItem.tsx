"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface DropdownItemProps extends PropsWithChildren {
  className?: string;
}

function DropdownItem({ children, className = "" }: DropdownItemProps) {
  return (
    <motion.div
      className={`px-2 py-1 text-sm transition-all duration-200 hover:text-pink-400 hover:translate-x-1 ${className}`}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </motion.div>
  );
}

export { DropdownItem };
