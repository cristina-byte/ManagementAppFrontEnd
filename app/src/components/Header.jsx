import {createRoutesFromElements, NavLink} from "react-router-dom"
//imports for icons

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChatIcon from '@mui/icons-material/Chat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { flexbox } from "@mui/system";

export default function Header(){
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
                to="/events"><EventIcon/>Events</NavLink>
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
        </ul>
    </nav>
    )
}