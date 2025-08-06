"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { isValueEven } from "@/utils/numbers";

export interface TimelineItemProps {
  children: ReactNode;
  dotColor?: string;
  index?: number;
}

function TimelineItem({
  children,
  index = 0,
  dotColor = "from-gradient-from via-gradient-via to-gradient-to",
}: TimelineItemProps) {
  const isEven = isValueEven(index);

  return (
    <div className="relative">
      <span
        className={`absolute left-2 md:left-1/2 top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${dotColor} shadow-lg`}
        aria-hidden="true"
      />
      <motion.div
        className={`flex flex-col md:flex-row items-start ml-8 md:ml-0 ${
          isEven ? "" : "md:flex-row-reverse"
        }`}
        initial={{
          opacity: 0,
          x: isEven ? "-2.5%" : "2.5%",
          visibility: "hidden",
        }}
        whileInView={{ opacity: 1, x: 0, visibility: "visible" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div
          className={`${
            isEven ? "md:pr-4" : "md:pl-4"
          } w-full md:w-1/2 transition-all duration-300 ease-in-out`}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export { TimelineItem };
