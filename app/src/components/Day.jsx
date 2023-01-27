
import Meeting from "./Meeting"

const Day=(props)=>{
    return (
        <div className={props.class}>
             {props.date}
            <div className="meetings-container">
                {
                    props.meetings.length>0 && props.meetings.map( (meeting)=>
                    <Meeting
                    key={meeting.id}
                    name={meeting.title} 
                    startTime={meeting.startDate} 
                    address={meeting.address} 
                    id={meeting.id}
                    endTime={meeting.endDate}/> )}
            </div>
        </div>
    )
}

export default Day