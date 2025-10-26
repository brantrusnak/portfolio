"use client";

import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui";
import { useContext } from 'react';
import { locales } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import usePlatform, { PLATFORM } from '@/hooks/usePlatform';
import { NavbarContext } from './NavbarContext';
import { APP_CONFIG } from '@/config/config';
import { useLocale } from "next-intl";

export default function LocaleDropdown() {
  const localeData = APP_CONFIG.locale;
  const { setIsMobileMenuOpen } = useContext(NavbarContext);
  const currentLocale = useLocale() as keyof typeof localeData;
  const platform = usePlatform();
  const isMobile = platform === PLATFORM.MOBILE;

  const handleLocaleChange = (locale: "en" | "fr") => {
    setUserLocale(locale);
    setIsMobileMenuOpen(false);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`justify-start ${isMobile ? "px-6! py-4!" : ""}`}
          size={isMobile ? "lg" : "sm"}
        >
          {isMobile ? `${localeData[currentLocale].flag} ${localeData[currentLocale].label}` : localeData[currentLocale].flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`min-w-[100svw] md:min-w-auto`} align={isMobile ? "center" : "end"}>
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => handleLocaleChange(locale)}>
            <span className="flex items-center px-4 py-2 gap-2 cursor-pointer">
              {localeData[locale].flag} {localeData[locale].label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
