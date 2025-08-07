"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Button, Dropdown } from "@/components/ui";
import { SECTION_ID, sections } from "@/components/Navigation/Navbar";
import ThemeSwitch from "@/components/Navigation/ThemeSwitch";
import { useSocials } from "@/context/SocialsContext";

interface NavbarDesktopProps {
  activeSection: SECTION_ID;
}

export default function NavbarDesktop({ activeSection }: NavbarDesktopProps) {
  const [hoveredSection, setHoveredSection] = useState<SECTION_ID | null>(null);
  const { socials } = useSocials();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [underlineReady, setUnderlineReady] = useState(false);
  const linkRefs = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef<NodeJS.Timeout | null>(null);
  const [isContactDropdownOpen, setContactDropdownOpen] = useState(false);

  const updateUnderlinePosition = useCallback(() => {
    const sectionId = isContactDropdownOpen
      ? SECTION_ID.CONTACT
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

  const handleContactItemClick = () => {
    setContactDropdownOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-6 backdrop-blur-md border-b border-navbar-border bg-navbar sticky top-0 z-50">
      <span
        ref={(el) => {
          if (el) linkRefs.current[0] = el;
        }}
        className="relative"
        onMouseEnter={() => setHoveredSection(SECTION_ID.ABOUT)}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <Link href="#about" className="font-bold text-xl">
          BR
        </Link>
      </span>

      <div
        ref={containerRef}
        className="relative flex items-center gap-4 text-sm"
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
              <Dropdown
                isOpen={isContactDropdownOpen}
                setIsOpen={setContactDropdownOpen}
              >
                <Dropdown.Trigger>
                  <Button
                    size="sm"
                    ariaLabel={label}
                    rightIcon={<FaChevronDown />}
                  >
                    {label}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content className="w-55">
                  {socials.map((item) => (
                    <Dropdown.Item key={item.id} className="w-full">
                      <Link
                        href={item.url}
                        onClick={handleContactItemClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 gap-2"
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
            ) : (
              <Link href={`#${id}`}>
                <Button size="sm" variant="ghost" ariaLabel={label}>
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
