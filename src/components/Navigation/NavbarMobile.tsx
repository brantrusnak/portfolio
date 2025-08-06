"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronDown } from "react-icons/fa6";
import { Button, Dropdown } from "@/components/ui";
import ProtectedEmail from "@/components/Navigation/ProtectedEmail";
import ProtectedResume from "@/components/Navigation/ProtectedResume";
import { sections } from "@/components/Navigation/Navbar";
import { ContactItem, useContactItems } from "@/hooks/useContactItems";

interface NavbarMobileProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpenAction: (isOpen: boolean) => void;
}

function renderDropdownItem(item: ContactItem, onClick: () => void) {
  switch (item.id) {
    case "email":
      return (
        <div className="px-8 py-3 text-white opacity-80 hover:opacity-100 hover:bg-blue-600/20 transition-all w-full">
          <div className="flex items-center gap-3">
            {item.icon}
            <ProtectedEmail />
          </div>
        </div>
      );
    case "resume":
      return (
        <div className="px-8 py-3 text-white opacity-80 hover:opacity-100 hover:bg-blue-600/20 transition-all w-full">
          <div className="flex items-center gap-3">
            {item.icon}
            <ProtectedResume />
          </div>
        </div>
      );
    default:
      return (
        <a
          href={item.href}
          className="flex items-center gap-3 px-8 py-3 text-white opacity-80 hover:opacity-100 hover:bg-blue-600/20 transition-all w-full"
          onClick={onClick}
        >
          {item.icon} <span>{item.label}</span>
        </a>
      );
  }
}

export default function NavbarMobile({
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpenAction,
}: NavbarMobileProps) {
  const contactItems = useContactItems();
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest?.(".mobile-menu") &&
        !target.closest?.(".hamburger")
      ) {
        setIsMobileMenuOpenAction(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, setIsMobileMenuOpenAction]);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpenAction(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center p-6 backdrop-blur-md border-b border-navbar-border bg-navbar sticky top-0 z-50">
        <div className="relative">
          <Link
            href={"#about"}
            className="font-bold text-xl transition-colors text-white opacity-100"
            style={{ textDecoration: "none" }}
          >
            BR
          </Link>
          <span
            className="absolute bottom-[-8px] left-0 h-1 w-full rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to"
            aria-hidden="true"
          />
        </div>

        <Button
          className="hamburger p-2 text-white"
          onClick={() => setIsMobileMenuOpenAction(!isMobileMenuOpen)}
          ariaLabel="Toggle menu"
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
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
            className="mobile-menu fixed inset-0 z-40 bg-navbar"
          >
            <div className="mobile-menu flex flex-col h-full pt-22">
              {sections.slice(1).map(({ id, label, isDropdown }) => {
                if (isDropdown) {
                  return (
                    <div key={id} className="flex flex-col">
                      <Dropdown>
                        <Dropdown.Trigger>
                          <button
                            className={`flex justify-between items-center px-6 py-4 text-white w-full ${
                              activeSection === id
                                ? "opacity-100 bg-blue-600/10"
                                : "opacity-60"
                            } hover:opacity-100 hover:bg-blue-600/20 transition-all`}
                          >
                            <span>{label}</span>
                            <FaChevronDown className="transition-transform duration-300" />
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content className="relative w-full">
                          <div className="bg-card border-t border-b border-card-border">
                            {contactItems.map((item) => (
                              <Dropdown.Item key={item.id}>
                                {renderDropdownItem(
                                  item,
                                  handleMobileMenuClick,
                                )}
                              </Dropdown.Item>
                            ))}
                          </div>
                        </Dropdown.Content>
                      </Dropdown>
                    </div>
                  );
                }

                return (
                  <Link
                    key={id}
                    href={`#${id}`}
                    className={`px-6 py-4 text-white ${
                      activeSection === id
                        ? "opacity-100 bg-blue-600/10"
                        : "opacity-60"
                    } hover:opacity-100 hover:bg-blue-600/20 transition-all`}
                    onClick={handleMobileMenuClick}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
