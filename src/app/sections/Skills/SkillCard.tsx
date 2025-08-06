"use client";

import { Card } from "@/components/ui";
import { SkillItem } from "@/context/SkillsContext";
import Image from "next/image";

export default function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <Card className="flex" disableHover>
      <Card.Header className="flex-1 text-md text-center cursor-default pt-6!">
        {skill.title}
      </Card.Header>
      <Card.Content className="flex justify-center pt-2! pb-6!">
        <Image
          src={skill.image}
          alt={skill.title}
          width={64}
          height={64}
          className="size-16"
          loading="lazy"
          aria-hidden="true"
          priority={false}
        />
      </Card.Content>
    </Card>
  );
}
