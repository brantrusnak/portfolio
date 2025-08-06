import { Skill } from "./Skill";

export type Work = {
  title: string;
  position: string;
  image: string;
  stack: Skill[];
  link?: string;
  time: { from: Date; to?: Date | null };
  current: boolean;
  type: "Full Time" | "Contract";
  responsibilities?: string[];
};
