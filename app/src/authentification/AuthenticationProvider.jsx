import { createContext,useState } from "react";
import jwtDecode from "jwt-decode";


export const AuthUserContext=createContext()

export const AuthenticatedUserProvider=({children})=>{

    const [authUser,setAuthUser]=useState(null)

    const setUser=(newUser)=>{
        setAuthUser(newUser)
    }

    return <AuthUserContext.Provider value={{authUser,setUser}}>{children}</AuthUserContext.Provider>
}