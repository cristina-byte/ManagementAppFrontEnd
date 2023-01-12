import {useQuery} from "react-query"
import axiosInstanceLocal from "../../axiosLocal"
import Member from "../../components/Member"
import style from "./Members.css"

export default function Members(){

    const fetchMembers=async()=>{
        const response=await axiosInstanceLocal.get("/Users?page=1")
        return response.data
    }

    const {
        data,
        isLoading
    }=useQuery(['membersQueryKey'],fetchMembers)

    function getMembers(){
        return data.map(member=><Member key={member.id} 
            name={member.name} role={member.role} 
            isOnline={member.isOnline} imgUrl={member.imageLink} id={member.id} /> )
    }

    return (
        <section className="members">
           <h1 className="title-page">Members {data && data.length}</h1>
           <div className="members-container">
            {data && getMembers()}
           </div>
           <div className="navigation-buttons">
           
           </div>
        </section>
    )
}