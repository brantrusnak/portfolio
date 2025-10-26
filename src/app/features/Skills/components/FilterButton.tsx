import { Button, GradientBorder } from "@/components/ui";

interface FilterButtonProps extends React.ComponentProps<typeof Button> {
    active: boolean;
}

export default function FilterButton({ children, active, ...props }: FilterButtonProps) {
  return (
    <GradientBorder isActive={active} disableHover={true}>
      <Button {...props}>
        {children}
      </Button>
    </GradientBorder>
  );
}