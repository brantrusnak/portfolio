"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Biography() {
  const t = useTranslations('About.Bio');
  const paragraphs = t.raw('paragraphs');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 1.5, ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
      className="container mx-auto px-4"
    >
      {paragraphs.map((text: string, index: number) => (
        <p key={index} className={index === 0 ? "mb-4" : undefined}>
          {text}
        </p>
      ))}
    </motion.div>
  );
}
