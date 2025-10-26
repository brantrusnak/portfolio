"use client";

import { createContext, type ReactNode, useMemo, useState } from "react";
import { socials as initialSocials } from "@/data/socials";
import { Social } from "@/types";

type SocialsContextType = {
  socials: readonly Social[];
};

export const SocialsContext = createContext<SocialsContextType | undefined>(undefined);


export function SocialsProvider({ children }: { children: ReactNode }) {
  const [socials] = useState<readonly Social[]>(initialSocials);
  const value = useMemo(() => ({ socials }), [socials]);

  return (
    <SocialsContext.Provider value={value}>{children}</SocialsContext.Provider>
  );
}