
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import {AuthUserContext} from "../authentification/AuthenticationProvider"

export const PrivateRoute=({allowList,children,redirectUrl})=>{

     //take from context
    const {authUser}=useContext(AuthUserContext)

    const includes=authUser.roles.some(element=> allowList.includes(element))
        if(!includes)
        return <Navigate to={redirectUrl}/>
    
    return children
}