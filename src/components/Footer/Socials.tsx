"use client";

import Link from "next/link";
import { useSocials } from "@/context/SocialsContext";
import { Button } from "@/components/ui";

export default function SocialsSection() {
  const { socials } = useSocials();
  return (
    <div className="flex gap-4 items-center">
      {socials.map((social) => (
        <Link
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="icon"
            size="md"
            leftIcon={social.icon}
            ariaLabel={social.label}
            title={social.label}
          />
        </Link>
      ))}
    </div>
  );
}
