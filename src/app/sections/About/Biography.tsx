"use client";

import { motion } from "framer-motion";

export default function Biography() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 1.5, ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
      className="container mx-auto text-gray-300 px-4"
    >
      <p className="mb-4">
        I&apos;m a self-taught senior frontend/full-stack engineer with 9+ years of experience helping teams bring ideas to life through fast, intuitive, and accessible web apps. Across startups, agencies, and product teams, I&apos;ve worn a lot of hats and always found joy in making complex things feel effortless.
      </p>
      <p>
        Whether I&apos;m deep in component architecture, nudging a UI into place, or tuning performance to make an app feel right, I care about the details. Great software shouldn&apos;t just work. It should feel thoughtfully crafted, clear, scalable, and built with the user in mind.
      </p>
    </motion.div>
  );
}
