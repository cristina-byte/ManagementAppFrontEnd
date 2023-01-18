import axiosInstanceLocal from "../../axiosLocal"
import { useParams } from "react-router-dom"
import Member from "../../components/Member"
import { useQuery } from "react-query"
import Moment from 'moment'
import style from "./EventView.css"

function EventView(){

    const parameter=useParams()
  
    const getEvent=async()=>{
        const response =await axiosInstanceLocal.get(`/Events/${parameter.id}`)
        return response.data
    }

    const {data,isLoading}=useQuery(['eventQueryKey'],getEvent)

   
    if(data)
    console.log(data)



    return (
        <section className="event-section page">
        {data && 
        <div className="event-data">  
        <img src={data.imageLink} alt="" />
        <h1 className="name">{data.name}</h1>
        <p className="date">{Moment(data.startDate).format('MMMM Do YYYY')} - {Moment(data.endDate).format('MMMM Do YYYY')}</p>
        <p className="address">{data.address}</p>
        <h1 className="title">Description</h1>
        <p className="description">{data.description}</p>
        <Member/> </div>}
    </section>)}

export default EventView