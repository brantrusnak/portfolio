import { useContext } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "../ui";
import { useTranslations } from "next-intl";
import { useSocials } from "@/hooks/useSocials";
import Link from "next/link";
import usePlatform, { PLATFORM } from "@/hooks/usePlatform";
import { NavbarContext } from "./NavbarContext";

export default function ContactDropdown() {
  const { setIsMobileMenuOpen, setIsContactDropdownOpen } = useContext(NavbarContext);
  const { socials } = useSocials();
  const tNav = useTranslations("Nav");
  const tSocials = useTranslations("Socials");
  const platform = usePlatform();
  const isMobile = platform === PLATFORM.MOBILE;

  return (
    <DropdownMenu onOpenChange={setIsContactDropdownOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className={`justify-start ${isMobile ? "px-6! py-4!" : ""}`}
          size={isMobile ? "lg" : "sm"}
        >
          {tNav("contact")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`min-w-[100svw] md:min-w-auto`} align={isMobile ? "center" : "end"}>
        {socials.map((item) => (
          <DropdownMenuItem key={item.id}>
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon && (
                <span className="size-[14px] text-[14px]">
                  {item.icon}
                </span>
              )}
              {tSocials(item.id)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}