import { createContext, useState } from "react"

export const AuthContect =createContext()
export default function AuthContectProvider({children}) {
      const [isLoggedIn,setIsloggedIn] = useState(localStorage.getItem("token") !== null);
    

  return (

<AuthContect.Provider value ={{isLoggedIn,setIsloggedIn}}>
    {children}
    </AuthContect.Provider>
)
}
