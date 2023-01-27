import {createRoutesFromElements, NavLink} from "react-router-dom"
//imports for icons

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChatIcon from '@mui/icons-material/Chat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button'
import {useState,useContext} from "react"
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from "@mui/material";
import { AuthUserContext } from "../authentification/AuthenticationProvider";


export default function Header(){

    const [openDialog,setOpenDialog]=useState(false)
    const navigate=useNavigate()

     //take from context
     const {authUser}=useContext(AuthUserContext)

    const handleConfirm=()=>{
        setOpenDialog(false)
        //remove token from local storage
        localStorage.removeItem('access')
        navigate('/sign-in')
    }

    return (
    <nav className="menu">
        <ul>
            <li>
                <NavLink 
                style={{display:"flex", flexDirection:"column",alignItems:"center"}}
                to="/"><DashboardIcon/>Home</NavLink>
            </li>
            <li>
                <NavLink 
                style={{display:"flex", flexDirection:"column",alignItems:"center"}}
                to="/members"><GroupsIcon/>Members</NavLink>
            </li>

            <li>
                 <NavLink
                 style={{display:"flex", flexDirection:"column",alignItems:"center"}}
                 to="/teams"><Diversity3Icon/>Teams</NavLink>
            </li>

            <li> 
                <NavLink 
                style={{display:"flex", flexDirection:"column",alignItems:"center"}}  
                to="/chat"> <ChatIcon/>Chat</NavLink>
            </li>

            <li> 
                <NavLink 
                style={{display:"flex", flexDirection:"column",alignItems:"center"}}  
                to="/oportunities"><NotificationsIcon/>Oportunities</NavLink>
            </li>

            <li>
                 <NavLink
                 style={{display:"flex", flexDirection:"column",alignItems:"center"}}  
                 to="/calendar"><DateRangeIcon/>Calendar</NavLink>
            </li>

            {
             authUser.roles.includes('admin') && 
               <li>
               <NavLink
               style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:'center'}}  
               to="/settings"><SettingsIcon/>Settings</NavLink>
               </li>
            }

            <li>
                <Button onClick={()=>setOpenDialog(true)} sx={{color:'white',textTransform:'none'}}>Sign out</Button>
            </li>
        </ul>
        <Dialog open={openDialog}>
            <DialogTitle sx={{fontFamily:'Poppins',width:'400px',fontWeight:'400'}}>Are you sure you want to leave?</DialogTitle>
                <DialogActions sx={{padding:'30px',display:'flex'}}>
                  <Button sx={{background:'#2E3789'}} variant="contained" onClick={ ()=>handleConfirm()}>Yes</Button>
                  <Button sx={{color:'#2E3789'}} onClick={()=>setOpenDialog(false)}>No</Button>
                </DialogActions>
         </Dialog>
    </nav>
    )
}