"use client";

import { motion } from "framer-motion";
import ProfileImage from "@/app/sections/About/ProfileImage";
import HeroHeading from "@/app/sections/About/HeroHeading";
import Biography from "@/app/sections/About/Biography";
import { Section } from "@/components/ui";

export default function AboutSection() {
  return (
    <Section id="about" className="bg-card border-b border-card-border">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ease: [0.455, 0.03, 0.515, 0.955], delay: 0.6 }}
        className="hero min-w-full flex flex-col md:flex-row justify-center items-center align-center gap-8 md:gap-10 px-4 mb-8"
      >
        <ProfileImage />
        <HeroHeading />
      </motion.div>
      <Biography />
    </Section>
  );
}
