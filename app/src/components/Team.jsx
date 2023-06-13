import { Link } from "react-router-dom"

function Team(props){

    return (
        <div className="team">
            <div>
            <Link to={""+props.id}><p className="team-name">{props.name}</p></Link>
            <p className="members-number">{props.members.length>1?props.members.length+" members":props.members.length+" member"}</p>
            </div>
            <div className="team-members">
                {
                    props.members.length>0 && props.members.map( (m,index)=>{if(index<3) return <Link key={m.id} to={"/members/"+m.id}><img key={m.id} style={ {width:"25px",height:"25px",objectFit:"cover",borderRadius:"50%"}} src={m.imageLink}/></Link>})
                }
                {props.members.length>3 && <p className="left-members">+{props.members.length-3}</p>}
            </div>

           
        </div>
    )
}

export default Team