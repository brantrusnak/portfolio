"use client";

import { projects as initialProjects } from "@/data/projects";
import { Project } from "@/types";
import { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

type ProjectsContextType = {
  projects: readonly Project[];
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects] = useState<readonly Project[]>(initialProjects);
  const value = useMemo(() => ({ projects }), [projects]);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
