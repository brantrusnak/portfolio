"use client";

import { useProjects } from "@/context/ProjectsContext";
import { Section } from "@/components/ui";
import ProjectCard from "@/app/sections/Projects/ProjectCard";
import { isValueEven } from "@/utils/numbers";

export default function ProjectsSection() {
  const { projects } = useProjects();
  return (
    <Section id="projects">
      <Section.Heading>Projects</Section.Heading>
      <Section.Subtitle>A few highlights from the build log</Section.Subtitle>
      <ul role="list" className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-2">
        {projects.map((project, index) => (
          <li key={project.title}>
            <ProjectCard project={project} isEven={isValueEven(index)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
