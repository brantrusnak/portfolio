"use client";

import React, { ReactNode, Children, isValidElement } from "react";
import { GradientBorder } from "@/components/ui";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardExpandedContent } from "./CardExpandedContent";
import { CardFooter } from "./CardFooter";
import { FaXmark } from "react-icons/fa6";

interface CardExpandedMobileProps {
  children?: ReactNode;
  isExpanded: boolean;
  onCloseAction: () => void;
  onExitingChangeAction: (isExiting: boolean) => void;
}

export function CardExpandedMobile({
  children,
  isExpanded,
  onCloseAction,
  onExitingChangeAction,
}: CardExpandedMobileProps) {
  if (!children || !isExpanded) return null;

  const close = () => {
    onExitingChangeAction(true);
    onCloseAction();
    onExitingChangeAction(false);
  };

  const { header, content, expanded, footer } = Children.toArray(children).reduce(
    (acc, child) => {
      if (!isValidElement(child)) return acc;
      if (child.type === CardHeader) acc.header = child;
      else if (child.type === CardContent) acc.content = child;
      else if (child.type === CardExpandedContent) acc.expanded = child;
      else if (child.type === CardFooter) acc.footer = child;
      return acc;
    },
    {
      header: null,
      content: null,
      expanded: null,
      footer: null,
    } as Record<string, ReactNode>
  );  

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <GradientBorder
        isActive
        className="w-[95%] h-[95%]"
        contentClasses="size-full"
      >
        <div className="relative flex flex-col bg-card border border-card-border shadow-lg rounded-md max-w-full max-h-full overflow-auto">
          <div
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-1"
            onClick={close}
            role="button"
            aria-label="Close"
          >
            <FaXmark />
            <span className="text-sm">Close</span>
          </div>
          {header}
          {content}
          <div className="flex-1 overflow-y-auto">{expanded}</div>
          {footer}
        </div>
      </GradientBorder>
    </div>
  );
}
