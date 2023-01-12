
export default function Role(props){

return (
    <div className="role">
    <div className="role-details">
    <p>{props.name}</p>
    <h1>{props.eventName}</h1>
    </div>
    <p>{props.startDate} - {props.endDate}</p>
    </div>
)}

