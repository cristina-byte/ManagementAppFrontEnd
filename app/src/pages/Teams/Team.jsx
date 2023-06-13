import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,useContext } from 'react';
import { TabPanel } from "../../components/TabPanel.jsx";
import { useParams,useNavigate} from "react-router-dom"
import { useQuery,useMutation } from 'react-query';
import Button from '@mui/material/Button';
import axiosInstanceLocal from '../../utils/axiosLocal.js';
import {AuthUserContext} from "../../authentification/AuthenticationProvider"
import ToDoLists from './ToDoLists.jsx';
import TeamMembers from "./TeamMembers"

function Team(){

    const [value,setValue]=useState(0)

    const navigate=useNavigate()

    const routeParams=useParams();

    const handleChange=(event,newValue)=>{
        setValue(newValue)
    }

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const fetchTeam=async()=>{
        const response=await axiosInstanceLocal.get(`teams/${routeParams.id}`,{ headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const {data}=useQuery(['queryTeam'],fetchTeam)

    const deleteTeam=useMutation({
        mutationFn:async()=>{
            const response=await axiosInstanceLocal.delete(`teams/${routeParams.id}`,{ headers: {"Authorization" : `Bearer ${authUser.token}`} })
            return response
        }
    })

    const handleDeleteTeam=()=>{
        deleteTeam.mutate(null,{
            onSuccess:()=>navigate('/teams')
        })
    }

    if(data)
    console.log(data)

    return (
        <section className="team-profile page">

            {
                data &&  

                <div className="team-panel">

                <div className="team-header">

                    <div className="flex"> 
                    <p className="team-logo">{data.name[0]}</p>
                    <p className="team-name">{data.name}</p>
                    </div>

                    <div className="team-menu"> 
                    {
                        data.admin.id==authUser.id && <Button variant="contained" sx={{background:"#2E3789",marginRight:"30px"}}onClick={handleDeleteTeam}>Delete Team</Button>
                    }
                    
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Members"  />
                        <Tab label="Tasks"  />
                    </Tabs>  
                    </div>
                </div>
    
                    <TabPanel value={value} index={0}>
                        Members
                        <TeamMembers/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ToDoLists/>
                    </TabPanel>
                    
            </div>
            }

        </section>
    )
}

export default Team