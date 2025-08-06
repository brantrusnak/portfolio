import { ProjectsProvider } from "@/context/ProjectsContext";
import { SkillsProvider } from "@/context/SkillsContext";
import { WorksProvider } from "@/context/WorksContext";
import { SocialsProvider } from "@/context/SocialsContext";
import { ModalProvider } from "@/context/ModalContext";
import type { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <ProjectsProvider>
        <SkillsProvider>
          <WorksProvider>
            <SocialsProvider>
              {children}
            </SocialsProvider>
          </WorksProvider>
        </SkillsProvider>
      </ProjectsProvider>
    </ModalProvider>
  );
}
