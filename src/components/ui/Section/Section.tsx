"use client";

import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`flex justify-center items-center py-20 px-4 scroll-mt-18 ${className}`}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export { Section };
