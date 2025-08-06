import { Section as SectionRoot } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { SectionSubtitle } from "./SectionSubtitle";

const SectionWithComponents = SectionRoot as typeof SectionRoot & {
  Heading: typeof SectionHeading;
  Subtitle: typeof SectionSubtitle;
};

SectionWithComponents.Heading = SectionHeading;
SectionWithComponents.Subtitle = SectionSubtitle;

export { SectionWithComponents as Section };
