import { createContext } from "react";
import { getUserProfile } from "../Services/user/usersAuth";
import { useQuery } from "@tanstack/react-query";

export const UserContext=createContext()
export default function UserContextProvider({children}) {
    
    const {data,isPending}=useQuery({queryKey:["userData"],queryFn:getUserProfile})
    return (
        <UserContext.Provider value ={{data,isPending}}>
            {children}
        </UserContext.Provider>
    )


}
