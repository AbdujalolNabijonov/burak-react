import { createContext, ReactNode, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../../lib/config";
import Cookies from "universal-cookie"

export const SocketContext = createContext<Socket | undefined>(undefined)

export const SocketContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | undefined>(undefined)
    const cookie = new Cookies()

    useEffect(() => {
        const token = cookie.get("accessToken")
        const headers = { extraHeaders: token ? { authorization: `Barear ${token}` } : { authorization: "" } }
        socketRef.current = io(
            API_URL,
            {
                ...headers
            },
        )
        console.log("===SOCKET CONNECTION===")

        return () => {
            socketRef.current?.disconnect()
            console.log("===SOCKET DISCONNECTION===")
        }
    }, [])

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    )
}