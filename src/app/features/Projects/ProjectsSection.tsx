"use client";

import { Section } from "@/components/ui";
import { ProjectsProvider } from "./context/ProjectsContext";
import ProjectItems from "./components/ProjectItems";
import { useTranslations } from "next-intl";

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  return (
    <ProjectsProvider>
      <Section id="projects">
        <Section.Heading>{t("heading")}</Section.Heading>
        <Section.Subtitle>{t("subheading")}</Section.Subtitle>
        <ProjectItems />
      </Section>
    </ProjectsProvider>
  );
}
