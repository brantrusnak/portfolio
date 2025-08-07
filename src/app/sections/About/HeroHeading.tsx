"use client";

import { motion } from "framer-motion";
import WavingEmoji from "@/app/sections/About/WavingEmoji";

export default function HeroHeading() {
  return (
    <div className="flex flex-col order-2 md:order-1">
      <motion.h1
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: "0px" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="heading-h1 text-5xl md:text-6xl font-bold mb-4 text-white"
      >
        Hello
        <WavingEmoji />
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="heading-h2 text-4xl md:text-5xl font-semibold mb-6 text-gray-100"
      >
        I&apos;m Brant Rusnak.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, translateY: "20px" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="heading-p text-base md:text-lg leading-relaxed text-gray-300 mx-auto mb-4"
      >
        I craft high-performance, user-focused web interfaces with polish and
        precision.
      </motion.p>
    </div>
  );
}
