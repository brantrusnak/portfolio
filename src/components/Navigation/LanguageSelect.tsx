"use client";

import { Button } from "@/components/ui";

export default function LanguageSelect() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2"
      ariaLabel="Toggle language"
    >
      EN
    </Button>
  );
}
