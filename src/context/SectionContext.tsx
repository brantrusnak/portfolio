"use client";

import { createContext, useContext } from "react";
import type { RefObject } from "react";

export type SectionContextType = {
  underlineRef: RefObject<HTMLDivElement | null>;
  inView: boolean;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a Section");
  }
  return context;
}

export { SectionContext };
