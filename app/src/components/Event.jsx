import {Link} from "react-router-dom"

export default function Event(props){

    return (
        <div className="event">
            <img src={props.imgUrl} alt="" />
            <div className="event-data">
            <h1>{props.name}</h1>
            <Link to={"/events/"+props.id}>View</Link>
            </div>
           
        </div>
    )

}