import axiosInstanceLocal from "../../axiosLocal"
import { useParams } from "react-router-dom"
import Member from "../../components/Member"
import { useQuery } from "react-query"

function EventView(){

    const parameter=useParams()
  
    const getEvent=async()=>{
        const response =await axiosInstanceLocal.get(`/Events/${parameter.id}`)
        return response.data
    }

    const {data,isLoading}=useQuery(['eventQueryKey'],getEvent)

    return (
        <section className="event-section">
        {data && 
        <div> <img src={data.imageLink} alt="" />
        <h1>{data.name}</h1>
        <p>{data.startDate} - {data.endDate}</p>
        <p>{data.address}</p>
        <h1>Description</h1>
        <p>{data.description}</p>
        <h1>Core team members</h1>
        <h1>Organized by</h1>
        <Member/> </div>}
    </section>)}

export default EventView