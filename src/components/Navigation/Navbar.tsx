"use client";

import { useEffect, useState } from "react";
import NavbarDesktop from "@/components/Navigation/NavbarDesktop";
import NavbarMobile from "@/components/Navigation/NavbarMobile";
import { NavbarProvider } from "./NavbarContext";

export enum SECTION_ID {
  ABOUT = "about",
  SKILLS = "skills",
  WORK = "work",
  PROJECTS = "projects",
  CONTACT = "contact",
}

export const sections = [
  { id: SECTION_ID.ABOUT, label: "BR" },
  { id: SECTION_ID.SKILLS, label: "Skills" },
  { id: SECTION_ID.WORK, label: "Work" },
  { id: SECTION_ID.PROJECTS, label: "Projects" },
  { id: SECTION_ID.CONTACT, label: "Contact", isDropdown: true },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SECTION_ID>(
    SECTION_ID.ABOUT,
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = SECTION_ID.ABOUT;
          for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 80 && rect.bottom > 80) {
                current = section.id;
                break;
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarProvider>
      <div className="sticky top-0 z-50">
        <div className="hidden md:block">
          <NavbarDesktop activeSection={activeSection} />
        </div>
        <div className="md:hidden">
          <NavbarMobile />
        </div>
      </div>
    </NavbarProvider>
  );
}
