import { Card as CardRoot } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardExpandedContent } from "./CardExpandedContent";
import { CardFooter } from "./CardFooter";

const CardWithComponents = CardRoot as typeof CardRoot & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  ExpandedContent: typeof CardExpandedContent;
  Footer: typeof CardFooter;
};

CardWithComponents.Header = CardHeader;
CardWithComponents.Content = CardContent;
CardWithComponents.ExpandedContent = CardExpandedContent;
CardWithComponents.Footer = CardFooter;

export { CardWithComponents as Card };
