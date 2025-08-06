import { MotionProvider } from "@/context/MotionProvider";
import { NotFound } from "@/app/sections";

export default function NotFoundPage() {
  return (
    <MotionProvider>
      <NotFound />
    </MotionProvider>
  );
}
