import {format} from "date-fns"
import { Link } from "react-router-dom"

export default function Oportunity(props){

    return (
        <div className="home-oportunity">
            <img src={props.imgUrl} alt="" />
                <div>
                <Link to={`/oportunities/${props.id}`}><p className="item-title">{props.name}</p></Link>
                <p className="deadline">Apply until {format(new Date(props.deadline),"d MMMM, HH:mm")}</p>
                </div>
            </div>
    )
}