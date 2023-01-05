
export default function Event(props){

    return (
        <div className="event">
            <img src={props.imgUrl} alt="" />
            <div className="event-data">
            <h1>{props.name}</h1>
            <button>View</button>
            </div>
           
        </div>
    )

}