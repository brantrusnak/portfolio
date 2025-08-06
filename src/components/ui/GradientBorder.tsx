"use client";

import { forwardRef, ForwardedRef } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface GradientBorderProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  borderRadius?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  blurAmount?: string;
  contentClasses?: string;
  disableHover?: boolean;
  inset?: string;
}

export const GradientBorder = forwardRef(function GradientBorder(
  {
    children,
    isActive = true,
    className = "",
    borderRadius = "rounded-md",
    gradientFrom = "from-gradient-from",
    gradientVia = "via-gradient-via",
    gradientTo = "to-gradient-to",
    blurAmount = "blur-[0.5px]",
    contentClasses = "",
    disableHover = false,
    inset = "-inset-0.5",
  }: GradientBorderProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const containerClass = `relative group ${className}`;
  const borderClass = `
    absolute ${inset} ${borderRadius} bg-gradient-to-r
    ${gradientFrom} ${gradientVia} ${gradientTo}
    ${blurAmount} z-0
  `;
  const contentClass = `relative z-10 will-change-transform ${contentClasses}`;

  return (
    <motion.div
      ref={ref}
      className={containerClass}
      whileHover={disableHover ? {} : { scale: 1.01 }}
    >
      <motion.div
        className={borderClass}
        aria-hidden="true"
        initial={{ opacity: isActive ? 1 : 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div className={contentClass}>
        {children}
      </motion.div>
    </motion.div>
  );
});
