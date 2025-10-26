"use client";

import { Section } from "@/components/ui";
import NotFoundCard from "./components/NotFoundCard";

export default function NotFoundSection() {
  return (
    <Section
      id="not-found"
      className="min-h-screen min-w-full flex items-center justify-center"
    >
      <div className="max-w-2xl mx-auto">
        <NotFoundCard />
      </div>
    </Section>
  );
}
