
import { useContext } from "react"
import { useQuery } from "react-query"
import { NavLink} from "react-router-dom"
import { AuthUserContext } from "../authentification/AuthenticationProvider"
import axiosInstanceLocal from "../utils/axiosLocal"

export const UserHeader=()=>{

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const fetchMember=async()=>{
        const response=await axiosInstanceLocal.get(`users/${authUser.id}`,{headers: {"Authorization" : `Bearer ${authUser.token}`}})
        return response.data
      }

    const {data}=useQuery(['fetchUserQueryKey'],fetchMember)
    
    return (
        <div className="current-user-header">
            {data && 
            <div style={{display:"flex",alignItems:"center",margin:"6px"}}>      
              <NavLink 
              style={{display:"flex", flexDirection:"column",alignItems:"center"}}
              to={`/members/${data.id}`}>{data.name}
              </NavLink>

              <img className="current-profile-img" src={data.imageLink} />
            </div>
            }
        </div>
    )
}