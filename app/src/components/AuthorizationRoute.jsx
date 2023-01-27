import { Navigate} from "react-router-dom"

export const AuthorizationRoute=({redirectUrl,children})=>{
    
    //get token from localStorage
    const access=localStorage.getItem('access')

    if(access==null)
    return <Navigate to={redirectUrl}/>

    return children
}