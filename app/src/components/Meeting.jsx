import {format} from "date-fns";
import { Link } from "react-router-dom";
import {toLocalDate,isInProcess} from "../utils/dateUtils"

function Meeting(props){

    return (
        <Link to={`/calendar/${props.id}`}>
        <div className={ toLocalDate(new Date(props.endTime))<new Date()?'meetings finished':'meeting'   }>
            { isInProcess(toLocalDate(new Date(props.startTime)),toLocalDate(new Date(props.endTime))) && <div className="online"></div>}
            <p className="meeting-title">{props.name}</p>
            <p className="meeting-time">{format( toLocalDate(new Date(props.startTime)),"HH:mm")} - 
            {format(toLocalDate(new Date(props.endTime)),"HH:mm")}</p>
            <p className="meeting-address">{props.address}</p>
        </div>
        </Link>    
        
    )
}

export default Meeting