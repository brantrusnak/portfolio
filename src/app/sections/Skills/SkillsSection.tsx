"use client";

import { useSkills } from "@/context/SkillsContext";
import { Section } from "@/components/ui";
import SkillsFilter from "@/app/sections/Skills/SkillsFilter";
import SkillCard from "@/app/sections/Skills/SkillCard";

export default function SkillsSection() {
  const { filteredSkills } = useSkills();

  return (
    <Section id="skills">
      <Section.Heading>Skills</Section.Heading>
      <Section.Subtitle>What I&apos;ve used to bring ideas to life</Section.Subtitle>
      <SkillsFilter />
      <div className="mx-auto">
        <ul
          role="list"
          aria-label="Skills grid"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill) => (
            <li key={skill.title}>
              <SkillCard skill={skill} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
