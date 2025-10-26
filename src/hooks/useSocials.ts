import { SocialsContext } from "@/app/providers/SocialsProvider";
import { useContext } from "react";

export function useSocials() {
    const context = useContext(SocialsContext);
    if (context === undefined) {
        throw new Error("useSocials must be used within a SocialsProvider");
    }
    return context;
}