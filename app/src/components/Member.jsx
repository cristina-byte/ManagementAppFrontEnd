import {Link} from "react-router-dom"

export default function Member(props){
    return(
        <div className="member">
            <img src={props.imgUrl} alt="" />
            <div className="member-data">
           <Link style={ {color:'#2B2B2B',fontWeight:'500',fontSize:'14px'}} to={""+props.id}  >{props.name}</Link>
            <p className="role">{props.id}</p>
            </div>
            { props.isOnline && <div className="online"></div>}
        </div>
    )
}