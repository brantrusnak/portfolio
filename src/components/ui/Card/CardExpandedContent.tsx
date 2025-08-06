import type { ReactNode } from "react";

interface CardExpandedContentProps {
  children?: ReactNode;
  className?: string;
}

export function CardExpandedContent({ children, className = "" }: CardExpandedContentProps) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;

  return (
    <div className={`mt-4 sm:mt-5 lg:mt-6 pt-6 mx-6 border-b border-card-border pb-4 ${className}`}>
      {children}
    </div>
  );
}
