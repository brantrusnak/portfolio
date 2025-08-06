import { Skill } from "./Skill";

export type Project = {
  title: string;
  image: string;
  description: string;
  stack: Skill[];
  link?: string;
  wip?: boolean;
};
