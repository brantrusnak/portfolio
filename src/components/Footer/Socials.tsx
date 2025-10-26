"use client";

import Link from "next/link";
import { useSocials } from "@/hooks/useSocials";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export default function SocialsSection() {
  const { socials } = useSocials();
  const t = useTranslations("Socials");
  return (
    <div className="flex gap-4 items-center">
      {socials.map((social) => (
        <Link
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="icon"
            aria-label={t(social.id)}
            title={t(social.id)}
          >
            {social.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
}
