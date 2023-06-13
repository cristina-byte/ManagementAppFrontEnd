import { useQuery } from "react-query"
import axiosInstanceLocal from "../../utils/axiosLocal"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import {AuthUserContext} from "../../authentification/AuthenticationProvider"
import Member from "../../components/Member"

function TeamMembers(){

    const routeParams=useParams()

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const fetchTeamMembers=async ()=>{
        const response=await axiosInstanceLocal.get(`/teams/${routeParams.id}/members`,{ headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const {data}=useQuery(['members',routeParams.id],fetchTeamMembers)

    return (
        <div className="teamMembers">
            {
                data && 
                <div>
                    {data.map(m=><Member id={m.id} key={m.id} name={m.name} imgUrl={m.imageLink} />)}
                </div>
            }
        </div>
    )
}

export default TeamMembers