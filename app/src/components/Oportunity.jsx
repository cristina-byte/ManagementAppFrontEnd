import {Link} from "react-router-dom"

export default function Oportunity(props){

    return (
        <div className="oportunity">
            <img src={props.imgUrl} alt="" />
            <div className="oportunity-data">
                <h3>{props.name}</h3>
                <Link className="button" to={""+props.id}>View</Link>
                
            </div>
        </div>
    )
}