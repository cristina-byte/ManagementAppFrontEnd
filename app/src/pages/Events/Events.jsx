import {useState,useEffect} from "react"
import Event from "../../components/Event"
import style from "./Events.css"

export default function Events(){

    const [events, setEvents]=useState(null)

    useEffect(()=>{
        fetch('https://localhost:7257/api/Events?page=1')
        .then(result=>result.json())
        .then(data=>{console.log(data);return setEvents(data)})
    },[])

    return (
        <section className="events">
             <h1 className="title-page">Events</h1>
             <div className="events-container">
                {events && events.map( event=><Event key={event.id} name={event.name} imgUrl={event.imageLink} /> )}
             </div>
        </section>
    )
}