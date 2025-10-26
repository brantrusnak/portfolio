"use client";

import { createContext, type PropsWithChildren, useState } from "react";

export interface NavbarContextType {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
    isContactDropdownOpen: boolean;
    setIsContactDropdownOpen: (isOpen: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextType>({
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: () => { },
    isContactDropdownOpen: false,
    setIsContactDropdownOpen: () => { },
});

export function NavbarProvider({ children }: PropsWithChildren) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

    return (
        <NavbarContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen, isContactDropdownOpen, setIsContactDropdownOpen }}>
            {children}
        </NavbarContext.Provider>
    );
}
