"use client";

import { useWorks } from "@/context/WorksContext";
import { Section, Timeline } from "@/components/ui";
import { WorkCard } from "@/app/sections/Works/WorkCard";

export default function WorksSection() {
  const { works } = useWorks();
  return (
    <Section id="work">
      <Section.Heading>Work Experience</Section.Heading>
      <Section.Subtitle>
        Work that&apos;s shaped how I approach engineering and product
      </Section.Subtitle>
      <Timeline>
        {works.map((work) => (
          <Timeline.Item
            key={work.title}
            dotColor={
              work.current
                ? "from-gradient-from via-gradient-via to-gradient-to"
                : "from-gray-500 to-gray-500"
            }
          >
            <WorkCard work={work} />
          </Timeline.Item>
        ))}
      </Timeline>
    </Section>
  );
}
