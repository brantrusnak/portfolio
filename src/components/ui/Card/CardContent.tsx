import type { ReactNode } from "react";

interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 pb-0 ${className}`.trim()}>{children}</div>;
}

export { CardContent };
