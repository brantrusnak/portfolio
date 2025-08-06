"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSection } from "@/context/SectionContext";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

function SectionHeading({ children, className = "" }: HeadingProps) {
  const { underlineRef, inView } = useSection();

  return (
    <div className="mb-4 text-left">
      <h2
        className={`text-3xl font-bold mb-2 text-white inline-block ${className}`}
      >
        {children}
      </h2>
      <motion.div
        ref={underlineRef}
        initial={{ x: -40, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="h-1 w-20 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to rounded-full mb-4"
      />
    </div>
  );
}

export { SectionHeading };
