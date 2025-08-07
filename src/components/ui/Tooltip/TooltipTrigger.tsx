import * as React from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "@/context/TooltipContext";

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = true, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef =
  React.isValidElement(children) && "ref" in children
    ? (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref
    : undefined;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    const referenceProps = context.getReferenceProps({
      ref,
      ...props,
      ...(children.props as object),
    });

    const mergedProps = {
      ...referenceProps,
      ref: (node: HTMLElement | null) => {
        if (node) {
          node.setAttribute("data-state", context.open ? "open" : "closed");
        }
        if (typeof referenceProps.ref === "function") {
          referenceProps.ref(node);
        } else if (referenceProps.ref) {
          (
            referenceProps.ref as React.MutableRefObject<HTMLElement | null>
          ).current = node;
        }
      },
    };

    return React.cloneElement(children, mergedProps);
  }

  return (
    <button
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});
