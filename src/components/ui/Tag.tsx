"use client";

import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      title={typeof children === "string" ? children : undefined}
      className={`inline-block px-2 py-1 text-white rounded border bg-transparent text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
