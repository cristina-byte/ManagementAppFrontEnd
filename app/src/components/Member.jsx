export default function Member(props){
    return(
        <div className="member">
            <img src={props.imgUrl} alt="" />
            <div className="member-data">
            <h1>{props.name}</h1>
            <p className="role">{props.role}</p>
            </div>
            { props.isOnline && <div className="online"></div>}
        </div>
    )
}