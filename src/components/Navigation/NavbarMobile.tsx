"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronDown } from "react-icons/fa6";
import { Button, Dropdown } from "@/components/ui";
import { sections } from "@/components/Navigation/Navbar";
import { useSocials } from "@/context/SocialsContext";
import { useModal } from "@/hooks/useModal";

interface NavbarMobileProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpenAction: (isOpen: boolean) => void;
}

export default function NavbarMobile({
  isMobileMenuOpen,
  setIsMobileMenuOpenAction,
}: NavbarMobileProps) {
  const { socials } = useSocials();
  const { addModal, removeModal } = useModal();
  const [isContactDropdownOpen, setContactDropdownOpen] = useState(false);
  const prevOpenRef = useRef(isMobileMenuOpen);

  useEffect(() => {
    const prev = prevOpenRef.current;
    if (prev !== isMobileMenuOpen) {
      if (isMobileMenuOpen) {
        addModal();
      } else {
        removeModal();
      }
    }
    prevOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen, addModal, removeModal]);

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
    setContactDropdownOpen(false);
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
          className="hamburger p-2"
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
            <div className="flex flex-col h-full pt-22 gap-2">
              {sections.slice(1).map(({ id, label, isDropdown }) => {
                if (isDropdown) {
                  return (
                    <div key={id} className="flex flex-col mx-2">
                      <Dropdown
                        isOpen={isContactDropdownOpen}
                        setIsOpen={setContactDropdownOpen}
                      >
                        <Dropdown.Trigger>
                          <Button
                            className="justify-start px-6! py-4!"
                            rightIcon={<FaChevronDown />}
                            disableHover
                          >
                            {label}
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content className="w-full">
                          {socials.map((item) => (
                            <Dropdown.Item key={item.id}>
                              <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 gap-2"
                                onClick={handleMobileMenuClick}
                              >
                                {item.icon && (
                                  <span className="size-[14px] text-[14px]">
                                    {item.icon}
                                  </span>
                                )}
                                {item.label}
                              </Link>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Content>
                      </Dropdown>
                    </div>
                  );
                }
                return (
                  <Link
                    key={id}
                    href={`#${id}`}
                    className={`px-6 py-4 hover:bg-blue-600/20 transition-all duration-200`}
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
