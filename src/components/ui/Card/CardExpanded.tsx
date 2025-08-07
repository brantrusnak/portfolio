"use client";

import type { ReactNode } from "react";
import { usePlatform, PLATFORM } from "@/hooks/usePlatform";
import { CardExpandedMobile } from "./CardExpandedMobile";
import { CardExpandedDesktop } from "./CardExpandedDesktop";

interface CardExpandedProps {
  children?: ReactNode;
  isExpanded: boolean;
  onCloseAction: () => void;
  onExitingChangeAction: (isExiting: boolean) => void;
  cardPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export function CardExpanded({
  children,
  isExpanded,
  onCloseAction,
  onExitingChangeAction,
  cardPosition,
}: CardExpandedProps) {
  const platform = usePlatform();

  if (platform === PLATFORM.MOBILE) {
    return (
      <CardExpandedMobile
        isExpanded={isExpanded}
        onCloseAction={onCloseAction}
        onExitingChangeAction={onExitingChangeAction}
      >
        {children}
      </CardExpandedMobile>
    );
  }

  return (
    <CardExpandedDesktop
      isExpanded={isExpanded}
      onCloseAction={onCloseAction}
      onExitingChangeAction={onExitingChangeAction}
      cardPosition={cardPosition}
    >
      {children}
    </CardExpandedDesktop>
  );
}
