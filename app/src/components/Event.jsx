import {Link} from "react-router-dom"
import Moment from 'moment'

export default function Event(props){

    return (
        <div className="event">
            <img src={props.imgUrl} alt="" />
            <div className="event-data">
            <h3>{props.name}</h3>
            <Link className="button" to={""+props.id}>View</Link>
            </div>
        </div>
    )

}