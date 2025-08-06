import { Timeline as TimelineRoot } from "./Timeline";
import { TimelineItem } from "./TimelineItem";

const TimelineWithComponents = TimelineRoot as typeof TimelineRoot & {
  Item: typeof TimelineItem;
};

TimelineWithComponents.Item = TimelineItem;

export { TimelineWithComponents as Timeline };
