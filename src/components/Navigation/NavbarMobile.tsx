"use client";

import { useContext } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui";
import { SECTION_ID, sections } from "@/components/Navigation/Navbar";
import { useTranslations } from "next-intl";
import ThemeSwitch from "./ThemeSwitch";
import LocaleDropdown from "./LocaleDropdown";
import ContactDropdown from "./ContactDropdown";
import { NavbarContext } from "./NavbarContext";

export default function NavbarMobile() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(NavbarContext);
  const tNav = useTranslations("Nav");

  return (
    <>
      <nav className="flex justify-between items-center p-6 backdrop-blur-md border-b bg-card sticky top-0 z-50">
        <div className="relative">
          <Link
            href={"#about"}
            className="font-bold text-xl transition-colors opacity-100"
            style={{ textDecoration: "none" }}
          >
            BR
          </Link>
          <span
            className="absolute bottom-[-8px] left-0 h-1 w-full rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to"
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Button
            className="hamburger p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            size="lg"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                transition={{ duration: 0.25 }}
              />

              <motion.line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                variants={{
                  closed: { opacity: 1, scaleX: 1 },
                  open: { opacity: 0, scaleX: 0 },
                }}
                style={{ originX: 0.5 }}
                transition={{ duration: 0.15 }}
              />

              <motion.line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                transition={{ duration: 0.25 }}
              />
            </motion.svg>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
            className="mobile-menu fixed inset-0 z-40 bg-card"
          >
            <div className="flex flex-col h-full pt-22 gap-2">
              {sections.slice(1).map(({ id }) => {
                if (id === SECTION_ID.CONTACT) {
                  return (
                    <div key={id} className="flex flex-col mx-2">
                      <ContactDropdown />
                    </div>
                  );
                }
                return (
                  <Button key={id} variant="ghost" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                  <Link
                    className="size-full flex items-center justify-start"
                    href={`#${id}`}
                    >
                    {tNav(id)}
                  </Link>
                  </Button>
                );
              })}
              <LocaleDropdown />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
