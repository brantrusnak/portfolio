"use client";

import { type Work } from "@/types";
import { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { works as initialWorks } from "@/data/works";

type WorksContextType = {
  works: readonly Work[];
};

export const WorksContext = createContext<WorksContextType | undefined>(undefined);

export function WorksProvider({ children }: { children: ReactNode }) {
  const [works] = useState<readonly Work[]>(initialWorks);
  const value = useMemo(() => ({ works }), [works]);

  return (
    <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
  );
}