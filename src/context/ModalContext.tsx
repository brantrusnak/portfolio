"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

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
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openModals]);

  const addModal = useCallback(() => {
    setOpenModals((prev) => prev + 1);
  }, []);

  const removeModal = useCallback(() => {
    setOpenModals((prev) => Math.max(0, prev - 1));
  }, []);

  const value = useMemo(
    () => ({ openModals, addModal, removeModal }),
    [openModals, addModal, removeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
