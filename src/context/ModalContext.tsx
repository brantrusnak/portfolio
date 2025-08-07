"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ModalContextType {
  openModals: number;
  addModal: () => void;
  removeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [openModals, setOpenModals] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (openModals > 0) {
      document.body.classList.add("overflow-hidden!");
    } else {
      document.body.classList.remove("overflow-hidden!");
    }
  }, [openModals]);

  const addModal = () => {
    setOpenModals((prev) => prev + 1);
  };

  const removeModal = () => {
    setOpenModals((prev) => Math.max(0, prev - 1));
  };

  return (
    <ModalContext.Provider value={{ openModals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
