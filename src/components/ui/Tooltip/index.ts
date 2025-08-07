import { Tooltip as TooltipRoot } from "./Tooltip";
import { TooltipTrigger } from "./TooltipTrigger";
import { TooltipContent } from "./TooltipContent";

const TooltipWithComponents = TooltipRoot as typeof TooltipRoot & {
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
};

TooltipWithComponents.Trigger = TooltipTrigger;
TooltipWithComponents.Content = TooltipContent;

export { TooltipWithComponents as Tooltip };
