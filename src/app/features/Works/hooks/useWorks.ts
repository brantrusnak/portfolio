import { useContext } from "react";
import { WorksContext } from "../context/WorksContext";

export function useWorks() {
  const context = useContext(WorksContext);
  if (context === undefined) {
    throw new Error("useWorks must be used within a WorksProvider");
  }
  return context;
}