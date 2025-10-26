import { Skill } from "./Skill";

export type Work = {
  title: string;
  image: string;
  stack: Skill[];
  link?: string;
  time: { from: Date; to?: Date | null };
  current: boolean;
};
