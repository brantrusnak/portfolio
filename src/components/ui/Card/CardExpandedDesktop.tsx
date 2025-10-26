"use client";

import React, {
  ReactNode,
  Children,
  isValidElement,
  MouseEvent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { GradientBorder } from "@/components/ui";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardExpandedContent } from "./CardExpandedContent";
import { CardFooter } from "./CardFooter";
import { FaXmark } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface CardExpandedDesktopProps {
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

export function CardExpandedDesktop({
  children,
  isExpanded,
  onCloseAction,
  onExitingChangeAction,
  cardPosition,
}: CardExpandedDesktopProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const showCloseButton = isAnimationComplete && isExpanded && !isExiting;
  const showOverlay = isAnimationComplete && isExpanded && !isExiting;
  const cardZIndex = (isAnimationComplete && isExpanded && !isExiting) ? 70 : 40;
  const t = useTranslations("actions");

  const close = useCallback(() => {
    if (!isExpanded) return;
    setIsExiting(true);
    onExitingChangeAction(true);
    onCloseAction();
    setIsAnimationComplete(false);
  }, [isExpanded, onCloseAction, onExitingChangeAction]);

  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (!isExpanded) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isExpanded]);

  if (!children) return null;

  const { header, content, expanded, footer } = Children.toArray(
    children,
  ).reduce(
    (acc, child) => {
      if (!isValidElement(child)) return acc;
      if (child.type === CardHeader) acc.header = child;
      else if (child.type === CardContent) acc.content = child;
      else if (child.type === CardExpandedContent) acc.expanded = child;
      else if (child.type === CardFooter) acc.footer = child;
      return acc;
    },
    { header: null, content: null, expanded: null, footer: null } as Record<
      string,
      ReactNode
    >,
  );

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsExiting(false);
        setIsAnimationComplete(false);
        onExitingChangeAction(false);
      }}
    >
      {isExpanded && (
        <>
          {showOverlay && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e: MouseEvent) =>
                e.target === e.currentTarget && close()
              }
            />
          )}
          <motion.div
            className="fixed"
            style={{ zIndex: cardZIndex }}
            initial={
              prefersReducedMotion
                ? { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }
                : {
                  top: cardPosition.top,
                  left: cardPosition.left,
                  width: cardPosition.width,
                  height: cardPosition.height,
                  opacity: 1,
                }
            }
            animate={{
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              width: undefined,
              height: "auto",
              opacity: 1,
            }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                  top: cardPosition.top,
                  left: cardPosition.left,
                  x: 0,
                  y: 0,
                  width: cardPosition.width,
                  height: cardPosition.height,
                }
            }
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setIsAnimationComplete(true)}
          >
            <GradientBorder
              isActive={true}
              className="size-full m-2"
              contentClasses="size-full"
              disableHover={true}
              blurAmount="blur-[7px]"
              inset="-inset-1"
            >
              <div className="flex flex-col rounded-md bg-card border border-card-border shadow-lg size-full max-w-[99vw] max-h-[85vh] overflow-hidden">
                {showCloseButton && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute text-2xl top-4 right-4 text-muted-foreground/80 hover:text-muted-foreground transition-colors cursor-pointer flex items-center gap-1"
                    onClick={close}
                    role="button"
                    aria-label={t("close")}
                  >
                    <FaXmark />
                    <span className="text-sm">{t("close")}</span>
                  </motion.div>
                )}
                {header}
                {content}
                <div className="flex-1 flex items-start justify-center overflow-y-auto">
                  {expanded}
                </div>
                {footer}
              </div>
            </GradientBorder>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
