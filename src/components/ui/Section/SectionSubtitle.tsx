"use client";

import type { ReactNode } from "react";

interface SubtitleProps {
  children: ReactNode;
  className?: string;
}

function SectionSubtitle({ children, className = "" }: SubtitleProps) {
  return <p className={`text-gray-300 mb-4 ${className}`}>{children}</p>;
}

export { SectionSubtitle };
