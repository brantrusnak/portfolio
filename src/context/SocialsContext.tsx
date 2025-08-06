"use client";

import { Social } from "@/types/Social";
import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import {
  FaEnvelope,
  FaFilePdf,
  FaGithubAlt,
  FaLinkedin,
} from "react-icons/fa6";

const initialSocials: readonly Social[] = [
  {
    id: "email",
    label: "me@brantrusnak.com",
    url: "mailto:me@brantrusnak.com",
    icon: <FaEnvelope />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/brantrusnak/",
    icon: <FaLinkedin />,
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/brantrusnak/",
    icon: <FaGithubAlt />,
  },
  {
    id: "resume",
    label: "Résumé",
    url: "/resume.pdf",
    icon: <FaFilePdf />,
  },
];

type SocialsContextType = {
  socials: readonly Social[];
};

const SocialsContext = createContext<SocialsContextType | undefined>(undefined);

export function SocialsProvider({ children }: { children: ReactNode }) {
  const [socials] = useState<readonly Social[]>(initialSocials);
  const value = useMemo(() => ({ socials }), [socials]);

  return (
    <SocialsContext.Provider value={value}>{children}</SocialsContext.Provider>
  );
}

export function useSocials() {
  const context = useContext(SocialsContext);
  if (context === undefined) {
    throw new Error("useSocials must be used within a SocialsProvider");
  }
  return context;
}
