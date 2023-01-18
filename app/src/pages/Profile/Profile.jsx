
import { useEffect,useState } from "react";
import {useQuery} from "react-query"
import { useParams } from "react-router-dom"
import axiosInstanceLocal from "../../axiosLocal.js";
import Role from "../../components/Role.jsx"
import style from "./Profile.css"

function Profile(){

    const routeParams=useParams();
    
    const fetchProfile=async()=>{
        const response=await axiosInstanceLocal.get(`/Users/${routeParams.id}`)
        return response.data
    }

    const {
     data:queryData,
     isLoading
    }=useQuery(['queryKey'],fetchProfile)
    
    function getActivity(){
        const roles=queryData.coreTeamPositions.map(
            role=><Role key={role.id} 
            name={role.name} eventName={role.eventName} 
            startDate={role.startDate} endDate={role.endDate}/>)
        return roles
    }

    return (
        <section className="profile">
            {isLoading && <p>IsLoading</p> }
            {queryData && <div>
                <div className="profile-info">
                <img src={queryData.imageLink} alt="" />
                 <div className="data">
                 <h1>{queryData.name}</h1>
                <p>Volunteer</p>
                <p>Joined in 23.09.2022</p>
                <p style={{fontSize:'13px',color:'#2E3789',fontWeight: '500'}}>{queryData.email}</p>
                <p style={{fontSize:'13px',color:'#2E3789',fontWeight: '500'}}>{queryData.phone}</p>
                <button>Message</button>
                 </div>
            </div>
            <div className="activities-history">
                 <h1>{queryData.coreTeamPositions?.length>0?"Activity":"No activity yet"}</h1>
                {getActivity()}
            </div>
            </div>}         
     </section>
    )}

export default Profile