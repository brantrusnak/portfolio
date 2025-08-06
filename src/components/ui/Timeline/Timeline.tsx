"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import type { TimelineItemProps } from "./TimelineItem";

interface TimelineProps {
  children: ReactNode;
}

function Timeline({ children }: TimelineProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-from via-gradient-via to-gradient-to rounded-full" />
      {items.map((child, index) => (
        <div key={index} className={index !== items.length - 1 ? "mb-16" : ""}>
          {cloneElement(child as ReactElement<TimelineItemProps>, { index })}
        </div>
      ))}
    </div>
  );
}

export { Timeline };
