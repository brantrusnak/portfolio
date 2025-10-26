"use client";

import { useSkills } from "../hooks/useSkills";
import { FEATURED_FILTER } from "../context/SkillsContext";
import { SkillCategory } from "@/types/Skill";
import { useTranslations } from "next-intl";
import FilterButton from "./FilterButton";

export default function SkillsFilter() {
  const t = useTranslations('Skills.filters');
  const { activeFilter, setActiveFilter } = useSkills();

  const options = [
    {
      value: FEATURED_FILTER.value,
      label: t('featured'),
    },
    ...Object.values(SkillCategory).map((type) => ({
      value: type,
      label: t(type),
    })),
  ];

  return (
    <div
      role="group"
      aria-label="Skill category filters"
      className="overflow-x-auto py-2 mb-8"
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-1 max-w-8xl min-w-max">
        {options.map((option) => (
          <FilterButton
            key={String(option.value)}
            onClick={() => setActiveFilter(option.value)}
            active={activeFilter === option.value}
            aria-pressed={activeFilter === option.value}
            size="sm"
            variant="secondary"
            className="flex-shrink-0"
            aria-label={option.label}
          >
            {option.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}
