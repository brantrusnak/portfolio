"use client";

import { useSkills, FEATURED_FILTER } from "@/context/SkillsContext";
import { SkillCategory } from "@/types/Skill";
import { Button } from "@/components/ui";

export default function SkillsFilter() {
  const { activeFilter, setActiveFilter } = useSkills();

  const options = [
    { value: FEATURED_FILTER, label: "Featured" },
    ...Object.values(SkillCategory).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  return (
    <div role="group" aria-label="Skill category filters" className="overflow-x-auto py-2 mb-8">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-2 mx-auto px-4 min-w-max">
        {options.map((option) => (
          <Button
            key={String(option.value)}
            onClick={() => setActiveFilter(option.value)}
            active={activeFilter === option.value}
            aria-pressed={activeFilter === option.value}
            size="md"
            variant="secondary"
            className="flex-shrink-0"
            ariaLabel={option.label}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
