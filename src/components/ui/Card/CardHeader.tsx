import React, { ReactNode } from "react";

interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  if (!children) return null;
  return (
    <div className={`p-6 pb-0 font-semibold text-white text-lg ${className}`}>
      {children}
    </div>
  );
}
