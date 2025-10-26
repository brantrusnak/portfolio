"use client";

import { createContext, useState, useMemo, type ReactNode } from "react";
import { SkillCategory, type SkillItem } from "@/types";
import { skills as initialSkills } from "@/data/skills";

export const FEATURED_FILTER = {
  value: "featured"
};

type SkillsContextType = {
  skills: Readonly<Record<SkillCategory, SkillItem[]>>;
  activeFilter: SkillCategory | string | null;
  setActiveFilter: (filter: SkillCategory | string | null) => void;
  filteredSkills: SkillItem[];
};

export const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills] =
    useState<Readonly<Record<SkillCategory, SkillItem[]>>>(initialSkills);
  const [activeFilter, setActiveFilter] = useState<
    SkillCategory | string | null
  >(FEATURED_FILTER.value);

  const filteredSkills = useMemo(() => {
    if (activeFilter === FEATURED_FILTER.value) {
      return Object.values(skills)
        .flat()
        .filter((skill) => skill.featured);
    }
    if (activeFilter) {
      return skills[activeFilter as SkillCategory];
    }
    return Object.values(skills).flat();
  }, [activeFilter, skills]);

  return (
    <SkillsContext.Provider
      value={{
        skills,
        activeFilter,
        setActiveFilter,
        filteredSkills,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}
