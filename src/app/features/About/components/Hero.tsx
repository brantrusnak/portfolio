"use client";

import { motion } from "framer-motion";
import WavingEmoji from "./WavingEmoji";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('About.Hero');

  return (
    <div className="flex flex-col order-2 md:order-1">
      <motion.h1
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: "0px" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="heading-h1 text-5xl md:text-6xl font-bold mb-4"
      >
        {t('heading')}
        <WavingEmoji />
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="heading-h2 text-4xl md:text-5xl font-semibold mb-6"
      >
        {t('subheading')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="heading-p text-base md:text-lg leading-relaxed mx-auto mb-4"
      >
        {t('tagline')}
      </motion.p>
    </div>
  );
}
