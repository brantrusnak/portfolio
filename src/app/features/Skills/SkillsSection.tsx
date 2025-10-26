"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui";
import SkillItems from "./components/SkillItems";
import { SkillsProvider } from "./context/SkillsContext";
import { useTranslations } from "next-intl";

export default function SkillsSection() {
  const t = useTranslations('Skills');

  return (
    <SkillsProvider>
      <Section id="skills">
        <Section.Heading>{t('heading')}</Section.Heading>
        <Section.Subtitle>
          {t('subheading')}
        </Section.Subtitle>

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 },
            y: { duration: 0.5, delay: 0.2 },
          }}
        >
          <SkillItems />
        </motion.div>
      </Section>
    </SkillsProvider>
  );
}
