import {Link} from "react-router-dom"

export default function Member(props){
    return(
        <div className="member">
            <img src={props.imgUrl} alt="" />
            <div className="member-data">
            <Link to={"/members/"+props.id}>{props.name}</Link>
            <p className="role">{props.role}</p>
            </div>
            { props.isOnline && <div className="online"></div>}
        </div>
    )
}