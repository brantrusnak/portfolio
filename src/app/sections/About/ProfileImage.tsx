"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientBorder } from "@/components/ui";

export default function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.1, ease: "easeOut", duration: 0.8 }}
      className="md:order-2 mb-8 md:mb-0"
    >
      <GradientBorder borderRadius="rounded-full" className="p-0.5" disableHover={true}>
        <Image
          src="/img/profile/brant.png"
          alt="Brant Rusnak"
          width={220}
          height={220}
          className="rounded-full object-cover"
          priority
        />
      </GradientBorder>
    </motion.div>
  );
}
