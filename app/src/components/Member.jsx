import {Link} from "react-router-dom"

export default function Member(props){
    return(
        <div className="member">
            <img src={props.imgUrl} alt="" />
            <div className="member-data">
           <Link style={ {color:'#2B2B2B',fontWeight:'500',fontSize:'14px'}} to={"/members/"+props.id}  >{props.name}</Link>
           
            </div>
            
        </div>
    )
}