"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface DropdownItemProps extends PropsWithChildren {
  className?: string;
}

function DropdownItem({ children, className = "" }: DropdownItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className={`px-2 py-1 ${className}`}
      role="menuitem"
      tabIndex={-1}
    >
      {children}
    </motion.div>
  );
}

export { DropdownItem };
