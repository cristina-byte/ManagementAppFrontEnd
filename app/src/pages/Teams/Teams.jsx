import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import { useQuery } from "react-query";
import axiosInstanceLocal from "../../utils/axiosLocal"
import { AuthUserContext } from "../../authentification/AuthenticationProvider"
import { useContext } from "react";
import Team from "../../components/Team"

function Teams(){

     //take from context
     const {authUser}=useContext(AuthUserContext)

    const fetchTeams=async()=>{
        const response=await axiosInstanceLocal.get(`teams?userId=${authUser.id}`, 
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const{data}=useQuery(['teamsQueryKey'],fetchTeams)

    if(data)
    console.log(data)




    return (

        <section className="teams page">
            <h1 className="title-page">Teams</h1>

            <Link to="add">
            <Button variant="contained" sx={{background:'#2E3789',marginBottom:'15px'}}>Add Team</Button>
            </Link>

            <div className="teams">
                {
                    data && data.map( t=><Team id={t.id} key={t.id} name={t.name} members={t.memberTeams}/> )
                }
            </div>



        </section>



    )




}

export default Teams