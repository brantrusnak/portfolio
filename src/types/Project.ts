import { Skill } from "./Skill";

export type Project = {
  id: string;
  title: string;
  image: string;
  stack: Skill[];
  link?: string;
  wip?: boolean;
};
