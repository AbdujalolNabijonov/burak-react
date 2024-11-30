import React, { ReactNode, useState } from "react"
import { Member } from "../../lib/types/member.type"
import Cookies from "universal-cookie"
import { GlobalContext } from "../hooks/useGlobals"


const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null
    const [authMember, setAuthMember] = useState<Member | null>(member);
    const [rebuildOrderData, setRebuildOrderData] = useState<Date>(new Date())
    const cookie = new Cookies()
    if (!cookie.get("accessToken")) localStorage.removeItem("member");

    return (
        <GlobalContext.Provider value={{ authMember, setAuthMember, rebuildOrderData, setRebuildOrderData }}>
            {children}
        </GlobalContext.Provider>
    )

}

export default ContextProvider