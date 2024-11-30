import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member.type";

export interface GlobalsInterface {
    authMember: Member | null;
    setAuthMember: (member: Member) => void;
    rebuildOrderData: Date;
    setRebuildOrderData: (input: Date) => void
}

export const GlobalContext = createContext<GlobalsInterface | undefined>(undefined);


export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("Context within Provider")
    return context
}