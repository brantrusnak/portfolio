import { Dropdown as DropdownRoot } from "./Dropdown";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";

const DropdownWithComponents = DropdownRoot as typeof DropdownRoot & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
};

DropdownWithComponents.Trigger = DropdownTrigger;
DropdownWithComponents.Content = DropdownContent;
DropdownWithComponents.Item = DropdownItem;

export { DropdownWithComponents as Dropdown };
