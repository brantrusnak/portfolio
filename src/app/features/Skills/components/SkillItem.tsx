"use client";

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui";
import { type SkillItem } from "@/types";
import Image from "next/image";

export default function SkillItem({ skill }: { skill: SkillItem }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center justify-center p-2">
          <Image
            src={skill.image}
            alt={skill.title}
            width={48}
            height={48}
            className="size-12 object-contain transition-transform duration-300"
            loading="lazy"
            aria-hidden="true"
            priority={false}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{skill.title}</TooltipContent>
    </Tooltip>
  );
}
