"use client";

import { Section } from "@/components/ui";
import WorkItems from "./components/WorkItems";
import { WorksProvider } from "./context/WorksContext";
import { useTranslations } from "next-intl";

export default function WorksSection() {
  const t = useTranslations('Work');
  return (
    <WorksProvider>
      <Section id="work">
        <Section.Heading>{t('heading')}</Section.Heading>
        <Section.Subtitle>
          {t('subheading')}
        </Section.Subtitle>
        <WorkItems />
      </Section>
    </WorksProvider>
  );
}
