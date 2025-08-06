"use client";

import { useEffect, useState } from "react";
import NavbarDesktop from "@/components/Navigation/NavbarDesktop";
import NavbarMobile from "@/components/Navigation/NavbarMobile";

export const sections = [
  { id: "about", label: "BR" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact", isDropdown: true },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "about";
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
    <div className="sticky top-0 z-50">
      <div className="hidden lg:block">
        <NavbarDesktop activeSection={activeSection} />
      </div>
      <div className="lg:hidden">
        <NavbarMobile
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpenAction={setIsMobileMenuOpen}
        />
      </div>
    </div>
  );
}
