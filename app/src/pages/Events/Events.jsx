import {useState,useEffect} from "react"
import {useQuery} from "react-query"
import {Link} from "react-router-dom"
import axiosInstanceLocal from "../../axiosLocal"
import Event from "../../components/Event"
import style from "./Events.css"

export default function Events(){

    const [events, setEvents]=useState(null)
    const [parameter,setParameter]=useState("")
    
    const getEvents=async ()=>{
        const response=await axiosInstanceLocal.get(`/Events${parameter}?page=1`)
        return response.data
    }

    const {
        data:eventsData,
        isLoading:eventsLoading
    }=useQuery(['eventsQueryKey'],getEvents)

    return (
        <section className="events">
             <h1 className="title-page">Events</h1>
             <div className="menu-items">
              <button onClick={ (event)=>setParameter("")}>All</button>
              <button onClick={(event)=>setParameter("/Upcoming") }>Upcoming</button>
              <button onClick={(event)=>setParameter("/In Process")}>In Process</button>
             </div>
             {eventsData && <div className="events-container">
                {events && events.map( event=><Event key={event.id} name={event.name} imgUrl={event.imageLink} id={event.id} /> )}
             </div>}
        </section>
    )
}