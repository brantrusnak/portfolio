"use client";

import { createContext } from "react";

export interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export default DropdownContext;
