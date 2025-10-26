"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

function SectionHeading({ children, className = "" }: HeadingProps) {
  return (
    <div className="mb-4 text-left">
      <h2
        className={`text-3xl font-bold mb-2 inline-block ${className}`}
      >
        {children}
      </h2>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="h-1 w-20 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to rounded-full mb-4"
      />
    </div>
  );
}

export { SectionHeading };
