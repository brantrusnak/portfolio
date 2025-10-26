import { useProjects } from "../hooks/useProjects";
import ProjectItem from "./ProjectItem";
import { isValueEven } from "@/utils/numbers";

export default function ProjectItems() {
  const { projects } = useProjects();
  return (
    <ul role="list" className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-2">
      {projects.map((project, index) => (
        <li key={project.title}>
          <ProjectItem project={project} isEven={isValueEven(index)} />
        </li>
      ))}
    </ul>
  );
}