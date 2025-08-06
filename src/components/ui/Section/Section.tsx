"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useInView } from "framer-motion";
import { SectionContext } from "@/context/SectionContext";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

function Section({ id, className = "", children }: SectionProps) {
  const underlineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(underlineRef, { once: true, margin: "-20% 0px" });

  return (
    <SectionContext.Provider value={{ underlineRef, inView }}>
      <section
        id={id}
        className={`flex justify-center items-center py-20 px-4 scroll-mt-18 ${className}`}
      >
        <div className="container">{children}</div>
      </section>
    </SectionContext.Provider>
  );
}

export { Section };
