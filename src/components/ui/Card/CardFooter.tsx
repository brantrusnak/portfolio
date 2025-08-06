import React, { ReactNode } from "react";

interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`p-6 font-semibold text-white text-lg ${className}`}>
      {children}
    </div>
  );
}
