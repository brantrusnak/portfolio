"use client";

import { Tooltip } from "@/components/ui";
import { SkillItem as SkillItemType } from "@/context/SkillsContext";
import Image from "next/image";

export default function SkillItem({ skill }: { skill: SkillItemType }) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
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
      </Tooltip.Trigger>
      <Tooltip.Content>{skill.title}</Tooltip.Content>
    </Tooltip>
  );
}
