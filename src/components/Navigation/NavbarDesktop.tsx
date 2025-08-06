"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Button, Dropdown } from "@/components/ui";
import { useDropdown } from "@/context/DropdownContext";
import { sections } from "@/components/Navigation/Navbar";
import ThemeSwitch from "@/components/Navigation/ThemeSwitch";
import ProtectedEmail from "@/components/Navigation/ProtectedEmail";
import ProtectedResume from "@/components/Navigation/ProtectedResume";
import { ContactItem, useContactItems } from "@/hooks/useContactItems";

interface NavbarDesktopProps {
  activeSection: string;
}

function DropdownStateTracker({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { isOpen } = useDropdown();
  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);
  return null;
}

function renderDropdownItem(item: ContactItem) {
  switch (item.id) {
    case "email":
      return (
        <div className="flex items-center cursor-pointer! text-sm text-white hover:bg-card-hover transition-all duration-200 hover:translate-x-1 hover:text-pink-400 w-full">
          <ProtectedEmail className="px-4 py-2 flex items-center w-full overflow-visible cursor-pointer" />
        </div>
      );
    case "resume":
      return (
        <div className="flex items-center cursor-pointer! text-sm text-white hover:bg-card-hover transition-all duration-200 hover:translate-x-1 hover:text-pink-400 w-full">
          <ProtectedResume className="px-4 py-2 flex items-center w-full overflow-visible cursor-pointer" />
        </div>
      );
    default:
      return (
        <Link
          href={item.href}
          target="_blank"
          className="flex items-center px-4 py-2 text-sm text-white hover:bg-card-hover transition-all duration-200 hover:translate-x-1 hover:text-pink-400"
        >
          {item.icon && (
            <span className="mr-2 size-[14px] text-[14px]">{item.icon}</span>
          )}
          {item.label}
        </Link>
      );
  }
}

export default function NavbarDesktop({ activeSection }: NavbarDesktopProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const contactItems = useContactItems();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [underlineReady, setUnderlineReady] = useState(false);
  const linkRefs = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef<NodeJS.Timeout | null>(null);

  const updateUnderlinePosition = useCallback(() => {
    const sectionId = isContactDropdownOpen
      ? "contact"
      : hoveredSection || activeSection;
    const idx = sections.findIndex((s) => s.id === sectionId);
    const el = linkRefs.current[idx];
    const container = containerRef.current;

    if (el && container) {
      const { left: linkLeft, width } = el.getBoundingClientRect();
      const { left: containerLeft } = container.getBoundingClientRect();
      setUnderlineStyle({ left: linkLeft - containerLeft, width });
      setUnderlineReady(width > 0);
    } else {
      setUnderlineStyle({ left: 0, width: 0 });
      setUnderlineReady(false);
    }
  }, [hoveredSection, activeSection, isContactDropdownOpen]);

  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      updateUnderlinePosition();
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setIsResizing(false), 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, [hoveredSection, updateUnderlinePosition, activeSection]);

  useEffect(() => {
    updateUnderlinePosition();
  }, [updateUnderlinePosition]);

  return (
    <nav className="flex justify-between items-center p-6 backdrop-blur-md border-b border-navbar-border bg-navbar sticky top-0 z-50">
      <span
        ref={(el) => {
          if (el) linkRefs.current[0] = el;
        }}
        className="relative"
        onMouseEnter={() => setHoveredSection("about")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <Link
          href="#about"
          className="font-bold text-xl transition-colors text-white opacity-100"
          style={{ textDecoration: "none" }}
        >
          BR
        </Link>
      </span>

      <div
        ref={containerRef}
        className="relative hidden md:flex items-center gap-2 sm:gap-4 text-sm"
      >
        {sections.slice(1).map(({ id, label, isDropdown }, idx) => (
          <span
            key={id}
            ref={(el) => {
              if (el) linkRefs.current[idx + 1] = el;
            }}
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative"
          >
            {isDropdown ? (
              <Dropdown>
                {id === "contact" && (
                  <DropdownStateTracker setIsOpen={setIsContactDropdownOpen} />
                )}
                <Dropdown.Trigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    ariaLabel={label}
                    rightIcon={
                      <FaChevronDown className="transition-transform duration-300" />
                    }
                  >
                    {label}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content className="w-65">
                  <div className="py-1">
                    {contactItems.map((item) => (
                      <Dropdown.Item key={item.id}>
                        <Fragment>{renderDropdownItem(item)}</Fragment>
                      </Dropdown.Item>
                    ))}
                  </div>
                </Dropdown.Content>
              </Dropdown>
            ) : (
              <Link href={`#${id}`}>
                <Button
                  size="sm"
                  className="font-semibold px-1 pb-1"
                  variant="ghost"
                  ariaLabel={label}
                >
                  {label}
                </Button>
              </Link>
            )}
          </span>
        ))}
        <ThemeSwitch />
        {underlineReady && (
          <span
            className={`absolute bottom-[-8px] h-1 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to ${hasMounted && !isResizing ? "transition-all duration-300" : ""}`}
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
}
