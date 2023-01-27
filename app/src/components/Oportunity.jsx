import {Link} from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { calculateTimeDifference } from "../utils/dateUtils";
import { useContext } from "react";
import { AuthUserContext } from "../authentification/AuthenticationProvider";

export default function Oportunity(props){

    const handleClick=()=>{
        props.delete(props.id)
    }

    //take from context
    const {authUser}=useContext(AuthUserContext)
    
    return (
        <div className="oportunity">
            <img src={props.imgUrl} alt="" />
            <div className="oportunity-data">
                <p className="item-title">{props.name}</p>
                <p className="oportunity-description">{props.description}</p>
                <div className="bottom">

                <p className="postedAt">posted { 
                calculateTimeDifference(new Date(props.posted))} ago</p>
              
                    <div className="actions">
                    <Link className="action" to={""+props.id}>View</Link>
                    {authUser.roles.includes('admin') &&
                    <div>
                    <Link className="action" to={`${props.id}/edit`}>Edit</Link>
                    <IconButton color="primary" aria-label="upload picture" onClick={handleClick} component="label">
                    <DeleteIcon fontSize="small" htmlColor="#2E3789"/>
                    </IconButton>
                    </div>
                    }
                  
                    </div>
                </div>
            </div>
        </div>
    )
}