import Button from '@mui/material/Button';
import {toLocalDate} from "../utils/dateUtils"
import { useQuery,useQueryClient } from 'react-query';
import axiosInstanceLocal from '../utils/axiosLocal';
import { useContext, useState } from 'react';
import { AuthUserContext } from '../authentification/AuthenticationProvider';
import Member from "./Member"

function CoreTeamPosition(props){
  
    var dif=new Date() - toLocalDate(new Date(props.deadline))>0

    const [showApplicants,setShowApplicants]=useState(false)

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const queryClient=useQueryClient()

    const fetchApplicants=async()=>{
        const response=await axiosInstanceLocal.get(`oportunities/${props.oportunity}/positions/${props.id}/applicants`,
        {  headers: {"Authorization" : `Bearer ${authUser.token}`}})
        return response.data
    }

    const containsUser=(array,id)=>{
        for(let i=0;i<array.length;i++)
        if(array[i].id==id)
        return true
        return false
    }

    const {data}=useQuery(['applicantsQuery',props.id],fetchApplicants)

    console.log(data)
    console.log("render")

    return (
        <div className="core-position">
            {data && 
              <div className='core-position-details'>
                <div className="info">
                <p style={ {color:'#2B3674',} } >{props.name}</p>
                <p style={{color:' #A3AED0',marginTop:'5px'}}>{props.leftSits}{' position free'}</p>
                </div>
                <Button onClick={ ()=>{props.aply(props.id);queryClient.invalidateQueries(['applicantsQuery'])}} disabled={dif || containsUser(data,authUser.id) || props.leftSits==0} variant="contained" sx={ {background:'#2E3789'}} >Apply</Button>
               {authUser.roles.includes('admin') && <Button onClick={()=>setShowApplicants( (prev)=>!prev) } variant="contained" sx={ {background:'#2E3789'}}> { showApplicants?"Hide applicants":"See Applicants"} </Button> } 
            </div>
            }

             { showApplicants &&  

               <div className='applicants'>
                {
                    data.map(member=>
                    <Member 
                    imgUrl={member.imageLink} 
                    name={member.name} 
                    key={member.id} 
                    id={member.id}/> )
                }
               </div>
               }
        </div>
    )
}

export default CoreTeamPosition