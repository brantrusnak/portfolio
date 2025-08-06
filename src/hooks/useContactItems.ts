import { useSocials } from "@/context/SocialsContext";
import { ReactNode } from "react";

export interface ContactItem {
  id: string;
  icon?: ReactNode;
  label: string;
  href: string;
}

export function useContactItems(): ContactItem[] {
  const { socials } = useSocials();

  return [
    { id: "email", label: "Email", href: "#" },
    ...socials.map((social) => ({
      id: social.id,
      icon: social.icon,
      label: social.label,
      href: social.url,
    })),
    { id: "resume", label: "Résumé", href: "#" },
  ];
}
