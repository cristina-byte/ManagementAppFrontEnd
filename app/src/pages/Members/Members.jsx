import { useEffect,useState } from "react"
import Member from "../../components/Member"
import style from "./Members.css"

export default function Members(){

    const [members, setMembers]=useState(null)//this is a hook useStaet, which is a function javascript

    useEffect(()=>{
        fetch('https://localhost:7257/api/Users/page?page=1')
        .then(result=>result.json())
        .then(data=>{console.log(data); return setMembers(data)})
    },[])

    function getMembers(){
        return members.map(member=><Member key={member.id} 
            name={member.name} role={member.role} 
            isOnline={member.isOnline} imgUrl={member.imageLink} /> )
    }

    return (
        <section className="members">
           <h1 className="title-page">Members {members && members.length}</h1>
           <div className="members-container">
            {members && getMembers()}
           </div>
           <div className="navigation-buttons">
            {members && members}
           </div>
        </section>
    )
}