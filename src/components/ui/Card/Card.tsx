"use client";

import {
  ReactNode,
  useState,
  forwardRef,
  ForwardedRef,
  useRef,
  CSSProperties,
  Children,
  isValidElement,
  ReactElement,
  useMemo,
} from "react";
import { GradientBorder } from "@/components/ui";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardExpandedContent } from "./CardExpandedContent";
import { CardFooter } from "./CardFooter";
import { CardExpanded } from "./CardExpanded";
import { useModal } from "@/hooks/useModal";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  disableHover?: boolean;
  style?: CSSProperties;
  role?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface TypedComponent<P = unknown> {
  (props: P): ReactElement | null;
  componentType?: string;
}

(CardHeader as TypedComponent).componentType = "CardHeader";
(CardContent as TypedComponent).componentType = "CardContent";
(CardFooter as TypedComponent).componentType = "CardFooter";
(CardExpandedContent as TypedComponent).componentType = "CardExpandedContent";

const CARD_COMPONENT_TYPES = new Set([
  "CardHeader",
  "CardContent",
  "CardFooter",
]);

const Card = forwardRef(function Card(
  {
    children,
    className = "",
    hoverEffect = true,
    disableHover = false,
    style,
    role,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
  }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isHovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPosition, setCardPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const { addModal, removeModal } = useModal();

  const hasExpandedContent = useMemo(
    () =>
      Children.toArray(children).some(
        (child) =>
          isValidElement(child) &&
          (child.type as TypedComponent).componentType ===
            "CardExpandedContent",
      ),
    [children],
  );

  const handleCardClick = () => {
    if (!isExpanded && hasExpandedContent && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setIsExpanded(true);
      addModal();
    }
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
    setTimeout(() => {
      removeModal();
    }, 250);
  };

  const handleExitingChange = (value: boolean) => {
    setIsExiting(value);
  };

  const shouldHide = isExpanded || isExiting;

  const renderStaticChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return null;
    const type = (child.type as TypedComponent).componentType;
    return type && CARD_COMPONENT_TYPES.has(type) ? child : null;
  });

  return (
    <div className="relative size-full">
      <div
        className={`size-full transition-opacity duration-0 ${shouldHide ? "opacity-0" : "opacity-100"}`}
      >
        <GradientBorder
          ref={ref}
          isActive={(hoverEffect && isHovered) || isExiting}
          disableHover={disableHover}
          className={`h-full w-full transition-all duration-300 ease-in-out ${disableHover ? "" : "hover:-translate-y-1"} ${className}`}
          contentClasses="h-full w-full"
        >
          <div
            ref={cardRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative rounded-md bg-card border border-card-border shadow-sm transition-shadow duration-300 ease-in-out group-hover:shadow-lg z-10 h-full w-full ${hasExpandedContent ? "cursor-pointer" : ""}`}
            onClick={handleCardClick}
            style={style}
            role={role}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
          >
            {renderStaticChildren}
          </div>
        </GradientBorder>
      </div>

      <CardExpanded
        isExpanded={isExpanded}
        onCloseAction={handleCloseExpanded}
        onExitingChangeAction={handleExitingChange}
        cardPosition={cardPosition}
      >
        {children}
      </CardExpanded>
    </div>
  );
});

export { Card };
