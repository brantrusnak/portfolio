import * as React from "react";
import {
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import { useTooltipContext } from "@/context/TooltipContext";

interface TooltipContentProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  arrowClassName?: string;
  showArrow?: boolean;
}

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(function TooltipContent(
  { style, className = "", arrowClassName = "", showArrow, ...props },
  propRef,
) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const shouldShowArrow = showArrow !== undefined ? showArrow : true;

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...context.styles,
          ...style,
        }}
        className={`z-50 px-2 py-1 text-sm bg-[var(--color-tooltip-bg)] text-[var(--color-tooltip-text)] rounded-md shadow-md max-w-[calc(100vw-10px)] w-max ${className}`}
        {...context.getFloatingProps(props)}
      >
        {props.children}
        {shouldShowArrow && (
          <FloatingArrow
            ref={context.arrowRef}
            context={context.context}
            className={`fill-[var(--color-tooltip-bg)] ${arrowClassName}`}
          />
        )}
      </div>
    </FloatingPortal>
  );
});
